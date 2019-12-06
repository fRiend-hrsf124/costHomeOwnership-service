import React from 'react';
import { InputContainer, Box, Input } from '../styles.jsx';
import { formatLoanType } from '../../utils';

const LoanType = (props) => {
  const { loanTerm, loanType, handleUserSubmit } = props;
  const [selectVal, setSelectVal] = React.useState(formatLoanType(loanTerm, loanType));

  return (
    <InputContainer>
      <span>Loan Type</span>
      <Box>
        <Input
          as="select"
          id="loan"
          value={selectVal}
          onChange={handleUserSubmit}
        />
      </Box>
    </InputContainer>
  );
};

export default LoanType;
