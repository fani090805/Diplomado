import { Decimal } from 'decimal.js';
import { describe, expect, it } from 'vitest';
import { addMoney, calculateIva16, multiplyMoney, roundMoney } from './money.js';

describe('money utils', () => {
  it('sums money values correctly', () => {
    expect(addMoney(10.12, '5.88')).toEqual(new Decimal('16.00'));
  });

  it('multiplies and rounds money values', () => {
    expect(multiplyMoney(12.345, 2)).toEqual(new Decimal('24.69'));
  });

  it('rounds to 2 decimal places', () => {
    expect(roundMoney('19.999')).toEqual(new Decimal('20.00'));
  });

  it('calculates IVA 16%', () => {
    expect(calculateIva16(100)).toEqual(new Decimal('16.00'));
  });
});
