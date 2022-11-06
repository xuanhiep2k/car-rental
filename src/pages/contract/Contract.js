import './contract.css'
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import VNnum2words from 'vn-num2words';
import axios from "axios";

function Contract() {
    const location = useLocation();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const [cars, setCars] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [cost, setCost] = useState(0);
    const [rentals, setRentals] = useState([])
    const [collateral, setCollateral] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setCustomer(location.state.customer)
        setCars(location.state.carChecked)
        setStartDate(location.state.startDate)
        setEndDate(location.state.endDate)

        let temp = cars.map(item => {
            return {
                id: null,
                car: item
            }
        })
        setRentals(temp)
    }, [location, cars])

    const handleSubmit = async () => {
        const contract = {
            "price": cost,
            "startRent": startDate,
            "endRent": endDate,
            "note": "note",
            "dateCreate": new Date(),
            "collateral": collateral,
            "customer": customer,
            "rentals": rentals,
            "bill": {
                "paymentType": "",
                "paymentDate": new Date(),
                "note": "",
                "user": JSON.parse(localStorage.getItem("user"))
            }
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            }
        }
        window.print()
        await axios.post("/api/contract/saveContract", contract, config);
        navigate("/")
    }

    const handleCancel = () => {
        navigate("/searchCustomer")
    }
    return (
        <div className="contract lead">
            <div>
                <h3 className="font-weight-bold d-flex justify-content-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <h4 className="d-flex justify-content-center">Độc Lập – Tự Do – Hạnh Phúc</h4>
            </div>
            <br/><br/>
            <h1 className="name font-weight-bold d-flex justify-content-center">
                HỢP ĐỒNG THUÊ XE
            </h1>
            <hr/>
            <i>Hôm nay, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm 2022, chúng tôi gồm:</i>
            <div className="customer-info">
                <p><b>Thông tin khách hàng:</b> (Bên thuê A)</p>
                <div className="info">
                    <p>&emsp;- Họ và tên: {customer.name}</p>
                    <p>&emsp;- Địa chỉ: {customer.address}</p>
                    <p>&emsp;- Số điện thoại: {customer.tel}</p>
                </div>
            </div>
            <div className="user-info">
                <p><b>Thông tin người đại diện:</b> (Bên cho thuê B)</p>
                <div className="info"><p>&emsp;- Họ và tên: {user.fullName}</p></div>
            </div>
            <div className="car-info">
                <p><b>Danh sách xe thuê:</b> (Kiểm tra xe trực tiếp)</p>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên xe</th>
                        <th scope="col">Biển số</th>
                        <th scope="col">Mẫu xe</th>
                        <th scope="col">Loại xe</th>
                        <th scope="col">Mô tả</th>
                    </tr>
                    </thead>
                    <tbody>

                    {cars.map((car, index) => (
                        <tr key={car.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{car.name}</td>
                            <td>{car.licensePlate}</td>
                            <td>{car.model}</td>
                            <td>{car.type}</td>
                            <td>{car.description}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            <div className="contract-content">
                <p>Sau khi bàn bạc, thỏa thuận, hai bên thống nhất ký kết Hợp đồng thuê xe với các điều khoản như
                    sau:</p>
                <p className="font-weight-bold">ĐIỀU 1: NỘI DUNG HỢP ĐỒNG</p>
                <p>Bên A đồng ý thuê của bên B thuê {cars.length} xe ô tô. <br/>
                    {cars.map(car => (
                        <span key={car.id}><i>&emsp; + Xe {car.name} {car.model} biển số kiểm soát {car.licensePlate}
                            </i><br/></span>
                    ))}
                </p>
                <p className="font-weight-bold">ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG, PHƯƠNG THỨC THANH TOÁN</p>
                <p>- Giá tiền cọc là:
                    <input className="form-control mr-sm-2" type="search"
                           placeholder="Nhập tiền cọc"
                           aria-label="Search"
                           onChange={(e) => setCost(e.target.value)}/>
                    {cost.length ? (
                        <b><i>{VNnum2words(cost).toString().substring(0, 1).toUpperCase() + VNnum2words(cost).toString().substring(1)} đồng.</i></b>
                    ) : ("")}
                    <i> (Giá trên đã bao gồm thuế GTGT)</i>
                </p>
                <p>- Tài sản thế chấp:
                    <input className="form-control mr-sm-2" type="search"
                           placeholder="Nhập tài sản thế chấp"
                           aria-label="Search"
                           onKeyUp={(e) => setCollateral(e.target.value)}/>
                    <p>Thế chấp: <b><i>{collateral}</i></b></p>
                </p>
                <p> - Thời gian thuê từ ngày: <b><i>{moment(new Date(startDate)).format("DD/MM/YYYY")}</i></b> đến
                    ngày <b><i>{moment(new Date(endDate)).format("DD/MM/YYYY")}</i></b>.
                </p>
                <p>- Bên A sẽ thanh toán cho Bên B theo (Hình thức thanh toán).</p>
                <p className="font-weight-bold">ĐIỀU 3: TRÁCH NHIỆM CỦA CÁC BÊN</p>
                <p>
                    <b><i>3.1. Trách nhiệm của bên B:</i></b> <br/>
                    - Giao xe và toàn bộ giấy tờ liên quan đến xe ngay sau khi Hợp đồng có hiệu lực và Bên A đã thanh
                    toán tiền thuê xe 01 tháng đầu tiên. Giấy tờ liên quan đến xe gồm: Giấy đăng ký xe, giấy kiểm định,
                    giấy bảo hiểm xe. <br/>
                    - Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe. <br/>
                    - Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của Hợp đồng. <br/>
                    - Xuất hóa đơn thuê xe: 1 tháng / lần.
                </p>
                <p>
                    <b><i>3.2. Trách nhiệm, quyền hạn của bên A</i></b><br/>
                    - Thanh toán tiền thuê xe cho Bên B đúng hạn. <br/>
                    - Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ. <br/>
                    - Chịu toàn bộ chi phí xăng dầu khi sử dụng xe. <br/>
                </p>
                <p className="font-weight-bold">ĐIỀU 4: HIỆU LỰC HỢP ĐỒNG</p>
                <p>
                    - Hợp đồng có giá trị kể từ
                    ngày <b><i>{moment(new Date()).format("DD/MM/YYYY")}</i></b> đến hết
                    ngày <b><i>{moment(new Date(endDate)).format("DD/MM/YYYY")}.</i></b> <br/>
                    - Nếu một trong hai Bên, bên nào muốn chấm dứt Hợp đồng trước thời hạn thì phải thông báo cho Bên
                    kia trươc ít nhất 01 tháng.
                </p>
                <p className="font-weight-bold">ĐIỀU 5: ĐIỀU KHOẢN CHUNG</p>
                <p>- Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau bằng văn
                    bản để cùng bàn bạc giải quyết. <br/>
                    - Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi,
                    đình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật. <br/>
                    - Hợp đồng này có hiệu lực từ ngày ký và coi như được thanh lý sau khi hai bên thực hiện xong nghĩa
                    vụ của mình và không còn bất kỳ khiếu nại nào. <br/>
                    Hợp đồng được lập thành 02 (bốn) bản có giá trị pháp lý như nhau, Bên A giữ 01 bản. Bên B giữ 01
                    bản. <br/>
                </p>
                <p className="d-flex justify-content-around"><b>ĐẠI DIỆN BÊN A</b><b>ĐẠI DIỆN BÊN B</b></p><br/><br/>
            </div>
            <button onClick={handleSubmit} className="btn btn-continue btn btn-primary">Xác nhận</button>
            <button onClick={handleCancel} className="btn btn-continue btn btn-primary">Huỷ</button>
        </div>
    );
}

export default Contract;