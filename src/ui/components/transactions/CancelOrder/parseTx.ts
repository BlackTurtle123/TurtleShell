import { SIGN_TYPE } from '@turtlenetwork/signature-adapter';

export const messageType = 'cancel-order';
export const txType = 'cancelOrder';


export function getAssetsId(tx): Array<string> {
    return ['TN'];
}

export function getFee(tx) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmount(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmountSign() {
    return '';
}

export function isMe(tx: any, type: string) {
    return tx.type === SIGN_TYPE.CANCEL_ORDER && (type === txType || type === 'request')
}
