import React from 'react'
import '../styles/pagescss/Perfil.css'
import ProfileByHazelCC from '../components/ProfileByHazelCC'
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Perfil() {
  return (
    <div>
      <ProfileByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  )
}

export default Perfil