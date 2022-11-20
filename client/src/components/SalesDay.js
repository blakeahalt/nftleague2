/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import CryptoSlamSalesRows from './CryptoSlamSalesRows';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Pagination from './Pagination2';
import Cookies from 'js-cookie';
import ProtectRoutes from './ProtectRoutes';
import Date from './Date';

function UserList() {
    const [rowDataSales, setRowDataSales] = useState([]);
    const [user, setUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [err, setErr] = useState('');
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
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/sales/top-100?timeRange=day',
            CSoptions
        )
            .then((response) => response.json())
            .then((rowDataSales) => setRowDataSales(rowDataSales.data));
    }, []);
    // console.log('rowDataSales:', rowDataSales);

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

    const collectionNumber = [];
    for (const x of rowDataSales) {
        const y = `${x.tokens[0].tokenId}`;
        collectionNumber.push(y);
    }
    // console.log('collectionNumber', collectionNumber);

    const collectionNumtoFixed = [];
    for (const x of collectionNumber) {
        if (x.length > 5) {
            const y = `${x.slice(0, 5)}...`;
            collectionNumtoFixed.push(y);
        } else {
            const y = x.slice(0, 5);
            collectionNumtoFixed.push(y);
        }
    }
    // console.log('collectionNumtoFixed', collectionNumtoFixed);
    // const collectionId = [];
    // for (const x of rowDataSales) {
    //     const y = url_string.concat(`${x.collectionIdName}/mint/d`);
    //     collectionId.push(y);
    // }
    // console.log('collectionId', collectionId);

    const collectionIdName = [];
    for (const x of rowDataSales) {
        const y = `${x.collectionName}`;
        collectionIdName.push(y);
    }
    // console.log('collectionIdName', collectionIdName);

    const collectionSaleName = collectionIdName.map((x, index) =>
        x.concat(` #${collectionNumtoFixed[index]}`)
    );
    // console.log('collectionSaleName', collectionSaleName);

    const collection_Id_Name = [];
    for (const x of rowDataSales) {
        const y = x.collectionName.replaceAll(' ', '-').toLowerCase();
        collection_Id_Name.push(y);
    }
    // console.log('collection_Id_Name', collection_Id_Name);

    const collectionUrlName = collection_Id_Name.map((x, index) =>
        x.concat(`/mint/${collectionNumber[index]}`)
    );
    const fullUrl = collectionUrlName.map((x, index) =>
        url_string.concat(`${x}`)
    );
    // console.log('fullUrl', fullUrl);

    const collectionUrl = collection_Id_Name.map((x, index) =>
        url_string.concat(`${x}`)
    );
    // console.log('collectionUrl', collectionUrl);

    const timeElapsed = Date(rowDataSales);

    const both = rowDataSales.map((item, i) =>
        Object.assign(
            {},
            item,
            { collectionUrl: collectionUrl[i] },
            { index: indexArray[i] },
            { quotes: quotes[i] },
            { fullUrl: fullUrl[i] },
            { collectionIdName: collectionIdName[i] },
            { collectionSaleName: collectionSaleName[i] },
            { timeElapsed: timeElapsed[i] }
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
