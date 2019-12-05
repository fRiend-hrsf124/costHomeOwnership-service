import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import mockAxios from 'axios';
import App from './App';

describe('App', () => {
  const mountNode = 'root';
  let wrapper;
  const propertyId = 1;
  const zipCode = 53217;
  const redfinCostEstimate = 2180000;
  const insuranceRate = 0.123;
  const propertyTaxRate = 1.234;

  beforeAll(() => {
    const getPropertyDataRes = () => Promise.resolve({
      data: [{
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
      }],
    });

    const getRatesRes = () => Promise.resolve({
      data: [],
    });

    // handle componentDidMount calls
    mockAxios.get
      .mockImplementationOnce(getPropertyDataRes)
      .mockImplementationOnce(getRatesRes);

    wrapper = mount(<App id={propertyId} />,
      { attachTo: document.getElementById(mountNode) });
  });

  afterAll(() => {
    // TODO - check that this functions as intended
    ReactDOM.unmountComponentAtNode(mountNode);
  });

  test('It should render CostInputs component with cost prop before server calls', () => {
    const costInputsCompCost = wrapper.find('CostInputs').props().cost;
    expect(costInputsCompCost).toBe(10);
  });

  test('It should render CostInputs component with cost prop after server calls', () => {
    wrapper.update();
    const costInputsCompCost = wrapper.find('CostInputs').props().cost;
    expect(costInputsCompCost).toBe(redfinCostEstimate);
  });
});
