import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const loginHandle = async () => {
        setError(""); 
        try {
            const res = await axios.post("login", {
                email,
                password,
            });

            const logindata = res.data;


            alert("Login Successful");
            localStorage.setItem('token', logindata.token); 
            navigate("/"); 
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <div >
                <h1>Login</h1>
                {error && <div >{error}</div>}

                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button  onClick={loginHandle}>
                        Login
                    </button>
                </div>
                <div>
                    <h2 >Don't have an account? <Link to='/signup'>Signup</Link></h2>
                </div>
                <div>
                    <p>Email: sagarrajyadav2002@gmail.com</p>
                    <p>Password: 123456</p>
                </div>
            </div>

        </div>
    )
}

export default Login;
