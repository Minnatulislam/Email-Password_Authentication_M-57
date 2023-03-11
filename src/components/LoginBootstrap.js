import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        setSuccess(false)

        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            console.log(user);
            setSuccess(true);
            event.target.reset();
        })
        .catch(error => {
            console.error('error:', error)
        })

    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if(!userEmail){
            alert('Please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then( () => {
            alert('Password Reset email sent. Please check your Email.')
        })
        .catch(error => {
            console.error('error:', error);
        })
    }

    return (
        <div className='w-50 mx-auto '>
            <h2 className='text-primary'>Please Login Your Account!!!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required/>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control " id="formGroupExampleInput2" placeholder="Password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>

            </form>
            {
                success && <p className='text-success mt-2 fs-5'>Successfully login to the account</p>
            }
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small> </p>
            <p><small>Forget Password? <button type="button" onClick={handleForgetPassword} className="btn btn-link">Reset password</button></small></p>
        </div>
    );
};

export default LoginBootstrap;