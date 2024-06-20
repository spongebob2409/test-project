import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/reset-password', { email })
            .then(result => {
                alert('Password reset email sent');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-8"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
