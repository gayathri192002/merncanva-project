import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaFolderOpen } from 'react-icons/fa';

const Layout = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className='bg-[#18191b] min-h-screen w-full'>
      {/* Top Navigation Bar */}
      <div className='bg-[#212223] shadow-md fixed left-0 top-0 w-full z-20'>
        <div className='w-[93%] m-auto py-3'>
          <div className='flex justify-between items-center'>
            <div className='w-[80px] h-[48px]'>
              <img
                className='w-full h-full'
                src='https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg'
                alt='Logo'
              />
            </div>

            <div className='flex gap-4 justify-center items-center relative'>
              

              <div onClick={() => setShow(!show)} className='cursor-pointer'>
                <img
                  className='w-[48px] h-[45px] rounded-full'
                  src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
                  alt='User'
                />
              </div>

              {/* Dropdown */}
              <div
                className={`absolute top-[60px] right-0 w-[250px] bg-[#313030] p-3 border border-gray-700 transition-all duration-300 ${
                  show ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className='px-2 py-2 flex gap-5 items-center'>
                  <img
                    className='w-[40px] h-[40px] rounded-full'
                    src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
                    alt='Profile'
                  />
                  <div>
                    <span className='text-[#e0dddd] font-bold text-md'>Gayathri</span>
                    <span className='text-[#e0dddd] block text-sm'>Gayathri130@gmail.com</span>
                  </div>
                </div>

                <ul className='text-[#e0dddd] font-semibold mt-2'>
                  <li>
                    <Link to='/settings' className='block p-2 hover:bg-gray-600 rounded'>
                      Setting
                    </Link>
                  </li>
                  <li>
                    <button className='block w-full text-left p-2 hover:bg-gray-600 rounded'>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className='w-full flex mt-16'>
        {/* Sidebar */}
        <div className='w-[300px] p-5 h-[calc(100vh-70px)] fixed bg-[#34569f]'>
          <div className='px-2 py-2 flex gap-5 items-center mb-3'>
            <img
              className='w-[40px] h-[40px] rounded-full'
              src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
              alt='Sidebar Avatar'
            />
            <div>
              <span className='text-[#e0dddd] font-bold text-md'>Gayathri</span>
              <span className='text-[#e0dddd] text-sm'>Free</span>
            </div>
          </div>

          <ul className='px-4 flex flex-col gap-2'>
            <li>
              <Link
                to='/home'
                className={`text-[#e0dddd] px-2 py-2 flex items-center gap-2 rounded-md ${
                  pathname === '/home' ? 'bg-[#ffffff26]' : ''
                }`}
              >
                <FaHome className='text-xl' />
                <span className='font-medium'>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to='/project'
                className={`text-[#e0dddd] px-2 py-2 flex items-center gap-2 rounded-md ${
                  pathname === '/project' ? 'bg-[#ffffff26]' : ''
                }`}
              >
                <FaFolderOpen className='text-xl' />
                <span className='font-medium'>Projects</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className='ml-[300px] w-[calc(100%-300px)]'>
          <div className='py-4 pr-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
