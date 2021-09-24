import { 
    Button, 
    Form 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../../components/layout/AlertMessage';

const RegisterForm = () => {

    // Context
    const {registerUser} = useContext(AuthContext)

    // Route
    //const history = useHistory()

    // Local State
    const [registerForm, setRegisterForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const { name, username, password, confirmPassword } = registerForm

    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

    const register = async event => {
        event.preventDefault()

        if(password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match!' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }else{
                setAlert({ type: 'success', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Label><strong>Họ và tên</strong></Form.Label>
                    <Form.Control type="text" placeholder="Họ và Tên" name="name" value={name} onChange={onChangeRegisterForm} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Tên đăng nhập</strong></Form.Label>
                    <Form.Control type="text" placeholder="Tên tài khoản" name="username" value={username} onChange={onChangeRegisterForm} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Mật khẩu</strong></Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" name="password" autoComplete="on" value={password} onChange={onChangeRegisterForm} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Nhập lại mật khẩu</strong></Form.Label>
                    <Form.Control type="password" placeholder="Nhập lại mật khẩu" name="confirmPassword" autoComplete="on" value={confirmPassword} onChange={onChangeRegisterForm} required />
                </Form.Group>
                <Button variant='success' type='submit'>Đăng Ký</Button>
            </Form>
            <p>Bạn có tài khoản và đăng nhập ngay tại đây? <Link to="/login"><Button variant='info' size='sm' className='ml-2'>Đăng Nhập</Button></Link></p>
        </>
    )
}

export default RegisterForm
