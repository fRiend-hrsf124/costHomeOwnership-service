import React from 'react';
import styled from 'styled-components';
import formatNum from '../util.currency';

const Container = styled.span`
  width: 100%;
  flex-basis: 100%;
  margin-top: 10px;
`;

const Box = styled.span`
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  display: block;
  padding: 10px 8px 9px;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
`;

const Input = styled.input`
  font: 400 11px system-ui;
  font-size: 1rem;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1.8px;
    cursor: pointer;
    box-shadow: 0.1px 0.1px 0px #000000, 0px 0px 0.1px #0d0d0d;
    background: #2cd9ff;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0.4px 0.4px 4.7px #000000, 0px 0px 0.4px #0d0d0d;
    border: 1px solid #9feaff;
    height: 26px;
    width: 26px;
    border-radius: 26px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -12.3px;
  };
`;

const HomePrice = (props) => {
  const { cost, handleCostSubmit, redfinCostEstimate } = props;
  const [costForm, setCost] = React.useState(cost);
  const [costSlider, setCostSlider] = React.useState(cost);
  const [inputSelected, setInputSelected] = React.useState(false);

  const inputRef = React.createRef();

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

  const handleInputDeselect = () => {
    setInputSelected(false);
    handleCostSubmit(costForm);
  };

  const handleInputSelect = () => {
    setInputSelected(true);
    inputRef.current.focus();
  };

  return (
    <Container>
      <span>Home Price</span>
      <Box
        onBlur={handleInputDeselect}
        onFocus={handleInputSelect}
      >
        <Input
          type="text"
          id="cost"
          ref={inputRef}
          name="cost"
          value={inputSelected ? costForm : formatNum(costForm)}
          onChange={handleTextChange}
          onKeyDown={handleTextEnter}
        />
      </Box>
      <Slider
        type="range"
        id="costSlider"
        name="costSlider"
        min={redfinCostEstimate * 0.8}
        max={redfinCostEstimate * 1.2}
        value={costSlider}
        step={1000}
        onChange={handleSliderChange}
        onMouseUp={() => handleCostSubmit(costForm)}
      />
    </Container>
  );
};

export default HomePrice;
