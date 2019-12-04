/* eslint-disable react/prop-types */
import React from 'react';

class CostInputs extends React.Component {
  constructor(props) {
    super(props);

    this.handleCostSubmit = this.handleCostSubmit.bind(this);
  }

  handleCostSubmit(e) {
    e.preventDefault();
    const { handleChange } = this.props;
    const cost = e.target.value;
    handleChange({ cost });
  }

  render() {
    const { cost, downPay } = this.props;
    const downPayCost = cost * (downPay / 100);
    return (
      <div>
        <span>
          <label>
            Home Price
            <input id="cost" value={cost} onChange={this.handleCostSubmit} />
          </label>
          {/* <input id="downPayCost">{downPayCost}</input> */}
          {/* <input id="downPay">{downPay}</input> */}
        </span>
      </div>
    );
  }
}

export default CostInputs;
