/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import RapidApiRows from './RapidApiRows';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination2';
import axios from 'axios';
import { GrCommand, GrNext } from 'react-icons/gr';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbLetterR } from 'react-icons/tb';
import Cookies from 'js-cookie';
import ProtectRoutes from './ProtectRoutes';
import '../App.css';



function UserList() {
    const [rowDataSales, setRowDataSales] = useState([]);
    const [openSeaData, setopenSeaData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(1);


    ProtectRoutes();

    const OSoptions = {
        method: 'GET',
        headers: { accept: 'application/json' },
    };

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':
                '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
            'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com',
        },
    };

    useEffect(() => {
        fetch('https://top-nft-sales.p.rapidapi.com/collections/7d', options)
            .then((response) => response.json())
            .then((rowDataSales) => setRowDataSales(rowDataSales));
    }, []);
    // console.log("rowDataSales:", rowDataSales);

    // //Output: array of urls to each collection
    const endpoints = [];
    const OSlinks = [];
    const NFTstatsLinks = [];
    const IcyToolsLinks = [];
    const RaribleLinks = [];
    //ToDo:DappRadarLinks = req ternaries of different blockchain types+/collection/
    //ToDo:EtherScanLinks: OS data - primary_asset_contracts[0].address
    const url_string = 'https://www.nft-stats.com/collection/';
    const err_str = [
        'https://www.nft-stats.com/collection/knittables-v2',
        'https://www.nft-stats.com/collection/claynosaurz-v2',
        'https://www.nft-stats.com/collection/duelbots-v2',
        'https://www.nft-stats.com/collection/0xy-utility-token-v3',
        'https://www.nft-stats.com/collection/ovols-v3',
        'https://www.nft-stats.com/collection/hype-pass',
        'https://www.nft-stats.com/collection/sweet-bonanza-v3',
        'https://www.nft-stats.com/collection/asciibirds-genesis',
    ];
    for (const x of rowDataSales) {
        // if (x.collection_url !== err_str) {
        if (!err_str.includes(x.collection_url)) {
            // x.collection_url.replace(err_str, "https://www.nft-stats.com/collection/galaxy-oat-poly")
            // } else {
            // const y = x.collection_url.replace(url_string, "https://api.opensea.io/api/v1/collection/")
            endpoints.push(
                x.collection_url.replace(
                    url_string,
                    'https://api.opensea.io/api/v1/collection/'
                )
            );
            OSlinks.push(
                x.collection_url.replace(
                    url_string,
                    'https://opensea.io/collection/'
                )
            );
            NFTstatsLinks.push(
                x.collection_url.replace(
                    url_string,
                    'https://www.nft-stats.com/collection/'
                )
            );
            IcyToolsLinks.push(
                x.collection_url.replace(
                    url_string,
                    'https://icy.tools/collections/'
                )
            );
            RaribleLinks.push(
                x.collection_url.replace(url_string, 'https://rarible.com/')
            );
            // DappRadarLinks.push(x.collection_url.replace(url_string, "https://dappradar.com/ethereum/collectibles/"))
        }
    }
    // console.log("endpoints:",endpoints);
    // console.log("rowDataSales:",rowDataSales);

    const promises = [];

    // useEffect(()=> {
    const getCollectionData = async () => {
        for (const url of endpoints) {
            const response = await axios.get(url, OSoptions);
            // .then((result) => {
            promises.push(response.data.collection);
            try {
                setopenSeaData(
                    promises.map((x) => ({
                        name: x.name,
                        image_url: x.image_url,
                        stats: x.stats,
                    }))
                );
                // console.log('promises', promises);
            } catch (error) {
                console.log('ErRor' + error);
            }
        }
    };

    // }, [])

    // getCollectionData()

    useEffect(() => {
        getCollectionData();
        console.log(load);
    }, [load]);

    // Merge object arrays allows mapping from just one array: preserves row structure below (both.map{...})
    const indexArray = Array(100)
        .fill(1)
        .map((n, i) => n + i);
    // console.log(indexArray);
    const collection_url = rowDataSales.map((x) => ({
        trades: x.trades,
        volume: x.volume,
    }));

    const OSData = promises.map((x) => ({
        name: x.name,
        image_url: x.image_url,
        stats: x.stats,
    }));

    // const both = openSeaData.map((item, i) => Object.assign({}, item, {index:`${i=i+1}`}, {collection_url:collection_url[i-1]}));
    const both = openSeaData.map((item, i) =>
        Object.assign(
            {},
            item,
            { index: `${(i = i + 1)}` },
            { collection_url: collection_url[i - 1] },
            { OSLink: OSlinks[i - 1] },
            { NFTstatsLink: NFTstatsLinks[i - 1] },
            { IcyToolsLink: IcyToolsLinks[i - 1] },
            { RaribleLink: RaribleLinks[i - 1] }
        )
    );

    // indexArray[i] will output index:'string' values
    // const both1 = openSeaData.map((item, i) => Object.assign({}, item, {index:indexArray[i]}, {collection_url:collection_url[i]}));
    // }
    // console.log('both', both);
    function CSSignOut() {
        Cookies.set('access', null);
        Cookies.set('refresh', null);
        navigate('/');
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = both.slice(firstPostIndex, lastPostIndex);

    const handleButton = () => {};
    function hideLoad() {
        document.getElementsByClassName('hideLoad')[0].style.display = 'none';
        document.getElementsByClassName('hideLoad')[1].style.display = 'none';
        setLoad(true);
    }

    return (
        <body
        className="App"
        style={{ transform: `scale(${zoom})` }}
    >
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
                    {' '}
                    Collections of the Week <br />
                    <div style={{ fontSize: 20 }}>
                        Follow the top collections trending on
                        <em> NFT Stats</em>
                    </div>
                    <Link
                        to="/RapidAPICollectionsDay"
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
                            {' '}
                            1DAY{' '}
                        </button>
                    </Link>
                    <Link
                        to="/RapidAPICollectionsWeek"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                color: 'darkgray',
                                backgroundColor: 'gray',
                            }}
                        >
                            {' '}
                            7DAY{' '}
                        </button>
                    </Link>
                    <Link
                        to="/RapidAPICollectionsMonth"
                        style={{ color: 'black' }}
                    >
                        <button className="button-days"> 30DAY </button>
                    </Link>
                </h2>

                <RapidApiRows both={currentPosts} />
                <Pagination
                    totalPosts={both.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className="hideLoad">
                <div
                    style={{
                        fontSize: 22,
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 35,
                        marginBottom: -10,
                    }}
                >
                    <h1
                        style={{
                            marginLeft: -180,
                            fontSize: 32,
                            color: 'white',
                            marginBottom: 20,
                        }}
                    >
                        Desktop Tips:
                    </h1>
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                    >
                        <GrCommand
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    {'+'}
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        // eslint-disable-next-line no-restricted-globals
                        onClick={() => location.reload()}
                    >
                        <TbLetterR
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    : Refresh Page
                </div>
                <div
                    style={{
                        fontSize: 22,
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                >
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                    >
                        <GrCommand
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    {'+'}
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        onClick={() => setZoom(zoom + 0.1)}
                    >
                        <AiOutlinePlus
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    : Zoom In
                </div>
                <div
                    style={{
                        fontSize: 22,
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 30,
                            marginRight: 10,
                        }}
                    >
                        <GrCommand
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    {'+'}
                    <button
                        style={{
                            fontSize: 25,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        onClick={() => setZoom(zoom - 0.1)}
                    >
                        <AiOutlineMinus
                            style={{ fontColor: 'white', marginTop: 7 }}
                        />
                    </button>
                    : Zoom Out
                </div>
            </div>
            <button
                className="hideLoad"
                style={{
                    fontSize: 50,
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                    textAlign: 'center',
                    backgroundColor: '#090b0e43',
                    color: 'white',
                    fontFamily: 'Nunito',
                }}
                onClick={hideLoad}
            >
                View the Collection
            </button>
        </body>
    );
}

export default UserList;
