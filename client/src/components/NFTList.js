import "../App.css";
import { ethers } from "ethers";
import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Profile from './NFTProfile'

function NFTList() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [stats, setStats] = useState([])
  const [collection, setCollection] = useState([])
  const [collectionSearch, setCollectionSearch] = useState('')
  const [updated, setUpdated] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const userRef = useRef();
  const inputRef = useRef(null)

  const options = {method: 'GET', headers: {accept: 'application/json'}};

  // const loadCollectionData = async() => {
  //   const response = await axios.get(`https://api.opensea.io/api/v1/collection/${updated}`, options)
  //   // const response = await axios.get(`https://api.opensea.io/api/v1/collection/moonbirds`, options)
  //     setCollection([response.data])
  //     console.log('collection data:', collection);
  // }

  // const getCollectionSearch = async() => {
  //   const response = await axios.get(`https://api.opensea.io/api/v1/collection/${collectionSearch}`, options)
  //       // .then(response => response.json())
  //       // .then((response) => { 
  //           setCollectionSearch([response.data])
  //           console.log(response)
  // }

  // const banner_image_url = collection.map(function(stat){
  //     return [`${stat.collection.banner_image_url}`].join('')
  //   })
  //   console.log(banner_image_url);

  // useEffect(() => {
  //   getCollectionSearch()
  // }, [])


  // const image_url = collection.map(function(stat){
  //     return [`${stat.collection.image_url}`].join('')
  //   })
    // console.log(image_url);


  //   const balance = async (tokenAddress) => {
  //     const contract = new ethers.Contract(tokenAddress, erc721Abi, signer);
  //     const balance = await contract.balanceOf(account);
  //     console.log(balance.toString());
  //   };

// const GetStats = () => {

//   fetch(`https://api.opensea.io/api/v1/collection/doodles-official/stats`, options)
//     .then(response => response.json())
//     .then((response) => { 
//       setStats(response)
//       console.log(response)
//     })
//     //   {stats.map((stat) => {
//     //     return(
//     //       <div>
//     //         <p>Floor Price: {stat.floor_price}</p>
//     //         <p>One Day Sales: {stat.one_day_sales_change}</p>
//     //       </div>
//     //     )
//     //   } )}
//     // })
//     .catch(err => console.error(err));
// // }

  // const loadStatData = async() => {
  //   const response = await axios.get(`https://api.opensea.io/api/v1/collection/${collectionSearch}/stats`, options)
  //   // .then(response => response.json())
  //   // .then((response) => { 
  //     setStats([response.data])
  //     console.log('stats data:', stats)
  //   }
  //   // .catch(err => console.error(err));
  // // }

  //   useEffect(() => {
  //     loadStatData()
  //   }, [])
  //   //All Stats Data

  //   console.log('all stats:',stats);

    // async function getStats() {
    //   const baseURL = `https://api.opensea.io/api/v1/collection/${collectionSearch}/stats`
    //   const response = await axios.get(baseURL)
    //   setStats([response.data])
    //   console.log('stats data:', stats)
    // }
  
    // useEffect(() => {
    //   getStats()
    // },[])

    // const featured_image_url = collection.map(function(stat){
    //   return [`${stat.collection.featured_image_url}`]
    // })

    // const floor_price = stats.map(function(stat){
    //   return [`${stat.stats.floor_price.toFixed(2)}`].join('')
    // })

    // const seven_day_change = stats.map(function(stat){
    //   return [`${stat.stats.seven_day_change.toFixed(2)}`].join('')
    // })
    // console.log('floor price:',seven_day_change);
    
    // const one_day_sales_change = stats.map(function(stat){
    //   return [`${stat.stats.one_day_sales_change.toFixed(2)}`].join('')
    // })
    // console.log('1 Day Sales:',one_day_sales_change);
    
    // const average_price = stats.map(function(stat){
    //   return [`${stat.stats.average_price.toFixed(2)}`].join('')
    // })
    // console.log('Average Price:',average_price);


    // async function getCollection() {
    //   const baseURL = `https://api.opensea.io/api/v1/collection/${collectionSearch}`
    //   const response = await axios.get(baseURL)
    //   setCollection([response.data])
    //   console.log('collection data:', collection);
    // }
    
    // function onClick() {
    //     getCollection()
    //   }
    
    // useEffect(() => {
    //   getCollection()
    // },[])


  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      setAccount(accounts[0]);
    } else {
      console.log("Please install metamask.");
    }
  };
  
  
  useEffect(() => {
      connect();
    }, []);
    
    // function callFunctions(){
    //   getStats();
    //   getCollection();
    // }
    // useEffect(() => {
    //   loadCollectionData()
    // }, [])


    // const handleChange = (e) => {
    //   setCollectionSearch(e.target.value);
    // };
    // console.log('handlechange:',collectionSearch);

    // const handleClick = () => {
    //   // 👇 "inputRef.current.value" is input value
    //   setUpdated(inputRef.current.value);
    // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if button enabled with JS hack
