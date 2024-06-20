import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/new-password', { token, newPassword })
            .then(result => {
                alert('Password updated successfully');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Set New Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='newPassword'>
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
