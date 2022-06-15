import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Fragment} from "react";
import {Typography} from "@material-ui/core";
import CreateForm from "../../components/CreateForm/CreateForm";
import {Value} from "../../components/CreateForm/CreateForm.types";
import {useNavigate, useParams} from "react-router-dom";
import {departmentService} from "../../services/department.service";
import {universityService} from "../../services/university.service";

const CreateDepartment = observer(() => {
    const globalClasses = useGlobalStyles()
    const navigate = useNavigate();
    const {universityId = ''} = useParams()
    const {managerUniversity} = universityService

    if (managerUniversity && managerUniversity.id !== Number(universityId)) {
        navigate(`/createDepartment/${managerUniversity.id}`)
    }

    const handleSave = (value: Value) => departmentService.createDepartments({
        ...value,
        universityId: Number(universityId)
    })
        .then((id) => id ? navigate(`/departments/${id}`) : null)
        .catch(console.log)
    return (<Fragment>
        <Typography className={globalClasses.title}>Создание института</Typography>
        <CreateForm onSave={handleSave}/>
    </Fragment>)
})
export default CreateDepartment
