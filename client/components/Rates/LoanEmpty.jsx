/* eslint-disable import/extensions */
import React, { memo } from 'react';
import {
  Label,
} from '../styles.jsx';

const LoanEmpty = () => (
  <>
    <br />
    <br />
    <Label
      weight="600"
    >
      No Mortgage offers found.
    </Label>
    <br />
    <br />
    <Label>
      Try a different loan type or down payment.
    </Label>
    <br />
    <br />
    <br />
  </>
);

export default memo(LoanEmpty);
