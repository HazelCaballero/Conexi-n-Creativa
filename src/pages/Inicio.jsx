import React from 'react'
import '../styles/pagescss/Inicio.css'
import LoginByHazelCC from '../components/LoginByHazelCC';
import SignByHazelCC from '../components/SignByHazelCC'
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Inicio() {
  return (
    <div>

      <LoginByHazelCC />

      <SignByHazelCC />

      <br />

      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />

    </div>
  )
}

export default Inicio