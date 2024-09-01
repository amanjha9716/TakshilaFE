import React, { useState } from 'react';
import './user.css';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const SignUpSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(3, 'Password must be at least 3 characters long').max(20, 'Password must be at most 20 characters long'),
  studname: z.string().min(1, 'Student name is required'),
  age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  stand: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  subjects: z.string()
    .min(1, 'At least one subject is required')
    .transform((val) => val.split(',').map(subject => subject.trim()))
});


const UserRegistrationForm = () => {
  // Set up react-hook-form with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch("https://www.takshilabackend.somee.com/api/Students/register", {
        method: 'POST',
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData);
      if(response.ok)
      {
        setItemWithExpiry("userData",JSON.stringify(responseData),3600000);
      }
      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed. Please try again.');
      }

      // Handle successful registration, e.g., redirect to another page
    } catch (error) {
      console.error('Error:', error);
      // Display an error notification to the user if needed
    }
  };

  return (
    <div className='RegisterContainer'>
      <div className='register'>
        <div className="formCont">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputcont" >
              <label className='inputlable' htmlFor="username">Username</label>
              <input type="text" name='username' {...register('username')} />
              {errors.username && <p className="warning">{errors.username.message}</p>}
            </div>

            <div className="inputcont">
              <label className='inputlable' htmlFor="password">Password</label>
              <input type="password" name='password' {...register('password')} />
              {errors.password && <p className="warning">{errors.password.message}</p>}
            </div>

            <div className="inputcont">
              <label className='inputlable' htmlFor="studname">Student Name</label>
              <input type="text" name='studname' {...register('studname')} />
              {errors.studname && <p className="warning">{errors.studname.message}</p>}
            </div>

            <div className="inputcont">
              <label className='inputlable' htmlFor="age">Age</label>
              <input type="number" name='age' {...register('age')} />
              {errors.age && <p className="warning">{errors.age.message}</p>}
            </div>

          

            <div className="inputcont">
              <label className='inputlable' htmlFor="stand">Standard</label>
              <input type="number" name='stand' {...register('stand')} />
              {errors.stand && <p className="warning">{errors.stand.message}</p>}
            </div>

          

            <div className="inputcont">
              <label className='inputlable' htmlFor="subjects">Subjects</label>
              <input type="text" name='subjects' {...register('subjects')} />
              {errors.subjects && <p className="warning">{errors.subjects.message}</p>}
            </div>
<br />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className='TextContainer'>
          <h1>HELLO</h1>
          <p className='usertext'>WELCOME TO Takshila</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
