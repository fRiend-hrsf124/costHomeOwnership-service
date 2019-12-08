/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  FullContainer,
  CarouselContainer,
  CarouselItemsContainer,
  CarouselItems,
  CarouselScrollButton,
  CarouselScrollArrow,
} from '../styles.jsx';
import Loan from './Loan.jsx';
import LoanArrow from './LoanArrow.jsx';

const Loans = (props) => {
  const { cost, rates } = props;
  const ratesCount = rates.length;

  const [rateIdx, setRateIdx] = useState(0);
  const handleScrollClick = (dir) => {
    if (dir === 'left') {
      const nextRateIdx = rateIdx - 2 < 0 ? 0 : rateIdx - 2;
      setRateIdx(nextRateIdx);
    } else {
      const nextRateIdx = rateIdx + 2 > ratesCount - 1
        ? ratesCount - 1
        : rateIdx + 2;
      setRateIdx(nextRateIdx);
    }
  };
  return (
    <FullContainer>
      <CarouselContainer>
        <CarouselItemsContainer>
          <CarouselItems
            idx={rateIdx}
          >
            {ratesCount > 0
              ? <Loan rate={rates[rateIdx]} cost={cost} />
              : ''}
            {ratesCount > 1
              ? <Loan rate={rates[rateIdx]} cost={cost} />
              : ''}
            {/* TODO - animate scrolling */}
            {/* {rates.map((rate) => (
              <Loan key={rate.rateId} rate={rate} cost={cost} />
            ))} */}
          </CarouselItems>
        </CarouselItemsContainer>
        <CarouselScrollButton
          isShown={rateIdx > 0}
          left="true"
          onClick={() => handleScrollClick('left')}
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
        <CarouselScrollButton
          isShown={rateIdx + 1 < ratesCount}
          onClick={() => handleScrollClick('right')}
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
      </CarouselContainer>
    </FullContainer>
  );
};

export default Loans;
