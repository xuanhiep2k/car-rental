import './searchCar.css'
import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

function SearchCar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSearchCar, setShowSearchCar] = useState(false);
    const [errors, setErrors] = useState("")
    const [name, setName] = useState("");
    const [customer, setCustomer] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const today = new Date();
    const handleClose = () => {
        setShowSearchCar(false)
        navigate("/searchCustomer")
    };

    useEffect(() => {
        setShowSearchCar(true)
        setCustomer(location.state);
    }, [location])

    const handleSearchCar = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "name": name,
                "startDate": startDate,
                "endDate": endDate
            }
        };
        if (name.length > 0) {
            try {
                const {data} = await axios.get("/api/car/search", config);
                navigate("/chooseCar", {state: {data, customer, name, startDate, endDate}})
            } catch (error) {
                setTimeout(() => {
                }, 5000);
            }

        } else {
            setErrors("Vui lòng nhập tên xe")
        }
    }

    return (
        <div><>
            <Modal show={showSearchCar} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Tìm kiếm xe đang rảnh</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" onClick={handleClose}
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nhập tên xe:</Form.Label>
                            <Form.Control type="text" placeholder="Tên xe"
                                          name="tel"
                                          onChange={(e) => setName(e.target.value)}
                            />
                            {errors ? (<p style={{"color": "red"}}>{errors}</p>) : ""}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStartDate">
                            <Form.Label>Nhập ngày bắt đầu:</Form.Label>
                            <DatePicker className="form-control"
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        minDate={today}
                                        dateFormat="yyyy-MM-dd"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStartDate">
                            <Form.Label>Nhập ngày kết thúc:</Form.Label>
                            <DatePicker className="form-control"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        minDate={startDate}
                                        dateFormat="yyyy-MM-dd"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSearchCar}>
                        Tìm xe
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        </div>
    );
}

export default SearchCar;