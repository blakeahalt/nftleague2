import React from 'react';
import { Row, Col } from 'react-grid-system';

const CryptoSlamRow = ({ both }) => {
    // console.log(both);
    return (
        <div>
            <Row
                style={{
                    height: '75px',
                    fontSize: 25,
                    flexWrap: 'nowrap',
                    marginBottom: -10,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexGrow: 3,
                }}
            >
                <Col style={{ minWidth: 625, marginLeft: 20 }}>NFT Sale</Col>
                <Col style={{ minWidth: 180, marginLeft: 50 }}>Date</Col>
                <Col style={{ marginRight: 25, marginLeft: 40 }}>Price</Col>
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
                        <Col
                            style={{
                                maxWidth: 115,
                                textAlign: 'center',
                            }}
                        >
                            <a
                                href={row.fullUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={
                                        row.tokens[0].imageURL
                                            ? /https:\/\/cryptoslam-svgimages\.s3\.amazonaws\.com\/0x4e1f41613c9084fdb9e34e11fae9412427480e56\/\d+\.png/.test(
                                                  row.tokens[0].imageURL
                                              )
                                                ? 'https://d35vxokfjoq7rk.cloudfront.net/metaplex:SolArcBxTW8op2Q8CHA5TEUqZ6VpT18SN9i9Kxvjj9vxmkgWrM/EjdTkPnpuEkTx9KWF4o54EYKxFrPjB3Bma7bFJeneuYa-0.png?d=60'
                                                : row.tokens[0].imageURL
                                            : 'https://d35vxokfjoq7rk.cloudfront.net/metaplex:SolArcBxTW8op2Q8CHA5TEUqZ6VpT18SN9i9Kxvjj9vxmkgWrM/EjdTkPnpuEkTx9KWF4o54EYKxFrPjB3Bma7bFJeneuYa-0.png?d=60'
                                    }
                                    style={{
                                        height: 80,
                                        maxWidth: 80,
                                        verticalAlign: -75,
                                        borderRadius: 15,
                                    }}
                                    alt="no pfp"
                                ></img>
                            </a>
                        </Col>
                        <Col
                            style={{
                                minWidth: 375,
                                maxWidth: 450,
                                marginTop: 18,
                                fontSize: 22,
                            }}
                        >
                            <a
                                href={row.fullUrl}
                                // href={row.endpoint ? row.endpoint : null}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {row.collectionSaleName}
                            </a>
                            <br />
                            <a
                                href={row.collectionUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: 12, marginLeft: 5 }}
                            >
                                View Collection
                            </a>
                        </Col>
                        <Col
                            style={{
                                marginTop: 25,
                                marginBottom: 10,
                                marginLeft: 50,
                                textAlign: 'right',
                                fontSize: 20,
                            }}
                        >
                            {row.timeElapsed}
                        </Col>
                        <Col
                            style={{
                                marginTop: 25,
                                marginLeft: 40,
                                marginRight: 25,
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
                    </Row>
                );
            })}
        </div>
    );
};

export default CryptoSlamRow;
