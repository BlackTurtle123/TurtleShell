import { Money } from '@waves/data-entities';
import { BigNumber } from '@turtlenetwork/bignumber';

export const moneyLikeToMoney = (amount: IMoneyLike, assets): Money => {
    if (amount) {
        let amountResult = new Money(0, assets[amount.assetId || 'TN']);

        if ('tokens' in amount) {
            amountResult = amountResult.cloneWithTokens(amount.tokens as number || 0);
        }

        if ('coins' in amount) {
            amountResult = amountResult.add(amountResult.cloneWithCoins(amount.coins as number || 0));
        }

        return amountResult;
    }
};

export const getMoney = (amount: TAmount, assets) => {
    if (amount instanceof Money) {
        return amount;
    }

    if (amount instanceof BigNumber) {
        return new Money(amount, assets['TN']);
    }

    if (typeof amount === 'object' && (amount.tokens || amount.coins) ) {
        return moneyLikeToMoney(amount as IMoneyLike, assets);
    }

    return new Money(new BigNumber(amount), assets['TN']);
};

type TAmount = IMoneyLike|BigNumber|Money|string|number;

interface IMoneyLike {
    coins?: string|number|BigNumber;
    tokens?: string|number|BigNumber;
    assetId: string;
}

