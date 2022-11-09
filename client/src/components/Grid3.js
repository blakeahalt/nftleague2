/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import axios from 'axios';

function App() {
    // const options = {
    //     method: 'GET',
    //     headers: {
    //     'X-BLOBR-KEY': 'uPxQwc1zhFHR7smpg662xqjtz90VHUlV'
    //     },
    // };

    // const [resData, setResData] = useState({})
    const [rowData, setRowData] = useState([]);

    // function tableData () {
    // const baseURL= 'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100'
    // const response = axios.get(baseURL, options)
    // setResData(response.data)
    // setRowData([response.data])
    // }

    // useEffect(() => {
    //     tableData()
    //     }, [])

    const options = {
        method: 'GET',
        headers: {
            'X-BLOBR-KEY': 'uPxQwc1zhFHR7smpg662xqjtz90VHUlV',
        },
    };

    //   async function onGridReady () {
    //     const baseURL= 'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100'
    //     const response = await axios.get(baseURL, options)
    //     // setResData(response.data)
    //     setRowData([response.data])
    //   }

    //   useEffect(() => {
    //     onGridReady()
    // },[])

    useEffect(() => {
        fetch(
            'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100',
            options
        )
            .then((response) => response.json())
            .then((rowData) => setRowData(rowData));
    }, []);

    // console.log('rowData',rowData);
    // console.log('resData',resData);

    // const postDataArr = [

    // ]
    //     const dataArr = rowData.map((post, index) => {
    //         return (
    //             <tbody>
    //                 <tr key={post.index}>
    //                     <td >{post.data.collectionName}</td>
    //                     <td >{post.data.rank}</td>
    //                 </tr>
    //             </tbody>
    //         )
    //     })
    //     postDataArr.push(dataArr)

    // return (
    //     <div className="App">
    // <table>
    //     <tbody>
    //   <tr>
    //     <th>Collection Name</th>
    //     {/* <th>Rank</th> */}
    //     {/* <th>???</th> */}
    //   </tr>
    //   </tbody>
    //   {postDataArr}
    // </table>
    // </div>

    // )

    // return (
    //     <div className="App">
    //       <table>
    //         {/* <thead> */}
    //           <tr>
    //             <th scope="col">Collection Name</th>
    //             <th scope="col">Rank</th>
    //             {/* <th scope="col">datetime</th> */}
    //           </tr>
    //         {/* </thead> */}
    //         {rowData.map((post, idx) => {
    //             return(
    //         // <tbody key={idx}>
    //             <tr key ={idx}>
    //               <td>{post.data.collectionName}</td>
    //               <td>{post.data.rank}</td>
    //             </tr>
    //         // </tbody>
    //           )}

    //       </table>
    //       </div>
    //   );

    return (
        <div className="App">
            <table>
                <tbody>
                    <tr>
                        <th>Collection Name</th>
                        <th>Rank</th>
                    </tr>
                    {rowData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.data.collectionName}</td>
                                <td>{val.data.rank}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
