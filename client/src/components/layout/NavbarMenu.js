import { Fragment } from 'react'
import MainHeaderTop from './MainHeaderTop';
import MainMenu from './mainHeader/MainMenu';


const NavbarMenu = () => {

    //const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)

    //const logout = () => logoutUser()

    return (
        <Fragment>
            <MainHeaderTop />
            <MainMenu />
        </Fragment>
    )
}

export default NavbarMenu
