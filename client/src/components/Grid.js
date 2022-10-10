import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const App = () => {

 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 const containerStyle = useMemo(() => ({ width: 1000, height: 1000 }), []);
  const gridStyle = useMemo(() => ({ height: 1000, width: 1000 }), []);

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'Collection', filter: true, minWidth: 100},
   {field: 'Floor Price', filter: true, minWidth: 100},
   {field: 'Sales', minWidth: 100},
   {field: 'Average', minWidth: 100},
   {field: '7 Day Volume', minWidth: 100},
 ]);

 // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> {
        return {
        // enableRowGroup: true,
        // enablePivot: true,
        // enableValue: true,
        // sortable: true,
        // filter: true,
        resizable: true,
    };
    }, []);

 // Example of consuming Grid Event
//  const cellClickedListener = useCallback( event => {
//    console.log('cellClicked', event);
//  }, []);

 // Example load data from sever
//  useEffect(() => {
//    fetch('https://www.ag-grid.com/example-assets/row-data.json')
//    .then(result => result.json())
//    .then(rowData => setRowData(rowData))
//  }, []);

// load data from cryptoslam
const [gridData, setGridData] = useState([])
const [resData, setResData] = useState({})

 const options = {
    method: 'GET',
    headers: {
      'X-BLOBR-KEY': 'a9DfAQ0uf3jkmXHbpveGACRNMVJEfP2Z'
    },
  };

  async function onGridReady () {
    const baseURL= 'https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100'
    const response= await axios.get(baseURL, options)
    setResData(response.data)
    setGridData([resData])
    console.log('GridData:', gridData);
  }

//   useEffect(() => {
//     onGridReady()
// },[])

//   const onGridReady = async() => {
//     const response = await axios.get('https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100', options)
//     // .then(response => response.json())
//     // .then((response) => { 
//       setGridData([response.data])
//       console.log('stats data:', gridData)
//     }
    // .catch(err => console.error(err));
  // }
  useEffect(() => {
    onGridReady()
},[])

// const collectionName = Object.entries(resData).map(([key, val], i) => (
//     <p key={i}>
//        <span>data: {resData[key]}</span>
//     </p>
// ))

const collectionName = gridData.map((data, index) => {
    <div key={index}>
    <h1>{data.data}</h1>
    {data.data.map((d, i) => (
        <div key={i}>
            <h3>{d.collectionName}</h3>
        </div>
    ))}
    </div>
    })



console.log('collectionName:',collectionName);



// const dataIndex = gridData.map(function(data){
//     const dataName = dataIndex.map(function(idx){
//     return [`${data.idx.collectionName}`].join('')
//     }
// })

// console.log('collectionName:',collectionName);
// const collectionName = gridData.map(function(data){
//     return [`${data?.data}`].join('')
// })


// const collectionName = {gridData.map(data=>{
//     return(
//     <div key={data.data}>
//         <div>{data.data.rank}</div>
//         {/* <div>{item.rank}</div>
//         <div>{item}</div> */}
//         {/* <div>{item?.favourite?.color}</div>
//         <div>{item?.favourite?.place}</div>
//         <div>{item?.favourite?.food}</div>
//         <div>{item?.favourite?.laptop}</div> */}
//     </div>
//     )
//      })}

// const objKeys = Object.keys(gridData).map((key, index) => {
//     return (
//         <div key={index}
// >
//     <p>
//         {key}: {gridData[key]}
//     </p>
// </div>    
// )
// })
// console.log(Object.keys(gridData));
// console.log(objKeys);


  //   const onGridReady = ((params) => {
//   axios.get('https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100', options)
//   //   .then(response => response.json())
//   //   .then(response => console.log(response))
//     .then(response => response.json())
//     .then(rowData => setRowData(rowData))
//     .catch(err => console.error(err));
//   })

 // Example using Grid's API
//  const buttonListener = useCallback( e => {
//    gridRef.current.api.deselectAll();
//  }, []);
    const onFirstDataRendered = useCallback((params) => {
        gridRef.current.api.sizeColumnsToFit();
    }, []);

 return (
//    <div>

    //  {/* Example using Grid's API */}
    //  {/* <button onClick={buttonListener}>Push Me</button> */}

    //  {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
    //  <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">

       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           onGridReady={onGridReady}
           onFirstDataRendered={onFirstDataRendered}

          

        //    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        //    rowSelection='multiple' // Options - allows click selection of rows

        //    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
             {/* <li>
                {collectionName.slice().join(',  ')}
            </li> */}
            {/* <div>
            {gridData && gridData.map(item=>{
                return(
                <div key={item.data}>
                    <div>{item.data.rank}</div>
                </div>
                )
                 })}
                 </div> */}
        </div>
    </div>
 );
};


export default App;



// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { render } from 'react-dom';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const GridExample = () => {
//   const gridRef = useRef();
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState();
//   const [columnDefs, setColumnDefs] = useState([
//     { field: 'athlete', minWidth: 150 },
//     { field: 'age', minWidth: 70, maxWidth: 90 },
//     { field: 'country', minWidth: 130 },
//     { field: 'year', minWidth: 70, maxWidth: 90 },
//     { field: 'date', minWidth: 120 },
//     { field: 'sport', minWidth: 120 },
//     { field: 'gold', minWidth: 80 },
//     { field: 'silver', minWidth: 80 },
//     { field: 'bronze', minWidth: 80 },
//     { field: 'total', minWidth: 80 },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       resizable: true,
//     };
//   }, []);

//   const onGridReady = useCallback((params) => {
//     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//       .then((resp) => resp.json())
//       .then((data) => setRowData(data));
//   }, []);

//   const onFirstDataRendered = useCallback((params) => {
//     gridRef.current.api.sizeColumnsToFit();
//   }, []);

//   return (
//     <div style={containerStyle}>
//       <div style={gridStyle} className="ag-theme-alpine">
//         <AgGridReact
//           ref={gridRef}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={defaultColDef}
//           onGridReady={onGridReady}
//           onFirstDataRendered={onFirstDataRendered}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// };

// export default GridExample
// render(<GridExample></GridExample>, document.querySelector('#root'));
// render(<GridExample></GridExample>, document.querySelector('#root'));