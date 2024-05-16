
import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UseReadingProgress from '../hooks/UseReadingProgress';

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const cartItem = useSelector((state) => state.cart.cart);
    const [user, setUser] = useState({})

    const completion = UseReadingProgress();



    useEffect(() => {
        let x = sessionStorage.getItem('user');
        let y = localStorage.getItem('user');
        setUser(JSON.parse(y) || JSON.parse(x));
    }, [])

    const logOut = () => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        window.location.reload(false);
    }



    const pathname = (window && window.location) ? window.location.pathname : '';

    const inactivea = 'hover:bg-blue-600 hover:text-white bg-gray-200 text-gray-500 w-[100%] md:max-w-[100px]  text-center p-1 rounded-md';
    const activea = "hover:bg-blue-600 hover:text-white bg-blue-600 w-[100%] md:max-w-[100px]  text-center p-1 rounded-md bg-blue-600 text-white text-white text-white";

    function toggleMenu() {

        setOpenMenu(!openMenu)
    }




    return (
        <header className='z-50 py-3 bg-white text-blue-900 w-[100vw] shadow-md fixed top-0'>
            <nav className='flex justify-between items-center w-[92%] mx-auto'>
                <Link to={"/"}>
                    <div className='font-capriola text-[30px] '>
                        <span className='text-blue-600 font-bold'>B</span>ookStore
                    </div>
                </Link>




                <div className={`absolute md:static duration-1000 bg-white min-h-[100vh] md:min-h-fit  ${openMenu === false ? 'left-[-100%]' : 'left-0'} top-[100%] right-0 w-[100vw] md:w-[60vw] flex justify-center px-5`}>
                    <ul className='flex md:flex-row flex-col w-screen md:w-[50vw] lg:w-[40vw] items-center justify-start md:justify-center md:items-center text-[25px] md:text-[18px] md:gap-[3vw] gap-8 pt-20 md:pt-0'>

                        <Link to='/' className='w-[100%]' onClick={toggleMenu}>
                            <div className='overflow-hidden w-[100%] h-[45.5px] md:h-fit relative md:static'>
                                <li className={`${pathname === '/' ? activea : inactivea} duration-1000 absolute md:static top-0 z- ${openMenu === true ? "top-0" : "top-[100%]"}`}>
                                    Home
                                </li>
                            </div>
                        </Link>


                        {user ?
                            <>
                                <div className="flex justify-evenly items-center w-[100vw]">
                                    <span className="hidden sm:inline max-w-[120px] lg:max-w-[200px]  whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
                                        Hi {user.fullname}
                                    </span>

                                </div>
                                <button className='w-[100%]' onClick={() => { logOut(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div className='overflow-hidden w-[100%] h-[45.5px] md:h-fit relative'>
                                        <li className={`${pathname.includes("/#location") ? activea : inactivea} duration-1000 absolute md:static top-0 z- ${openMenu === true ? "top-0" : "top-[100%]"}`}>

                                            Sign Out

                                        </li>
                                    </div>
                                </button>
                            </>

                            :
                            <>
                                <Link to='/Login' className='w-[100%]' onClick={() => { toggleMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div className='overflow-hidden w-[100%] h-[45.5px] md:h-fit relative'>
                                        <li className={`${pathname.includes("/login") ? activea : inactivea} duration-1000 absolute md:static top-0 z- ${openMenu === true ? "top-0" : "top-[100%]"}`}>

                                            Sign In

                                        </li>
                                    </div>
                                </Link>
                                <Link to='/signup' className='w-[100%]' onClick={() => { toggleMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div className='overflow-hidden w-[100%] h-[45.5px] md:h-fit relative'>
                                        <li className={`${pathname.includes("/signup") ? activea : inactivea} duration-1000 absolute md:static top-0 z- ${openMenu === true ? "top-0" : "top-[100%]"}`}>

                                            Start Now

                                        </li>
                                    </div>
                                </Link>
                            </>

                        }




                    </ul>
                </div>
                <div className='flex items-center gap-6'>
                    <Link to={"/cart"}>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                            {cartItem.length !== 0 && <div className="absolute top-[-13px] right-0 text-blue-600">{cartItem.length}</div>}
                        </div>
                    </Link>

                    <Link to={"#"}>

                    </Link>

                    {/* {admin && <div>opp</div>} */}

                    <div className='md:hidden' onClick={toggleMenu}>
                        {!openMenu && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer md:hidden">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>}
                        {openMenu && <span className='cursor-pointer '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>}
                    </div>


                </div>
            </nav>
            <span style={{ transform: `translateX(${completion - 100}%)` }} className='h-[1px] outline outline-1 outline-blue-500 w-full absolute bottom-0 bg-blue-500' />
            {/* <AuthNav /> */}
        </header>
    )
}

export default Nav

