import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Fragment} from "react";
import {Typography} from "@material-ui/core";
import CreateForm from "../../components/CreateForm/CreateForm";
import {Value} from "../../components/CreateForm/CreateForm.types";

const CreateDepartment = observer(() => {
    const globalClasses = useGlobalStyles()
    const handleSave = (value: Value) => console.log(value)
    return (<Fragment>
        <Typography className={globalClasses.title}>Создание института</Typography>
        <CreateForm onSave={handleSave}/>
    </Fragment>)
})
export default CreateDepartment
