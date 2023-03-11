import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';


const auth = getAuth(app)


const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false)
    const hadleRegister = event =>{
        event.preventDefault();
        setSuccess(false)
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide atleast two uppercase')
            return;
        }
        if(password.length < 6){
            setPasswordError('Please should be atleast 6 character')
            return;
        }
        if(!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError('Please add at least one special character')
            return;
        }


        setPasswordError('');
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
            event.target.reset();
        })
        .catch(error => {
            console.error('error:', error);
            setPasswordError(error.massage)
        })

    }

    return (
        <div className='w-50 mx-auto'>
                <h3 className='text-primary mb-3'>Please Register!!!</h3>
            <Form onSubmit={hadleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {
                    success && <p className='text-success'>User Successfully register</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default RegisterReactBootstrap;