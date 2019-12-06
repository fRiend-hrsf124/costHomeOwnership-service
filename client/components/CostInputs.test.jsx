import React from 'react';
import { shallow } from 'enzyme';
import CostInputs from './CostInputs';

describe('CostInputs', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CostInputs />);
  });

  test('It should mount HomePrice component', () => {
    expect(wrapper.find('HomePrice').length).toBe(1);
  });

  test('It should mount DownPayment component', () => {
    expect(wrapper.find('DownPayment').length).toBe(1);
  });
});
