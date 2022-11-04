import React from 'react'
import { useState, useEffect } from 'react';
import RapidApiRows from './RapidApiRows';
import { Link } from 'react-router-dom';
import Pagination from './Pagination2';
import axios from 'axios'

function UserList() {

  const [rowDataSales, setRowDataSales] = useState([]);
  const [openSeaData, setopenSeaData] = useState([])
  const [currentPage, setCurrentPage] = useState(1) 
  const [postsPerPage, setPostsPerPage] = useState(20)      
  const [load, setLoad] = useState(false)     


  const OSoptions = {method: 'GET', headers: {accept: 'application/json'}};

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
      'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch('https://top-nft-sales.p.rapidapi.com/collections/30d', options)
      .then(response => response.json())
      .then(rowDataSales => setRowDataSales(rowDataSales))
    }, [])
    // console.log("rowDataSales:", rowDataSales);

// //Output: array of urls to each collection
const endpoints=[]
const OSlinks=[]
const NFTstatsLinks=[]
const IcyToolsLinks=[]
const RaribleLinks=[]
//ToDo:DappRadarLinks = req ternaries of different blockchain types+/collection/
//ToDo:EtherScanLinks: OS data - primary_asset_contracts[0].address
	const url_string = "https://www.nft-stats.com/collection/"
    const err_str = "https://www.nft-stats.com/collection/galaxy-oat-tjiiovcgdq"
    for (const x of rowDataSales) {
        if (x.collection_url !== err_str) {
            // x.collection_url.replace(err_str, "https://www.nft-stats.com/collection/galaxy-oat-poly")
        // } else {
            // const y = x.collection_url.replace(url_string, "https://api.opensea.io/api/v1/collection/")
            endpoints.push(x.collection_url.replace(url_string, "https://api.opensea.io/api/v1/collection/"))
            OSlinks.push(x.collection_url.replace(url_string, "https://opensea.io/collection/"))
            NFTstatsLinks.push(x.collection_url.replace(url_string, "https://www.nft-stats.com/collection/"))
            IcyToolsLinks.push(x.collection_url.replace(url_string, "https://icy.tools/collections/"))
            RaribleLinks.push(x.collection_url.replace(url_string, "https://rarible.com/"))
            // DappRadarLinks.push(x.collection_url.replace(url_string, "https://dappradar.com/ethereum/collectibles/"))
        }
        }
        
	// console.log("endpoints:",endpoints);
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const promises=[]

// useEffect(()=> {
    const getCollectionData = async () => {
        for (const url of endpoints) {
            const response = await axios.get(url, OSoptions)
            // .then((result) => {
                promises.push(response.data.collection)
                setopenSeaData(promises.map(x => ({
                    name:x.name,
                    image_url:x.image_url, 
                    stats:x.stats, 
                }))) 
                console.log("promises", promises);
            }
            }
        
// }, [])

    // getCollectionData()

useEffect(()=> {
    getCollectionData()
    console.log(load);
    }, [load])


// Merge object arrays allows mapping from just one array: preserves row structure below (both.map{...})
const indexArray = Array(100).fill(1).map((n, i) => n + i)
// console.log(indexArray);
const collection_url = rowDataSales.map(x => ({trades:x.trades, volume:x.volume}))

const OSData = promises.map(x=> ({name:x.name, image_url:x.image_url, stats:x.stats}))

// const both = openSeaData.map((item, i) => Object.assign({}, item, {index:`${i=i+1}`}, {collection_url:collection_url[i-1]}));
const both = openSeaData.map((item, i) => Object.assign({}, item, {index:`${i=i+1}`}, {collection_url:collection_url[i-1]}, {OSLink:OSlinks[i-1]}, {NFTstatsLink:NFTstatsLinks[i-1]}, {IcyToolsLink:IcyToolsLinks[i-1]}, {RaribleLink:RaribleLinks[i-1]} ));

// indexArray[i] will output index:'string' values 
// const both1 = openSeaData.map((item, i) => Object.assign({}, item, {index:indexArray[i]}, {collection_url:collection_url[i]}));
// }
console.log("both", both);
    
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = both.slice(firstPostIndex, lastPostIndex)

    const handleButton = () => {

    }
    function hide(){
        document.getElementById('hide').style.display="none";
        setLoad(true)
    }
    
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
            <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 20, marginBottom: 30 }}> Top of the Month <br/>
                <Link to='/RapidAPICollectionsDay' style={{color:'black'}}>
                    <button className="button-days" style={{marginLeft:20, marginBottom:0, padding:5}}> 1DAY </button></Link>
                <Link to='/RapidAPICollectionsWeek' style={{color:'black' }}>
                    <button className="button-days"> 7DAY </button></Link>
                <Link to='/RapidAPICollectionsMonth' style={{color:'black'}}>
                    <button className="button-days" style={{color:'darkgray', backgroundColor:'gray' }}> 30DAY </button></Link>
                    
            </h2>
        
            <RapidApiRows both={currentPosts} />
            <Pagination totalPosts={both.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
        </div>
        <br/><br/><br/><br/>
            
            <button id="hide" onClick={hide}>Get It</button>
         
        </>
    )
}

export default UserList