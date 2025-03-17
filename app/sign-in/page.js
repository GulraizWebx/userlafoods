"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


import { useEffect, useState } from "react";

export default function SignIn() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [registerError, setRegisterError] = useState(null);


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    const router = useRouter();

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        const userToken = localStorage.getItem("user");
        if (!userToken) {
            router.push("/"); // Redirect to dashboard
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null); // Reset only login error
    
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Invalid credentials");
    
            console.log(data);
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/");
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null); // Reset only register error
    
        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });
    
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");
    
            toast.success("User Registered Successfully", { autoClose: 3000 }); // Show success toast
            // alert("Registration successful!");
            setRegisterData({ name: "", email: "", password: "" }); // Reset form fields
        } catch (err) {
            setRegisterError(err.message);
            toast.error(err.message, { autoClose: 3000 }); // Show error toast
        } finally {
            setRegisterLoading(false);
        }
    };
    
    

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sign In">
                <section className="track-area pt-80 pb-40">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-sm-12">
                                <div className="tptrack__product mb-40">
                                    <div className="tptrack__thumb">
                                        <img src="/assets/img/banner/login-bg.jpg" alt="" />
                                    </div>
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <img src="/assets/img/icon/lock.png" alt="" />
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Login Here</h4>
                                                <p>Your personal data will be used to support your experience throughout this website, to manage access to your account.</p>
                                            </div>
                                        </div>
                                        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
                                        <form onSubmit={handleLogin}>
                                            <div className="tptrack__id mb-10">
                                                <span><i className="fal fa-user" /></span>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    placeholder="Username / email address" 
                                                    value={loginData.email}
                                                    onChange={handleLoginChange}
                                                    required
                                                />
                                            </div>
                                            <div className="tptrack__email mb-10">
                                                <span><i className="fal fa-key" /></span>
                                                <input 
                                                    type="password" 
                                                    name="password"
                                                    placeholder="Password" 
                                                    value={loginData.password}
                                                    onChange={handleLoginChange}
                                                    required
                                                />
                                            </div>
                                            <div className="tpsign__remember d-flex align-items-center justify-content-between mb-15">
                                                <div className="form-check">
                                                    {/* <input className="form-check-input" type="checkbox" id="flexCheckDefault" /> */}
                                                    {/* <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label> */}
                                                </div>
                                                <div className="tpsign__pass">
                                                    {/* <Link href="#">Forget Password</Link> */}
                                                </div>
                                            </div>
                                            <div className="tptrack__btn">
                                                <button 
                                                    className="tptrack__submition" 
                                                    type="submit"
                                                    disabled={loginLoading}
                                                >
                                                    {loginLoading ? "Logging in..." : "Login Now"}
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div className="tptrack__product mb-40">
                                    <div className="tptrack__thumb">
                                        <img src="/assets/img/banner/sign-bg.jpg" alt="" />
                                    </div>
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <img src="/assets/img/icon/sign-up.png" alt="" />
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Sign Up</h4>
                                                <p>Your personal data will be used to support your experience throughout this website, to manage access to your account.</p>
                                            </div>
                                        </div>
                                        {registerError && <div className="text-red-500 mb-4">{registerError}</div>}
                                        <form onSubmit={handleRegister}>
                                            
                                            <div className="tptrack__id mb-10">
                                            <span><i className="fal fa-user" /></span>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    placeholder="Full Name" 
                                                    value={registerData.name}
                                                    onChange={handleRegisterChange}
                                                    required
                                                />
                                            </div>
                                            <div className="tptrack__id mb-10">
                                                <span><i className="fal fa-envelope" /></span>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    placeholder="Email address" 
                                                    value={registerData.email}
                                                    onChange={handleRegisterChange}
                                                    required
                                                />
                                            </div>
                                            <div className="tptrack__email mb-10">
                                                <span><i className="fal fa-key" /></span>
                                                <input 
                                                    type="password" 
                                                    name="password"
                                                    placeholder="Password" 
                                                    value={registerData.password}
                                                    onChange={handleRegisterChange}
                                                    required
                                                />
                                            </div>
                                            <div className="tpsign__account">
                                                {/* <Link href="#">Already Have Account?</Link> */}
                                            </div>
                                            <div className="tptrack__btn">
                                                <button 
                                                    className="tptrack__submition tpsign__reg" 
                                                    type="submit"
                                                    disabled={registerLoading}
                                                >
                                                    {registerLoading ? "Registering..." : "Register Now"}
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>


            <style jsx>{`
    .tptrack__id,
    .tptrack__email {
        position: relative;
        background-color: #f8f8f8;
        border-radius: 4px;
    }

    .tptrack__id input,
    .tptrack__email input {
        width: 100%;
        height: 60px;
        border: 1px solid #eaeaea;
        background: #ffffff;
        border-radius: 4px;
        padding: 0 20px 0 50px;
        color: #555;
        font-size: 14px;
    }

    .tptrack__id input:focus,
    .tptrack__email input:focus {
        border-color: #FBCC34;
        outline: none;
    }

    .tptrack__id span,
    .tptrack__email span {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #777;
    }

    .tptrack__content {
        padding: 45px 40px 50px;
    }

    .tptrack__submition {
        width: 100%;
        height: 60px;
        background: #FBCC34;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tptrack__submition:hover {
        background: #FBCC34;
    }

    .tptrack__submition i {
        margin-left: 5px;
    }

    .tptrack__submition:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .tptrack__submition.tpsign__reg {
        background: #FBCC34;
    }

    .tptrack__submition.tpsign__reg:hover {
        background: #FBCC34;
    }

    .grey-bg-3 {
        background-color: #f8f8f8;
    }

    .tpsign__remember {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tpsign__pass a,
    .tpsign__account a {
        color: #FBCC34;
        text-decoration: none;
    }

    .tpsign__pass a:hover,
    .tpsign__account a:hover {
        color: #FBCC34;
    }

    .form-check-input {
        margin-right: 8px;
    }
`}</style>
        </>
    )
}