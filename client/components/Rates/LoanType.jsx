/* eslint-disable import/extensions */
import React from 'react';
import {
  InputContainer, Box, Select, Option, Label,
} from '../styles.jsx';
import InfoFlyout from '../InfoFlyout.jsx';

const LoanType = (props) => {
  const {
    loanType, loanTypes, handleUserSubmit,
  } = props;

  return (
    <InputContainer>
      <Label>
        Loan Type
        <InfoFlyout />
      </Label>
      <Box>
        <Select
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
        </Select>
      </Box>
    </InputContainer>
  );
};

export default LoanType;
