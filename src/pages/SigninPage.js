import React, { useState, useContext } from 'react';
import { services } from '../services/services';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../media/nn2.gif';
import Layout from '../layouts/mainLayout';
import Logo from '../media/logo2.png'





function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSigninClick = async (e) => {
    e.preventDefault();
    await services
      .handleSignin(email, password)
      .then((user) => {
        // Handle successful login
        setUser(user);
        navigate('/app');
      })
      .catch((error) => {
        // Handle login error
        console.log('Login error:', error);
      });
  };

  return (
    
    <Layout>

  
        <div>

            <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    filter: 'blur(8px)',
                    WebkitFilter: 'blur(8px)' // For Safari support
                }}
            />

                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={Logo} width="150" alt="" srcSet="" />
                            <h1 className="mb-2 text-2xl">CalendarAI</h1>
                            <span className="text-gray-300 mt-2 ">Please Sign In</span>
                        </div>
                        <form action="#">
                            <div className="mb-4 text-lg">
                                <input className="rounded-3xl placeholder-opacity-50 border-none bg-red-500 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:scale-105 transition-all ease-out duration-200" 
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                            </div>
                            <div className="mb-4 text-lg">
                                <input className="rounded-3xl placeholder-opacity-50 border-none bg-red-500 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:scale-105 transition-all ease-out duration-200" 
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                            </div>

                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button type="submit" onClick={handleSigninClick} className="rounded-3xl bg-red-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-600 hover:bg-opacity-50">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    </Layout>
  );
}

export default SigninPage;
