import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const LoginCard = ({ setIsOpen, setIsLogin }) => {
    const { setAuth } = useAuth();
    const [TogglePass, setTogglePass] = useState(false);
    const [UserPhone, setUserPhone] = useState('');
    const [UserPass, setUserPass] = useState('');
    const userRef = useRef();
    const toggleShow = () => {
        setTogglePass(!TogglePass);
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.warn(`Phone: ${UserPhone}`);
        console.warn(`Password: ${UserPass}`);

        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: UserPhone,
                    password: UserPass,
                }),
                withCredentials: true,
            });
            console.log(res.ok);
            const data = await res.json();

            if (res.ok) {
                const accessToken = data?.token;

                const userDetails = data?.data;

                Cookies.set('jwt-auth', accessToken, {
                    // expires: 1 / 8640,
                    expires: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
                    // secure: process.env.NODE_ENV === 'production',
                    // sameSite: 'strict',
                });

                setAuth({ userDetails, isSignedIn: true });
                console.log(accessToken);
                console.log(userDetails);

                toast.success('Login Successfully!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(function () {
                    setUserPhone('');
                    setUserPass('');
                    setIsOpen(false);
                }, 200);
            } else {
                toast.error(data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });

                userRef.current.focus();
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    const isClose = () => {
        setIsOpen(false);
    };

    const gotoRegister = () => {
        setIsLogin(false);
    };

    return (
        <div className="modal__card modal__card-login">
            <div className="modal__card__cont modal__card__cont-login">
                <span className="modal__card__cont__close" onClick={isClose}>
                    X
                </span>

                <h2>Welcome back!</h2>
                <p>Please enter your details</p>
                <form className="modal__form" onSubmit={handleSubmit}>
                    <div className="modal__form__input">
                        <figure className="modal__form__input__icon">
                            {' '}
                            <MdOutlinePhoneAndroid size="2.1rem" color="#9D9D9D" />
                        </figure>
                        <input
                            ref={userRef}
                            type="text"
                            placeholder="Phone Number"
                            value={UserPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            required
                        />
                        <div className="line"></div>
                    </div>

                    <div className="modal__form__input">
                        <figure className="modal__form__input__icon">
                            {' '}
                            <img src="images/icons/form-key-icon.png" alt="Key Icon" />
                        </figure>
                        <input
                            type={!TogglePass ? 'password' : 'text'}
                            value={UserPass}
                            onChange={(e) => setUserPass(e.target.value)}
                            placeholder="Password"
                        />
                        <div className="line"></div>
                        <figure className="modal__form__input__icon pointer" onClick={toggleShow}>
                            {' '}
                            {!TogglePass ? <IoMdEye size="2.5rem" color="#C5C5C5" /> : <IoMdEyeOff size="2.5rem" color="#C5C5C5" />}{' '}
                        </figure>
                    </div>

                    <div className="modal__form__info">
                        <div className="modal__form__info__remeberme">
                            <input type="checkbox" name="" id="rememberme" />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>

                        <div className="modal__form__info__forgotpass">
                            <a href="#" className="a-btn">
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <button className="modal__form__btn btn-primary">Login</button>
                    <p className="u-margin-top-xs">
                        Don’t have an account?{' '}
                        <a className="a-btn" onClick={() => gotoRegister()}>
                            Create one!
                        </a>
                    </p>
                </form>

                <div className="thirdparty__card">
                    <section className="thirdparty__card__or">or</section>

                    <div className="thirdparty__card__btncon">
                        <button className="thirdparty__btn thirdparty__btn--google">
                            <figure className="thirdparty__btn__icon">
                                <img src="images/icons/form-gmail-icon.png" alt="Email Icon" />
                            </figure>
                            Sign In With Google
                        </button>
                        <button className="thirdparty__btn thirdparty__btn--facebook">
                            <figure className="thirdparty__btn__icon">
                                <img src="images/icons/form-fb-icon.png" alt="Email Icon" />
                            </figure>
                            Sign In With Facebook
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal__card__bg modal__card__bg-login">
                <h2 className="logo">g.up</h2>
                <h3>Additional business details will be uploaded.</h3>
                <figure className="modal__card__bg__img">
                    <img src="images/login-img.png" alt="" />
                </figure>
            </div>
        </div>
    );
};

export default LoginCard;
