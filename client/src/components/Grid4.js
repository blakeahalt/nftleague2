import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "../ag-grid.css";


import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { LargeTextCellEditor } from 'ag-grid-community';

function App() {

  const [rowData, setRowData] = useState([]);
  const [image, setImage] = useState('')

  const gridRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      'X-BLOBR-KEY': '3umu1UZgYigFYvNRCr9v5ZvbhWt8cCit'
    },
  };

  useEffect(() => {
    fetch('https://api.cryptoslam.io/im6pi8nxcs120nhb/v1/collections/top-100', options)
    .then(response => response.json())
    .then(rowData => setRowData(rowData.data))
}, [])

const postDataArr = []

const collectionName = rowData.map(post => ({
  rank:post.rank, 
  collection:post.collectionName, 
  image:post.collectionImageURL, 
  // salesVolume: post.data[i].quote
})
)

// console.log('collectionName:',collectionName);
postDataArr.push(collectionName)
// console.log('postDataArr:',postDataArr);

const imageFormatter = ({value}) => {
  return (
  <span>
    <img src={value} width="35px" height="35px" alt="collection pic"/>
  </span>
  )
}

let width = 100

const onGridSizeChanged = (params) => {
  let columnCount = params.columnApi.columnModel.gridColumns.length
  width = params.clientWidth / columnCount
  params.api.sizeColumnsToFit();
};

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

  const [columnDefs, setColumnDefs] = useState([
  {field: 'rank', headerName:'', width:0, cellClass:"ag-rank-row"},   
  {field: 'image', headerName:'Rank', headerClass:"ag-image-header", cellRenderer: imageFormatter, cellClass:"ag-image-row", width:25},     
  {field: 'collection', headerClass:"ag-collection-header", width:350, cellClass:"ag-collection-row" },
  
    // {field: 'price'}
  ]);

  const defaultColDef = useMemo( ()=> (
    {
      // sortable: true, 
      // filter: true,
      resizeable: true
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

//   useEffect(() => {
//     fetch('https://www.ag-grid.com/example-assets/row-data.json')
//     .then(result => result.json())
//     .then(rowData => setRowData(rowData))
//   }, []);

  // const buttonListener = useCallback( e => {
  //   gridRef.current.api.deselectAll();
  // }, []);




//   const dataArr = rowData.map((post) => {
//     return (
//         <tbody>
//             <tr key={post.index}>
//                 <td >{post.data.collectionName}</td>
//                 <td >{post.data.rank}</td>
//             </tr>
//         </tbody>
//     )
// })



    

  return (
    // <div>
    //   {/* <button onClick={buttonListener}>Push Me</button> */}
    //   <div className="ag-theme-alpine" style={{width: 1300, height: 800}}>
    //   {/* <div className="ag-theme-alpine" style={{width: 1300, height: 750}}> */}
    <>
  <nav className="navbar navbar-dark bg-primary" id="mainNav">
    <div className="navbar-brand">

      {/* <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Freidardao&psig=AOvVaw2pScq1totzTkPmAE_BgzjR&ust=1665309783256000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCICh0cKw0PoCFQAAAAAdAAAAABAJ"></span>
      </button> */}
      <div className="nav-link" id="navbarNavAltMarkup">
        <div className="navbar-title">
          <a className="nav-link active" aria-current="page" href='/grid'>Home</a>
          <a className="nav-link" href="/profile">Profile</a>
          <a className="nav-link" href="#">Browse</a>
          <a className="nav-link">Sign Out</a>
        </div>
      </div>
  {/* <a class="navbar-title" href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Freidardao&psig=AOvVaw2pScq1totzTkPmAE_BgzjR&ust=1665309783256000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCICh0cKw0PoCFQAAAAAdAAAAABAJ">NFT League</a> */}
    </div>
  </nav>

<br/>
      <div style={{ width: '1250px', height: '650px' }}>
        <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>
            <div
                id="myGrid"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                className="ag-theme-alpine"
            >
        <AgGridReact 
            ref={gridRef}
            rowData={postDataArr[0]} 
            columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            imageFormatter={imageFormatter}
            defaultColDef={defaultColDef}
            onGridSizeChanged={onGridSizeChanged}
            onFirstDataRendered={onFirstDataRendered}
            >
              <AgGridColumn field="Rank" width={width} sortable={true} filter={true}/>
              <AgGridColumn field="Collection" width={width}></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  </div>

  </>
  );
}

export default App;