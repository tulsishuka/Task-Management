import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      navigate('/Dashboard');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Name" name="name" onChange={handleChange} />
        <input className="border p-2 mb-2 w-full" placeholder="Email" name="email" onChange={handleChange} />
        <input type="password" className="border p-2 mb-4 w-full" placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Signup</button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/Login" className="text-green-500 underline">Log In</Link>
        </p>
      </form>
    </div>
  );
}
