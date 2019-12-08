/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  FullContainer,
  CarouselContainer,
  Carousel,
  CarouselScrollButton,
  CarouselScrollArrow,
  Loan,
  LoanGridContainer,
  LoanGrid,
  LoanGridItem,
  LoanGridLabel,
  LoanGridLogo,
  Label,
} from '../styles.jsx';
import { formatNum, getDate } from '../../utils';
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
        <Carousel>
          {rates.map((rate) => (
            <Loan key={rate.rateId}>
              <LoanGridContainer>
                <LoanGrid>
                  <LoanGridItem>
                    <Label
                      as="div"
                    >
                      {formatNum(cost)}
                    </Label>
                    <LoanGridLabel>
                      Monthly Payment
                    </LoanGridLabel>
                  </LoanGridItem>
                  <LoanGridItem>
                    <LoanGridLogo
                      alt="logo"
                      src={rate.lenderLogoUrl}
                    />
                    <LoanGridLabel>
                      NMLS#
                      {rate.lenderNmls}
                    </LoanGridLabel>
                  </LoanGridItem>
                  <LoanGridItem>
                    <Label
                      as="div"
                      weight="600"
                      fontSize=".925rem"
                    >
                      {rate.apr}
                      %
                    </Label>
                    <LoanGridLabel>
                      Interest Rate
                    </LoanGridLabel>
                  </LoanGridItem>
                  <LoanGridItem>
                    <Label
                      as="div"
                      fontSize=".925rem"
                    >
                      {rate.apr}
                      %
                    </Label>
                    <LoanGridLabel>
                      APR as of
                      {getDate()}
                    </LoanGridLabel>
                  </LoanGridItem>
                </LoanGrid>
              </LoanGridContainer>
            </Loan>
          ))}
        </Carousel>
        <CarouselScrollButton
          // isShown={rateIdx > 0}
          isShown="true"
          left="true"
          onClick={() => handleScrollClick('left')}
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
        <CarouselScrollButton
          // isShown={rateIdx + 1 < ratesCount}
          isShown="true"
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
