import { SIGN_TYPE } from '@turtlenetwork/signature-adapter';

export const messageType = 'cancel-leasing';
export const txType = 'transaction';

export function getAssetsId(tx): Array<string> {
    const feeAssetId = tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'TN';
    const amountAssetId = 'TN';
    
    if (feeAssetId === amountAssetId) {
        return [amountAssetId]
    }
    
    return [amountAssetId, feeAssetId];
}

export function getFee(tx) {
    return typeof tx.fee === 'object' ? tx.fee : { coins: tx.fee, assetId: 'TN' };
}

export function getAmount(tx = null, message) {
    
    if (!message || !message.lease) {
        return { coins: null, assetId: 'TN' };
    }
    
    return { coins: message.lease.amount, assetId: 'TN' };
}

export function getAmountSign() {
    return '+';
}

export function isMe(tx: any, type: string) {
    return tx.type === SIGN_TYPE.CANCEL_LEASING && type === 'transaction'
}
