/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer } from './styles.jsx';
import LoanType from './Rates/LoanType.jsx';
import CreditScore from './Rates/CreditScore.jsx';
import Loans from './Rates/Loans.jsx';

const Rates = (props) => {
  const {
    handleUserSubmit, loanType, loanTypes, credit, cost, rates,
  } = props;

  return (
    <div>
      {/* Today's rates toggle area */}
      <FullContainer>
        <HalfContainer>
          <LoanType
            loanType={loanType}
            loanTypes={loanTypes}
            handleUserSubmit={handleUserSubmit}
          />
        </HalfContainer>
        <HalfContainer>
          <CreditScore
            credit={credit}
            handleUserSubmit={handleUserSubmit}
          />
        </HalfContainer>
      </FullContainer>
      <Loans
        cost={cost}
        rates={rates}
      />
      {/* view all rates footer */}
    </div>
  );
};

export default Rates;
