import React from 'react'
import { Row, Col } from 'react-grid-system';

const CryptoSlamRow = ({both}) => {
    return (
        <div>
            <Row style={{ maxHeight: '75px', fontSize: 25, flexWrap: 'nowrap', margin:5 }} >
                <Col style={{ minWidth: 575, maxWidth: 625, textAlign:'left' }}> Collection </Col>
                <Col style={{ minWidth: 150, maxWidth: 300, marginLeft:40, textAlign:'right' }}> Trades </Col>
                <Col style={{ minWidth: 150, maxWidth: 500, textAlign:'right' }}> Sales </Col>
                <Col style={{ minWidth: 150, maxWidth: 500, textAlign:'right' }}> USD Sales </Col> 
                <Col style={{ minWidth: 160, maxWidth: 500, flexWrap: 'wrap', textAlign:'right', marginTop:-20, marginBottom: 15 }}> Buyers / Sellers <br/> </Col> 
            </Row>

            {both.map((row) => {
              return(
                <Row className="row-stripe" style={{ height: '50px',  paddingBottom:30, margin:5, flexDirection:'row', flexWrap: 'nowrap' }} key={row.id}>
                  <Col style={{ maxWidth:50, marginTop:22, textAlign:'center', fontSize:22 }}> {row.index} </Col>
                  <Col style={{ maxWidth: 115, paddingLeft:15 }}> 
                    <img src={row.collectionImageURL} style={{height:80, maxWidth:75}} alt="pfp"></img>  </Col>
                  <Col style={{ minWidth: 450, maxWidth: 500, marginTop:15, fontSize:22 }}>
                    <a href={row.endpoint?row.endpoint:null} target="_blank" rel="noreferrer">{row.collectionName}</a></Col>
                  <Col style={{ minWidth:150, maxWidth: 300, marginTop:27, textAlign:'right', fontSize:18 }}> {row.transactionCount} </Col>
                  <Col style={{ minWidth: 150, maxWidth: 500, marginTop:27, textAlign:'right', fontSize:18 }}> {row.quotes?row.quotes.ETHsales:null} </Col>
                  <Col style={{ minWidth:150, maxWidth: 500, marginTop:27, textAlign:'right', fontSize:18 }}> {row.quotes?row.quotes.USDsales:null} </Col>
                  <Col style={{ minWidth: 160, maxWidth: 500, marginTop:27, textAlign:'right', fontSize:18}}> {row.buyerCount} / {row.sellerCount} </Col>
                 
                </Row>
                )
              })}
	  </div>
    )
}

export default CryptoSlamRow