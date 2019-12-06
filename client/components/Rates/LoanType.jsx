/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { InputContainer, Box, Input } from '../styles.jsx';
import { formatLoanType } from '../../utils';

const LoanType = (props) => {
  const { loanTerm, loanType, handleUserSubmit } = props;
  const [selectVal, setSelectVal] = useState(formatLoanType(loanTerm, loanType));

  return (
    <InputContainer>
      <span>Loan Type</span>
      <Box>
        <Input
          as="select"
          id="loan"
          value={selectVal}
          onChange={(e) => {
            setSelectVal(e.target.value);
            handleUserSubmit('loanType', loanType);
          }}
        />
      </Box>
    </InputContainer>
  );
};

export default LoanType;
