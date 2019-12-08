/* eslint-disable import/extensions */
import React from 'react';
import {
  InfoBtnContainer, InfoBtn,
} from './styles.jsx';

const InfoFlyout = () => (
  <InfoBtnContainer>
    <InfoBtn viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0c6.617 0 12 5.383 12 12s-5.383 12-12 12S0 18.617 0 12 5.383 0 12 0zm1 16v-5.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25V12h1v4h-1v1.75c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V16h-1zm-.25-8h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25z"
      />
    </InfoBtn>
  </InfoBtnContainer>
);

export default InfoFlyout;
