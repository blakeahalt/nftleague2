import React from 'react';
import { Row, Col } from 'react-grid-system';

const RapidAPIRow = ({ both }) => {
    return (
        <div>
            <Row
                style={{
                    maxHeight: '75px',
                    fontSize: 25,
                    flexWrap: 'nowrap',
                    marginBottom: 10,
                }}
            >
                <Col
                    style={{ minWidth: 100, maxWidth: 100, paddingLeft: 100 }}
                ></Col>
                <Col
                    style={{
                        minWidth: 455,
                        maxWidth: 530,
                        marginLeft: -95,
                        marginTop: 25,
                    }}
                >
                    Collection
                </Col>
                <Col
                    style={{
                        minWidth: 102,
                        maxWidth: 200,
                        marginLeft: 125,
                        marginTop: 25,
                        textAlign: 'right',
                    }}
                >
                    Trades
                </Col>
                <Col
                    style={{
                        minWidth: 102,
                        maxWidth: 400,
                        marginTop: 25,
                        textAlign: 'right',
                    }}
                >
                    Volume
                </Col>
                <Col
                    style={{
                        minWidth: 102,
                        maxWidth: 400,
                        marginTop: 25,
                        textAlign: 'right',
                    }}
                >
                    Floor
                </Col>
                <Col
                    style={{ minWidth: 102, maxWidth: 400, textAlign: 'right' }}
                >
                    Avg. Price
                </Col>
                <Col
                    style={{
                        minWidth: 160,
                        maxWidth: 400,
                        marginRight: 10,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                    }}
                >
                    Owners / Supply
                </Col>
                {/* <Col style={{ minWidth: 160, maxWidth: 400, textAlign:'right', marginRight:10, flexWrap: 'nowrap' }}> Market Cap </Col>  */}
            </Row>

            {both.map((row, id) => {
                return (
                    <Row
                        className="row-stripe"
                        style={{
                            height: '100px',
                            paddingBottom: 0,
                            flexDirection: 'row',
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
                        <Col
                            style={{
                                minHeight: 75,
                                maxWidth: 100,
                                paddingLeft: 15,
                            }}
                        >
                            <img
                                src={row.image_url}
                                style={{
                                    height: 80,
                                    maxWidth: 75,
                                    verticalAlign: -75,
                                    borderRadius: 15,
                                }}
                                alt="pfp"
                            ></img>
                        </Col>
                        <Col
                            style={{
                                minWidth: 450,
                                maxWidth: 500,
                                marginTop: 8,
                                fontSize: 22,
                            }}
                        >
                            {row.name}
                            <br />
                            <a
                                href={row.OSLink}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: 14, marginRight: 12 }}
                            >
                                OpenSea
                            </a>
                            <a
                                href={row.NFTstatsLink}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: 14, marginRight: 12 }}
                            >
                                NFTStats
                            </a>
                            {/* <a href={row.IcyToolsLink} target="_blank" rel="noreferrer" style={{fontSize:14, marginRight:12}}>IcyTools</a> */}
                            {/* <a href={row.RaribleLink} target="_blank" rel="noreferrer" style={{fontSize:14, marginRight:12}}>Rarible</a> */}
                        </Col>
                        <Col
                            style={{
                                minWidth: 100,
                                maxWidth: 200,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.stats.seven_day_sales
                                ? row.stats.seven_day_sales.toFixed(0)
                                : 'N/D'}
                        </Col>
                        <Col
                            style={{
                                minWidth: 102,
                                maxWidth: 400,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.collection_url
                                ? row.collection_url.volume
                                : null}
                        </Col>
                        <Col
                            style={{
                                minWidth: 102,
                                maxWidth: 400,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.stats.floor_price
                                ? `${row.stats.floor_price.toFixed(3)}Ξ`
                                : 'N/D'}
                        </Col>
                        <Col
                            style={{
                                minWidth: 102,
                                maxWidth: 400,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                            }}
                        >
                            {row.stats.seven_day_average_price
                                ? `${row.stats.seven_day_average_price.toFixed(
                                      3
                                  )}Ξ`
                                : 'N/D'}
                        </Col>
                        <Col
                            style={{
                                minWidth: 160,
                                maxWidth: 400,
                                marginTop: 27,
                                textAlign: 'right',
                                fontSize: 18,
                                marginRight: 10,
                                flexWrap: 'wrap',
                            }}
                        >
                            {row.stats.num_owners
                                ? row.stats.num_owners
                                : 'N/D'}
                            / {row.stats.count ? row.stats.count : 'N/D'}
                        </Col>
                        {/* <Col style={{ minWidth: 160, maxWidth: 400, marginTop:27, textAlign:'right', fontSize:18, marginRight:10 }}> {row.stats.market_cap?row.stats.market_cap.toFixed(3):"N/D"}</Col> */}
                    </Row>
                );
            })}
        </div>
    );
};

export default RapidAPIRow;
