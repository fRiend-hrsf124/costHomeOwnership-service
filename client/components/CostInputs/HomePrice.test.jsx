import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import HomePrice from './HomePrice';
import { formatNum } from '../../utils';

describe('HomePrice', () => {
  const mountNode = 'root';
  let homePrice;
  const cost = 800000;
  const handleCostSubmit = jest.fn();
  const redfinCostEstimate = 800000;

  beforeAll(() => {
    homePrice = mount(<HomePrice
      cost={cost}
      handleCostSubmit={handleCostSubmit}
      redfinCostEstimate={redfinCostEstimate}
    />, { attachTo: document.getElementById(mountNode) });
  });

  afterAll(() => {
    // TODO - check that this functions as intended
    ReactDOM.unmountComponentAtNode(mountNode);
  });

  describe('Props', () => {
    test('It should set passed in cost prop to cost input value', () => {
      const domCost = homePrice.find('#cost').getElements()[2].props.value;
      expect(domCost).toEqual(formatNum(cost));
    });

    test('It should set passed in cost prop to costSlider input value', () => {
      const domCost = homePrice.find('#costSlider').getElements()[2].props.value;
      expect(domCost).toEqual(cost);
    });
  });

  describe('Slider', () => {
    test('It should update numeric values on cost input', () => {
      const changedCost = 900000;
      homePrice.find('#costSlider').find('input').simulate('change', { target: { value: formatNum(changedCost) } });
      homePrice.update();
      expect(homePrice.find('#costSlider').getElements()[2].props.value).toBe(changedCost);
      expect(homePrice.find('#cost').getElements()[2].props.value).toBe(formatNum(changedCost));
    });

    test('It should call update handleDownPaySubmit after moving slider', () => {
      homePrice.find('#costSlider').find('input').simulate('mouseUp');
      expect(handleCostSubmit).toHaveBeenCalled();
    });
  });
});
