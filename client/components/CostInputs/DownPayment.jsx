/* eslint-disable import/extensions */
import React from 'react';
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
  const { cost, downPay, handleDownPaySubmit } = props;

  const [downPayNew, setDownPayNew] = React.useState(downPay);
  const [downPayForm, setDownPayForm] = React.useState(downPay);
  const [downPayDollarsForm, setDownPayDollarsForm] = React.useState(cost * (downPay / 100));
  const [downPaySlider, setDownPaySlider] = React.useState(downPay);
  const [inputSelected, setInputSelected] = React.useState(false);
  const [inputDollarsSelected, setInputDollarsSelected] = React.useState(false);

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
      handleDownPaySubmit(downPayNew);
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
    handleDownPaySubmit(downPayNew);
  };

  const handleInputDollarsSelect = () => {
    setInputDollarsSelected(true);
    inputDollarsRef.current.focus();
  };

  const handleInputDeselect = () => {
    setInputSelected(false);
    handleDownPaySubmit(downPayNew);
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
        onMouseUp={() => handleDownPaySubmit(downPayNew)}
      />
    </InputContainer>
  );
};

export default DownPayment;
