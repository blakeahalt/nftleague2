import { React } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Notification from './components/Notification'
import Register from './components/Register';
// import Test from './components/Test';
// import GoogleLogin from './components/GoogleLogin'
// import GoogleLogout from './components/GoogleLogout'
import GoogleApp from './components/GoogleApp3'
import GLogin from './components/Login2'
import GLogout from './components/GoogleLogout'
import Added from './components/Added'
import Profile from './components/Profile3'
import NFTList from './components/NFTList'
import LineChart from './components/LineChart'
import SalesMonth from './components/SalesMonth'
import SalesWeek from './components/SalesWeek'
import SalesDay from './components/SalesDay'
import RapidApiCollectionDay from './components/RapidApiDay_Collection'
import RapidApiCollectionWeek from './components//RapidApiWeek_Collection'
import RapidApiCollectionMonth from './components//RapidApiMonth_Collection'
import CryptoSlamDay from './components/CollectionsDayCS'
import CryptoSlamWeek from './components/CollectionsWeekCS'
import CryptoSlamMonth from './components/CollectionsMonthCS'
import Pagination from './components/Pagination';
import Passengers from './components/Passengers';
import DataTable from './components/DataTable';
import { composeFunctions } from 'rsuite/esm/utils';

function App() {

  return (
    <div className="App">
      <div>
        <main className='App'>
          <Routes>
            {/* <Route exact path="/" element={<Login/>}/> */}
            {/* <Route exact path="/api" element={<Api/>}/> */}
            <Route exact path="/register/" element={<Register />} />
            <Route exact path="/notification" element={<Notification />} />
            {/* <Route exact path="/test" element={<Test/>}/> */}
            <Route exact path="/profile" element={<Profile />} />
            {/* <Route exact path="/GoogleLogin" element={<GoogleLogin/>}/>
            <Route exact path="/GoogleLogout" element={<GoogleLogout/>}/> */}
            <Route exact path="/" element={<GoogleApp />} />
            <Route exact path="/googleapp" element={<GoogleApp />} />
            <Route exact path="/login" element={<GLogin />} />
            <Route exact path="/logout" element={<GLogout />} />
            <Route exact path="/add" element={<Added />} />
            <Route exact path="/NFTList" element={<NFTList />} />
            <Route exact path="/LineChart" element={<LineChart />} />
            <Route exact path="/SalesMonth" element={<SalesMonth />} />
            <Route exact path="/SalesWeek" element={<SalesWeek />} />
            <Route exact path="/SalesDay" element={<SalesDay />} />
            <Route exact path="/RapidAPICollectionsDay" element={<RapidApiCollectionDay />} />
            <Route exact path="/RapidAPICollectionsWeek" element={<RapidApiCollectionWeek />} />
            <Route exact path="/RapidAPICollectionsMonth" element={<RapidApiCollectionMonth />} />
            <Route exact path="/CryptoSlamDay" element={<CryptoSlamDay />} />
            <Route exact path="/CryptoSlamWeek" element={<CryptoSlamWeek />} />
            <Route exact path="/CryptoSlamMonth" element={<CryptoSlamMonth />} />
            <Route exact path="/DataTable" element={<DataTable />} />

            <Route exact path="/pages" element={<Pagination />} />
            <Route exact path="/passengers" element={<Passengers />} />
            {/* <Route exact path="/register" element={<Registration/>}/> */}
            {/* <Route exact path="/main" element={<Main/>}/> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;