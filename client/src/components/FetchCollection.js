/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import RapidApiRows from './RapidApiRows';
import { Link } from 'react-router-dom';
import Pagination from './Pagination2';
import axios from 'axios';

const FetchCollection = ({ both }) => {
    const [rowDataSales, setRowDataSales] = useState([]);
    const [openSeaData, setopenSeaData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [load, setLoad] = useState(true);

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
    const url_string = 'https://www.nft-stats.com/collection/';
    const err_str =
        'https://www.nft-stats.com/collection/galaxy-oat-tjiiovcgdq';
    for (const x of rowDataSales) {
        if (
            x.collection_url ==
            'https://www.nft-stats.com/collection/galaxy-oat-tjiiovcgdq'
        ) {
            x.collection_url.replace(
                err_str,
                'https://www.nft-stats.com/collection/galaxy-oat-poly'
            );
        } else {
            const y = x.collection_url.replace(
                url_string,
                'https://api.opensea.io/api/v1/collection/'
            );
            endpoints.push(y);
        }
    }

    // console.log("endpoints:",endpoints);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const promises = [];

    // useEffect(()=> {
    async function getCollectionData() {
        for (const url of endpoints) {
            const response = await axios.get(url, OSoptions);
            // .then((result) => {
            promises.push(response.data.collection);
            setopenSeaData(
                promises.map((x) => ({
                    name: x.name,
                    image_url: x.image_url,
                    stats: x.stats,
                }))
            );
            // console.log("promises", promises);
        }
    }

    // }, [])

    // getCollectionData()

    // useEffect(()=> {
    getCollectionData();
    // }, [])

    // Merge object arrays allows mapping from just one array: preserves row structure below (both.map{...})
    const indexArray = Array(100)
        .fill(1)
        .map((n, i) => n + i);
    // console.log(indexArray);
    const collection_url = rowDataSales.map((x) => ({
        collection_url: x.collection_url,
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
            { collection_url: collection_url[i - 1] }
        )
    );
    return <div> yo </div>;
};
export default FetchCollection;
