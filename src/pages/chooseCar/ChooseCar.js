import './chooseCar.css'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";

function ChooseCar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [carChecked, setCarChecked] = useState([]);

    // get data from search car
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [customer, setCustomer] = useState({});

    // get data from input to seacrh
    const [name, setName] = useState("");
    const [license, setLicense] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setCars(location.state.data.data)
        setName(location.state.name)
        setStartDate(location.state.startDate)
        setEndDate(location.state.endDate)
        setCustomer(location.state.customer)
    }, [location])

    // handle continue
    const toggleChange = () => {
        navigate("/contract", {state: {carChecked, customer, startDate, endDate}})
    }

    // handle search
    const searchHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "name": name,
                "licensePlate": license,
                "model": model,
                "type": type,
                "startDate": startDate,
                "endDate": endDate
            }
        };

        try {
            const {data} = await axios.get("/api/car/filter", config);
            setCars(data.data)
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }
    return (
        <div className="choose-car" id="contract">
            <div className="nav-table">
                <div className="text-manager">
                    <i className="bi bi-layers"></i>
                    CHỌN XE ĐỂ THUÊ
                </div>
                <div className="btn-addCustomer">
                    <a href="/#" className="btn btn-brand btn-elevate">
                        <i className="bi bi-plus"></i>Thêm mới</a>
                </div>
            </div>

            <div className="form-search">
                <form onSubmit={searchHandler}>
                    <div className="input-group">
                        <div className="m-1">
                            <label htmlFor="">Tên xe</label>
                            <span className="input-group-addon">
                                <i className="bi bi-search"></i>
                            </span>
                            <input style={{"paddingLeft": "32px"}} className="form-control mr-sm-2" type="search"
                                   placeholder="Tìm theo tên xe"
                                   aria-label="Search"
                                   defaultValue={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="m-1">
                            <label htmlFor="">Biển số</label>
                            <input className="form-control mr-sm-2" type="search" placeholder="Tìm theo biển số"
                                   aria-label="Search"
                                   onChange={(e) => setLicense(e.target.value)}/>
                        </div>

                        <div className="m-1">
                            <label htmlFor="">Mẫu xe</label>
                            <input className="form-control mr-sm-2" type="search" placeholder="Tìm theo mẫu xe"
                                   aria-label="Search"
                                   onChange={(e) => setModel(e.target.value)}/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="">Loại xe</label>
                            <input className="form-control mr-sm-2" type="search" placeholder="Tìm theo loại xe"
                                   aria-label="Search"
                                   onChange={(e) => setType(e.target.value)}/>
                        </div>

                        <div className="m-1">
                            <label htmlFor="">Nhập ngày bắt đầu:</label>
                            <DatePicker className="form-control mr-sm-2"
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        dateFormat="yyyy-MM-dd"/>
                        </div>

                        <div className="m-1">
                            <label htmlFor="">Nhập ngày kết thúc:</label>
                            <DatePicker className="form-control mr-sm-2"
                                        selected={endDate}
                                        onChange={(date: Date) => setEndDate(date)}
                                        minDate={startDate}
                                        dateFormat="yyyy-MM-dd"/>
                        </div>
                    </div>
                    <div className="m-1">
                        <button className="btn btn-primary" type="submit">Tìm kiếm</button>
                    </div>

                </form>
                <div className="nav-mix">
                    <div className="back-page" onClick={() => navigate("/searchCustomer")}>
                        <i className="bi bi-arrow-return-left"> Quay lại
                        </i>
                    </div>
                    <div className="refresh-page" onClick={() => window.location.reload()}>
                        <i className="bi bi-arrow-clockwise"> Cập nhật</i>
                    </div>
                </div>

            </div>
            {/*Table show list cars*/}
            <table className="table table-bordered table-hover">
                <thead>
                <tr className="table-primary">
                    <th scope="col">#</th>
                    <th scope="col">Tên xe</th>
                    <th scope="col">Biển số</th>
                    <th scope="col">Mẫu xe</th>
                    <th scope="col">Loại xe</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {cars.length ?
                    (cars.map((car, index) => (
                        <tr key={car.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{car.name}</td>
                            <td>{car.licensePlate}</td>
                            <td>{car.model}</td>
                            <td>{car.type}</td>
                            <td>{car.description}</td>
                            <td className="checkBox">
                                <input type="checkbox"
                                       onChange={(e) => {
                                           e.target.checked ?
                                               setCarChecked([...carChecked, car]) :
                                               setCarChecked(
                                                   carChecked.filter((item) => item.id !== car.id),
                                               )
                                       }}
                                       value={carChecked}/>
                            </td>
                        </tr>
                    ))) :
                    (<tr className="no-search">
                        <td colSpan="6" className="text-center">
                            Không có xe tìm thấy
                        </td>
                    </tr>)}

                </tbody>
            </table>
            <button className="btn-continue btn btn-primary" type="submit" onClick={toggleChange}>Tiếp tục</button>
        </div>
    );
}

export default ChooseCar;