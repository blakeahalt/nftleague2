/* eslint-disable @typescript-eslint/no-unused-vars */
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notification from './components/Notification';
import Register from './components/Register';
// import Test from './components/Test';
// import GoogleLogin from './components/GoogleLogin'
// import GoogleLogout from './components/GoogleLogout'
import GoogleApp from './components/Login3';
import GLogout from './components/GoogleLogout';
import Added from './components/Added';
import Profile from './components/Profile3';
import NFTList from './components/NFTList';
import LineChart from './components/LineChart';
import SalesMonth from './components/SalesMonth';
import SalesWeek from './components/SalesWeek';
import SalesDay from './components/SalesDay';
import RapidApiCollectionDay from './components/RapidApiDay_Collection';
import RapidApiCollectionWeek from './components//RapidApiWeek_Collection';
import RapidApiCollectionMonth from './components//RapidApiMonth_Collection';
import CryptoSlamCollectionDay from './components/CollectionsDayCS';
import CryptoSlamCollectionWeek from './components/CollectionsWeekCS';
import CryptoSlamCollectionMonth from './components/CollectionsMonthCS';
import CryptoSlamSalesDay from './components/SalesDay';
import CryptoSlamSalesWeek from './components/SalesWeek';
import CryptoSlamSalesMonth from './components/SalesMonth';
import Pagination from './components/Pagination';
import Passengers from './components/Passengers';
import DataTable from './components/DataTable';
import { composeFunctions } from 'rsuite/esm/utils';
import ProtectRoutes from './components/ProtectRoutes2';
import Cookies from 'js-cookie';

function App() {
    return (
        <div className="App">
            <div>
                <main className="App">
                    <Routes>
                        <Route
                            exact
                            path="/register"
                            element={<Register />}
                        />
                        <Route
                            exact
                            path="/profile"
                            element={<Profile />}
                        />
                        <Route
                            exact
                            path="/"
                            element={<GoogleApp />}
                        />
                        <Route
                            exact
                            path="/googleapp"
                            element={<GoogleApp />}
                        />
                        <Route
                            exact
                            path="/login"
                            element={<GoogleApp />}
                        />
                        <Route
                            exact
                            path="/logout"
                            element={<GLogout />}
                        />
                        <Route
                            exact
                            path="/NFTList"
                            element={<NFTList />}
                        />
                        <Route
                            path="/"
                            element={
                                <ProtectRoutes
                                // accessToken={Cookies.get('refresh')}
                                />
                            }
                        >
                            <Route
                                path="/CryptoSlamSalesMonth"
                                element={<SalesMonth />}
                            />
                            <Route
                                path="/CryptoSlamSalesWeek"
                                element={<SalesWeek />}
                            />
                            <Route
                                path="/CryptoSlamSalesDay"
                                element={<SalesDay />}
                            />
                            <Route
                                path="/RapidAPICollectionsDay"
                                element={<RapidApiCollectionDay />}
                            />
                            <Route
                                path="/RapidAPICollectionsWeek"
                                element={<RapidApiCollectionWeek />}
                            />
                            <Route
                                path="/RapidAPICollectionsMonth"
                                element={<RapidApiCollectionMonth />}
                            />
                            <Route
                                path="/CryptoSlamCollectionsDay"
                                element={<CryptoSlamCollectionDay />}
                            />
                            <Route
                                path="/CryptoSlamCollectionsWeek"
                                element={<CryptoSlamCollectionWeek />}
                            />
                            <Route
                                path="/CryptoSlamCollectionsMonth"
                                element={<CryptoSlamCollectionMonth />}
                            />
                        </Route>
                        {/* <Route exact path="/register" element={<Registration/>}/> */}
                        {/* <Route exact path="/main" element={<Main/>}/> */}
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
