import React from 'react'
import { AppBar, Toolbar } from "@material-ui/core";

export default function Header(props) {
  

  return (
    <>
      <AppBar style={{"background-color": '#003991'}}>
        <Toolbar style={{background: '#003991'}}><h2>NFT Minter</h2></Toolbar>
      </AppBar>
    </>
  )
}
