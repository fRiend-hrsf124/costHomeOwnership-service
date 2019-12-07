/* eslint-disable import/extensions */
import React from 'react';
import { InputContainer, Box, Input } from '../styles.jsx';
import { formatLoan, unFormatLoan } from '../../utils';

const LoanType = (props) => {
  const {
    loanType, loanTypes, handleUserSubmit,
  } = props;

  const handleChange = (e) => {
    // const loan = unFormatLoan(e.target.value);
    const loan = e.target.value;
    handleUserSubmit('loanType', loan);
  };

  return (
    <InputContainer>
      <span>Loan Type</span>
      <Box>
        <Input
          as="select"
          id="loan"
          value={loanType}
          onChange={handleChange}
        >
          {
            loanTypes.map((lT) => (
              <option key={lT} value={lT}>{lT}</option>
            ))
          }
          <option value="noRates">noRates</option>
          <option value="30 Year Fixed">30 Year Fixed (static)</option>
          <option value={loanType}>{`${loanType}(dynamic)`}</option>
        </Input>
      </Box>
    </InputContainer>
  );
};

export default LoanType;
