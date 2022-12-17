import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onLogin = () => {
        console.log('formData', {
            email: formData.email,
            password: formData.password
        })

        axios.post('/api/user/login', {
            email: formData.email,
            password: formData.password
        })
            .then(function (response) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                alert(response.data.message)
                window.location = '/';
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error);
            })
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Card style={{ width: "60%", padding: "32px", margin: "60px" }}>
                <Form>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: "32px", fontWeight: "600", marginBottom: "32px"}}>
                        Login
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={formData.email} name={'email'} onChange={handleChange} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={formData.password} name={'password'} onChange={handleChange} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={onLogin}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default Login;