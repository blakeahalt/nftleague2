/* eslint-disable no-const-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// enum SortingDirection {
//   ASCENDING = "ASCENDING",
//   DESCENDING = "DESCENDING",
//   UNSORTED = "UNSORTED"
// }

const options = {
    method: 'GET',
    headers: {
        'X-BLOBR-KEY': 'uPxQwc1zhFHR7smpg662xqjtz90VHUlV',
    },
};

// async function onGridReady () {
//   const baseURL= 'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100'
//   const res = await axios.get(baseURL, options)
//   // setResData(response.data)
//   // setGridData([response.data])
//   const {results} = res.data
//   console.log(results);

//   return results
// }

const onGridReady = () => {
    return axios
        .get(
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100',
            options
        )
        .then((res) => {
            const { results } = res.data;
            console.log(results);
            return results;
        })
        .catch((err) => {
            console.error(err);
        });
};

// { street: { name: "thing" } } => { streetName: "thing" }
// { street: { name: "thing" } } => { name: "thing" }

const flattenQuote = (quotes) => {
    const quote = quotes[0];
    // console.log(locations);
    const data = [];
    for (const { ETH, USD } of quotes) {
        data.push({
            ETH_prev_sales_vol: ETH.previousSalesVolume,
            ETH_sales_vol: ETH.salesVolume,
            USD_prev_sales_vol: USD.previousSalesVolume,
            USD_sales_vol: USD.salesVolume,
        });
    }

    const flattenedQuoteHeaders = extractObjectKeys(data[0]);
    return { headers: flattenedQuoteHeaders, data };
    // console.log(flattenedLocationHeaders);
};

const extractObjectKeys = (object) => {
    //   let objectKeys: string[] = [];
    const objectKeys = [];

    Object.keys(object).forEach((objectKey) => {
        const value = object[objectKey];
        if (typeof value !== 'object') {
            objectKeys.push(objectKey);
        } else {
            objectKeys = [...objectKeys, ...extractObjectKeys(value)];
        }
    });

    return objectKeys;
};

// const sortData = (
//   data: any,
//   sortKey: string,
// //   sortingDirection: SortingDirection
// ) => {
//   data.sort((a: any, b: any) => {
//     const relevantValueA = a[sortKey];
//     const relevantValueB = b[sortKey];

//     if (
//       sortingDirection === SortingDirection.UNSORTED ||
//       sortingDirection === SortingDirection.ASCENDING
//     ) {
//       if (relevantValueA < relevantValueB) return -1;
//       if (relevantValueA > relevantValueB) return 1;
//       return 0;
//     } else {
//       if (relevantValueA > relevantValueB) return -1;
//       if (relevantValueA < relevantValueB) return 1;
//       return 0;
//     }
//   });
// };

// const getNextSortingDirection = (sortingDirection: SortingDirection) => {
//   if (
//     sortingDirection === SortingDirection.UNSORTED ||
//     sortingDirection === SortingDirection.ASCENDING
//   ) {
//     return SortingDirection.DESCENDING;
//   }
//   return SortingDirection.ASCENDING;
// };

// #0 ASC -> Desc -> Unsorted -> ASC -> Desc
// #1 input field Dok

const getFilteredRows = (rows, filterKey) => {
    return rows.filter(() => {
        return Object.values(rows).some((s) =>
            ('' + s).toLowerCase().includes(filterKey)
        );
    });
};

export default function App() {
    const [people, setPeople] = useState([]);
    const [flattenedQuotes, setFlattenedQuotes] = useState({
        headers: [],
        data: [],
    });
    //   const [sortingDirections, setSortingDirections] = useState({});
    const [inputFieldValue, setInputFieldValue] = useState('');

    const sortColumn = (sortKey) => {
        const newFlattenedQuotes = {
            ...flattenedQuotes,
            data: [...flattenedQuotes.data],
        };

        // const currentSortingDirection = sortingDirections[sortKey];

        // sortData(newFlattenedQuotes.data, sortKey, currentSortingDirection);
        // const nextSortingDirection = getNextSortingDirection(
        //   currentSortingDirection
        // );

        // const newSortingDirections = { ...sortingDirections };
        // newSortingDirections[sortKey] = nextSortingDirection;

        setFlattenedQuotes(newFlattenedQuotes);
        // setSortingDirections(newSortingDirections);
    };

    useEffect(() => {
        onGridReady().then((flattenQuote) => {
            setPeople(flattenQuote);
            const ourFlattenedQuotes = flattenQuote(
                flattenQuote.map(({ quote }) => quote)
            );
            setFlattenedQuotes(ourFlattenedQuotes);
            const { headers } = ourFlattenedQuotes;
            //   const ourSortingDirections = {};
            //   for (const header of headers) {
            //     ourSortingDirections[header] = SortingDirection.UNSORTED;
            //   }
            //   setSortingDirections(ourSortingDirections);
        });
    }, []);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <input
                value={inputFieldValue}
                onChange={(e) => {
                    setInputFieldValue(e.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        {flattenedQuotes.headers.map(
                            (QuoteString, QuoteIdx) => (
                                <th
                                    key={QuoteIdx}
                                    onClick={() => {
                                        sortColumn(QuoteString);
                                    }}
                                >
                                    {QuoteString}
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {getFilteredRows(flattenedQuotes.data, inputFieldValue).map(
                        (Quote, QuoteIdx) => (
                            <tr key={QuoteIdx}>
                                {flattenedQuotes.headers.map(
                                    (header, headerIdx) => (
                                        <td key={headerIdx}>{Quote[header]}</td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
