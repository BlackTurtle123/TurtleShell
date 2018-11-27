import './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { I18N_NAME_SPACE } from '../../appConfig';

@translate(I18N_NAME_SPACE)
export class AliasFinal extends React.PureComponent {
    
    readonly props;
    
    render() {
        const { isApprove, isReject, isSend } = this.props;
        
        if (isApprove) {
            return <div>
                <div className="margin-main headline2">
                    {isSend ? <Trans i18nKey='sign.transactionSend'>Your transaction is confirmed!</Trans> : null}
                    {!isSend ? <Trans i18nKey='sign.transactionConfirmed'>Your transaction has been signed!</Trans>: null}
                </div>
                <div className="basic500">
                    {isSend ? <Trans i18nKey='sign.transactionSendAlias'>An alias has been created.</Trans> : null}
                    {!isSend ? <Trans i18nKey='sign.transactionConfirmAlias'>You have approved Alias creation.</Trans> : null}
                </div>
            </div>
        }
        
        if (isReject) {
            return <div className="margin-main-large headline2">
                <Trans i18nKey='sign.transactionFiled'>Your transaction is rejected!</Trans>
            </div>
        }
        
        return null;
    }
}
