/* eslint-disable import/extensions */
import React from 'react';
import {
  FullContainer, HalfContainer, Label, LinkDiv, Arrow,
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
      <HalfContainer align="right">
        <LinkDiv as="span">
          {`${loanType}, ${createCreditDisplayRange(credit)}`}
        </LinkDiv>
        <Arrow>
          <svg viewBox="0 0 24 24">
            {/* below pattern pulled from redfin */}
            <path d="M16.116 14.53L12 10.414 7.884 14.53a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354l5.353-5.353a.25.25 0 0 1 .354 0l5.353 5.353a.25.25 0 0 1 0 .354l-1.06 1.06a.25.25 0 0 1-.354 0" fillRule="evenodd" />
          </svg>
        </Arrow>
      </HalfContainer>
    </FullContainer>
  );
};

export default RatesHeader;
