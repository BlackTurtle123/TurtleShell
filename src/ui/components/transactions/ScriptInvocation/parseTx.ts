import { SIGN_TYPE } from '@turtlenetwork/signature-adapter';
import { BigNumber } from '@waves/bignumber';

export const messageType = 'script_invocation';
export const txType = 'transaction';


export function getTransferAmount(amount, assetId) {
    if (typeof amount === 'object') {
        amount.assetId = assetId;
        return amount;
    }
    
    return { coins: amount, assetId };
}

export function getAssetsId(tx): Array<string> {
    const feeAssetId = tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'TN';
    const amountAssetId = [];
    
    (tx.payment || []).map(item => {
        switch (typeof item) {
            case 'string':
                return 'TN';
            case 'number':
                return  'TN';
            case 'object':
                return  item && item.assetId ? item.assetId : 'TN';
        }
    });
    
    return [ ...amountAssetId, feeAssetId ];
}

export function getFee(tx) {
    return typeof tx.fee === 'object' ? tx.fee : { coins: tx.fee, assetId: 'TN' };
}

export function getAmount(tx) {
    let tokens = new BigNumber(0);
    let coins = new BigNumber(0);
    
    (tx.payment || []).forEach((item) => {
        if (item && item.tokens) {
            tokens = tokens.add(item.tokens);
        } else if (item && item.coins) {
            coins = coins.add(item.coins);
        } else if (item && item.amount) {
            coins = coins.add(item.amount);
        } else {
            const parse = new BigNumber(item);
            if (!parse.isNaN()) {
                coins = coins.add(parse);
            }
        }
    });
    
    const assetId = ((tx.payment || [])[0] || {}).assetId || 'TN';
    
    return { coins, tokens, assetId };
}

export function getAmountSign() {
    return '-';
}

export function isMe(tx: any, type: string) {
    return tx.type === SIGN_TYPE.SCRIPT_INVOCATION && type === txType;
}
