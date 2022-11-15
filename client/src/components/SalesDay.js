/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import CryptoSlamSalesRows from './CryptoSlamSalesRows';
import { Link, Navigate } from 'react-router-dom';
import Pagination from './Pagination2';
import axios from 'axios';
import Cookies from 'js-cookie';

function UserList() {
    const [rowDataSales, setRowDataSales] = useState([]);
    const [user, setUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [err, setErr] = useState('');

    const CSoptions = {
        method: 'GET',
        headers: {
            'X-BLOBR-KEY': 'PyrEzHn6DlTKGU3mEfyQhboTFBUMzt4Y',
        },
    };

    useEffect(() => {
        fetch(
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/sales/top-100?timeRange=day',
            CSoptions
        )
            .then((response) => response.json())
            .then((rowDataSales) => setRowDataSales(rowDataSales.data));
    }, []);
    // console.log('rowDataSales:', rowDataSales);

    useEffect(() => {
        protect();
    }, []);

    const refresh = (refreshToken) => {
        console.log('Refreshing token!');

        return new Promise((resolve, reject) => {
            // axios.post('http://localhost:3001/refresh', { token: refreshToken })
            axios.post('/refresh', { token: refreshToken }).then((data) => {
                if (data.data.success === false) {
                    setErr('Login again');
                    console.log('2 (refresh): Please Log In Again');
                    resolve(false);
                } else {
                    const { accessToken } = data.data;
                    Cookies.set('access', accessToken);
                    resolve(accessToken);
                    console.log('1 (refresh): All good bruh');
                }
            });
        });
    };

    const requestLogin = async (accessToken, refreshToken) => {
        return new Promise((resolve, reject) => {
            axios
                // .post('http://localhost:3001/protected',
                .post(
                    '/protected',
                    {},
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                )
                .then(async (data) => {
                    if (data.data.success === false) {
                        if (data.data.message === 'User not authenticated') {
                            setErr('Login again');
                            console.log(
                                '2 (requestLogin): Please Log In Again'
                            );
                        } else if (
                            data.data.message === 'Access token expired'
                        ) {
                            console.log(
                                '(3 requestLogin): AccessToken Expired - Generating New Tokens'
                            );
                            const accessToken = await refresh(refreshToken);
                            return await requestLogin(
                                accessToken,
                                refreshToken
                            );
                        }
                        resolve(false);
                    } else {
                        console.log('1 (requestLogin): You in Brah');
                        console.log(data.data.message);
                        setErr('Protected route accessed!');
                        resolve(true);
                    }
                });
        });
    };

    const hasAccess = async (accessToken, refreshToken) => {
        // console.log('1 (hasAccess) - refreshToken Check:', refreshToken);
        // console.log('2 (hasAccess) - accessToken Check:', accessToken);
        if (!refreshToken) {
            console.log('3 (hasAccess): No refreshToken. Please Log In Again.');
        }

        if (accessToken === undefined) {
            console.log('4 (hasAccess): Generating New Token');
            accessToken = await refresh(refreshToken);
            return accessToken;
        }
        // console.log('1.1 (hasAccess) - refreshToken Check:', refreshToken);
        // console.log('2.2 (hasAccess) - accessToken Check:', accessToken);
        return accessToken;
    };

    const protect = async (e) => {
        let accessToken = Cookies.get('access');
        let refreshToken = Cookies.get('refresh');

        accessToken = await hasAccess(accessToken, refreshToken);

        if (!accessToken) {
            console.log('2 (protect): No Access Token - Please Sign in again.');
        } else {
            await requestLogin(accessToken, refreshToken);
            // console.log('1 protect(accessToken):', accessToken);
        }
    };

    // //Output: array of urls to each collection
    const endpoints = [];
    const url_string = 'https://cryptoslam.io/';
    for (const x of rowDataSales) {
        const y = url_string.concat(`${x.collectionId}`);
        // const z = y.concat("/stats")
        endpoints.push(y);
    }
    // console.log("endpoints:",endpoints);

    // Merge object arrays allows mapping from just one array: preserves row structure below (both.map{...})
    const indexArray = Array(100)
        .fill(1)
        .map((n, i) => n + i);

    const quotes = rowDataSales.map((x) => ({
        ETHsales: x.quote.ETH
            ? x.quote.ETH.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
              ' Ξ'
            : x.quote.Flow
            ? x.quote.Flow.price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Flow'
            : x.quote.SOL
            ? x.quote.SOL.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
              ' SOL'
            : x.quote.WAX
            ? x.quote.WAX.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
              ' WAX'
            : x.quote.XTZ
            ? x.quote.XTZ.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
              ' XTZ'
            : x.quote.WETH
            ? x.quote.WETH.price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' WETH'
            : 'N/D',
        USDsales: x.quote.USD
            ? '$' +
              x.quote.USD.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            : null,
    }));

    const collectionId = [];
    for (const x of rowDataSales) {
        const y = url_string.concat(
            `${x.collectionId}/mint/${x.tokens[0].tokenId}`
        );
        collectionId.push(y);
    }
    // console.log('collectionId', collectionId);

    const collectionIdName = [];
    for (const x of rowDataSales) {
        const y = `${x.tokens[0].name}`;
        collectionIdName.push(y);
    }
    // console.log('collectionIdName', collectionIdName);

    const timeElapsed = [];
    for (const x of rowDataSales) {
        const start = new Date(`${x.saleAt}`); // milliseconds count from 1 Jan 1970
        const end = Date.now();
        // const y = `${end - start}`;
        const y = `${end - start}`;
        const z =
            y < 3600000
                ? `< 1 hour ago`
                : 3600000 < y && y < 7200000
                ? '1 hour ago'
                : 7200000 < y && y < 10800000
                ? '2 hours ago'
                : 10800000 < y && y < 14400000
                ? '3 hours ago'
                : 14400000 < y && y < 18000000
                ? '4 hours ago'
                : 18000000 < y && y < 21600000
                ? '5 hours ago'
                : 21600000 < y && y < 25200000
                ? '6 hours ago'
                : 25200000 < y && y < 28800000
                ? '7 hours ago'
                : 28800000 < y && y < 32400000
                ? '8 hours ago'
                : 32400000 < y && y < 36000000
                ? '9 hours ago'
                : 36000000 < y && y < 39600000
                ? '10 hours ago'
                : 39600000 < y && y < 43200000
                ? '11 hours ago'
                : 43200000 < y && y < 46800000
                ? '12 hours ago'
                : 46800000 < y && y < 50400000
                ? '13 hours ago'
                : 50400000 < y && y < 54000000
                ? '14 hours ago'
                : 54000000 < y && y < 57600000
                ? '15 hours ago'
                : 57600000 < y && y < 61200000
                ? '16 hours ago'
                : 61200000 < y && y < 64800000
                ? '17 hours ago'
                : 64800000 < y && y < 68400000
                ? '18 hours ago'
                : 68400000 < y && y < 72000000
                ? '19 hours ago'
                : 72000000 < y && y < 75600000
                ? '20 hours ago'
                : 75600000 < y && y < 79200000
                ? '21 hours ago'
                : 79200000 < y && y < 82800000
                ? '22 hours ago'
                : 82800000 < y && y < 86400000
                ? '23 hours ago'
                : 86400000 < y && y < 172800000
                ? '1 day ago'
                : 172800000 < y && y < 259200000
                ? '2 days ago'
                : 259200000 < y && y < 345600000
                ? '3 days ago'
                : 345600000 < y && y < 432000000
                ? '4 days ago'
                : 432000000 < y && y < 518400000
                ? '5 days ago'
                : 518400000 < y && y < 604800000
                ? '6 week ago'
                : 604800000 < y && y < 1209600000
                ? '1 week ago'
                : 604800000 < y && y < 1814400000
                ? '2 weeks ago'
                : 1814400000 < y && y < 2419200000
                ? '3 weeks ago'
                : null;

        timeElapsed.push(z);
    }
    // console.log('timeElapsed:', timeElapsed);

    const both = rowDataSales.map((item, i) =>
        Object.assign(
            {},
            item,
            { collection_url: endpoints[i] },
            { index: indexArray[i] },
            { quotes: quotes[i] },
            { collection_id: collectionId[i] },
            { collectionIdName: collectionIdName[i] },
            { timeElapsed: timeElapsed[i] }
        )
    );
    // console.log('both', both);

    function CSSignOut() {
        Cookies.set('access', null);
        Cookies.set('refresh', null);
        Navigate('/login');
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = both.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <nav
                className="navbar navbar-dark bg-primary"
                id="mainNav"
            >
                <div className="navbar-title">
                    <div className="dropdown">
                        <button className="dropbtn">CryptoSlam</button>
                        <div className="dropdown-content">
                            <a href="/cryptoslamCollectionsday">Collections</a>
                            <a href="/cryptoslamSalesday">Indiv. Sales</a>
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
                            href="nftlist"
                        >
                            Browse
                        </a>
                    </div>
                    <div className="dropdown">
                        <a
                            className="dropbtn"
                            href="/GoogleApp"
                            onClick={CSSignOut}
                        >
                            Sign Out
                        </a>
                    </div>
                </div>
            </nav>
            <br />
            <div className="container">
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: 55,
                        marginTop: 20,
                        flexWrap: 'nowrap',
                        marginBottom: 30,
                    }}
                >
                    Sales of the Day <br />
                    <div style={{ fontSize: 20 }}>
                        Follow the top sales trending on
                        <em> CryptoSlam</em>
                    </div>
                    <Link
                        to="/CryptoSlamSalesDay"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                marginLeft: 20,
                                marginBottom: 0,
                                padding: 5,
                                backgroundColor: 'gray',
                                color: 'darkgray',
                            }}
                        >
                            1DAY
                        </button>
                    </Link>
                    <Link
                        to="/CryptoSlamSalesWeek"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                color: 'black',
                            }}
                        >
                            7DAY
                        </button>
                    </Link>
                    <Link
                        to="/cryptoslamSalesMonth"
                        style={{ color: 'black' }}
                    >
                        <button className="button-days"> 30DAY </button>
                    </Link>
                </h2>

                <CryptoSlamSalesRows both={currentPosts} />
                <Pagination
                    totalPosts={both.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
}

export default UserList;
