import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signupHandle = async () => {
        try {
            const res = await axios.post("", {
                name,
                email,
                password,
            });

            const signUpdata = res.data;

            if (signUpdata.error) {
                setError(signUpdata.error);
            } else {
                alert("Signup Successful");
                navigate("/login");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div >
            <div >
                <h1>Signup</h1>
                {error && <div className="error-message">{error}</div>}

                <div>
                    <input
                
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name='name'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                    />
                </div>
                <div>
                    <button onClick={signupHandle}>
                        Signup
                    </button>
                </div>
                <div>
                    <h2>Have an account? <Link to='/login'>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup;
