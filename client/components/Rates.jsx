/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer } from './styles.jsx';
import LoanType from './Rates/LoanType.jsx';
import CreditScore from './Rates/CreditScore.jsx';

const Rates = (props) => {
  const {
    loanType, handleTypeSubmit, credit, handleCreditSubmit,
  } = props;

  return (
    <div>
      <FullContainer>
        <HalfContainer>
          {/* <LoanType
            loanType={loanType}
            handleTypeSubmit={handleTypeSubmit}
          /> */}
        </HalfContainer>
        <HalfContainer>
          {/* <CreditScore
            credit={credit}
            handleCreditSubmit={handleCreditSubmit}
          /> */}
        </HalfContainer>
      </FullContainer>
      {/* view all rates footer */}
    </div>
  );
};

export default Rates;
