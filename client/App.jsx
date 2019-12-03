/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {
        propertyId: props.id,
        zipCode: '',
        redfinCostEstimate: null,
        insuranceRate: null,
        propertyTaxRate: null,
      },
      rates: [],
    };

    this.getPropertyData = this.getPropertyData.bind(this);
  }

  componentDidMount() {
    const { property } = this.state;
    this.getPropertyData(property.propertyId);
  }

  async getPropertyData(id) {
    try {
      const res = await axios.get(`/api/costHomeOwnership/properties/${id}`);
      const property = await res.data[0];
      this.setState({ property });
      console.log(property);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { property, rates } = this.state;
    return (
      <div>hi from react</div>
    );
  }
}

export default App;
