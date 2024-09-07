import { formatCurrecny } from "../scripts/utils/money.js";

describe('test suite: fromatCurrencey',()=>{
  it('converts cents into dollars',()=>{
    expect(formatCurrecny(2095)).toEqual('20.95');
  });

  it('work with 0',()=>{
    expect(formatCurrecny(0)).toEqual('0.00')
  });

  it('rounds up to the nearst cent', ()=>{
    expect(formatCurrecny(2000.5)).toEqual('20.01')
  })
});