//     // const v1 = USER_REGEX.test(user);
//     // const v2 = PWD_REGEX.test(pwd);
//     // if (!v1 || !v2) {
//     //        setErrMsg("Invalid Entry");
//     //        return;
//     // }
// // try {
//     const response = axios.get(`https://api.opensea.io/api/v1/collection/doodles-official`, options)
//         setCollection([response.data])
//         console.log('collection data:', collection);
//         const banner_image_url = collection.map(function(stat){
//           return [`${stat.collection.banner_image_url}`].join('')
//         })
//         console.log(banner_image_url);
//        // setCollectionSearch('') 
//       // } catch (err) {
//       //   if (!err?.response) {
//       //       setErrMsg('No Server Response');
//       //   } else if (err.response?.status === 400) {
//       //       setErrMsg('Missing Username or Password');
//       //   } else if (err.response?.status === 401) {
//       //       setErrMsg('Unauthorized');
//       //   } else {
//       //       setErrMsg('Login Failed');
//       //   }
//       // }
//     } 
  


  // const getCollectionSearch = (e) => {
  //   const searchValue = setCollectionSearch.value
  //   setCollection(searchValue)
  //   console.log(searchValue);
  // }

//   useEffect(() => {
//     console.log(collection);;
// }, [])


  return (
    <div>
      <div className="navbar-link">
            <nav className="navbar navbar-dark bg-primary" id="mainNav">
                <div className="navbar-brand">
                    <div className="nav-link" id="navbarNavAltMarkup">
                        <div className="navbar-title">
                            <a className="nav-link active" aria-current="page" href='/salesweek'>Top Sales</a>
                            <a className="nav-link active" aria-current="page" href='/collectionsday'>Top Collections</a>
                            <a className="nav-link active" href="/profile">Profile</a>
                            <a className="nav-link active" href="nftlist">Browse</a>
                            <a className="nav-link active" href="/GoogleApp">Sign Out</a>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
        </div>
     
      <br/>      
        <div className="container" >
          {/* <div className="row g-2"> */}
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="renga" className="col" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="boredapeyachtclub" className="col" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="proof-moonbirds" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="cryptopunks" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="terraforms" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="doodles-official" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="clonex" />
              </div>
              <div className="col-6">
              <Profile class="p-4 bg-light" newCS="art-blocks" />
              </div>
          {/* </div> */}
          <div>
        </div>
        </div>
        {/* <lineChart newCS="clonex" /> */}
         {/* </Stack> */}
      {/* </div> */}
    {/* </div> */}
    {/* <DoughnutChart /> */}
    </div>
  );
}


export default NFTList;


// <form onSubmit={() => handleSubmit }>
// {/* <input
//     type="text"
//     id="collection"
//     ref={userRef}
//     autoComplete="off"
//     onChange={(e) => setCollectionSearch(e.target.value)}
//     value={collection}
//     required
//     // aria-invalid={validName ? "false" : "true"}
//     // aria-describedby="uidnote"
//     // onFocus={() => setUserFocus(true)}
//     // onBlur={() => setUserFocus(false)}
// /> */}
//   <input
//     ref={inputRef}
//     type="text"
//     id="collection"
//     // ref={userRef}
//     autoComplete="off"
//     onChange={handleChange}
//     value={collectionSearch}
//     required
//     // collectionSearch={setCollectionSearch}
//   />
// <button onClick={getCollectionSearch}>Search Collection</button>
// <p>collectionSearch: {collectionSearch}</p>
// <p>updated: {updated}</p>
// </form>