/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { FullContainerExpandable, HalfContainer } from './styles.jsx';
import RatesHeader from './Rates/RatesHeader.jsx';
import LoanType from './Rates/LoanType.jsx';
import CreditScore from './Rates/CreditScore.jsx';
import Loans from './Rates/Loans.jsx';

const Rates = (props) => {
  const {
    handleUserSubmit,
    loanType,
    loanTypes,
    credit,
    cost,
    rates,
    downPay,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <RatesHeader
        handleHeaderClick={handleHeaderClick}
        isExpanded={isExpanded}
        loanType={loanType}
        credit={credit}
      />
      <FullContainerExpandable isExpanded={isExpanded}>
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
      </FullContainerExpandable>
      <Loans
        cost={cost}
        rates={rates}
        downPay={downPay}
      />
      {/* view all rates footer */}
    </div>
  );
};

export default Rates;
