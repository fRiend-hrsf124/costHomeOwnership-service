/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer } from './styles.jsx';
import LoanType from './Rates/LoanType.jsx';
import CreditScore from './Rates/CreditScore.jsx';

const Rates = (props) => {
  const {} = props;
  return (
    <div>
      <FullContainer>
        <HalfContainer>
          <LoanType

          />
        </HalfContainer>
        <HalfContainer>
          <CreditScore

          />
        </HalfContainer>
      </FullContainer>
      {/* view all rates footer */}
    </div>
  );
};

export default Rates;
