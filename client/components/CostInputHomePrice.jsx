import React from 'react';

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
