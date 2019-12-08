/* eslint-disable import/extensions */
import React from 'react';
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
import { formatNum } from '../../utils';
import LoanArrow from './LoanArrow.jsx';

const Loans = (props) => {
  const { cost, rates } = props;
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
                    </LoanGridLabel>
                  </LoanGridItem>
                </LoanGrid>
              </LoanGridContainer>
            </Loan>
          ))}
        </Carousel>
        <CarouselScrollButton
          isShown="true"
          left="false"
        >
          <CarouselScrollArrow>
            <LoanArrow />
          </CarouselScrollArrow>
        </CarouselScrollButton>
        <CarouselScrollButton
          isShown="true"
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
