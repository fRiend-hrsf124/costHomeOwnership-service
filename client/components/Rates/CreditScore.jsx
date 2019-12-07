/* eslint-disable import/extensions */
import React from 'react';
import {
  InputContainer, Box, Input, Option,
} from '../styles.jsx';
import { createCreditDisplayRange, getCreditFromDisplayRange } from '../../utils';

const CreditScore = (props) => {
  const { credit, handleUserSubmit } = props;

  const credits = [660, 680, 700, 720, 740];

  return (
    <InputContainer>
      <span>Credit Score</span>
      <Box>
        <Input
          as="select"
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
        </Input>
      </Box>
    </InputContainer>
  );
};

export default CreditScore;
