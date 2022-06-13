import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {userService} from "../../services/user.service";
import {useNavigate} from "react-router-dom";

const Logout = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        userService.logout().then(() => {
            navigate('/')
        })
    }, [])
    return null
})
export default Logout
