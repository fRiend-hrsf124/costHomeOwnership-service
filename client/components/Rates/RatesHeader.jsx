/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer, Label } from '../styles.jsx';
import { createCreditDisplayRange } from '../../utils';

const RatesHeader = (props) => {
  const { setIsExpanded, loanType, credit } = props;

  return (
    <FullContainer>
      <HalfContainer>
        <Label>Today&apos;s rates for this home</Label>
      </HalfContainer>
      <HalfContainer>
        <Label>{`${loanType}, ${createCreditDisplayRange(credit)}`}</Label>
      </HalfContainer>
    </FullContainer>
  );
};

export default RatesHeader;
