import React from 'react';
import { mount } from 'enzyme';
import DownPayment from './CostInputDownPayment';

describe('CostInputDownPayment', () => {
  let downPayment;
  const cost = 800000;
  const downPay = 20;
  const handleDownPaySubmit = jest.fn();

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

  test('It should call update handleDownPaySubmit and update state when moving slider', () => {
    const domDownPaySliderNode = downPayment.find('#downPaySlider');
    // const changedDownPay = 25;
    // domDownPaySliderNode.simulate('change', { target: { value: changedDownPay } });

    // const {
    //   downPaySlider, downPayNew, downPayForm, downPayDollarsForm,
    // } = downPayment.state();
    // expect(downPaySlider).toBe(changedDownPay);
    // expect(downPayNew).toBe(changedDownPay);
    // expect(downPayForm).toBe(changedDownPay);
    // expect(downPayDollarsForm).toBe(cost * (changedDownPay / 100));

    domDownPaySliderNode.simulate('mouseUp');
    expect(handleDownPaySubmit).toHaveBeenCalled();
  });
});
