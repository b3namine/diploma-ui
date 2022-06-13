import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import {Typography} from "@material-ui/core";
import {useGlobalStyles} from "../../assets/Global.styles";
import CreateForm from "../../components/CreateForm/CreateForm";
import {Value} from "../../components/CreateForm/CreateForm.types";

const CreateUniversity = observer(()=>{
    const globalClasses = useGlobalStyles()
    const handleSave = (value:Value) => console.log(value)
    return (<Fragment>
        <Typography className={globalClasses.title}>Создание ВУЗа</Typography>
        <CreateForm onSave={handleSave}/>
    </Fragment>)
})
export default CreateUniversity
