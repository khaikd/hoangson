import LoginFrom from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
//import Spinner from 'react-bootstrap/Spinner';
import loaderImg from '../assets/img/loader.svg';
import learnItLogo from '../assets/img/media/login.png';

const Auth = ({ authRoute }) => {

    const { authState: {authLoading, isAuthenticated} } = useContext(AuthContext)

    let body

    if(authLoading){
        body = (
            <div id="global-loader">
                <img src={loaderImg} alt="Loader" className='loader-img' />
            </div>
        )
    }else{
        if(isAuthenticated){
            return <Redirect to='/dashboard' />
        }else{
            body = (
                <>
                    { authRoute === 'login' && <LoginFrom /> }
                    { authRoute === 'register' && <RegisterForm /> }
                </>
            )
        }
    }

    return (
        <div className="error-page1 bg-light">
            <div className="page">
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
                            <div className="row wd-100p mx-auto text-center">
                                <div className="col-md-12 col-lg-12 col-xl-12 my-auto mx-auto wd-100p">
                                    <img src={learnItLogo} className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mx-auto" alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-5 bg-white">
                            <div className="login d-flex align-items-center py-2">
                                <div className="container p-0">
                                    <div className="row">
                                        <div className="col-md-10 col-lg-10 col-xl-9 mx-auto">
                                            {body}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
