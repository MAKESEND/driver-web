import idValidator from '../idValidator';

describe('test idValidator trackingId', () => {
  test.each`
    index | args                 | expected
    ${1}  | ${'EX0123456789123'} | ${true}
    ${2}  | ${'NS0123456789123'} | ${true}
    ${3}  | ${'NS01234'}         | ${false}
  `(`$index. test on $args`, ({ args, expected }) => {
    expect(idValidator.trackingId(args)).toBe(expected);
  });
});
