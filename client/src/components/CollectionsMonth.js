/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

function UserList() {
    const [rowDataSalesMonth, setRowDataSalesMonth] = useState([]);

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
        fetch('https://top-nft-sales.p.rapidapi.com/collections/30d', options)
            .then((response) => response.json())
            .then((rowDataSalesMonth) =>
                setRowDataSalesMonth(rowDataSalesMonth)
            );
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
                                    {' '}
                                    Top Sales{' '}
                                </a>
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/collectionsday"
                                >
                                    {' '}
                                    Top Collections{' '}
                                </a>
                                <a
                                    className="nav-link active"
                                    href="/profile"
                                >
                                    {' '}
                                    Profile{' '}
                                </a>
                                <a
                                    className="nav-link active"
                                    href="nftlist"
                                >
                                    {' '}
                                    Browse{' '}
                                </a>
                                <a
                                    className="nav-link active"
                                    href="/"
                                >
                                    {' '}
                                    Sign Out{' '}
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
                    Top Collections{' '}
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
                        to="/CollectionsDay"
                        style={{ color: 'black' }}
                    >
                        <button className="button-days"> 1DAY </button>
                    </Link>

                    <Link
                        to="/CollectionsWeek"
                        style={{ color: 'black' }}
                    >
                        <button className="button-days"> 7DAY </button>
                    </Link>

                    <Link
                        to="/CollectionsMonth"
                        style={{ color: 'black' }}
                    >
                        <button
                            className="button-days"
                            style={{
                                backgroundColor: 'gray',
                                color: 'darkgray',
                            }}
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
                        Collection{' '}
                    </Col>
                    <Col
                        style={{
                            minWidth: 180,
                            maxWidth: 400,
                            paddingLeft: 100,
                        }}
                    >
                        {' '}
                        Trades{' '}
                    </Col>
                    <Col style={{ maxWidth: 200, marginRight: 20 }}>
                        {' '}
                        Volume{' '}
                    </Col>
                </Row>

                {rowDataSalesMonth.map((row) => {
                    return (
                        <Row
                            className="row-stripe"
                            style={{
                                height: '50px',
                                margin: 5,
                                paddingBottom: 30,
                            }}
                            key={row.id}
                        >
                            <Col style={{ maxWidth: 200, marginTop: 27 }}>
                                {' '}
                                {row.id}{' '}
                            </Col>
                            <Col
                                style={{
                                    minWidth: 250,
                                    maxWidth: 500,
                                    marginTop: 15,
                                }}
                            >
                                <a
                                    href={row.collection_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {' '}
                                    {row.collection}{' '}
                                </a>
                            </Col>
                            <Col
                                style={{
                                    minWidth: 180,
                                    maxWidth: 400,
                                    marginTop: 27,
                                    paddingLeft: 110,
                                }}
                            >
                                {' '}
                                {row.trades}{' '}
                            </Col>
                            <Col style={{ maxWidth: 200, marginTop: 27 }}>
                                {' '}
                                {row.volume}{' '}
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </>
    );
}

export default UserList;
