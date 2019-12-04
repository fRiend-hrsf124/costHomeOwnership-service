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
    // eslint-disable-next-line no-unused-vars
    const { localCost, localDownPay } = this.state;
    // const downPayCost = localCost * (localDownPay / 100);
    return (
      <div>
        <span>
          <form onSubmit={this.handleCostSubmit}>
            <label htmlFor="cost">Home Price</label>
            <br />
            <input
              type="text"
              id="cost"
              value={localCost}
              onChange={this.handleCostChange}
            />
          </form>
          {/* <input id="downPayCost">{downPayCost}</input> */}
          {/* <input id="downPay">{downPay}</input> */}
        </span>
      </div>
    );
  }
}

export default CostInputs;
