import React from 'react';
// import formatNum from '../util.currency';

const DownPayment = (props) => {
  const { cost, downPay, handleDownPaySubmit } = props;

  const [downPayNew, setDownPayNew] = React.useState(downPay);
  const [downPayForm, setDownPayForm] = React.useState(downPay);
  const [downPayDollarsForm, setDownPayDollarsForm] = React.useState(cost * (downPay / 100));
  const [downPaySlider, setDownPaySlider] = React.useState(downPay);

  const handleDownPayChange = (e) => {
    const nextVal = e.target.value;
    setDownPayForm(nextVal);
    setDownPayNew(nextVal);
  };

  const handleDownPayDollarsChange = (e) => {
    const nextVal = e.target.value;
    setDownPayDollarsForm(nextVal);
    setDownPayNew((nextVal / cost) * 100);
  };

  const handleTextEnter = (e) => {
    if (e.key === 'Enter') {
      handleDownPaySubmit(downPayNew);
    }
  };

  const handleSliderChange = (e) => {
    const newDownPaySlider = e.target.value;
    setDownPaySlider(newDownPaySlider);
    setDownPayNew(newDownPaySlider);
    setDownPayForm(newDownPaySlider);
    setDownPayDollarsForm(cost * (newDownPaySlider / 100));
  };

  const handleSubmit = () => {
    handleDownPaySubmit(downPayNew);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="downPayDollars">Down Payment</label>
      <br />
      <input
        type="text"
        id="downPayDollars"
        name="downPayDollars"
        value={downPayDollarsForm}
        onChange={handleDownPayDollarsChange}
        onBlur={handleSubmit}
        onKeyDown={handleTextEnter}
      />
      <input
        type="text"
        id="downPay"
        name="downPay"
        value={downPayForm}
        onChange={handleDownPayChange}
        onBlur={handleSubmit}
        onKeyDown={handleTextEnter}
      />
      <br />
      <input
        type="range"
        id="downPaySlider"
        name="downPaySlider"
        min={0}
        max={100}
        value={downPaySlider}
        step={1}
        onChange={handleSliderChange}
        onMouseUp={handleSubmit}
      />
    </form>
  );
};

export default DownPayment;
