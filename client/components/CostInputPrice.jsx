import React from 'react';

const Price = (props) => {
  const { cost, handleCostSubmit } = props;
  const [costForm, setCost] = React.useState(cost);


  const handleChange = (e) => {
    setCost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCostSubmit(costForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cost">Home Price</label>
      <br />
      <input
        type="text"
        id="cost"
        name="cost"
        value={costForm}
        onChange={handleChange}
        onBlur={handleSubmit}
      />
    </form>
  );
};

export default Price;
