import React from 'react';

const DownPayment = (props) => {
  const { cost, downPay, handleDownPaySubmit } = props;

  const [downPayNew, setDownPayNew] = React.useState(downPay);

  const [downPayForm, setDownPayForm] = React.useState(downPay);

  const [downPayDollarsForm, setDownPayDollarsForm] = React.useState(cost * (downPay / 100));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDownPaySubmit(downPayNew);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="downPayDollars">Down Payment</label>
        <br />
        <input
          type="text"
          id="downPayDollars"
          name="downPayDollars"
          value={downPayDollarsForm}
          onChange={handleDownPayDollarsChange}
          onBlur={handleSubmit}
        />
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="downPay"
          name="downPay"
          value={downPayForm}
          onChange={handleDownPayChange}
          onBlur={handleSubmit}
        />
      </form>
    </div>
  );
};

export default DownPayment;
