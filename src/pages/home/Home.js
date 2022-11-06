import './home.css'
import React, {useState, useEffect} from "react";
import axios from "axios";

const Home = () => {
    const [customers, setCustomers] = useState([])

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

    }, []);

    return (
        <div className='searchCustomer'>
            <h1>Danh sách khách hàng đã thuê xe</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên khách hàng</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Ghi chú</th>
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
    )

}

export default Home

