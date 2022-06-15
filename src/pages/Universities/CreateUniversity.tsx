import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import {Typography} from "@material-ui/core";
import {useGlobalStyles} from "../../assets/Global.styles";
import CreateForm from "../../components/CreateForm/CreateForm";
import {Value} from "../../components/CreateForm/CreateForm.types";
import {universityService} from "../../services/university.service";
import {useNavigate} from "react-router-dom";

const CreateUniversity = observer(() => {
    const globalClasses = useGlobalStyles()
    const navigate = useNavigate();
    const handleSave = (value: Value) => universityService.createUniversity(value)
        .then((id) => id ? navigate(`/university/${id}`) : null)
        .catch(console.log)

    return (
        <Fragment>
            <Typography className={globalClasses.title}>Создание ВУЗа</Typography>
            <CreateForm onSave={handleSave}/>
        </Fragment>
    )
})
export default CreateUniversity
