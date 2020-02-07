import { Money } from "@waves/data-entities";
<<<<<<< HEAD
import { BigNumber } from "@waves/bignumber";
=======
import { BigNumber } from "@turtlenetwork/bignumber";
>>>>>>> testing

export const moneyLikeToMoney = (amount: IMoneyLike, assets): Money => {
  if (amount) {
    let amountResult = new Money(0, assets[amount.assetId || "TN"]);

    if ("tokens" in amount) {
      amountResult = amountResult.cloneWithTokens(
        (amount.tokens as number) || 0
      );
    }

    if ("coins" in amount) {
      amountResult = amountResult.add(
        amountResult.cloneWithCoins((amount.coins as number) || 0)
      );
    }

    return amountResult;
  }
};

<<<<<<< HEAD
export const getMoney = (amount: any, assets) => {
=======
export const getMoney = (amount: TAmount, assets) => {
>>>>>>> testing
  if (amount instanceof Money) {
    return amount;
  }

  if (amount instanceof BigNumber) {
    return new Money(amount, assets["TN"]);
  }

  if (typeof amount === "object" && (amount.tokens || amount.coins)) {
    return moneyLikeToMoney(amount as IMoneyLike, assets);
  }

<<<<<<< HEAD
  return new Money(new BigNumber(amount), assets["TN"]);
};

interface IMoneyLike {
  coins?: number | string | BigNumber;
  tokens?: number | string | BigNumber;
=======
  if (typeof amount === "string" || typeof amount == "number") {
    return new Money(amount, assets["TN"]);
  }
};

type TAmount = IMoneyLike | BigNumber | Money | string | number;

interface IMoneyLike {
  coins?: string | number | BigNumber;
  tokens?: string | number | BigNumber;
>>>>>>> testing
  assetId: string;
}
