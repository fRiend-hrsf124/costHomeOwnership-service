import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import HomePrice from './CostInputHomePrice';

describe('CostInputHomePrice', () => {
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
    ReactDOM.unmountComponentAtNode(mountNode);
  });

  describe('Props', () => {
    test('It should set passed in cost prop to cost input value', () => {
      const domCost = homePrice.find('#cost').props().value;
      expect(domCost).toEqual(cost);
    });

    test('It should set passed in cost prop to costSlider input value', () => {
      const domCost = homePrice.find('#costSlider').props().value;
      expect(domCost).toEqual(cost);
    });
  });

  describe('Slider', () => {
    test('It should update numeric values on cost input', () => {
      const changedCost = 900000;
      homePrice.find('#costSlider').simulate('change', { target: { value: changedCost } });
      expect(homePrice.find('#costSlider').props().value).toBe(changedCost);
      expect(homePrice.find('#cost').props().value).toBe(changedCost);
    });

    test('It should call update handleDownPaySubmit after moving slider', () => {
      homePrice.find('#costSlider').simulate('mouseUp');
      expect(handleCostSubmit).toHaveBeenCalled();
    });
  });
});
