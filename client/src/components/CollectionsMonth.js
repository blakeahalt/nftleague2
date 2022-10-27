import React from 'react'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'react-grid-system';
import { left } from '@popperjs/core';
import SalesMonth from './SalesMonth'
import SalesWeek from './SalesWeek'
import SalesDay from './SalesDay'
import { Link, useNavigate } from 'react-router-dom';
import { GiBlackBar } from 'react-icons/gi';



function UserList() {

  const [rowDataNft, setRowDataNft] = useState([]);
  const [rowDataSalesMonth, setRowDataSalesMonth] = useState([]);
  const [rowDataSales7, setRowDataSales7] = useState([]);
  const [rowDataSales1, setRowDataSales1] = useState([]);
  const [allData, setAllData] = useState([]);
  const [topDay, setTopDay] = useState(false)
  const [topWeek, setTopWeek] = useState(true)
  const [topMonth, setTopMonth] = useState(false)

  const gridRef = useRef();

  // setTopDay(false)
  // setTopWeek(true)
  // setTopMonth(false)
  // const options = {
  //     method: 'GET',
  //     headers: {
  //     'X-BLOBR-KEY': '3umu1UZgYigFYvNRCr9v5ZvbhWt8cCit'
  //     },
  // };

  const options = {
    method: 'GET',
    // url: 'https://top-nft-sales.p.rapidapi.com/sales/30d',
    headers: {
      'X-RapidAPI-Key': '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
      'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch('https://top-nft-sales.p.rapidapi.com/collections/30d', options)
      .then(response => response.json())
      .then(rowDataSalesMonth => setRowDataSalesMonth(rowDataSalesMonth))
  }, [])



  const collectionDataArr = []

  return (
    <>
        <div className="navbar-link">
            <nav className="navbar navbar-dark bg-primary" id="mainNav">
                <div className="navbar-brand">
                    <div className="nav-link" id="navbarNavAltMarkup">
                        <div className="navbar-title">
                            <a className="nav-link active" aria-current="page" href='/grid'>Top Sales</a>
                            <a className="nav-link active" aria-current="page" href='/collectionsday'>Top 100</a>
                            <a class="nav-link active" href="/NFTList">Profile</a>
                            <a className="nav-link active" href="grid">Browse</a>
                            <a className="nav-link active" href="/GoogleApp">Sign Out</a>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
        </div>

        <div className="container" style={{ maxWidth: 1200 }}>
            <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 0, marginBottom: 0 }}>
                Top 100 Collections
            </h2>
            <div style={{ position: 'relative', textAlign: 'center', marginTop: -10, marginBottom: 20, color: '#000000'}}>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5}} ><Link to='/CollectionsMonth' style={{color:'black'}}>30DAY</Link></button>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5 }}><Link to='/CollectionsWeek' style={{color:'black'}}>7DAY</Link></button>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5 }}><Link to='/CollectionsDay' style={{color:'black'}}>1DAY</Link></button>
            </div>
            <Row style={{ height: '75px', fontSize: 25, marginLeft: 10, flexWrap: 'nowrap', textAlign: "left", marginTop: 20 }} >
      <Col style={{ minWidth: 300, maxWidth: 200, textAlign: "left" }} >NFT</Col>
      <Col style={{ minWidth: 105, maxWidth: 200, marginLeft:-10}}>Trades</Col>
      <Col style={{ maxWidth: 250, marginLeft:10, marginRight:15 }}>Volume</Col>
    </Row>

    {rowDataSalesMonth.map(row => {
      return (
        <Row align="start" style={{ height: '50px', marginLeft: 10}} key={row.id} >
          <Col style={{ minWidth: 300, textAlign: "left" }}>
            <a href={row.collection_url} target="_blank" rel="noreferrer">
              {row.collection} </a></Col>
          <Col style={{ maxWidth:165, textAlign: "left" }}>{row.trades}</Col>
          <Col style={{ maxWidth: 165, textAlign: "left" }}>{row.volume}</Col>
        </Row>
      );
    })}

  </div>
</>
)
}

export default UserList