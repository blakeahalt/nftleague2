import { React } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Notification from './components/Notification'
import Register from './components/Register';
import Test from './components/Test';
import GoogleLogin from './components/GoogleLogin'
import GoogleLogout from './components/GoogleLogout'
import GoogleApp from './components/GoogleApp'
import Login from './components/Login'
import Added from './components/Added'

function App() {

  return (
    <div className="App">
        <div>
        <main className='App'>
          <Routes>
            {/* <Route exact path="/" element={<Login/>}/> */}
            {/* <Route exact path="/api" element={<Api/>}/> */}
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/notification" element={<Notification/>}/>
            <Route exact path="/test" element={<Test/>}/>
            <Route exact path="/GoogleLogin" element={<GoogleLogin/>}/>
            <Route exact path="/GoogleLogout" element={<GoogleLogout/>}/>
            <Route exact path="/" element={<GoogleApp/>}/>
            <Route exact path="/googleapp" element={<GoogleApp/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/add" element={<Added/>}/>
            {/* <Route exact path="/register" element={<Registration/>}/> */}
            {/* <Route exact path="/main" element={<Main/>}/> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;