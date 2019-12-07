import styled from 'styled-components';

const FullContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 24px;
`;

const HalfContainer = styled.div`
  width: 49%;
  flex-basis: 49%;
  margin-top: 10px;
`;

const InputContainer = styled.span`
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
  box-sizing: border-box;
  position: relative;
`;

const Label = styled.span`
  font: 400 11px system-ui;
  font-size: 1rem;
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

const Option = styled.option`

`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin-top: 26px;
  margin-bottom: 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1.5px;
    cursor: pointer;
    box-shadow: 0.1px 0.1px 0px #000000, 0px 0px 0.1px #0d0d0d;
    background: #2cd9ff;
    border-radius: 1.3px;
    border: 0.1px solid #010101;
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

export {
  FullContainer, HalfContainer, InputContainer, Box, Label, Input, Option, Slider,
};
