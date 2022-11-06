import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

const FormCar = ({show, handleClose, data, act}) => {
    const [showForm, setShowForm] = useState(show)
    const [car, setCar] = useState({
        "name": "",
        "licensePlate": "",
        "model": "",
        "type": "",
        "description": ""
    });

    useEffect(() => {

        console.log("LOGGG")

        setCar({
            "id": data ? data.id : "",
            "name": data ? data.name : "",
            "licensePlate": data ? data.licensePlate : "",
            "model": data ? data.model : "",
            "type": data ? data.type : "",
            "description": data ? data.description : ""
        })
        setShowForm(show)
    }, [show, data])

    const onChange = (e) => {
        const {name, value} = e.target;
        setCar(car => ({
            ...car,
            [name]: value ? value : ""
        }))
    }

    const handleForm = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };
        try {
            if (act === "add") {
                const {data} = await axios.post("/api/car/add/", car, config)
                if (data.status === "ok") {
                    alert("Thêm xe thành công")
                    window.location.reload()
                }
            } else if (act === "update") {
                const {data} = await axios.put("/api/car/updateCar/" + car.id, car, config)
                if (data.status === "ok") {
                    alert("Cập nhật xe thành công")
                    window.location.reload()
                }
            }
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }
    }
    return (
        <div>
            <>
                <Modal show={showForm} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Nhập thông tin xe</Modal.Title>
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
                                              name="name"
                                              onChange={onChange}
                                              value={car.name}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Nhập biển số:</Form.Label>
                                <Form.Control type="text" placeholder="Biển số"
                                              onChange={onChange}
                                              name="licensePlate"
                                              value={car.licensePlate}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTel">
                                <Form.Label>Nhập mẫu xe:</Form.Label>
                                <Form.Control type="text" placeholder="Mẫu xe"
                                              name="model"
                                              onChange={onChange}
                                              value={car.model}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTel">
                                <Form.Label>Nhập loại xe:</Form.Label>
                                <Form.Control type="text" placeholder="Loại xe"
                                              name="type"
                                              onChange={onChange}
                                              value={car.type}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Nhập mô tả:</Form.Label>
                                <Form.Control type="text" placeholder="Mô tả"
                                              name="description"
                                              onChange={onChange}
                                              value={car.description}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Huỷ
                        </Button>
                        {act === "add" ? (<Button variant="primary" onClick={handleForm}>
                            Thêm
                        </Button>) : (
                            <Button variant="primary" onClick={handleForm}>
                                Cập nhật
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
}

export default FormCar;