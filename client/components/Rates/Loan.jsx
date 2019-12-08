/* eslint-disable import/extensions */
import React from 'react';
import {
  LoanCard,
  LoanGridContainer,
  LoanGrid,
  LoanGridItem,
  LoanGridLabel,
  LoanGridLogo,
  Label,
} from '../styles.jsx';
import {
  formatNum, getDate, getFakeRate, getPayment,
} from '../../utils';

const Loan = ({
  rate,
  cost,
  downPay,
  insuranceRate,
  propertyTaxRate,
}) => (
  <LoanCard>
    <LoanGridContainer>
      <LoanGrid>
        <LoanGridItem>
          <Label
            as="div"
          >
            {formatNum(getPayment(cost, rate, downPay, insuranceRate, propertyTaxRate))}
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
            {getFakeRate(rate)}
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
  </LoanCard>
);

export default Loan;
