import './searchCustomer.css'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {Button, Form, Modal} from "react-bootstrap";

function SearchCustomer() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({
        "name": "",
        "address": "",
        "tel": "",
        "note": ""
    })
    const [key, setKey] = useState("")
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showUpdateCustomer, setShowUpdateCustomer] = useState(false);

    const handleClose = () => {
        setShowAddCustomer(false)
        setShowUpdateCustomer(false)
    };
    const handleShowAddCustomer = (e) => {
        e.preventDefault()
        setShowAddCustomer(true);
    }
    const handleShowUpdateCustomer = (e, customer) => {
        e.preventDefault()
        setShowUpdateCustomer(true);
        setCustomer(customer)
    }

    const handleSearchCar = (e, customer) => {
        e.preventDefault()
        navigate("/searchCar", {state: customer})
    }

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            function fetchData() {
                axios.get("/api/customer/getAllCustomers", config).then(res => {
                    setCustomers([...res.data.data])
                })
            }

            fetchData()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }, [])

    const onChangeAdd = (e) => {
        const {name, value} = e.target;
        setCustomer(customer => ({
            ...customer,
            [name]: value
        }))
    }

    const onChangeUpdate = (e) => {
        const {name, value} = e.target;
        setCustomer(customer => ({
            ...customer,
            [name]: value
        }))
    }

    const searchHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "name": key
            }
        };

        try {
            const {data} = await axios.get("/api/customer/search", config);
            setCustomers(data.data)
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const addHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            const {data} = await axios.post("/api/customer/add", customer, config)
            if (data.status === "ok") {
                alert("Thêm khách hàng thành công")
                setShowAddCustomer(false)
                window.location.reload()
            }

        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const updateHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            console.log(customer)
            const {data} = await axios.put("/api/customer/updateCustomer/" + customer.id, customer, config)
            if (data.status === "ok") {
                alert("Cập nhật khách hàng thành công")
                setShowUpdateCustomer(false)
                window.location.reload()
            }

        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const handleDeleteCustomer = async (e, id) => {
        e.preventDefault();

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            }
        };

        try {
            await axios.delete("/api/customer/deleteCustomer/" + id, config);
            alert("Xoá khách hàng thành công")
            window.location.reload()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    return (
        <div className="searchCustomer">
            {/*Form add customer*/}
            <>
                <Modal show={showAddCustomer} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin khách hàng</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleClose}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nhập tên khách hàng:</Form.Label>
                                <Form.Control type="text" placeholder="Tên khách hàng"
                                              name="name"
                                              onChange={onChangeAdd}
                                              value={customer.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Nhập địa chỉ:</Form.Label>
                                <Form.Control type="text" placeholder="Địa chỉ"
                                              onChange={onChangeAdd}
                                              name="address"
                                              value={customer.address}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTel">
                                <Form.Label>Nhập số điện thoại:</Form.Label>
                                <Form.Control type="text" placeholder="Số điện thoại"
                                              name="tel"
                                              onChange={onChangeAdd}
                                              value={customer.tel}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Nhập ghi chú:</Form.Label>
                                <Form.Control type="text" placeholder="Ghi chú"
                                              name="note"
                                              onChange={onChangeAdd}
                                              value={customer.note}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button variant="primary" onClick={addHandler}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/*Form update customer*/}
            <>
                <Modal show={showUpdateCustomer} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin khách hàng</Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleClose}
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nhập tên khách hàng:</Form.Label>
                                <Form.Control type="text" placeholder="Tên khách hàng"
                                              name="name"
                                              onChange={onChangeUpdate}
                                              value={customer.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Nhập địa chỉ:</Form.Label>
                                <Form.Control type="text" placeholder="Địa chỉ"
                                              name="address"
                                              onChange={onChangeUpdate}
                                              value={customer.address}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTel">
                                <Form.Label>Nhập số điện thoại:</Form.Label>
                                <Form.Control type="text" placeholder="Số điện thoại"
                                              name="tel"
                                              onChange={onChangeUpdate}
                                              value={customer.tel}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Nhập ghi chú:</Form.Label>
                                <Form.Control type="text" placeholder="Ghi chú"
                                              name="note"
                                              onChange={onChangeUpdate}
                                              value={customer.note}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button variant="primary" onClick={updateHandler}>
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <div className="nav-table">
                <div className="text-manager">QUẢN LÝ KHÁCH HÀNG</div>
                <div className="btn-addCustomer">
                    <a href="/#" className="btn btn-brand btn-elevate" onClick={handleShowAddCustomer}>
                        <i className="bi bi-plus"></i>Thêm mới</a>
                </div>
            </div>
            {/*form search customers*/}
            <div className="form-search">
                <form onSubmit={searchHandler} className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Tìm theo tên khách hàng"
                           aria-label="Search"
                           onChange={(e) => setKey(e.target.value)} value={key}/>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Tìm kiếm</button>
                </form>
                <div className="refresh-page" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"> Cập nhật</i>
                </div>
            </div>
            {/*Table show list customers*/}
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên khách hàng</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col">Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {customers.length ?
                    (customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.tel}</td>
                            <td>{customer.note}</td>
                            <td>
                                <a href="/#" className="btn btn-success btn-icon btn-sm" title="Chọn khách hàng"
                                   onClick={(e) => handleSearchCar(e, customer)}>
                                    <i className="bi bi-check2"></i>
                                </a>
                                <a href="/#" className="btn btn-primary btn-icon btn-sm" title="Cập nhật khách hàng"
                                   onClick={(e) => handleShowUpdateCustomer(e, customer)}>
                                    <i className="bi bi-pencil-fill"></i>
                                </a>
                                <a href="/#" className="btn btn-danger btn-icon btn-sm" title="Xoá khách hàng"
                                   onClick={(e) => handleDeleteCustomer(e, customer.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </a>
                            </td>
                        </tr>
                    ))) :
                    (<tr className="no-search">
                        <td colSpan="6" className="text-center">
                            Không có khách hàng tìm thấy
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>

    );
}

export default SearchCustomer;