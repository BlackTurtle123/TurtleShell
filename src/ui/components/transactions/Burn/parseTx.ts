import { SIGN_TYPE } from '@turtlenetwork/signature-adapter';

export const messageType = 'burn';
export const txType = 'transaction';


export function getAssetsId(tx): Array<string> {
    const feeAssetId = tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'TN';
    const amountAssetId = tx.amount && tx.amount.assetId ? tx.amount.assetId : tx.assetId || 'TN';
    
    if (feeAssetId === amountAssetId) {
        return [amountAssetId]
    }
    
    return [amountAssetId, feeAssetId];
}

export function getFee(tx) {
    return typeof tx.fee === 'object' ? tx.fee : { coins: tx.fee, assetId: 'TN' };
}

export function getAmount(tx = null) {
    if (tx.quantity) {
        tx.amount = tx.quantity;
    }
    
    if (typeof tx.amount === 'object') {
        const { coins, tokens, assetId } = tx.amount;
        
        return { coins, tokens, assetId: tx.assetId || assetId };
    }
    
    return { coins: tx.amount, assetId: tx.assetId || 'TN' };
}

export function getAmountSign() {
    return '-';
}


export function isMe(tx: any, type: string) {
    return tx.type === SIGN_TYPE.BURN && type === txType;
}
