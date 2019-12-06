/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CostInputs from './components/CostInputs.jsx';

const Container = styled.div`
  max-width: 667px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: props.id,
      zipCode: '',
      redfinCostEstimate: null,
      insuranceRate: null,
      propertyTaxRate: null,
      cost: 10,
      term: 30,
      type: 'Fixed',
      downPay: 20,
      credit: 740,
      origYear: 2019,
      rates: [],
    };

    this.handleCostSubmit = this.handleCostSubmit.bind(this);
    this.handleDownPaySubmit = this.handleDownPaySubmit.bind(this);
  }

  async componentDidMount() {
    const { propertyId } = this.state;
    await this.getPropertyData(propertyId);
    await this.getRates();
  }

  async getPropertyData(id) {
    try {
      const res = await axios.get(`/api/costHomeOwnership/properties?id=${id}`);
      const {
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
      } = await res.data[0];

      this.setState({
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
        cost: redfinCostEstimate,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getRates() {
    const {
      cost, zipCode, term, type, downPay, credit, origYear,
    } = this.state;

    const queries = {
      cost, zipCode, term, type, downPay, credit, origYear,
    };

    const queryString = Object.keys(queries)
      .map((k) => `${k}=${queries[k]}`)
      .join('&');

    try {
      const res = await axios.get(`/api/costHomeOwnership/rates?${queryString}`);
      const rates = await res.data;
      this.setState({ rates });
    } catch (err) {
      console.log(err);
    }
  }

  handleCostSubmit(cost) {
    this.setState({ cost });
    this.getRates();
  }

  handleDownPaySubmit(downPay) {
    this.setState({ downPay });
    this.getRates();
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      rates,
      // eslint-disable-next-line no-unused-vars
      insuranceRate,
      // eslint-disable-next-line no-unused-vars
      propertyTaxRate,
      cost,
      downPay,
      redfinCostEstimate,
    } = this.state;
    return (
      <Container>
        <CostInputs
          key={cost * downPay}
          cost={cost}
          handleCostSubmit={this.handleCostSubmit}
          downPay={downPay}
          handleDownPaySubmit={this.handleDownPaySubmit}
          redfinCostEstimate={redfinCostEstimate}
        />
      </Container>
    );
  }
}

export default App;
