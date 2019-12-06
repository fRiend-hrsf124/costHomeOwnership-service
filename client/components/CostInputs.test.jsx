import React from 'react';
import { shallow } from 'enzyme';
import CostInputs from './CostInputs';

describe('CostInputs', () => {
  let costInputs;
  beforeAll(() => {
    costInputs = shallow(<CostInputs />);
  });

  test('It should mount two components', () => {
    expect(costInputs.find('div').children().length).toBe(2);
  });
});
