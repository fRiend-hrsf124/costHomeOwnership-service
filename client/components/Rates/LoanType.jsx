/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { InputContainer, Box, Input } from '../styles.jsx';
import { formatLoan, unFormatLoan } from '../../utils';

const LoanType = (props) => {
  const {
    loanTerm, loanType, loanTypes, handleUserSubmit,
  } = props;

  // const [selectVal, setSelectVal] = useState(formatLoan(loanTerm, loanType));
  // useEffect(() => {
  //   const loan = unFormatLoan(selectVal);
  //   handleUserSubmit('term', loan.term);
  // }, [selectVal]);

  const handleChange = (e) => {
    // setSelectVal(e.target.value);
    const loan = unFormatLoan(e.target.value);
    handleUserSubmit('loanType', loan.type);
  };

  return (
    <InputContainer>
      <span>Loan Type</span>
      <Box>
        <Input
          as="select"
          id="loan"
          // value={selectVal}
          value={formatLoan(loanTerm, loanType)}
          onChange={handleChange}
        >
          {
            loanTypes.map((lT) => (
              <option key={lT} value={lT}>{lT}</option>
            ))
          }
          <option value="noRates">noRates</option>
          <option value="Fixed">Fixed</option>
          <option value={formatLoan(loanTerm, loanType)}>{formatLoan(loanTerm, loanType)}</option>
        </Input>
      </Box>
    </InputContainer>
  );
};

export default LoanType;
