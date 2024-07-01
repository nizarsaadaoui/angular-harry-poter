import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a range of numbers', () => {
    const result = pipe.transform('100-50');
    expect(result).toBe('$100-50 million');
  });

  it('transforms a single value', () => {
    const result = pipe.transform('50');
    expect(result).toBe('$50 million');
  });

});