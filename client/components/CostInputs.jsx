/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import HomePrice from './CostInputHomePrice.jsx';
import DownPayment from './CostInputDownPayment.jsx';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 24px;
`;

const SubContainer = styled.div`
  width: 49%;
  flex-basis: 49%;
  margin-top: 10px;
`;

const CostInputs = (props) => {
  const {
    cost,
    handleCostSubmit,
    downPay,
    handleDownPaySubmit,
    redfinCostEstimate,
  } = props;

  return (
    <Container>
      <SubContainer>
        <HomePrice
          cost={cost}
          handleCostSubmit={handleCostSubmit}
          redfinCostEstimate={redfinCostEstimate}
        />
      </SubContainer>
      <SubContainer>
        <DownPayment
          cost={cost}
          downPay={downPay}
          handleDownPaySubmit={handleDownPaySubmit}
        />
      </SubContainer>
    </Container>
  );
};

export default CostInputs;
