import React from 'react'
import { Link } from 'react-router-dom';

function DataTable() {
    return (
    <>
        <div className="navbar-link">
            <nav className="navbar navbar-dark bg-primary" id="mainNav">
                <div className="navbar-brand">
                    <div className="nav-link" id="navbarNavAltMarkup">
                        <div className="navbar-title">
                            <a className="nav-link active" aria-current="page" href='/DataTable'> Data Tables </a>
                            <a className="nav-link active" href="/profile">Profile</a>
                            <a className="nav-link active" href="nftlist">Browse</a>
                            <a className="nav-link active" href="/GoogleApp">Sign Out</a>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
        </div>

        <div className="container" style={{ minWidth: 650 }}>
            <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 0, marginBottom: 10 }}> DATA </h2>
                <div style={{width:350, height:350, margin:20, padding:20, textAlign:'center'}}>
                    <a href="/cryptoSlamDay"> <button src="https://d1nbz8un0xypwm.cloudfront.net/img/cs_logo_black.svg" alt="CryptoSlam logo"> </button></a>
                    <a href="/RapidAPICollectionsDay"> <button src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png" alt="Opensea Logo"> </button></a>
                </div>
            </div>
        </>
	)
}
  
  export default DataTable