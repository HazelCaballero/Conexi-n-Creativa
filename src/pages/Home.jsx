import React from 'react'
import '../styles/pagescss/Home.css'
import HomeByHazelCC from '../components/HomeByHazelCC';
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Home() {
  return (
    <div>
      <HomeByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  )
}

export default Home