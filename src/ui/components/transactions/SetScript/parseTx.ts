import { SIGN_TYPE } from '@turtlenetwork/signature-adapter';

export const messageType = 'set-script';
export const txType = 'transaction';

export function getAssetsId(tx): Array<string> {
    const feeAssetId = tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'TN';
    return [feeAssetId];
}

export function getFee(tx) {
    return typeof tx.fee === 'object' ? tx.fee : { coins: tx.fee, assetId: 'TN' };
}

export function getAmount(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmountSign() {
    return '';
}

export function isMe(tx: any, type: string) {
    return tx.type === SIGN_TYPE.SET_SCRIPT && type === txType;
}
