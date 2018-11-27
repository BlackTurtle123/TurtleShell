import {Money, BigNumber} from '@turtlenetwork/data-entities';
import create from 'parse-json-bignumber';
const {stringify, parse} = create({BigNumber});

export function moneylikeToMoney(moneylike, asset){
    return new Money(moneylike.value, asset)
}

export function moneyToMoneylike(money){
    return {
        assetId: money.asset.id,
        value: money.getCoins().toString()
    }
}