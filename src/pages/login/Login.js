import './login.css';
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const negative = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            negative("/");
        }
    }, [negative]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        };

        try {
            const {data} = await axios.post("/api/user/login", {username, password}, config);
            localStorage.setItem("accessToken",data.accessToken)
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.reload()
            negative("/");
        } catch (error) {
            alert('Mật khẩu không đúng')
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    return (
        <div className='loginScreen'>
            <h1><strong>Chào mừng! </strong>Vui lòng đăng nhập</h1>
            <form onSubmit={loginHandler}>
                {error && <span className="error-message">{error}</span>}
                <fieldset>
                    <p>
                        <input type="text" required id="username" placeholder="Enter username"
                               onChange={(e) => setUsername(e.target.value)} value={username} tabIndex={1}/>
                    </p>
                    <p>
                        <input type="password" required id="password" autoComplete="true" placeholder="Enter password"
                               onChange={(e) => setPassword(e.target.value)} value={password} tabIndex={2}/>
                    </p>
                    <p>
                        <a href="/">Quên mật khẩu?</a>
                        <a href="/register">Bạn chưa có tài khoản? Đăng ký ngay</a>
                    </p>
                    <p>
                        <input type="submit" value="Đăng nhập"/>
                    </p>
                </fieldset>
            </form>
            <p>
                <span className="btn-round">Hoặc</span>
            </p>
            <p>
                <a href='#!' className="facebook-before">
                    <span className="fontawesome-facebook"></span>
                </a>
                <button className="facebook">Đăng nhập bằng Facebook</button>
            </p>
        </div>
    )
}

export default Login