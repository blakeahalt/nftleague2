/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import CryptoSlamRows from './CryptoSlamCollectionRows';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination2';
import Cookies from 'js-cookie';
import ProtectRoutes from './ProtectRoutes';

function UserList() {
    const [rowDataSales, setRowDataSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const navigate = useNavigate();

    ProtectRoutes();

    const CSoptions = {
        method: 'GET',
        headers: {
            'X-BLOBR-KEY': '3Q5omwBMURG6qbahoT3MVBa7RjOkNpbg',
        },
    };

    useEffect(() => {
        fetch(
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100?timeRange=week',
            CSoptions
        )
            .then((response) => response.json())
            .then((rowDataSales) => setRowDataSales(rowDataSales.data));
    }, []);
    // console.log("rowDataSales:", rowDataSales);

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
            ? x.quote.ETH.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Ξ'
            : x.quote.Flow
            ? x.quote.Flow.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Flow'
            : x.quote.SOL
            ? x.quote.SOL.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' SOL'
            : x.quote.WAX
            ? x.quote.WAX.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' WAX'
            : x.quote.XTZ
            ? x.quote.XTZ.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' XTZ'
            : 'N/D',
        USDsales: x.quote.USD
            ? '$' +
              x.quote.USD.salesVolume
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
            : 'N/D',
    }));

    const both = rowDataSales.map((item, i) =>
        Object.assign(
            {},
            item,
            { collection_url: endpoints[i] },
            { index: indexArray[i] },
            { quotes: quotes[i] },
            { endpoint: endpoints[i] }
        )
    );
    // console.log('both', both);

    function CSSignOut() {
        Cookies.set('access', null);
        Cookies.set('refresh', null);
        navigate('/');
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
                            href="/"
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
                        marginBottom: 30,
                    }}
                >
                    Collections of the Week <br />
                    <div style={{ fontSize: 20 }}>
                        Follow the top collections trending on
                        <em> CryptoSlam</em>
                    </div>
                    <Link
                        to="/CryptoSlamCollectionsDay"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                marginLeft: 20,
                                marginBottom: 0,
                                padding: 5,
                            }}
                        >
                            1DAY
                        </button>
                    </Link>
                    <Link
                        to="/CryptoSlamCollectionsWeek"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                backgroundColor: 'gray',
                                color: 'darkgray',
                            }}
                        >
                            7DAY
                        </button>
                    </Link>
                    <Link
                        to="/cryptoslamCollectionsMonth"
                        style={{ color: 'black' }}
                    >
                        <button className="button-days"> 30DAY </button>
                    </Link>
                </h2>

                <CryptoSlamRows both={currentPosts} />
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
