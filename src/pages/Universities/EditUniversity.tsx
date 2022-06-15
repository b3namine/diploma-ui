import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Value} from "../../components/CreateForm/CreateForm.types";
import {Fragment, useEffect} from "react";
import {Typography} from "@material-ui/core";
import CreateForm from "../../components/CreateForm/CreateForm";
import {useNavigate, useParams} from "react-router-dom";
import {universityService} from "../../services/university.service";

const EditUniversity = observer(() => {
    const globalClasses = useGlobalStyles()
    const {university, managerUniversity} = universityService
    const {universityId = ''} = useParams()
    const navigate = useNavigate();

    if (managerUniversity && managerUniversity.id !== Number(universityId)) {
        navigate(`/editUniversity/${managerUniversity.id}`)
    }

    useEffect(() => {
        if (universityId) {
            universityService.getUniversityById(Number(universityId)).catch(console.log)
        }
    }, [universityId])

    const handleSave = (value: Value) => universityService.updateUniversity({
        ...value,
        id: Number(universityId)
    }).then((id) => id ? navigate(`/university/${id}`) : null).catch(console.log)

    if (!university) return null
    const data = {
        name: university.name,
        contacts: university.contacts,
        info: university.info
    }
    return (
        <Fragment>
            <Typography className={globalClasses.title}>Редактировать ВУЗа</Typography>
            <CreateForm onSave={handleSave} data={data}/>
        </Fragment>
    )
})
export default EditUniversity
