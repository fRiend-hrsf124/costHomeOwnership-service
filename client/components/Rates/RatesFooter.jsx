/* eslint-disable import/extensions */
import React, { memo } from 'react';
import {
  FullContainer, HalfContainer, Label, LinkAway,
} from '../styles.jsx';
import InfoFlyout from '../InfoFlyout.jsx';

const RatesFooter = () => (
  <FullContainer>
    <HalfContainer>
      <LinkAway>
        View all rates
      </LinkAway>
    </HalfContainer>
    <HalfContainer align="right">
      <Label color="#767676">
        Ads
        <InfoFlyout />
      </Label>
    </HalfContainer>
  </FullContainer>
);

export default memo(RatesFooter);
