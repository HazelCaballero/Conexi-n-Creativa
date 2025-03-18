import React from 'react'
import '../styles/pagescss/Fundadora.css'
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';
import FoundressByHazelCC from '../components/FoundressByHazelCC'


function Fundadora() {
  return (
    <div>
      <FoundressByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  )
}

export default Fundadora