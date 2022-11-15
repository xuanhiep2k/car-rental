import './app.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import SearchCustomer from "./pages/searchCustomer/SearchCustomer";
import Home from "./pages/home/Home";
import SearchCar from "./pages/searchCar/SearchCar";
import ChooseCar from "./pages/chooseCar/ChooseCar";
import Contract from "./pages/contract/Contract";
import Car from "./pages/car/Car";
import SideBar from "./components/sidebar/SideBar";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Customer from "./pages/customer/Customer";

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <div className="main">
                {localStorage.getItem("user") ?
                    <SideBar/> : ""}
                <div className="app">
                    <Navbar/>
                    <div className="main-content">
                        <Routes>
                            <Route exact path='/' element={<Home/>}/>
                            <Route path='/customer' element={<Customer/>}/>
                            <Route path='/searchCar' element={<SearchCar/>}/>
                            <Route path='/searchCustomer' element={<SearchCustomer/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/chooseCar' element={<ChooseCar/>}/>
                            <Route path='/contract' element={<Contract/>}/>
                            <Route path='/car' element={<Car/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
