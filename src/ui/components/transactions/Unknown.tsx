import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { SignClass } from './SignClass';
import { TxIcon } from './TransactionIcon';
import { TransactionBottom } from './TransactionBottom';
import { I18N_NAME_SPACE } from '../../appConfig';

@translate(I18N_NAME_SPACE)
export class Unknown extends SignClass {

    render() {
        const { data: tx } = this.props.signData;
        
        return <div className={styles.transaction}>
            {super.render()}
            <div className={styles.txScrollBox}>
            
                <div className={`${styles.txIcon} ${styles.txIconBig} margin-main`}>
                    <TxIcon txType={this.props.txType}/>
                </div>

                <div className="headline2 center margin-main-large">
                    <Trans i18nKey='transactions.signCustomRequest'>Sign a request</Trans>
                </div>
            
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.hashId'>Request hash</Trans>
                    </div>
                    <div className={styles.txValue}>{this.props.txHash}</div>
                </div>
            </div>
    
            <TransactionBottom {...this.props}/>
        </div>
    }
}
