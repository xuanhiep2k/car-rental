import './car.css'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormCar from "../../components/form/FormCar";

function Car() {
    const [cars, setCars] = useState([])
    const [car, setCar] = useState({
        "name": "",
        "licensePlate": "",
        "model": "",
        "type": "",
        "description": ""
    })
    const [totalElements, setTotalElements] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [active, setActive] = useState(1);
    const number = [];
    const [key, setKey] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [act, setAct] = useState("");

    // set number page
    for (let i = 1; i <= totalPages; i++) {
        number.push(i)
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "pageNumber": pageNumber - 1,
                "pageSize": 5,
                "sortDirection": "ASC",
                "sortBy": "name"
            }
        };
        try {
            function fetchData() {
                axios.get("/api/car/getAllCars", config).then(res => {
                    setCars([...res.data.data.content])
                    setTotalPages(res.data.data.totalPages)
                    setTotalElements(res.data.data.totalElements)
                })
            }

            fetchData()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }, [pageNumber])

    const handleClose = () => {
        setShowModal(false);
        setCar({
            "name": "",
            "licensePlate": "",
            "model": "",
            "type": "",
            "description": ""
        })
    }

    const handleShowModal = (e, car, isAct) => {
        e.preventDefault()
        setAct(isAct)
        setCar(car)
        setShowModal(true);
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
            const {data} = await axios.get("/api/car/searchCarByName", config);
            setCars(data.data)
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
            await axios.delete("/api/car/deleteCar/" + id, config);
            alert("Xoá xe thành công")
            window.location.reload()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    const paginate = (e, i) => {
        e.preventDefault()

        setPageNumber(i)
        setActive(i)

        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
            params: {
                "pageNumber": i - 1,
                "pageSize": 5,
                "sortDirection": "ASC",
                "sortBy": "name"
            }
        };
        try {
            function fetchData() {
                axios.get("/api/car/getAllCars", config).then(res => {
                    setCars([...res.data.data.content])
                    setTotalPages(res.data.data.totalPages)
                    setTotalElements(res.data.data.totalElements)
                })
            }

            fetchData()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }

    return (
        <div className="car">

            {/*Form add and update car*/}
            <FormCar show={showModal} handleClose={handleClose} data={car} act={act}/>

            <div className="nav-table">
                <div className="text-manager">QUẢN LÝ XE</div>
                <div className="btn-addCustomer">
                    <a href="!#" className="btn btn-brand btn-elevate"
                       onClick={(e) => handleShowModal(e, car, "add")}>
                        <i className="bi bi-plus"></i>Thêm mới</a>
                </div>
            </div>

            {/*form search customers*/}
            <div className="form-search">
                <form onSubmit={searchHandler} className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Tìm theo tên xe"
                           aria-label="Search"
                           onChange={(e) => setKey(e.target.value)} value={key}/>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Tìm kiếm</button>
                </form>
                <div className="refresh-page" onClick={() => window.location.reload()}>
                    <i className="bi bi-arrow-clockwise"> Cập nhật</i>
                </div>
            </div>

            {/*Table show list cars*/}
            <table className="table">
                <thead>
                <tr>
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
                            <td>
                                <a href="/#" className="btn btn-primary btn-icon btn-sm" title="Cập nhật khách hàng"
                                   onClick={(e) => handleShowModal(e, car, "update")}>
                                    <i className="bi bi-pencil-fill"></i>
                                </a>
                                <a href="/#" className="btn btn-danger btn-icon btn-sm" title="Xoá khách hàng"
                                   onClick={(e) => handleDeleteCustomer(e, car.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </a>
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

export default Car;