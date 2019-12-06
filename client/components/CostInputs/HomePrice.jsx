/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import { formatNum, parseUserStr } from '../../utils';
import { Box, Input, Slider } from '../styles.jsx';

const Container = styled.span`
  width: 100%;
  flex-basis: 100%;
  margin-top: 10px;
`;

const HomePrice = (props) => {
  const { cost, handleCostSubmit, redfinCostEstimate } = props;
  const [costForm, setCost] = React.useState(cost);
  const [costSlider, setCostSlider] = React.useState(cost);
  const [inputSelected, setInputSelected] = React.useState(false);

  const inputRef = React.createRef();

  const handleTextChange = (e) => {
    setCost(parseUserStr(e.target.value, costForm));
  };

  const handleTextEnter = (e) => {
    if (e.key === 'Enter') {
      handleCostSubmit(costForm);
    }
  };

  const handleSliderChange = (e) => {
    const newCost = parseUserStr(e.target.value, costForm);
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
