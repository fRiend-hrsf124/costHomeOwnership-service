import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let costInputs;
  beforeAll(async () => {
    costInputs = await shallow(<App id={1} />);
  });

  test('It should mount one component', async () => {
    const compCount = await costInputs.find('div').children().length;
    expect(compCount).toBe(1);
  });
});
