import * as React from 'react';
import {connect} from 'react-redux';
import {translate, Trans} from 'react-i18next';
import { getAsset, approve, reject, clearMessagesStatus, clearMessages, closeNotificationWindow } from '../../actions';
import { PAGES } from '../../pageConfig';
import { Asset, Money } from '@turtlenetwork/data-entities';
import { Intro } from './Intro';
import { getConfigByTransaction, FinalTransaction } from '../transactions';
import { BigNumber } from '@turtlenetwork/data-entities/dist/libs/bignumber';

@translate('extension')
class MessagesComponent extends React.Component {

    readonly state = {} as any;
    readonly props;
    rejectHandler = () => this.reject();
    approveHandler = () => this.approve();
    clearMessagesHandler = () => this.clearMessages();
    clearMessageStatusHandler = () => this.cleanMessageStatus();
    selectAccountHandler = () => this.props.setTab(PAGES.CHANGE_TX_ACCOUNT);

    render() {
        if (this.state.loading) {
            return <Intro/>
        }
        
        const {
            approveOk,
            approveError,
            rejectOk
        } = this.state.transactionStatus;
    
        if (approveOk || approveError || rejectOk) {
            return <FinalTransaction selectedAccount={this.props.selectedAccount}
                                     transactionStatus={this.state.transactionStatus}
                                     config={this.state.config}
                                     signData={this.state.signData}
                                     onClick={this.clearMessageStatusHandler}/>
        }
        
        const { message, signData } = this.state;
        const conf = getConfigByTransaction(signData);
        const { component: Component, type } = conf;

        return <Component txType={type}
                          pending={this.state.approvePending}
                          txHash={this.state.txHash}
                          signData={signData}
                          message={message}
                          selectedAccount={this.state.selectedAccount}
                          clearMessagesHandler={this.clearMessagesHandler }
                          clearMessageStatusHandler={this.clearMessageStatusHandler }
                          reject={this.rejectHandler}
                          approve={this.approveHandler}
                          selectAccount={this.selectAccountHandler}>
        </Component>;
    }

    approve() {
        this.props.approve(this.state.message.id);
    }
    
    reject() {
        this.props.reject(this.state.message.id);
    }
    
    clearMessages() {
        this.props.clearMessages();
        this.cleanMessageStatus();
    }
    
    cleanMessageStatus() {
        this.props.clearMessagesStatus();
        this.props.closeNotificationWindow();
        this.props.setTab(PAGES.ROOT);
    }
    
    static getDerivedStateFromProps(props, state) {

        const { balance: sourceBalance, selectedAccount, assets, messages } = props;

        if (!assets || !assets['TN']) {
            props.getAsset('TN');
            return { loading: true, selectedAccount } ;
        }

        const { transactionStatus } = props;
        
        const {
            approveOk,
            approveError,
            rejectOk,
        } = transactionStatus;
        
        if (approveOk || approveError || rejectOk) {
            const { data } = (approveOk || approveError || rejectOk).message;
            const parsedData = MessagesComponent.getAssetsAndMoneys(data);
            const signData = MessagesComponent.fillSignData(data, parsedData.moneys, assets);
            const config = getConfigByTransaction(signData);
            return { transactionStatus, selectedAccount, config, signData };
        }
        
        const assetInstance = new Asset(assets['TN']);
        const currentId = state && state.message && state.message.id;
        const isExistMsg = !!messages.find(({ id, status }) => id === currentId && status === 'unapproved');
        const balance = new Money(sourceBalance || 0, assetInstance);

        if (currentId && isExistMsg) {
            return { ...state, balance, selectedAccount, assets};
        }
        const message = props.messages.find(({ status }) => status === 'unapproved');
        
        if (!message) {
            return { loading: true };
        }
        
        const sourceSignData = message.data;
        const parsedData = MessagesComponent.getAssetsAndMoneys(sourceSignData);
        const needGetAssets = Object.keys(parsedData.assets).filter(id => assets[id] === undefined);
        needGetAssets.forEach( id => props.getAsset(id));

        if (needGetAssets.length) {
            return { loading: true, selectedAccount } ;
        }

        const signData = MessagesComponent.fillSignData(sourceSignData, parsedData.moneys, assets);
        const txHash = message.messageHash;
        const config = getConfigByTransaction(signData);
        return { message, signData, config, txHash, balance, selectedAccount, assets, loading: false, transactionStatus };
    }

    static getAssetsAndMoneys(data) {
        const moneys = [];
        const assets = {};
        const work = [];

        if (data && typeof data === 'object') {
            work.push({ path: [], data });
        }

        while (work.length) {
            const { path: currentPath, data: currentData} = work.pop();

            if (currentData == null || typeof currentData !== 'object') {
                continue;
            }

            if ( currentData instanceof Money) {
                continue;
            }
            
            if ('priceAsset' in currentData) {
                assets[currentData.priceAsset || 'TN'] = true;
            }
    
            if ('amountAsset' in currentData) {
                assets[currentData.amountAsset || 'TN'] = true;
            }
            
            if ( 'assetId' in currentData) {
                assets[currentData.assetId || 'TN'] = true;

                if ('tokens' in currentData ) {
                    moneys.push({ ...currentData, path: currentPath });
                    continue;
                }

                if ('coins' in currentData ) {
                    moneys.push({ ...currentData, path: currentPath });
                    continue;
                }
            }

            for (const [key, data] of Object.entries(currentData)) {
                const path = [...currentPath, key];
                if (typeof data === 'object') {
                    work.push({ data, path });
                }
            }
            
        }

        return { assets, moneys };
    }

    static fillSignData(data, moneys, assets) {
        const result = { ...data };

        for (const { path, assetId, tokens, coins } of moneys) {

            let obj = result;
            const asset = assets[assetId];
            let moneyInstance = null;
            if (asset) {
                moneyInstance = tokens != null ?  Money.fromTokens(tokens, new Asset(asset)) : Money.fromCoins(coins, new Asset(asset))
            }
            const key = path.pop();

            for (const key of path) {
                if (Array.isArray(obj[key])) {
                    obj[key] = [ ...obj[key] ];
                } else {
                    obj[key] = { ...obj[key] };
                }
                 obj = obj[key];
            }

            obj[key] = moneyInstance || obj[key];
        }

        return result;
    }
}

const mapStateToProps = function (store) {
    return {
        transactionStatus: store.localState.transactionStatus,
        balance: store.balances[store.selectedAccount.address],
        selectedAccount: store.selectedAccount,
        messages: store.messages,
        assets: store.assets
    };
};

const actions = {
    closeNotificationWindow,
    clearMessagesStatus,
    clearMessages,
    getAsset,
    approve,
    reject
};

export const Messages = connect(mapStateToProps, actions)(MessagesComponent);
