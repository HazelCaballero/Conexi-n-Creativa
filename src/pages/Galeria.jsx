import React from 'react'
import '../styles/pagescss/Galeria.css'
import GaleryByHazelCC from '../components/GaleryByHazelCC';
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Galeria() {
  return (
    <div>
      <GaleryByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  )
}

export default Galeria