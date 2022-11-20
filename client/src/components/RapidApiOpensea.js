import axios from 'axios';
import { useState } from 'react';
import React from 'react';

function App() {
    const [test, setTest] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://opensea13.p.rapidapi.com/events',
        params: {
            only_opensea: 'false',
            token_id: '3361',
            asset_contract_address:
                '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
        },
        headers: {
            'X-RapidAPI-Key':
                '4570549f7fmsh1d6e0134d2e42e7p1a6c5djsnee67d790da9a',
            'X-RapidAPI-Host': 'opensea13.p.rapidapi.com',
        },
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            setTest(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

    return <div>Test: {[test]}</div>;
}
export default App;
