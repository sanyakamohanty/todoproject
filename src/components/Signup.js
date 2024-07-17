import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
          await createUserWithEmailAndPassword(auth,email, password);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
  }
  


    const newUser = { fullName, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Signup successful!');
    navigate('/Login');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-center space-x-4">
            <button type="Sign Up" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Sign Up
            </button>    
          </div>
        </form>
        <div className="text-center mt-4">
        <p>Already Registered? <Link to="/login" className="bg-gray-300 text-black px-5 py-1 rounded hover:bg-gray-400">Login</Link></p>
      </div>
    </div>
    </div>
  );
};

export default Signup;