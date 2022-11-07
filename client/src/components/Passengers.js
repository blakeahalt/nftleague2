/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import axios from 'axios';

function Passengers() {
    const pageNumberLimit = 5;
    const [passengersData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);
    const [rowDataSales, setRowDataSales] = useState([]);
    const [stats, setStats] = useState([]);

    // const options = {
    //     method: 'GET',
    //     // url: 'https://top-nft-sales.p.rapidapi.com/sales/30d',
    //     headers: {
    //       'X-RapidAPI-Key': '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
    //       'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com'
    //     }
    //   };

    //   useEffect(() => {
    //     setLoading(true);
    //     fetch(`https://top-nft-sales.p.rapidapi.com/collections/7d`, options)
    //       .then(response => response.json())
    //       .then((json) => { setData(json); setLoading(false);});

    //     }, [currentPage]);
    //     // console.log("passengersData",passengersData );

    // const options = {method: 'GET', headers: {accept: 'application/json'}};

    // async function getStats() {
    //     const baseURL = "https://api.opensea.io/api/v1/collection/boredapeyachtclub"
    //     const response = await axios.get(baseURL, options)
    //     setStats([response.data])
    //     console.log('stats data:', stats)
    // }

    // useEffect(() => {
    //     getStats()
    // }, [])

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.opensea.io/api/v1/collection/boredapeyachtclub`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            });
    }, []);
    console.log('data:', passengersData);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage((prev) => prev - 1);
    };

    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage((prev) => prev + 1);
    };

    const paginationAttributes = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        response: passengersData,
    };

    return (
        <div>
            <h2>Passenger List</h2>
            {!loading ? (
                <Pagination
                    {...paginationAttributes}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    onPageChange={onPageChange}
                />
            ) : (
                <div> Loading... </div>
            )}
        </div>
    );
}
export default Passengers;
