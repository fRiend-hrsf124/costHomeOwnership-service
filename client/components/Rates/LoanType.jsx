/* eslint-disable import/extensions */
import React from 'react';
import {
  InputContainer, Box, Input, Option,
} from '../styles.jsx';

const LoanType = (props) => {
  const {
    loanType, loanTypes, handleUserSubmit,
  } = props;

  return (
    <InputContainer>
      <span>Loan Type</span>
      <Box>
        <Input
          as="select"
          id="loan"
          value={loanType}
          onChange={(e) => handleUserSubmit('loanType', e.target.value)}
        >
          {
            loanTypes.map((lT) => (
              <Option key={lT} value={lT}>{lT}</Option>
            ))
          }
          <Option value="noRates">noRates</Option>
        </Input>
      </Box>
    </InputContainer>
  );
};

export default LoanType;
