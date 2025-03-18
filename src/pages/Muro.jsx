import React from "react";
import '../styles/pagescss/Muro.css'
import WallByHazelCC from '../components/WallByHazelCC'
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';

function Muro() {

  return (
    <div>
      <WallByHazelCC /> <br />
      <HeaderByHazelCC /> <br />
      <AsideByHazelCC /> <br />
      <FooterByHazelCC />
    </div>
  );
}

export default Muro;
