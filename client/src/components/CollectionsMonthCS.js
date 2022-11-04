import React from 'react'
import { useState, useEffect } from 'react';
import CryptoSlamRows from './CryptoSlamRows';
import { Link } from 'react-router-dom';
import Pagination from './Pagination2';


function UserList() {

  const [rowDataSales, setRowDataSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1) 
  const [postsPerPage, setPostsPerPage] = useState(20)            

  const CSoptions = {
      method: 'GET',
      headers: {
        'X-BLOBR-KEY': 'e6CjQuVjiVsugMjtPuONz3C9EkAzXpFj'
      },
    };

  useEffect(() => {
    fetch('https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100?timeRange=month', CSoptions)
      .then(response => response.json())
      .then(rowDataSales => setRowDataSales(rowDataSales.data))
    },[])
    // console.log("rowDataSales:", rowDataSales);

// //Output: array of urls to each collection
	const endpoints = [] 
	const url_string = "https://cryptoslam.io/"
    for (const x of rowDataSales) {
        const y = url_string.concat(`${x.collectionId}`)
        // const z = y.concat("/stats")
        endpoints.push(y)
    }
	// console.log("endpoints:",endpoints);

// Merge object arrays allows mapping from just one array: preserves row structure below (both.map{...})
  const indexArray = Array(100).fill(1).map((n, i) => n + i)
  const quotes = rowDataSales.map(x=>({   
    ETHsales:
        x.quote.ETH?
            x.quote.ETH.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" Ξ":
        x.quote.Flow?
            x.quote.Flow.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" Flow":
        x.quote.SOL?
            x.quote.SOL.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" SOL":
        x.quote.WAX?
            x.quote.WAX.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" WAX":
        x.quote.XTZ?
            x.quote.XTZ.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" XTZ":
        "N/D",
    USDsales:x.quote.USD?"$"+x.quote.USD.salesVolume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):null
        }))
    
  const both = rowDataSales.map((item, i) =>
   Object.assign({}, item, {collection_url:endpoints[i]}, {index:indexArray[i]}, {quotes:quotes[i]}, {endpoint:endpoints[i]}));
    // console.log("both", both);

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = both.slice(firstPostIndex, lastPostIndex)

  return (
    <>
        <nav className="navbar navbar-dark bg-primary" id="mainNav">
            <div className="navbar-title">
                <a className="nav-link active" aria-current="page" href='/salesweek'>Top Sales</a>
                <a className="nav-link active" aria-current="page" href='/collectionsday'>Top Collections</a>
                <a className="nav-link active" href="/profile">Profile</a>
                <a className="nav-link active" href="nftlist">Browse</a>
                <a className="nav-link active" href="/GoogleApp">Sign Out</a>
            </div>
        </nav>
        <br />
        <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 20, marginBottom: 30 }}> CRYPTO SLAM: Top of the Month 
                {/* <div style={{ position: 'relative', marginTop: -10, marginBottom: 20}}> */}
                <Link to='/CryptoSlamDay' style={{color:'black'}}>
                    <button className="button-days" style={{marginLeft:20, marginBottom:0, padding:5 }}> 1DAY </button></Link>
                <Link to='/CryptoSlamWeek' style={{color:'black'}}>
                    <button className="button-days"> 7DAY </button></Link>
                <Link to='/CryptoSlamMonth' style={{color:'black'}}>
                    <button className="button-days" style={{ backgroundColor:'gray', color:'darkgray' }}> 30DAY </button></Link>
                {/* </div> */}
            </h2>
        
            <CryptoSlamRows both={currentPosts} />
            <Pagination totalPosts={both.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />

        </div>

	  </>
  )
}

export default UserList