import {useState} from 'react';
import { ImCross } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { IoLogoFacebook } from "react-icons/io";
const Index = () => {
    const [type,settype]=useState('')
    const[show,setshow]=useState(false);
    const[state,setstate]=useState({
        name:'',
        email:'',
        password:''
    })
    console.log(state)
    const inputhandle=(e)=>{
        setstate({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div className="bg-black min-h-screen w-full">
      <div className={`w-screen ${show ?'visible opacity-100':'invisible opacity-30'}
      transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center `}>
        <div className='w-[350px]  bg-[#090909] m-auto px-6 py-4 rounded-md relative'>
            <div  onClick={()=>setshow(false)}className='absolute right-4 top-4 text-x1 cursor-pointer 
            text-white'><ImCross />
            </div>
            <h2 className='text-white pb-4 text-center text-x1'>login and signup in second</h2>
            {
                type==='signin' &&<form>
                <div className='flex flex-col gap-3 mb-3 text-white'>
                    <label  htmlFor="email">Email</label>
                    <input onChange={inputhandle}  type='email' name="email" id="email" 
                    value={state.email} placeholder='email' className='px-3 py-2 
                    rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500
                    bg-transparent'/>
                </div>
                <div className='flex flex-col gap-3 mb-3 text-white'>
                    <label  htmlFor="password">password</label>
                    <input onChange={inputhandle}  type='email' name="password" id="password" 
                    value={state.password} placeholder='password' className='px-3 py-2 
                    rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500
                    bg-transparent'/>
                </div>
                <div>
                    <button className='px-3  py-2 rounded-md bg-purple-500 w-full outline-none
                    hover:bg-purple-600 text-white'> Signin</button>
                    <div className='flex py-4 justify-between items-center px-3'>
                        <div className=' w-[45%] h-[1px] bg-slate-500'></div>
                            <div className='w-[6%] text-center flex pb-1 px-1 text-white'>Or</div>
                            <div className='w-[45%] h-[1px] bg-slate-500'></div>

                       

                    </div>
                    <div className='pb-4'>
                    <button className='px-3 flex justify-center items-center gap-2  py-2 rounded-md bg-red-500 w-full outline-none
                    hover:bg-red-600 text-white'> 
                    <span><SiGmail /></span>
                    <span>Login with gmail</span>
                    </button>
                    </div>
                    <div className='pb-4'>
                    <button className='px-3  flex justify-center items-center gap-2 
                     py-2 rounded-md bg-blue-600 w-full outline-none
                    hover:bg-blue-800 text-white'> 
                     <span><IoLogoFacebook /></span>
                    <span>
                        Login with facebook</span>
                       </button>
                    </div>
                </div>
            </form>
            }
            {
                type==='signup' && <form>
                     <div className='flex flex-col gap-3 mb-3 text-white'>
                    <label  htmlFor="name">Name</label>
                    <input onChange={inputhandle}  type='text' name="name" id="name" 
                    value={state.name} placeholder='Name' className='px-3 py-2 
                    rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500
                    bg-transparent'/>
                </div>
                <div className='flex flex-col gap-3 mb-3 text-white'>
                    <label  htmlFor="email">Email</label>
                    <input onChange={inputhandle}  type='email' name="email" id="email" 
                    value={state.email} placeholder='email' className='px-3 py-2 
                    rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500
                    bg-transparent'/>
                </div>
                <div className='flex flex-col gap-3 mb-3 text-white'>
                    <label  htmlFor="password">password</label>
                    <input onChange={inputhandle}  type='password' name="password" id="password" 
                    value={state.password} placeholder='password' className='px-3 py-2 
                    rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500
                    bg-transparent'/>
                </div>
                <div>
                    <button className='px-3  py-2 rounded-md bg-purple-500 w-full outline-none
                    hover:bg-purple-600 text-white'> Signin</button>
                    <div className='flex py-4 justify-between items-center px-3'>
                        <div className=' w-[45%] h-[1px] bg-slate-500'></div>
                            <div className='w-[6%] text-center flex pb-1 px-1 text-white'>Or</div>
                            <div className='w-[45%] h-[1px] bg-slate-500'></div>

                       

                    </div>
                    <div className='pb-4'>
                    <button className='px-3 flex justify-center items-center gap-2  py-2 rounded-md bg-red-500 w-full outline-none
                    hover:bg-red-600 text-white'> 
                    <span><SiGmail /></span>
                    <span>Login with gmail</span>
                    </button>
                    </div>
                    <div className='pb-4'>
                    <button className='px-3  flex justify-center items-center gap-2 
                     py-2 rounded-md bg-blue-600 w-full outline-none
                    hover:bg-blue-800 text-white'> 
                     <span><IoLogoFacebook /></span>
                    <span>
                        Login with facebook</span>
                       </button>
                    </div>
                </div>
            </form>

            }
            
        </div>

      </div>






        <div className="bg-[#212223] shadow-md">
            <div className="w-[93%] m-auto py-3">
                <div className="flex justify-between items-center">
                    <div className="w-[80px] h-[48px]">
                        <img 
                            className="w-full h-full" 
                            src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg" 
                            alt="Canva Logo" 
                        />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={()=>{settype('signin') 
                        setshow(true)}} className="py-2 w-[80px] text-center bg-teal-700 text-white transition-all
                        hover:bg-teal-500 rounded-[5px] font-mediumaaaaaaaaa">Signin</button>
                        <button onClick={()=>{settype('signup')
                            setshow(true)}}className="py-2 w-[80px] text-center  bg-purple-700 text-white transition-all
                        hover:bg-purple-500 rounded-[5px] font-medium">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-full justify-center items-center p-4'>
            <div className="py-[170px] flex justify-center items-center flex-col gap-6">
                <h2 className="text-5xl text-[#c7c5c5] font-bold">  
                    what you will design today </h2>
                    <span className="text-[#aca9a9] text-2xl font-semibold">
                         Canvamake easy create and share professional designs</span>
                         <button   onClick={()=>{settype('signup')
                            setshow(true)}}className="py-2 w-[200px] text-center  bg-purple-700
                          text-white transition-all
                        hover:bg-purple-500 rounded-[5px] font-medium">SignUp for free</button>


            </div>
        </div>
    </div>
    );
};

export default Index;
