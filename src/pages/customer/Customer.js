import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormCustomer from "../../components/form/FormCustomer";

function Customer(props) {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({
        "name": "",
        "address": "",
        "tel": "",
        "note": ""
    })
    const [totalElements, setTotalElements] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [active, setActive] = useState(1);
    const number = [];
    const [key, setKey] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [act, setAct] = useState("");

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }

    const handleClose = () => {
        setShowModal(false);
        setCustomer({
            "name": "",
            "address": "",
            "tel": "",
            "note": "",
        })
    };

    const handleShowModal = (e, customer, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setCustomer(customer)
        setShowModal(true);
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "pageNumber": 0,
                "pageSize": 5,
                "sortDirection": "ASC",
                "sortBy": "name"
            }
        };
        try {
            function fetchData() {
                axios.get("/api/customer/getAllCustomers", config).then(res => {
                    setCustomers([...res.data.data.content])
                    setTotalPages(res.data.data.totalPages)
                    setTotalElements(res.data.data.totalElements)
                })
            }

            fetchData()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }, [])

    const paginate = async (e, i) => {
        e.preventDefault();
        setActive(i)

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "name": key,
                "pageNumber": i - 1,
                "pageSize": 5,
                "sortDirection": "ASC",
                "sortBy": "name"
            }
        };

        try {
            const {data} = await axios.get("/api/customer/search", config);
            setCustomers([...data.data.content])
            setTotalPages(data.data.totalPages)
            setTotalElements(data.data.totalElements)
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

            {/*Form add and update car*/}
            <FormCustomer show={showModal} handleClose={handleClose} data={customer} act={act}/>

            <div className="nav-table">
                <div className="text-manager">
                    <i className="bi bi-layers"></i>
                    QUẢN LÝ KHÁCH HÀNG
                </div>
                <div className="btn-addCustomer">
                    <a href="/#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowModal(e, customer, "add")}>
                        <i className="bi bi-plus"></i>Thêm mới</a>
                </div>
            </div>

            {/*form search customers*/}
            <div className="form-search">
                <form onSubmit={(e) => paginate(e, 1)} className="input-group mb-3">
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
            <table className="table table-bordered table-hover">
                <thead>
                <tr className="table-primary">
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
                                <a href="/#" className="btn btn-primary btn-icon btn-sm" title="Cập nhật khách hàng"
                                   onClick={(e) => handleShowModal(e, customer, "update")}>
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

            (Trang {active}/{totalPages}) (Tổng {totalElements} kết quả)
            {/*pagination*/}
            <div className="paging-custom">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className={"page-item" + (active === 1 ? " disabled" : "")}>
                            <a onClick={(e) => paginate(e, active - 1)}
                               className="page-link" href="/#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {number.map(i => (
                            <li key={i} onClick={(e) => paginate(e, i)}
                                className={"page-item" + (i === active ? " active" : "")}>
                                <a className="page-link" href="!#">{i}</a>
                            </li>
                        ))}
                        <li
                            className={"page-item" + (active === totalPages ? " disabled" : "")}>
                            <a onClick={(e) => paginate(e, active + 1)}
                               className="page-link" href="/!#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );
}

export default Customer;