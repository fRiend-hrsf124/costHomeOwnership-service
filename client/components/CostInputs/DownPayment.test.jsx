import React from 'react';
import { mount } from 'enzyme';
import DownPayment from './DownPayment';
import { formatNum } from '../../utils';

describe('DownPayment', () => {
  const mountNode = 'root';
  let wrapper;
  const cost = 800000;
  const downPay = 20;
  const handleUserSubmit = jest.fn();

  beforeAll(() => {
    wrapper = mount(<DownPayment
      cost={cost}
      downPay={downPay}
      handleUserSubmit={handleUserSubmit}
    />, { attachTo: document.getElementById(mountNode) });
  });

  afterAll(() => {
    wrapper.detach();
  });

  describe('Props', () => {
    test('It should set passed in downPay prop to downPay input value', () => {
      const domDownPay = wrapper.find('#downPay').getElements()[2].props.value;
      expect(domDownPay).toEqual(`${downPay}%`);
    });

    test('It should set downPayDollars value correctly', () => {
      const domDownPayDollars = wrapper.find('#downPayDollars').getElements()[2].props.value;
      expect(domDownPayDollars).toEqual(formatNum((downPay / 100) * cost));
    });

    test('It should set downPaySlider value correctly', () => {
      const domDownPaySlider = wrapper.find('#downPaySlider').getElements()[2].props.value;
      expect(domDownPaySlider).toEqual(downPay);
    });
  });

  describe('Slider', () => {
    test.skip('It should update numeric values on percent and dollars inputs', () => {
      const changedDownPay = 25;
      wrapper.find('#downPaySlider').find('input').simulate('change', { target: { value: `${changedDownPay}%` } });
      expect(wrapper.find('#downPaySlider').getElements()[2].props.value).toBe(changedDownPay);
      expect(wrapper.find('#downPay').getElements()[2].props.value).toBe(changedDownPay);
      expect(wrapper.find('#downPayDollars').getElements()[2].props.value).toBe(cost * (changedDownPay / 100));
    });

    test('It should call update handleUserSubmit after moving slider', () => {
      wrapper.find('#downPaySlider').find('input').simulate('mouseUp');
      expect(handleUserSubmit).toHaveBeenCalled();
    });
  });
});
