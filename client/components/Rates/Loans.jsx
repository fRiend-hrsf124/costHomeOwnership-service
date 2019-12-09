/* eslint-disable import/extensions */
import React, { useRef, useState, useEffect } from 'react';
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
import LoanEmpty from './LoanEmpty.jsx';

const Loans = (props) => {
  const loansNode = useRef(null);
  const {
    cost,
    rates,
    downPay,
  } = props;
  const ratesCount = rates.length;

  const [rateIdx, setRateIdx] = useState(0);
  useEffect(() => {
    setRateIdx(0);
    // loansNode.current.scrollTo(0, 0);
  }, [rates]);

  const handleScrollClick = (dir) => {
    if (dir === 'left') {
      loansNode.current.scrollBy(-340, 0);

      const nextRateIdx = rateIdx - 2 < 0 ? 0 : rateIdx - 2;
      setRateIdx(nextRateIdx);
    } else {
      loansNode.current.scrollBy(340, 0);

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
            ref={loansNode}
          >
            {ratesCount > 0
              ? (rates.map((rate) => (
                <Loan key={rate.rateId} rate={rate} cost={cost} downPay={downPay} />
              )))
              : <LoanEmpty />}
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
