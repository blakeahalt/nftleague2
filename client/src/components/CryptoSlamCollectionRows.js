import React from 'react';
import { Row, Col } from 'react-grid-system';

const CryptoSlamRow = ({ both }) => {
    return (
        <div>
            <Row
                style={{
                    maxHeight: '75px',
                    fontSize: 25,
                    flexWrap: 'wrap',
                    margin: 5,
                }}
            >
                <Col
                    style={{ minWidth: 525, maxWidth: 625, textAlign: 'left' }}
                >
                    Collection
                </Col>
                <Col
                    style={{
                        minWidth: 150,
                        maxWidth: 300,
                        marginLeft: 40,
                        textAlign: 'right',
                    }}
                >
                    Trades
                </Col>
                <Col
                    style={{ minWidth: 150, maxWidth: 300, textAlign: 'right' }}
                >
                    Price
                </Col>
                <Col
                    style={{
                        minWidth: 160,
                        maxWidth: 500,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                        marginTop: -20,
                        marginBottom: 15,
                    }}
                >
                    Buyers / Sellers <br />
                </Col>
            </Row>

            {both.map((row, id) => {
                return (
                    <Row
                        className="row-stripe"
                        style={{
                            height: '100px',
                            paddingBottom: 0,
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                        }}
                        key={id}
                    >
                        <Col
                            style={{
                                maxWidth: 50,
                                marginTop: 35,
                                marginLeft: 5,
                                textAlign: 'right',
                                fontSize: 22,
                            }}
                        >
                            {row.index}
                        </Col>
                        <Col style={{ maxWidth: 115, paddingLeft: 15 }}>
                            <img
                                src={row.collectionImageURL}
                                style={{
                                    height: 80,
                                    maxWidth: 80,
                                    verticalAlign: -75,
                                    borderRadius: 15,
                                }}
                                alt="pfp"
                            ></img>
                        </Col>
                        <Col
                            style={{
                                minWidth: 375,
                                maxWidth: 500,
                                marginTop: 18,
                                fontSize: 22,
                            }}
                        >
                            <a
                                href={row.endpoint ? row.endpoint : null}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {row.collectionName}
                            </a>
                        </Col>
                        <Col
                            style={{
                                minWidth: 200,
                                maxWidth: 300,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.transactionCount}
                        </Col>
                        <Col
                            style={{
                                minWidth: 150,
                                marginTop: 25,
                                marginLeft: 40,
                                marginRight: 15,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.quotes ? row.quotes.ETHsales : null}
                            <div
                                style={{
                                    fontSize: 15,
                                    marginTop: 5,
                                    color: '#a0a0a0',
                                }}
                            >
                                {row.quotes ? row.quotes.USDsales : null}
                            </div>
                        </Col>
                        <Col
                            style={{
                                minWidth: 160,
                                maxWidth: 500,
                                marginTop: 27,
                                marginRight: 20,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.buyerCount} / {row.sellerCount}
                        </Col>
                    </Row>
                );
            })}
        </div>
    );
};

export default CryptoSlamRow;
