import {observer} from "mobx-react-lite";
import {userService} from "../../services/user.service";
import {UserUpdate} from "../../Modal/user";
import {useNavigate} from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";


const CreateUser = observer(() => {
    const navigate = useNavigate();
    const handleSubmit = (values: UserUpdate) => userService.creteUser(values)
        .then((res) => Boolean(res) ? navigate('/dashboard') : null)
        .catch(console.log)

    return (<UserForm data={{} as UserUpdate} onSave={handleSubmit}/>)
})
export default CreateUser
