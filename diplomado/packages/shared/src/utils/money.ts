import { Decimal } from 'decimal.js';

export const MONEY_PRECISION = 2;

export type MoneyValue = Decimal | number | string;

export const toDecimal = (value: MoneyValue): Decimal => new Decimal(value);

export const addMoney = (...values: MoneyValue[]): Decimal =>
  values.reduce<Decimal>((total, value) => total.plus(toDecimal(value)), new Decimal(0));

export const multiplyMoney = (amount: MoneyValue, multiplier: MoneyValue): Decimal =>
  toDecimal(amount).times(toDecimal(multiplier)).toDecimalPlaces(MONEY_PRECISION, Decimal.ROUND_HALF_UP);

export const roundMoney = (value: MoneyValue): Decimal =>
  toDecimal(value).toDecimalPlaces(MONEY_PRECISION, Decimal.ROUND_HALF_UP);

export const calculateIva16 = (baseAmount: MoneyValue): Decimal =>
  toDecimal(baseAmount).times(new Decimal('0.16')).toDecimalPlaces(MONEY_PRECISION, Decimal.ROUND_HALF_UP);
