import './profileScreen.css';
import {useState, useEffect} from "react";
import axios from "axios";

const ProfileScreen = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        };

        try {
            function fetchData() {
                axios.get("/api/user/getAllUsers", config).then(res => {
                    setUsers([...res.data.data])
                })
            }

            fetchData()
        } catch (error) {
            setTimeout(() => {
            }, 5000);
        }

    }, []);

    return (
        <div className='loginScreen'>
            {users.map((user, index) => (
                <div>NAME: {user.id}</div>

            ))}
        </div>
    )

}

export default ProfileScreen