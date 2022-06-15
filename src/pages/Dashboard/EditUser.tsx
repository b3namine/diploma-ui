import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {userService} from "../../services/user.service";
import {Role, UserUpdate} from "../../Modal/user";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";


const EditUser = observer(() => {

    const navigate = useNavigate();
    const {userId = ''} = useParams()
    const {userForEdit} = userService
    useEffect(() => {
        if (userId) {
            userService.getUser(Number(userId)).catch(console.log)
        }
    }, [userId])

    const handleSubmit = (values: UserUpdate) => userService.updateUserInfo(values)
        .then((res) => {
            if (res) {
                userService.updateRoleUser({id: values.id, role: values.role as Role})
                    .then((res) => res ? navigate('/dashboard') : null)
            }
        })
        .catch(console.log)

    if (!userForEdit) return null
    return (<UserForm data={{...userForEdit, isMan: userForEdit.isMan ? 'male' : 'female'}} onSave={handleSubmit}/>)
})
export default EditUser
