import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { Balance } from '../ui';
import { SignClass } from './SignClass';
import { Asset, Money, BigNumber } from '@turtlenetwork/data-entities';
import { TxIcon } from './TransactionIcon';
import { TransactionBottom } from './TransactionBottom';
import { I18N_NAME_SPACE } from '../../appConfig';

@translate(I18N_NAME_SPACE)
export class Issure extends SignClass {
    
    render() {
        const { data: tx } = this.props.signData;
        const asset = {
            description: tx.description,
            name: tx.name,
            precision: tx.precision,
            quantity: new BigNumber(tx.quantity),
            reissuable: false
        } as any;
        
        const quantity = new Money(asset.quantity, new Asset(asset));
        
        return <div className={styles.transaction}>
            {super.render()}
            <div className={styles.txScrollBox}>

                <div className={`${styles.txIcon} margin-main`}>
                    <TxIcon txType={this.props.txType}/>
                </div>

                <div className={`${styles.txBalance} center headline2`}>
                    <Balance split={true} showAsset={true} balance={quantity} className={styles.txBalanceWrapper} />
                </div>
    
                { tx.description ? <div className={`${styles.txRow} ${styles.txRowDescription}`}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.description'>Description</Trans>
                    </div>
                    <div className={`${styles.txValue} plate fullwidth`}>{tx.description}</div>
                </div> : null }
    
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.decimalPoints'>Decimal points</Trans>
                    </div>
                    <div className={styles.txValue}>{tx.precision}</div>
                </div>
                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.issureType'>Type</Trans>
                    </div>
                    <div className={styles.txValue}>{
                        tx.reissuable ?
                            <Trans i18nKey='transactions.reissuable'>Reissuable</Trans>:
                            <Trans i18nKey='transactions.noReissuable'>Not reissuable</Trans>
                    }</div>
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
}
