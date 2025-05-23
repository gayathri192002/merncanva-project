import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import api from '../utils/api';
import { Toaster, toast } from 'react-hot-toast';

const Index = () => {
  const [type, setType] = useState('');
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const user_register = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const { data } = await api.post('/api/user-register', state);
      localStorage.setItem('canva_token', data.token);

      setState({ name: '', email: '', password: '' });

      toast.success('Registration successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error?.response?.data?.message || "Registration failed!");
    } finally {
      setLoader(false);
    }
  };

  const user_login = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const { data } = await api.post('/api/user-login', state);
      localStorage.setItem('canva_token', data.token);

      setState({ email: '', password: '' });

      toast.success('Login successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='bg-[#18191b] min-h-screen w-full'>
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Modal */}
      <div className={`w-screen ${show ? 'visible opacity-100' : 'invisible opacity-30'} transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}>
        <div className='w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative'>
          <div onClick={() => setShow(false)} className='absolute right-4 top-4 text-xl cursor-pointer text-white'><RxCross2 /></div>
          <h2 className='text-white pb-4 text-center text-xl'>Login and Sign up in seconds</h2>

          {type === 'signin' && (
            <form onSubmit={user_login}>
              <div className='flex flex-col gap-3 mb-3 text-white'>
                <label htmlFor="email">Email</label>
                <input onChange={inputHandle} type="email" name="email" id="email" placeholder='Email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent' />
              </div>

              <div className='flex flex-col gap-3 mb-3 text-white'>
                <label htmlFor="password">Password</label>
                <input onChange={inputHandle} type="password" name="password" id="password" placeholder='Password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent' />
              </div>

              <button disabled={loader} className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>
                {loader ? 'Loading...' : 'Sign In'}
              </button>

              <div className='flex py-4 justify-between items-center px-3'>
                <div className='w-[45%] h-[1px] bg-slate-500'></div>
                <div className='w-[6%] text-center text-white'>Or</div>
                <div className='w-[45%] h-[1px] bg-slate-500'></div>
              </div>

              <div className='pb-4'>
                <button type="button" className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-red-500 w-full hover:bg-red-600 text-white'>
                  <BiLogoGmail />
                  Login with Gmail
                </button>
              </div>

              <div className='pb-4'>
                <button type="button" className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-500 w-full hover:bg-blue-600 text-white'>
                  <FaFacebook />
                  Login with Facebook
                </button>
              </div>
            </form>
          )}

          {type === 'signup' && (
            <form onSubmit={user_register}>
              <div className='flex flex-col gap-3 mb-3 text-white'>
                <label htmlFor="name">Name</label>
                <input onChange={inputHandle} type="text" name="name" id="name" placeholder='Name' value={state.name} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent' />
              </div>

              <div className='flex flex-col gap-3 mb-3 text-white'>
                <label htmlFor="email">Email</label>
                <input onChange={inputHandle} type="email" name="email" id="email" placeholder='Email' value={state.email} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent' />
              </div>

              <div className='flex flex-col gap-3 mb-3 text-white'>
                <label htmlFor="password">Password</label>
                <input onChange={inputHandle} type="password" name="password" id="password" placeholder='Password' value={state.password} className='px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent' />
              </div>

              <button disabled={loader} className='px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white'>
                {loader ? 'Loading...' : 'Sign Up'}
              </button>

              <div className='flex py-4 justify-between items-center px-3'>
                <div className='w-[45%] h-[1px] bg-slate-500'></div>
                <div className='w-[6%] text-center text-white'>Or</div>
                <div className='w-[45%] h-[1px] bg-slate-500'></div>
              </div>

              <div className='pb-4'>
                <button type="button" className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-red-500 w-full hover:bg-red-600 text-white'>
                  <BiLogoGmail />
                  Sign up with Gmail
                </button>
              </div>

              <div className='pb-4'>
                <button type="button" className='px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-500 w-full hover:bg-blue-600 text-white'>
                  <FaFacebook />
                  Sign up with Facebook
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Navbar */}
      <div className='bg-[#212223] shadow-md'>
        <div className='w-[93%] m-auto py-3 flex justify-between items-center'>
          <div className='w-[80px] h-[48px]'>
            <img className='w-full h-full' src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg" alt="Logo" />
          </div>

          <div className='flex gap-4'>
            <button onClick={() => { setType('signin'); setShow(true); }} className='py-2 w-[80px] text-center bg-teal-700 text-white hover:bg-teal-500 rounded font-medium'>Sign In</button>
            <button onClick={() => { setType('signup'); setShow(true); }} className='py-2 w-[80px] text-center bg-purple-700 text-white hover:bg-purple-500 rounded font-medium'>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className='w-full h-full flex justify-center items-center p-4'>
        <div className='py-[170px] flex justify-center items-center flex-col gap-6'>
          <h2 className='text-5xl text-[#c7c5c5] font-bold text-center'>What will you design today?</h2>
          <span className='text-[#aca9a9] text-2xl font-medium text-center'>Canva makes it easy to create and share professional designs.</span>
          <button onClick={() => { setType('signup'); setShow(true); }} className='py-2 w-[200px] text-center bg-purple-700 text-white hover:bg-purple-500 rounded font-medium'>Sign Up for Free</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
