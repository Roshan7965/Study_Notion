import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath,useNavigate } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import ConfirmationModel from './ConfirmationModal'
import { logout } from "../../services/operations/authAPI";
import {TokenMobNavbarLinks} from '../../data/TokenMobNavbarLinks'
import {MobNavbarLinks} from '../../data/mobnavlinks'
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    const [toggle, setToggle] = useState(false);
    const [toggleSub, setToggleSub] = useState(false);
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    const [confirmationModel, setConfirmationModel] = useState(null);
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const location = useLocation();
    const [subLinks, setSubLinks]  = useState([]);
    const [loading, setLoading] = useState(false);

    const bbtn1Hnad = () => {
		dispatch(logout(navigate));
		setConfirmationModel(null);
	};

    useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const res = await apiConnector("GET", categories.CATEGORIES_API);
				setSubLinks(res.data.data);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			}
			setLoading(false);
		})();
	}, []);
	const matchRoute = (route) => {
		return matchPath({ path: route }, location.pathname);
	};

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 transition-all duration-200'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Logo */}
				<Link to="/">
					<img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
				</Link>

            {/* Nav Links */}
            <nav className="hidden md:block">
                <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                                        {link.title === "Catalog" ? (
                                            <>
                                                <div
                                                    className={`group relative flex cursor-pointer items-center gap-1 ${
                                                        matchRoute("/catalog/:catalogName")
                                                            ? "text-yellow-25"
                                                            : "text-richblack-25"
                                                    }`}>
                                                    <p>{link.title}</p>
                                                    <BsChevronDown />
                                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                        {loading ? (
                                                            <p className="text-center">Loading...</p>
                                                        ) : subLinks?.length ? (
                                                            <>
                                                                {subLinks?.map((subLink, i) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}
                                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                        key={i}>
                                                                        <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <p className="text-center">No Courses Found</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p
                                                    className={`${
                                                        matchRoute(link?.path)
                                                            ? "text-yellow-25"
                                                            : "text-richblack-25"
                                                    }`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )}
                                    </li>
                    ) )
                }

                </ul>
            </nav>


            {/* Login/SignUp/Dashboard */}
            <div className="hidden items-center gap-x-4 md:flex">

                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-[20px] py-[9px] text-richblack-100">
                                    Log in
                                </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Sign up
                                </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }
                
            </div>

            {/* Mobile nav bar */}
		    <div
					className="md:hidden flex flex-1 justify-end items-center text-white"
					onClick={() => setToggle(!toggle)}>
					{!toggle ? (
						<div className="object-contain cursor-pointer">
							<AiOutlineMenu fontSize={23} fill="#AFB2BF" />
						</div>
					) : (
						<IoCloseSharp fontSize={25} fill="#AFB2BF" />
					)}
					<div
						className={`${
							!toggle ? "hidden" : "flex"
						} p-6 black-gradient absolute bg-[rgb(5,8,22)] top-[35px] right-0 mx-4 my-2 min-w-[140px] z-50 rounded-xl`}>
						<ul className="list-none flex justify-end items-start flex-col gap-4">
							{token ? (
								<>
									{TokenMobNavbarLinks.map((link, index) => (
										<>
											{link.title === "Logout" ? (
												<>
													<button
														onClick={() =>
															setConfirmationModel({
																text1: "Are you sure?",
																text2:
																	"You will be logged out of your account.",
																btn1Text: "Logout",
																btn2Text: "Cancel",
																btn1Handler: () => bbtn1Hnad(),
																btn2Handler: () => setConfirmationModel(null),
															})
														}
														className="text-[16px] font-poppins text-white font-medium cursor-pointer">
														<span>Logout</span>
													</button>
												</>
											) : link?.title === "Catalog" ? (
												<>
													<div
														onClick={(e) => {
															e.stopPropagation();
															setToggleSub(!toggleSub);
														}}
														className={`flex gap-1 ${
															matchRoute("/catalog/:catalogName")
																? "text-yellow-25"
																: "text-richblack-25"
														} flex flex-col`}>
														<div className="flex items-center justify-center gap-1">
															<p>{link.title}</p>
															<BsChevronDown />
														</div>
														<div
															className={`${
																!toggleSub ? "hidden" : "block"
															} md:hidden border p-2 flex-col rounded-lg text-richblack-5 bg-richblack-900`}>
															{loading ? (
																<p className="text-center">Loading...</p>
															) : subLinks?.length ? (
																<>
																	{subLinks?.map((subLink, i) => (
																		<Link
																			onClick={() => {
																				setToggleSub(!toggleSub);
																				setToggle(!toggle);
																			}}
																			to={`/catalog/${subLink.name
																				.split(" ")
																				.join("-")
																				.toLowerCase()}`}
																			className="rounded-lg bg-transparent"
																			key={i}>
																			<p>{subLink.name}</p>
																		</Link>
																	))}
																</>
															) : (
																<p className="text-center">No Courses Found</p>
															)}
														</div>
													</div>
												</>
											) : (
												<li
													key={index}
													className={`${
														matchRoute(link?.path)
															? "text-yellow-25"
															: "text-richblack-25"
													} font-poppins text-[16px] font-medium cursor-pointer`}
													onClick={() => {
														setToggle(!toggle);
													}}>
													<Link to={link?.path}>{link.title}</Link>
												</li>
											)}
										</>
									))}
								</>
							) : (
								<>
									{MobNavbarLinks.map((link, index) => (
										<>
											{link?.title === "Catalog" ? (
												<>
													<div
														onClick={(e) => {
															e.stopPropagation();
															setToggleSub(!toggleSub);
														}}
														className={`flex gap-1 ${
															matchRoute("/catalog/:catalogName")
																? "text-yellow-25"
																: "text-richblack-25"
														} flex flex-col`}>
														<div className="flex items-center justify-center gap-1">
															<p>{link.title}</p>
															<BsChevronDown />
														</div>
														<div
															className={`${
																!toggleSub ? "hidden" : "block"
															} md:hidden border p-2 flex-col rounded-lg text-richblack-5 bg-richblack-900`}>
															{loading ? (
																<p className="text-center">Loading...</p>
															) : subLinks?.length ? (
																<>
																	{subLinks?.map((subLink, i) => (
																		<Link
																			onClick={() => {
																				setToggleSub(!toggleSub);
																				setToggle(!toggle);
																			}}
																			to={`/catalog/${subLink.name
																				.split(" ")
																				.join("-")
																				.toLowerCase()}`}
																			className="rounded-lg bg-transparent"
																			key={i}>
																			<p>{subLink.name}</p>
																		</Link>
																	))}
																</>
															) : (
																<p className="text-center">No Courses Found</p>
															)}
														</div>
													</div>
												</>
											) : (
												<>
													<li
														key={index}
														className={`${
															matchRoute(link?.path)
																? "text-yellow-25"
																: "text-richblack-25"
														} font-poppins text-[16px] font-medium cursor-pointer`}
														onClick={() => {
															setToggle(!toggle);
														}}>
														<Link to={link?.path}>{link.title}</Link>
													</li>
												</>
											)}
										</>
									))}
								</>
							)}
						</ul>
					</div>
		    </div>
                {confirmationModel && <ConfirmationModel modelData={confirmationModel} />}

        </div>
    </div>
  )
}

export default Navbar
