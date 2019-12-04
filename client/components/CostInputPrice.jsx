import React from 'react';

const Price = (props) => {
  const { cost, handleCostSubmit } = props;
  const [costForm, setCost] = React.useState(cost);


  const handleChange = (e) => {
    setCost(e.target.value);
  };

  return (
    <form onSubmit={handleCostSubmit}>
      <label htmlFor="cost">Home Price</label>
      <br />
      <input
        type="text"
        id="cost"
        name="cost"
        value={costForm}
        onChange={handleChange}
      />
    </form>
  );
};

export default Price;
