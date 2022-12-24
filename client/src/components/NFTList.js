import { React, useEffect, useState, useRef } from 'react';
import { GoogleLogout } from 'react-google-login';
import '../App.css';
import { ethers } from 'ethers';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './NFTProfile';
import Cookies from 'js-cookie';
import ProtectRoutes from './ProtectRoutes';

function NFTList() {
    const [account, setAccount] = useState('');
    const [signer, setSigner] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     connect();
    // }, []);

    ProtectRoutes();

    const clientId = process.env.REACT_APP_CLIENTID;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const onLogoutSuccess = () => {
        console.log('SUCCESSFUL LOG OUT');
        Cookies.set('access', null);
        Cookies.set('refresh', null);
    };

    // CONNECT METAMASK
    // const connect = async () => {
    //     if (window.ethereum !== 'undefined') {
    //         const accounts = await window.ethereum.request({
    //             method: 'eth_requestAccounts',
    //         });
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();
    //         setSigner(signer);
    //         setAccount(accounts[0]);
    //     } else {
    //         console.log('Please install metamask.');
    //     }
    // };

    function CSSignOut() {
        Cookies.set('access', null);
        Cookies.set('refresh', null);
        navigate('/');
    }
    return (
        <>
            <div>
                <div
                    className="App"
                    id="containerNav"
                    style={{
                        display: 'flex',
                        position: 'relative',
                        margin: 'auto',
                    }}
                >
                    <nav
                        className="navbar navbar-dark bg-primary"
                        id="mainNav"
                        // style={{ minWidth: 720 }}
                    >
                        <div className="navbar-title">
                            <div className="dropdown">
                                <button className="dropbtn">CryptoSlam</button>
                                <div className="dropdown-content">
                                    <a href="/cryptoslamCollectionsday">
                                        Collections
                                    </a>
                                    <a href="/cryptoslamSalesDay">
                                        Indiv. Sales
                                    </a>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a
                                    className="dropbtn"
                                    aria-current="page"
                                    href="/RapidAPICollectionsDay"
                                >
                                    NFT Stats
                                </a>
                            </div>
                            <div className="dropdown">
                                <a
                                    className="dropbtn"
                                    href="/profile"
                                >
                                    Profile
                                </a>
                            </div>
                            <div className="dropdown">
                                <a
                                    className="dropbtn"
                                    href="/"
                                    onClick={CSSignOut}
                                >
                                    Sign Out
                                </a>
                            </div>
                        </div>
                    </nav>
                    <br />
                </div>
                <br />

                <div
                    className="container"
                    id="containerBlur"
                    style={{ display: 'flex', minWidth: 1300 }}
                >
                    {/* <div className="row g-2"> */}
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="renga"
                            className="col"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="boredapeyachtclub"
                            className="col"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="proof-moonbirds"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="cryptopunks"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="terraforms"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="doodles-official"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="clonex"
                        />
                    </div>
                    <div className="col-6">
                        <Profile
                            class="p-4 bg-light"
                            newCS="art-blocks"
                        />
                    </div>
                    <div></div>
                </div>
            </div>
            <div
                className="container"
                id="containerTop"
                style={{
                    position: 'absolute',
                    fontSize: 35,
                    textAlign: 'center',
                    marginTop: -100,
                    minWidth: 430,
                }}
            >
                <br />
                <p style={{ textAlign: 'center' }}>
                    Logged in {user.name}! <br /> Profile page coming soon
                </p>
                <p>
                    <Link to="/cryptoslamSalesday">See the Data</Link>
                </p>
                <br />
                <p>
                    <Link to="/">
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Logout"
                            onLogoutSuccess={onLogoutSuccess}
                        ></GoogleLogout>
                    </Link>
                </p>
                <br />
            </div>
        </>
    );
}

export default NFTList;

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

// return (
//     <>
//         <nav
//             className="navbar navbar-dark bg-primary"
//             id="mainNav"
//         >
//             <div className="navbar-title">
//                 <div className="dropdown">
//                     <div className="dropdown">
//                         <button className="dropbtn">CryptoSlam</button>
//                         <div className="dropdown-content">
//                             <a href="/cryptoslamCollectionsday">
//                                 Collections
//                             </a>
//                             <a href="/cryptoslamSalesday">Indiv. Sales</a>
//                         </div>
//                     </div>
//                     <div className="dropdown">
//                         <a
//                             className="dropbtn"
//                             aria-current="page"
//                             href="/RapidAPICollectionsDay"
//                         >
//                             NFT Stats
//                         </a>
//                     </div>
//                     <div className="dropdown">
//                         <a
//                             className="dropbtn"
//                             href="/profile"
//                         >
//                             Profile
//                         </a>
//                     </div>
//                     <div className="dropdown">
//                         <a
//                             className="dropbtn"
//                             href="nftlist"
//                         >
//                             Browse
//                         </a>
//                     </div>
//                     <div className="dropdown">
//                         <a
//                             className="dropbtn"
//                             href="/GoogleApp"
//                             onClick={CSSignOut}
//                         >
//                             Sign Out
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//         <br />
//         <br />
//         <div className="container">
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="renga"
//                     className="col"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="boredapeyachtclub"
//                     className="col"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="proof-moonbirds"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="cryptopunks"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="terraforms"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="doodles-official"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="clonex"
//                 />
//             </div>
//             <div className="col-6">
//                 <Profile
//                     class="p-4 bg-light"
//                     newCS="art-blocks"
//                 />
//             </div>
//         </div>
//     </>
// );
