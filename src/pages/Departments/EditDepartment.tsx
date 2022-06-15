import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {useNavigate, useParams} from "react-router-dom";
import {Value} from "../../components/CreateForm/CreateForm.types";
import {departmentService} from "../../services/department.service";
import {Fragment, useEffect} from "react";
import {Typography} from "@material-ui/core";
import CreateForm from "../../components/CreateForm/CreateForm";
import {universityService} from "../../services/university.service";

const EditDepartment = observer(() => {
    const globalClasses = useGlobalStyles()
    const navigate = useNavigate();
    const {department} = departmentService
    const {managerUniversity} = universityService
    const {departmentId = ''} = useParams()
    if (managerUniversity && !managerUniversity.departments.map(({id}) => id).includes(Number(departmentId))) {
        const path = managerUniversity.departments.length ? `/editDepartment/${managerUniversity.departments[0].id}` : `/university/${managerUniversity.id}`
        navigate(path)
    }
    useEffect(() => {
        if (departmentId) {
            departmentService.getDepartmentById(Number(departmentId)).catch(console.log)
        }
    }, [departmentId])
    const handleSave = (value: Value) => departmentService.updateDepartments({
        ...value,
        id: Number(departmentId)
    }).then((id) => id ? navigate(`/departments/${id}`) : null).catch(console.log)

    if (!department) return null

    const data = {
        name: department.name,
        contacts: department.contacts,
        info: department.info
    }
    return (<Fragment>
        <Typography className={globalClasses.title}>Редактировать института</Typography>
        <CreateForm onSave={handleSave} data={data}/>
    </Fragment>)
})
export default EditDepartment
