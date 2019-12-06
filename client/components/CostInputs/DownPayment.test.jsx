import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import DownPayment from './DownPayment';
import { formatNum } from '../../utils';

describe('DownPayment', () => {
  const mountNode = 'root';
  let downPayment;
  const cost = 800000;
  const downPay = 20;
  const handleDownPaySubmit = jest.fn();

  beforeAll(() => {
    downPayment = mount(<DownPayment
      cost={cost}
      downPay={downPay}
      handleDownPaySubmit={handleDownPaySubmit}
    />, { attachTo: document.getElementById(mountNode) });
  });

  afterAll(() => {
    // TODO - check that this functions as intended
    ReactDOM.unmountComponentAtNode(mountNode);
  });

  describe('Props', () => {
    test('It should set passed in downPay prop to downPay input value', () => {
      const domDownPay = downPayment.find('#downPay').getElements()[2].props.value;
      expect(domDownPay).toEqual(`${downPay}%`);
    });

    test('It should set downPayDollars value correctly', () => {
      const domDownPayDollars = downPayment.find('#downPayDollars').getElements()[2].props.value;
      expect(domDownPayDollars).toEqual(formatNum((downPay / 100) * cost));
    });

    test('It should set downPaySlider value correctly', () => {
      const domDownPaySlider = downPayment.find('#downPaySlider').getElements()[2].props.value;
      expect(domDownPaySlider).toEqual(downPay);
    });
  });

  describe('Slider', () => {
    test('It should update numeric values on percent and dollars inputs', () => {
      const changedDownPay = 25;
      downPayment.find('#downPaySlider').find('input').simulate('change', { target: { value: `${changedDownPay}%` } });
      expect(downPayment.find('#downPaySlider').getElements()[2].props.value).toBe(changedDownPay);
      expect(downPayment.find('#downPay').getElements()[2].props.value).toBe(changedDownPay);
      expect(downPayment.find('#downPayDollars').getElements()[2].props.value).toBe(cost * (changedDownPay / 100));
    });

    test('It should call update handleDownPaySubmit after moving slider', () => {
      downPayment.find('#downPaySlider').find('input').simulate('mouseUp');
      expect(handleDownPaySubmit).toHaveBeenCalled();
    });
  });
});
