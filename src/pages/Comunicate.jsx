// pages/Comunicate.jsx
import React from 'react';
import '../styles/pagescss/Comunicate.css';
import ContactByHazelCC from '../components/ContactByHazelCC';
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Comunicate() {
  return (
    <div>
      <ContactByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  );
}

export default Comunicate;
