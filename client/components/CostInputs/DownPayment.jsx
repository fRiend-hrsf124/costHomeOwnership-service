/* eslint-disable import/extensions */
import React, { useState } from 'react';
import styled from 'styled-components';
import { formatNum, parseUserStr } from '../../utils';
import {
  InputContainer, Box, Input, Slider,
} from '../styles.jsx';

const SplitContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SubContainer = styled.div`
  width: ${(props) => props.width}%;
  flex-basis: ${(props) => props.width}%;
`;

const DownPayment = (props) => {
  const { cost, downPay, handleUserSubmit } = props;

  const [downPayNew, setDownPayNew] = useState(downPay);
  const [downPayForm, setDownPayForm] = useState(downPay);
  const [downPayDollarsForm, setDownPayDollarsForm] = useState(cost * (downPay / 100));
  const [downPaySlider, setDownPaySlider] = useState(downPay);
  const [inputSelected, setInputSelected] = useState(false);
  const [inputDollarsSelected, setInputDollarsSelected] = useState(false);

  const inputRef = React.createRef();
  const inputDollarsRef = React.createRef();

  const handleDownPayChange = (e) => {
    const nextVal = parseUserStr(e.target.value, downPayNew);
    setDownPayForm(nextVal);
    setDownPayNew(nextVal);
  };

  const handleDownPayDollarsChange = (e) => {
    const nextVal = parseUserStr(e.target.value, downPayDollarsForm);
    setDownPayDollarsForm(nextVal);
    setDownPayNew((nextVal / cost) * 100);
  };

  const handleTextEnter = (e) => {
    if (e.key === 'Enter') {
      handleUserSubmit('downPay', downPayNew);
    }
  };

  const handleSliderChange = (e) => {
    const newDownPaySlider = parseUserStr(e.target.value, downPayNew);
    setDownPaySlider(newDownPaySlider);
    setDownPayNew(newDownPaySlider);
    setDownPayForm(newDownPaySlider);
    setDownPayDollarsForm(cost * (newDownPaySlider / 100));
  };

  const handleInputDollarsDeselect = () => {
    setInputDollarsSelected(false);
    handleUserSubmit('downPay', downPayNew);
  };

  const handleInputDollarsSelect = () => {
    setInputDollarsSelected(true);
    inputDollarsRef.current.focus();
  };

  const handleInputDeselect = () => {
    setInputSelected(false);
    handleUserSubmit('downPay', downPayNew);
  };

  const handleInputSelect = () => {
    setInputSelected(true);
    inputRef.current.focus();
  };

  return (
    <InputContainer>
      <span>Down Payment</span>
      <SplitContainer>
        <SubContainer width={70}>
          <Box
            onBlur={handleInputDollarsDeselect}
            onFocus={handleInputDollarsSelect}
          >
            <Input
              type="text"
              id="downPayDollars"
              ref={inputDollarsRef}
              name="downPayDollars"
              value={inputDollarsSelected ? downPayDollarsForm : formatNum(downPayDollarsForm)}
              onChange={handleDownPayDollarsChange}
              onKeyDown={handleTextEnter}
            />
          </Box>
        </SubContainer>
        <SubContainer width={30}>
          <Box
            onBlur={handleInputDeselect}
            onFocus={handleInputSelect}
          >
            <Input
              type="text"
              id="downPay"
              ref={inputRef}
              name="downPay"
              value={inputSelected ? downPayForm : `${downPayForm}%`}
              onChange={handleDownPayChange}
              onKeyDown={handleTextEnter}
            />
          </Box>
        </SubContainer>
      </SplitContainer>
      <Slider
        type="range"
        id="downPaySlider"
        name="downPaySlider"
        min={0}
        max={100}
        value={downPaySlider}
        step={1}
        onChange={handleSliderChange}
        onMouseUp={() => handleUserSubmit('downPay', downPayNew)}
      />
    </InputContainer>
  );
};

export default DownPayment;
