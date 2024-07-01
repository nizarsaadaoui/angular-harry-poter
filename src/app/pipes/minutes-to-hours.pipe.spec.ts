import { MinutesToHoursPipe } from './minutes-to-hours.pipe';

describe('MinutesToHoursPipe', () => {
  let pipe: MinutesToHoursPipe;

  beforeEach(() => {
    pipe = new MinutesToHoursPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms minutes to hours and minutes format', () => {
    expect(pipe.transform(120)).toBe('2h  0min');
    expect(pipe.transform(135)).toBe('2h  15min');
    expect(pipe.transform(60)).toBe('1h  0min');
    expect(pipe.transform(66)).toBe('1h  6min');
    expect(pipe.transform(10)).toBe('0h  10min');
  });


});
