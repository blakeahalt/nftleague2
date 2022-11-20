import { React, useState, useEffect } from 'react';

function TimeElapsed() {
    const [rowDataSales, setRowDataSales] = useState([]);

    const CSoptions = {
        method: 'GET',
        headers: {
            'X-BLOBR-KEY': '3Q5omwBMURG6qbahoT3MVBa7RjOkNpbg',
        },
    };

    useEffect(() => {
        fetch(
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/sales/top-100?timeRange=day',
            CSoptions
        )
            .then((response) => response.json())
            .then((rowDataSales) => setRowDataSales(rowDataSales.data));
    }, []);

    const timeElapsed = [];
    for (const x of rowDataSales) {
        const start = new Date(`${x.saleAt}`); // milliseconds count from 1 Jan 1970
        const end = Date.now();
        // const y = `${end - start}`;
        const y = `${end - start}`;
        const z =
            y < 3600000
                ? `< 1 hour ago`
                : 3600000 < y && y < 7200000
                ? '1 hour ago'
                : 7200000 < y && y < 10800000
                ? '2 hours ago'
                : 10800000 < y && y < 14400000
                ? '3 hours ago'
                : 14400000 < y && y < 18000000
                ? '4 hours ago'
                : 18000000 < y && y < 21600000
                ? '5 hours ago'
                : 21600000 < y && y < 25200000
                ? '6 hours ago'
                : 25200000 < y && y < 28800000
                ? '7 hours ago'
                : 28800000 < y && y < 32400000
                ? '8 hours ago'
                : 32400000 < y && y < 36000000
                ? '9 hours ago'
                : 36000000 < y && y < 39600000
                ? '10 hours ago'
                : 39600000 < y && y < 43200000
                ? '11 hours ago'
                : 43200000 < y && y < 46800000
                ? '12 hours ago'
                : 46800000 < y && y < 50400000
                ? '13 hours ago'
                : 50400000 < y && y < 54000000
                ? '14 hours ago'
                : 54000000 < y && y < 57600000
                ? '15 hours ago'
                : 57600000 < y && y < 61200000
                ? '16 hours ago'
                : 61200000 < y && y < 64800000
                ? '17 hours ago'
                : 64800000 < y && y < 68400000
                ? '18 hours ago'
                : 68400000 < y && y < 72000000
                ? '19 hours ago'
                : 72000000 < y && y < 75600000
                ? '20 hours ago'
                : 75600000 < y && y < 79200000
                ? '21 hours ago'
                : 79200000 < y && y < 82800000
                ? '22 hours ago'
                : 82800000 < y && y < 86400000
                ? '23 hours ago'
                : 86400000 < y && y < 172800000
                ? '1 day ago'
                : 172800000 < y && y < 259200000
                ? '2 days ago'
                : 259200000 < y && y < 345600000
                ? '3 days ago'
                : 345600000 < y && y < 432000000
                ? '4 days ago'
                : 432000000 < y && y < 518400000
                ? '5 days ago'
                : 518400000 < y && y < 604800000
                ? '6 days ago'
                : 604800000 < y && y < 1209600000
                ? '1 week ago'
                : 604800000 < y && y < 1814400000
                ? '2 weeks ago'
                : 1814400000 < y && y < 2419200000
                ? '3 weeks ago'
                : null;

        timeElapsed.push(z);
    }
    return timeElapsed;
}
// console.log('timeElapsed:', timeElapsed);
export default TimeElapsed;
