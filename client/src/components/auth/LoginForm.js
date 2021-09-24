import { 
    Button, 
    Form 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../../components/layout/AlertMessage';
import iconIcon from '../../assets/img/brand/favicon.png';

const LoginForm = () => {

    // Context
    const {loginUser} = useContext(AuthContext)

    // Route
    //const history = useHistory()

    // Local State
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {
                //history.push('/dashboard')
            }else{
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return (
        <>
            <div className="card-sigin">
                <div className="mb-5 d-flex"> <Link to="/dashboard"><img src={iconIcon} className="sign-favicon ht-40" alt="logo" /></Link><h1 className="main-logo1 ml-1 mr-0 my-auto tx-28">K<span>2</span> Software</h1></div>
                <div className="card-sigin">
                    <div className="main-signup-header">
                        <h2>Chào mừng quay trở lại!</h2>
                        <h5 className="font-weight-semibold mb-4">Xin vui lòng đăng nhập để tiếp tục.</h5>
                        <Form onSubmit={login}>
                            <AlertMessage info={alert} />
                            <Form.Group>
                                <label>Tài Khoản</label>
                                <Form.Control type="text" placeholder="Tài Khoản" name="username" value={username} onChange={onChangeLoginForm} required />
                            </Form.Group>
                            <Form.Group>
                                <label>Mật Khẩu</label>
                                <Form.Control type="password" placeholder="Mật khẩu của bạn" name="password" autoComplete="on" value={password} onChange={onChangeLoginForm} required />
                            </Form.Group>
                            <Button variant='success' className="btn btn-main-primary btn-block" type='submit'>Đăng Nhập</Button>
                        </Form>
                        <div className="main-signin-footer mt-5">
                            <p>Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
