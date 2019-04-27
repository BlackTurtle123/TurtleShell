export const messageType = 'authOrigin';
export const txType = 'authOrigin';

export function getAssetsId(tx = null): Array<string> {
    return ['TN'];
}

export function getFee(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmount(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmountSign() {
    return '';
}

export function isMe(tx: any, type: string) {
    return type === txType
}
