import { Money } from "@turtlenetwork/data-entities";
import { BigNumber } from "@turtlenetwork/bignumber";
import create from "parse-json-bignumber";

const { stringify, parse } = create({ BigNumber });

export function moneylikeToMoney(moneylike, asset) {
  return new Money(moneylike.value, asset);
}

export function moneyToMoneylike(money) {
  return {
    assetId: money.asset.id,
    value: money.getCoins().toString()
  };
}
