/* eslint-disable import/extensions */
import React from 'react';
import {
  InputContainer, Box, Select, Option, Label,
} from '../styles.jsx';
import { createCreditDisplayRange, getCreditFromDisplayRange } from '../../utils';

const CreditScore = (props) => {
  const { credit, handleUserSubmit } = props;

  const credits = [660, 680, 700, 720, 740];

  return (
    <InputContainer>
      <Label>Credit Score</Label>
      <Box>
        <Select
          id="credit"
          value={createCreditDisplayRange(credit)}
          onChange={(e) => handleUserSubmit('credit', getCreditFromDisplayRange(e.target.value))}
        >
          {
            credits.map((c) => (
              <Option
                key={c}
                value={createCreditDisplayRange(c)}
              >
                {createCreditDisplayRange(c)}
              </Option>
            ))
          }
        </Select>
      </Box>
    </InputContainer>
  );
};

export default CreditScore;
