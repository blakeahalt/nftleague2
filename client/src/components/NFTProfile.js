import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import {Stack} from 'rsuite'

import "rsuite/dist/rsuite.min.css";


function Profile({newCS}) {
    const [stats, setStats] = useState([])
    const [collection, setCollection] = useState([])
    const [collectionSearch, setCollectionSearch] = useState('')
    
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    async function getStats() {
        const baseURL = `https://api.opensea.io/api/v1/collection/${newCS}/stats`
        const response = await axios.get(baseURL, options)
        setStats([response.data])
        console.log('stats data:', stats)
    }

    useEffect(() => {
        getStats()
    },[])

    const name = collection.map(function(stat){
        return [`${stat.collection.name}`]
    })

    const image_url = collection.map(function(stat){
        return [`${stat.collection.image_url}`]
    })

    const floor_price = stats.map(function(stat){
        return [`${stat.stats.floor_price}`].join('')
    })

    const seven_day_volume = stats.map(function(stat){
        return [`${stat.stats.seven_day_volume.toFixed(2)}`].join('')
    })
    console.log('floor price:',seven_day_volume);
    
    const seven_day_average_price = stats.map(function(stat){
        return [`${stat.stats.seven_day_average_price.toFixed(2)}`].join('')
    })
    console.log('7 Day Avg Price:',seven_day_average_price);
   
    const seven_day_sales = stats.map(function(stat){
        return [`${stat.stats.seven_day_sales}`].join('')
    })
    console.log('7 Day Avg Price:',seven_day_sales);
    
    const average_price = stats.map(function(stat){
        return [`${stat.stats.average_price.toFixed(2)}`].join('')
    })
    console.log('Average Price:',average_price);


    async function getCollection() {
        const baseURL = `https://api.opensea.io/api/v1/collection/${newCS}`
        const response = await axios.get(baseURL, options)
        setCollection([response.data])
    }
    console.log('collection data:', collection);
    
    // function onClick() {
    //     getCollection()
    //     }
    
    useEffect(() => {
        getCollection()
    },[])


    function callFunctions(){
        getStats();
        getCollection();
      }

return(
    <>
        {/* <input
            type="text"
            onChange={(e) => setCollectionSearch(e.target.value)}
            placeholder="Collection Name"
        ></input>  */}
       {/* {setCollectionSearch=newCS.setCollectionSearch} */}
        {/* <button onClick={callFunctions}>Submit</button> */}
        {/* <Stack direction="row" spacing={2}> */}
        <p>{name}</p>
        <img src={image_url} height="100" alt="URL"/>
        <p>Floooor Price: {floor_price} ETH</p>
        {/* <p>Average Price: {average_price}</p> */}
        <p>7 Day Volume: {seven_day_volume} ETH</p>
        <p>7 Day Sales: {seven_day_sales}</p>
        <p>7 Day Avg Price: {seven_day_average_price} ETH</p>
        <br/>
        <br/>
        {/* </Stack> */}

    </>
)

}

export default Profile