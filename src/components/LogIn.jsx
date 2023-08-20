import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { VideoContext } from '../context/videoContext';

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {changeCategory} = useContext(VideoContext);
  const {logIn} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password)
      changeCategory(1, "New", "home");
    } catch (error) {

      setError(error.message.split('/')[1].slice(0, -2))
    }

  };
  
  return (
    <div className=" h-[calc(100%-56px)] bg-black flex items-center justify-center">
    
      <div className="bg-black p-8 rounded shadow-md md:w-96 w-50 md:mb-60 lg:mb-0 ">
        {error && <p className='p-3 bg-red-400 my-2 text-center'>{error}</p>}
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-white">Demo account : testuserdev07@gmail.com</p>
          <p className="text-white mb-2">Password : test123</p>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder = "Email" 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              className="w-full px-3 py-2 border rounded-md bg-black text-white focus:ring focus:ring-indigo-300" required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder = "Password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className="w-full px-3 py-2 border rounded-md bg-black text-white focus:ring focus:ring-indigo-300" required 
            />
          </div>
          <button type="submit" className="w-full mb-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-indigo-300">Log in</button>
          <div className="flex gap-2">
            <p className="text-white">Not a member yet?</p>
            <Link to='/signup'>
              <div className="text-blue-500">Sign up</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn;