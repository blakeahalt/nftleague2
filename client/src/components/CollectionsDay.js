import React from 'react'
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import axios from 'axios'

function UserList() {

  const [rowDataSales1, setRowDataSales1] = useState([]);
  const [openSeaData, setopenSeaData] = useState([])
  const [openSeaStats, setopenSeaStats] = useState([])
  const [collectionData, setCollectionData] = useState([])
  const [statData, setStatData] = useState([])
  const [collectionSearch, setCollectionSearch] = useState('')
    
  const OSoptions = {method: 'GET', headers: {accept: 'application/json'}};

  const options = {
    method: 'GET',
    // url: 'https://top-nft-sales.p.rapidapi.com/sales/30d',
    headers: {
      'X-RapidAPI-Key': '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
      'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com'
    }
  };

	
	
	

	// useEffect(() => {
	// 	fetch('https://top-nft-sales.p.rapidapi.com/collections/1d', options)
	// 		.then(response => response.json())
	// 		.then(rowDataSales1 => setRowDataSales1(rowDataSales1))
	// }, [])
	// console.log(rowDataSales1);
	const rapidEndpoints=[]
	const OSEndpoints=[]
	const url_string = "https://www.nft-stats.com/collection/"
	
	useEffect(() => {
		async function getRapidApiData () {
		const response = await axios.get('https://top-nft-sales.p.rapidapi.com/collections/1d', options)
		setRowDataSales1(response.data)
		// const rapidEndpoints = (rowDataSales1.map(x => {
		// 	return (x.collection_url)
		// 	}))
		// for (const x of rapidEndpoints) {
		// 	const y = x.replace(url_string, "https://api.opensea.io/api/v1/collection/")
		// 	OSEndpoints.push(y)
		// }

		getRapidApiData()
		.catch(console.error);
		console.log("rowDataSales1", rowDataSales1);
	}
}, [])	

// console.log("OSEndpoints", OSEndpoints);

	
	function getCollectionData() {
		for (const url of OSEndpoints) {
		  const response = axios.get(url, OSoptions)
		  setopenSeaData(response.data.collection)
		  setCollectionData(openSeaData.map(x=>({
			image_url:x.response.data.collection.image_url, 
			stats:x.response.data.collection.stats
		})
		))
	}
	console.log("openSeaData", openSeaData)
	console.log("collectionData", collectionData)
}

	
	useEffect(() => {
		setCollectionData(openSeaData.map(x => ({
			collection: x.collection
		})));
	},[]);

	useEffect(() => {
		const promises=[]
		const stats=[]
		async function getCollectionData() {
			for (const url of OSEndpoints) {
				await axios.get(url, OSoptions)
				.then((result) => {
					promises.push(result.data.collection)
					.then(openSeaData => setopenSeaData(promises))
					})
					}
				}
				getCollectionData()
	}, [])	
	console.log("openSeaData", openSeaData)
	console.log("collectionData", collectionData)

	// 	  useEffect(() => {
	// 	setCollectionData(openSeaData.map(x => ({
	// 		image_url:x.image_url, 
	// 		stats:x.stats
	// 	})));
	// 	setCollectionData()
	// }, []);

	

	

//collects urls from rapidapi collection request
//Output: array of rapidapi urls
// const obj=[]
// for (const x of rowDataSales1) {
// 	const y = x.collection_url
// 	obj.push(y)
// }
// console.log("obj:",obj);

// const obj = (rowDataSales1.map(x => {
// 	return (x.collection_url)
// 	}))

//take endpoints from rapidapi collection and attach to opensea api
//Output: array of urls that can be used with opensea api
// const endpoints = []
// const url_string = "https://www.nft-stats.com/collection/"
// for (const x of obj) {
// 	const y = x.replace(url_string, "https://api.opensea.io/api/v1/collection/")
// 	// const z = y.concat("/stats")
// 	endpoints.push(y)
// }
// console.log("endpoints:",endpoints);


//gathers opensea collection data and stat data into 'promises'/'stats' array
//Output: extensive array of each collection's data and stat data
// const promises=[]
// const stats=[]
//   async function getCollectionData() {
// 	  for (const url of endPoints) {
// 		  await axios.get(url, OSoptions)
// 		  .then((result) => {
// 			  promises.push(result.data.collection)})
// 			//   stats.push(result.data.collection.stats)})
// 			.then(openSeaData => setopenSeaData(promises))
// 			//   .then(openSeaStats => setopenSeaStats(stats))
// 			.then(collectionData => setCollectionData(openSeaData.map(x=>({
// 				image_url:x.image_url, 
// 				stats:x.stats
// 			}))))
// 			}
// 		}
		// console.log("OpenSeaData:", openSeaData);
	
// setCollectionData(openSeaData.map(x=>({
// 	image_url:x.image_url, 
// 	stats:x.stats
// })))

	// useEffect(() => {
	// 	setStatData(openSeaStats.map(x => ({
	// 		average_price: x.average_price,
	// 		market_cap:x.market_cap,
	// 		floor_price: x.floor_price,
	// 		num_owners: x.num_owners,
	// 		count: x.count,
	// 		one_day_average_price:x.one_day_average_price,
	// 		one_day_change:x.one_day_change,
	// 		one_day_difference:x.one_day_difference,
	// 		one_day_sales:x.one_day_sales,
	// 		one_day_sales_change:x.one_day_sales_change,
	// 		one_day_volume:x.one_day_volume,
	// 		one_hour_average_price:x.one_hour_average_price,
	// 		one_hour_change:x.one_hour_change,
	// 		one_hour_difference:x.one_hour_difference,
	// 		one_hour_sales:x.one_hour_sales,
	// 		one_hour_sales_change:x.one_hour_sales_change,
	// 		one_hour_volume:x.one_hour_volume,
	// 		seven_day_average_price:x.seven_day_average_price,
	// 		seven_day_change:x.seven_day_change, 
	// 		seven_day_difference:x.seven_day_difference,
	// 		seven_day_sales:x.seven_day_sales,
	// 		seven_day_volume:x.seven_day_volume,
	// 		six_hour_average_price:x.six_hour_average_price,
	// 		six_hour_change:x.six_hour_change,
	// 		six_hour_difference:x.six_hour_difference, 
	// 		six_hour_sales:x.six_hour_sales,
	// 		six_hour_sales_change:x.six_hour_sales_change,
	// 		six_hour_volume:x.six_hour_volume,
	// 		thirty_day_average_price:x.thirty_day_average_price,
	// 		thirty_day_change:x.thirty_day_change, 
	// 		thirty_day_difference:x.thirty_day_difference,
	// 		thirty_day_sales:x.thirty_day_sales,
	// 		thirty_day_volume:x.thirty_day_volume,
	// 		total_sales:x.total_sales,
	// 		total_supply:x.total_supply,
	// 		total_volume:x.total_volume 
	// 	})));
	// },[]);
	
//merge collectionData objs with rapidapi objs into 'both' arr
//merge openseaStats data with 'both' array into 'all' array
	const both = collectionData.map((item, i) => Object.assign({}, item, rowDataSales1[i]));
	// const all = both.map((item, i) => Object.assign({}, item, statData[i]));

// console.log("all:", all);

  return (
    <>
        <div className="navbar-link">
            <nav className="navbar navbar-dark bg-primary" id="mainNav">
                <div className="navbar-brand">
                    <div className="nav-link" id="navbarNavAltMarkup">
                        <div className="navbar-title">
                            <a className="nav-link active" aria-current="page" href='/salesweek'> Top Sales </a>
                            <a className="nav-link active" aria-current="page" href='/collectionsday'> Top Collections </a>
                            <a className="nav-link active" href="/profile"> Profile </a>
                            <a className="nav-link active" href="nftlist"> Browse </a>
                            <a className="nav-link active" href="/GoogleApp"> Sign Out </a>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
        </div>

        <div className="container" style={{ minWidth: 650 }}>
            <h2 style={{ textAlign: 'center', fontSize: 42, marginTop: 0, marginBottom: 10 }}> Top Collections </h2>
                <div style={{ position: 'relative', textAlign: 'center', marginTop: -10, marginBottom: 20}}>
                  <Link to='/CollectionsDay' style={{color:'black'}}>
				  	<button className="button-days" style={{ backgroundColor:'gray', color:'darkgray'}}> 1DAY </button></Link>
                  <Link to='/CollectionsWeek' style={{color:'black'}}>
                    <button className="button-days"> 7DAY </button></Link>
                  <Link to='/CollectionsMonth' style={{color:'black'}}>
                    <button className="button-days"> 30DAY </button></Link>
             	</div>

              	<Row style={{ maxHeight: '75px', fontSize: 25, flexWrap: 'nowrap', marginBottom:10 }} >
					<Col style={{ minWidth: 100, maxWidth: 100, paddingLeft:100 }}></Col>
					<Col style={{ minWidth: 200, maxWidth: 500, marginLeft:-95 }}> Collection </Col>
					<Col style={{ minWidth: 50, maxWidth: 200, marginLeft:120 }}> Trades </Col>
					<Col style={{ maxWidth: 200 }}> Volume </Col>
					<Col style={{ maxWidth: 200, marginRight:10 }}> Floor </Col>
				</Row>

				{both.map(row => {
					return(
						<Row className="row-stripe" style={{ height: '50px', margin:5, paddingBottom:30 }} key={row.id}>
							{/* <Col style={{ minWidth: 50, maxWidth: 50, marginTop:27 }}> {row.id} </Col> */}
							<Col style={{ minHeight:75, maxWidth:100, paddingLeft:15 }}> <img src={row.image_url} style={{height:80, maxWidth:75}} alt="pfp"></img>  </Col>
							<Col style={{ minWidth: 250, maxWidth: 500, marginTop:15 }}>
							<a href={row.collection_url} target="_blank" rel="noreferrer">{row.collection} </a>
							</Col>
							<Col style={{ minWidth: 50, maxWidth: 200, marginTop:27 }}> {row.trades} </Col>
							<Col style={{ maxWidth: 200, marginTop:27 }}> {row.volume} </Col>
							<Col style={{ maxWidth: 200, marginTop:27 }}> {row.stats.one_day_volume.toFixed(2)} </Col>
							<Col style={{ maxWidth: 200, marginTop:27 }}> Ξ{row.stats.floor_price? row.stats.floor_price.toFixed(2):"N/D"} </Col>
						</Row>
						)
					})}
  			</div>
		</>
	)
}

export default UserList