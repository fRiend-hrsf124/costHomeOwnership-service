import React from 'react';
import { mount } from 'enzyme';
import DownPayment from './CostInputDownPayment';

describe('CostInputDownPayment', () => {
  let downPayment;
  const cost = 800000;
  const downPay = 20;
  const handleDownPaySubmit = () => { };

  beforeAll(() => {
    downPayment = mount(<DownPayment
      cost={cost}
      downPay={downPay}
      handleDownPaySubmit={handleDownPaySubmit}
    />, { attachTo: document.getElementById('root') });
  });

  test('It should set passed in downPay prop to downPay input value', () => {
    const domDownPay = downPayment.find('#downPay').props().value;
    expect(domDownPay).toEqual(downPay);
  });

  test('It should set downPayDollars value correctly', () => {
    const domDownPayDollars = downPayment.find('#downPayDollars').props().value;
    expect(domDownPayDollars).toEqual((downPay / 100) * cost);
  });

  test('It should set downPaySlider value correctly', () => {
    const domDownPaySlider = downPayment.find('#downPaySlider').props().value;
    expect(domDownPaySlider).toEqual(downPay);
  });
});
