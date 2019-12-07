/* eslint-disable import/extensions */
import React from 'react';
import {
  FullContainer, HalfContainer, Label, Expander,
} from '../styles.jsx';
import { createCreditDisplayRange } from '../../utils';

const RatesHeader = (props) => {
  const { handleHeaderClick, loanType, credit } = props;

  return (
    <FullContainer
      paddingBottom="10px"
      clickable="true"
      onClick={handleHeaderClick}
    >
      <HalfContainer>
        <Label weight="600">Today&apos;s rates for this home</Label>
      </HalfContainer>
      <HalfContainer>
        <Expander>{`${loanType}, ${createCreditDisplayRange(credit)}`}</Expander>
      </HalfContainer>
    </FullContainer>
  );
};

export default RatesHeader;
