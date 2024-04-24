import './App.css';
import {Route,Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import BuisnessPage from './pages/BuisnessPage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import VenuesPage from './pages/VenuesPage';
import VenuesFormPage from './pages/VenuesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/account'  element={<ProfilePage />}/>
        <Route path='/account/places'  element={<VenuesPage />}/>
        <Route path='/account/places/new'  element={<VenuesFormPage />}/>
        <Route path='/account/places/:id'  element={<VenuesFormPage />}/>
        <Route path='/place/:id' element={<PlacePage />}/>
        <Route path='/account/bookings' element={<BookingsPage />} />
        <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
