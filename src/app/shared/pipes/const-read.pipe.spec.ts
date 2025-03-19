import { ConstReadPipe } from './const-read.pipe';

describe('ConstReadPipe', () => {
  it('create an instance', () => {
    const pipe = new ConstReadPipe();
    expect(pipe).toBeTruthy();
  });
});
