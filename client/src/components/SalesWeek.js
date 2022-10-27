import React from 'react'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'react-grid-system';
import { left } from '@popperjs/core';
import SalesMonth from './SalesMonth'
import SalesWeek from './SalesWeek'
import SalesDay from './SalesDay'
import { Link, useNavigate } from 'react-router-dom';




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
        fetch('https://top-nft-sales.p.rapidapi.com/sales/30d', options)
            .then(response => response.json())
            .then(rowDataSalesMonth => setRowDataSalesMonth(rowDataSalesMonth))
    }, [])

    useEffect(() => {
        fetch('https://top-nft-sales.p.rapidapi.com/sales/7d', options)
            .then(response => response.json())
            .then(rowDataSales7 => setRowDataSales7(rowDataSales7))
    }, [])

    console.log("7Day:", rowDataSales7);

    useEffect(() => {
        fetch('https://top-nft-sales.p.rapidapi.com/sales/1d', options)
            .then(response => response.json())
            .then(rowDataSales1 => setRowDataSales1(rowDataSales1))
    }, [])
    // console.log("rowDataNft", rowDataNft);
    // console.log("rowDataCollection", rowDataCollection);

    const collectionDataArr = []

    // const collectionName = rowData.map(post => ({
    //     First: post.name.first, 
    //     Last: post.name.last, 
    //     City:post.location.city, 
    //     State:post.location.state, 
    // })
    // )
    // postDataArr.push(collectionName)


    // const collectionData = rowDataCollection.map(post => ({
    //     collection:post.collection, 
    //     collection_url:post.collection_url, 
    //     trades:post.trades, 
    //     volume: post.volume,
    //   })
    //   )
    //   collectionDataArr.push(collectionData)

    // const nftData = rowDataNft.map(post => ({
    //     collection:post.collection, 
    //     collection_url:post.collection_url, 
    //     date:post.date, 
    //     nft_name: post.nft_name,
    //     nft_url: post.nft_url,
    //     price: post.price,
    //   })
    //   )
    //   collectionDataArr.push(nftData,collectionData)
    //   console.log("collectionDataArr", collectionDataArr);
    //   console.log("collectionData", collectionData);
    //   console.log("nftData", nftData);

    //   const handleOneDay = () = {
    //     setTopDay(true);
    //     setTopWeek(false);
    //     setTopMonth(false);
    //   }

    // console.log("collectionName", collectionName);
    // console.log("postDataArr", postDataArr);


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
                <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 0, marginBottom: 10 }}>
                    Top NFT Sales
                </h2>
                <div style={{ position: 'relative', textAlign: 'center', marginTop: -10, marginBottom: 20, color: '#000000'}}>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5}} ><Link to='/SalesMonth' style={{color:'black'}}>30DAY</Link></button>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5 }}><Link to='/SalesWeek' style={{color:'black'}}>7DAY</Link></button>
                <button style={{ marginLeft: 10, fontSize: 15, padding: 5 }}><Link to='/SalesDay' style={{color:'black'}}>1DAY</Link></button>
            </div>
                <Row style={{ height: '75px', fontSize: 25, marginLeft: 10, flexWrap: 'nowrap', textAlign: "left", marginTop: 20, marginBottom:-20 }} >
          <Col style={{ minWidth: 200, maxWidth: 500, textAlign: "left" }} >NFT</Col>
          <Col style={{ minWidth: 105, maxWidth: 400 }}>Date</Col>
          <Col style={{ maxWidth: 200 }}>Price</Col>
        </Row>

        {rowDataSales7.map(row => {
         return (
          <Row align="start" style={{ height: '60px', marginLeft: 10 }} key={row.id} >
            <Col style={{ minWidth: 200, textAlign: "left" }}>
              <a href={row.nft_url} target="_blank">
                {row.nft_name} </a>
              <br />
              <a href={row.collection_url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }} >
                View Collection </a></Col>
            <Col style={{ maxWidth:165, textAlign: "left" }}>{row.date}</Col>
            <Col style={{ maxWidth: 165, textAlign: "left" }}>{row.price}</Col>
          </Row>
        );
      })}
  
    </div>
  </>
  )
  }
  
  export default UserList