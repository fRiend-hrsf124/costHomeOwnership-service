import React from 'react';

const HomePrice = (props) => {
  const { cost, handleCostSubmit, redfinCostEstimate } = props;
  const [costForm, setCost] = React.useState(cost);
  const [costSlider, setCostSlider] = React.useState(cost);


  const handleTextChange = (e) => {
    setCost(e.target.value);
  };

  const handleSliderChange = (e) => {
    const newCost = e.target.value;
    setCostSlider(newCost);
    setCost(newCost);
  };

  const handleSliderRelease = () => {
    handleCostSubmit(costForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCostSubmit(costForm);
  };

  return (
    // use onkeydown instead of multiple forms for enter to submit
    // https://stackoverflow.com/questions/33211672/how-to-submit-a-form-using-enter-key-in-react-js/33212911
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cost">Home Price</label>
        <br />
        <input
          type="text"
          id="cost"
          name="cost"
          value={costForm}
          onChange={handleTextChange}
          onBlur={handleSubmit}
        />
      </form>
      <form>
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
          onMouseUp={handleSliderRelease}
        />
      </form>
    </div>
  );
};

export default HomePrice;
