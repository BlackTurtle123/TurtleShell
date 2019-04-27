export const messageType = 'unknown';
export const txType = null;

export function getAssetsId(tx = null): Array<string> {
    return ['TN'];
}

export function getFee(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmount(tx = null) {
    return { coins: 0, assetId: 'TN' };
}

export function getAmountSign(tx = null) {
    return '';
}

export function isMe(tx: any, type: string) {
    return true;
}
