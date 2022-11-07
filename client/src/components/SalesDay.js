/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

function UserList() {
    const [rowDataSales1, setRowDataSales1] = useState([]);

    const options = {
        method: 'GET',
        // url: 'https://top-nft-sales.p.rapidapi.com/sales/30d',
        headers: {
            'X-RapidAPI-Key':
                '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
            'X-RapidAPI-Host': 'top-nft-sales.p.rapidapi.com',
        },
    };

    useEffect(() => {
        fetch('https://top-nft-sales.p.rapidapi.com/sales/1d', options)
            .then((response) => response.json())
            .then((rowDataSales1) => setRowDataSales1(rowDataSales1));
    }, []);

    return (
        <>
            <div className="navbar-link">
                <nav
                    className="navbar navbar-dark bg-primary"
                    id="mainNav"
                >
                    <div className="navbar-brand">
                        <div
                            className="nav-link"
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-title">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/salesweek"
                                >
                                    Top Sales
                                </a>
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/collectionsday"
                                >
                                    Top Collections
                                </a>
                                <a
                                    class="nav-link active"
                                    href="/profile"
                                >
                                    Profile
                                </a>
                                <a
                                    className="nav-link active"
                                    href="nftlist"
                                >
                                    Browse
                                </a>
                                <a
                                    className="nav-link active"
                                    href="/GoogleApp"
                                >
                                    Sign Out
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <br />
            </div>

            <div
                className="container"
                style={{ minWidth: 650 }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: 42,
                        marginTop: 0,
                        marginBottom: 10,
                    }}
                >
                    {' '}
                    Top NFT Sales{' '}
                </h2>
                <div
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        marginTop: -10,
                        marginBottom: 20,
                    }}
                >
                    <Link
                        to="/SalesDay"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                marginLeft: 10,
                                fontSize: 15,
                                padding: 5,
                                backgroundColor: 'gray',
                                color: 'lightgray',
                            }}
                        >
                            {' '}
                            1DAY{' '}
                        </button>
                    </Link>
                    <Link
                        to="/SalesWeek"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{ marginLeft: 10, fontSize: 15, padding: 5 }}
                        >
                            {' '}
                            7DAY{' '}
                        </button>
                    </Link>
                    <Link
                        to="/SalesMonth"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{ marginLeft: 10, fontSize: 15, padding: 5 }}
                        >
                            {' '}
                            30DAY{' '}
                        </button>
                    </Link>
                </div>

                <Row
                    style={{
                        height: '75px',
                        fontSize: 25,
                        flexWrap: 'nowrap',
                        marginTop: 20,
                        marginBottom: -20,
                    }}
                >
                    <Col
                        style={{ minWidth: 250, maxWidth: 500, marginLeft: 20 }}
                    >
                        {' '}
                        NFT{' '}
                    </Col>
                    <Col
                        style={{ minWidth: 180, maxWidth: 400, marginLeft: 50 }}
                    >
                        {' '}
                        Date{' '}
                    </Col>
                    <Col
                        style={{
                            maxWidth: 200,
                            marginRight: 20,
                            marginLeft: 40,
                        }}
                    >
                        {' '}
                        Price{' '}
                    </Col>
                </Row>

                {rowDataSales1.map((row) => {
                    return (
                        <Row
                            className="row-stripe"
                            style={{
                                height: '50px',
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 5,
                                paddingTop: 5,
                                paddingBottom: 15,
                            }}
                            key={row.id}
                        >
                            <Col
                                style={{
                                    minWidth: 250,
                                    maxWidth: 500,
                                    marginTop: 8,
                                }}
                            >
                                <a
                                    href={row.nft_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {' '}
                                    {row.nft_name}{' '}
                                </a>
                                <br />
                                <a
                                    href={row.collection_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ fontSize: 12 }}
                                >
                                    {' '}
                                    View Collection{' '}
                                </a>
                            </Col>
                            <Col
                                style={{
                                    minWidth: 180,
                                    maxWidth: 400,
                                    marginTop: 18,
                                    marginBottom: 10,
                                    marginLeft: 50,
                                }}
                            >
                                {' '}
                                {row.date}{' '}
                            </Col>
                            <Col
                                style={{
                                    maxWidth: 200,
                                    marginTop: 18,
                                    marginLeft: 40,
                                }}
                            >
                                {' '}
                                {row.price}{' '}
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </>
    );
}

export default UserList;
