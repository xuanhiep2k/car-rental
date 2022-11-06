import './app.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import SearchCustomer from "./pages/searchCustomer/SearchCustomer";
import Home from "./pages/home/Home";
import SearchCar from "./pages/searchCar/SearchCar";
import ChooseCar from "./pages/chooseCar/ChooseCar";
import Contract from "./pages/contract/Contract";
import Car from "./pages/car/Car";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/searchCar' element={<SearchCar/>}/>
                    <Route path='/searchCustomer' element={<SearchCustomer/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/chooseCar' element={<ChooseCar/>}/>
                    <Route path='/contract' element={<Contract/>}/>
                    <Route path='/car' element={<Car/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
