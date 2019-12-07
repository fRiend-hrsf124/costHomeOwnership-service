import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 667px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const FullContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || '24px'};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'inherit')};
`;

const FullContainerExpandable = styled(FullContainer)`
  display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
`;

const HalfContainer = styled.div`
  width: 49%;
  flex-basis: 49%;
  margin-top: 10px;
  text-align: ${({ align }) => align || 'inherit'};
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
  font: 11px system-ui;
  font-weight: ${({ weight }) => (weight || 400)};
  font-size: 1rem;
  vertical-align: baseline;
`;

const LinkDiv = styled.div`
  position: relative;
  top: -6px;
  font: 400 11px system-ui;
  font-size: 1rem;
  color: #0c82a5;
  vertical-align: baseline;
`;

const Arrow = styled.svg`
  position: relative;
  height: 24px;
  width: 24px;
  fill: #0c82a5;
  transition: all .15s ease-out 0s;
  transform: rotate(${({ isExpanded }) => (isExpanded ? 0 : 180)}deg);
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

const Select = styled.select`
  -webkit-appearance: none;
  font: 400 11px system-ui;
  font-size: 1rem;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background: transparent;
  /* display: none; */
  &:selected {
    /* background-color: #9feaff; */
  }
`;

const Option = styled.option`
  background-color: lightgray;
  color: whitesmoke;
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

const Carousel = styled.div`
  margin-top: 15px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 0!important;
    height: 0!important;
  }
`;

const Loan = styled.div`
  margin-right: 15px;
  position: relative;
  scroll-snap-align: start;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  padding-left: 0;
  padding-right: 8px;
  width: 325px;
  color: #333;
`;

export {
  AppContainer,
  FullContainer,
  FullContainerExpandable,
  HalfContainer,
  InputContainer,
  Box,
  Label,
  LinkDiv,
  Arrow,
  Input,
  Option,
  Slider,
  Select,
  Carousel,
  Loan,
};
