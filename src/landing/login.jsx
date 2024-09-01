import React, { useState } from 'react';
import './user.css';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(3, 'Password must be at least 3 characters long').max(20, 'Password must be at most 20 characters long')
});

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverWarning, setServerWarning] = useState(''); // State for server warnings

  // Set up react-hook-form with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const setItemWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl, // ttl is time to live in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch(`https://www.takshilabackend.somee.com/api/Students/login?username=${data.email}&password=${data.password}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (response.ok) {
        
        setItemWithExpiry("userData",JSON.stringify(responseData),3600000);
        navigate('/student');
      } else {
        // Handle server-side validation errors or incorrect credentials
        setServerWarning(responseData.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setServerWarning('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='RegisterContainer'>
      <div className='register'>
        <div className="formCont">
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputcont">
              <label className='inputlable' htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...register('email')}
              />
              {errors.email && <p className="warning">{errors.email.message}</p>}
            </div>
            <div className="inputcont">
              <label className='inputlable' htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
              />

              
                </div>
                <br />
                <input 
                  type="checkbox" 
                  checked={showPassword}
                  onChange={togglePasswordVisibility} 
                />
                {showPassword ? 'Hide' : 'Show'} Password
              
              {errors.password && <p className="warning">{errors.password.message}</p>}
           
            {serverWarning && <p className="warning server-warning">{serverWarning}</p>} {/* Display server warning */}
            <button type="submit" style={{ 'marginTop': '1.4rem' }}>Login</button>
          </form>
        </div>
        <div className='TextContainer'>
          <h1>Welcome</h1>
          <p className='usertext'>Back TO Takshila</p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
