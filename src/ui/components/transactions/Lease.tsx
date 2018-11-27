import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { Balance } from '../ui';
import { SignClass } from './SignClass';
import { TxIcon } from './TransactionIcon';
import {connect} from 'react-redux';
import { TransactionBottom } from './TransactionBottom';
import { I18N_NAME_SPACE } from '../../appConfig';

@translate(I18N_NAME_SPACE)
export class LeaseComponent extends SignClass {

    render() {
        const { tx } = this.state;
    
        return <div className={styles.transaction}>
            {super.render()}
            <div className={styles.txScrollBox}>
            
                <div className={`${styles.txIcon} margin-main`}>
                    <TxIcon txType={this.props.txType}/>
                </div>
            
                <div className={`${styles.txBalance} center headline2`}>
                    <Balance split={true} showAsset={true} balance={tx.amount} className={styles.txBalanceWrapper} />
                </div>

                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.to'>To</Trans>
                    </div>
                    <div className={styles.txValue}>{tx.recipient}</div>
                </div>
            
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.txid'>TXID</Trans>
                    </div>
                    <div className={styles.txValue}>{this.props.txHash}</div>
                </div>
            
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.fee'>Fee</Trans>
                    </div>
                    <div className={styles.txValue}><Balance isShortFormat={true} balance={tx.fee} showAsset={true}/></div>
                </div>
            </div>
    
            <TransactionBottom {...this.props}/>
        </div>
    }
    
    static getDerivedStateFromProps(props) {
       const asset = props.assets['TN'];
       return { asset,  tx: props.signData.data };
    }
}

const mapPropsToState = ({ assets }) => {
    return {
        assets,
    };
};



export const Lease = connect(mapPropsToState)(LeaseComponent as any);
