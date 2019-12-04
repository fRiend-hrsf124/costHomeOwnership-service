/* eslint-disable react/prop-types */
import React from 'react';

class CostInputs extends React.Component {
  constructor(props) {
    super(props);
    const { cost, downPay } = this.props;

    this.state = {
      localCost: cost,
      localDownPay: downPay,
    };

    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCostSubmit = this.handleCostSubmit.bind(this);
  }

  handleCostChange(e) {
    this.setState({ localCost: e.target.value });
  }

  handleCostSubmit(e) {
    e.preventDefault();
    const { handleChange } = this.props;
    const { localCost } = this.state;
    handleChange({ cost: localCost });
  }

  render() {
    const { localCost, localDownPay } = this.state;
    // const downPayCost = localCost * (localDownPay / 100);
    return (
      <div>
        <span>
          <form onSubmit={this.handleCostSubmit}>
            <label>
            Home Price
              <input
                id="cost"
                value={localCost}
                onChange={this.handleCostChange}
              />
            </label>
          </form>
          {/* <input id="downPayCost">{downPayCost}</input> */}
          {/* <input id="downPay">{downPay}</input> */}
        </span>
      </div>
    );
  }
}

export default CostInputs;
