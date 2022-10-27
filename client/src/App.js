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
import Grid from './components/SalesWeek'
import SalesMonth from './components/SalesMonth'
import SalesWeek from './components/SalesWeek'
import SalesDay from './components/SalesDay'
import CollectionsDay from './components/CollectionsDay'
import CollectionsWeek from './components/CollectionsWeek'
import CollectionsMonth from './components/CollectionsMonth'
import EncryptionHandler from './components/EncryptionHandler'

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
            <Route exact path="/Grid" element={<Grid />} />
            <Route exact path="/SalesMonth" element={<SalesMonth />} />
            <Route exact path="/SalesWeek" element={<SalesWeek />} />
            <Route exact path="/SalesDay" element={<SalesDay />} />
            <Route exact path="/CollectionsDay" element={<CollectionsDay />} />
            <Route exact path="/CollectionsWeek" element={<CollectionsWeek />} />
            <Route exact path="/CollectionsMonth" element={<CollectionsMonth />} />
            {/* <Route exact path="/register" element={<Registration/>}/> */}
            {/* <Route exact path="/main" element={<Main/>}/> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;