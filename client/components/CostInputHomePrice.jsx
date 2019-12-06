import React from 'react';
import styled from 'styled-components';
import formatNum from '../util.currency';

// eslint-disable-next-line no-unused-vars
const Input = styled.input`
  font: 400 11px system-ui;
`;

// eslint-disable-next-line no-unused-vars
const Slider = styled.input`
  background: transparent;
  margin-top: 16px;
  margin-bottom: 0;
  color: rgb(144, 144, 144);
`;

const HomePrice = (props) => {
  const { cost, handleCostSubmit, redfinCostEstimate } = props;
  const [costForm, setCost] = React.useState(cost);
  const [costSlider, setCostSlider] = React.useState(cost);


  const handleTextChange = (e) => {
    setCost(e.target.value);
  };

  const handleTextEnter = (e) => {
    if (e.key === 'Enter') {
      handleCostSubmit(costForm);
    }
  };

  const handleSliderChange = (e) => {
    const newCost = e.target.value;
    setCostSlider(newCost);
    setCost(newCost);
  };

  const handleSubmit = () => {
    handleCostSubmit(costForm);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="cost">Home Price</label>
      <br />
      <input
        type="text"
        id="cost"
        name="cost"
        value={costForm}
        onChange={handleTextChange}
        onKeyDown={handleTextEnter}
        onBlur={handleSubmit}
      />
      <br />
      <input
        type="range"
        id="costSlider"
        name="costSlider"
        min={redfinCostEstimate * 0.8}
        max={redfinCostEstimate * 1.2}
        value={costSlider}
        step={1000}
        onChange={handleSliderChange}
        onMouseUp={handleSubmit}
      />
    </form>
  );
};

export default HomePrice;
