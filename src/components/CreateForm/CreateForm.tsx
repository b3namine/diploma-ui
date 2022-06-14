import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {CreateFormProps} from "./CreateForm.types";
import {useStyles} from "./CreateForm.styles";

const CreateForm: FC<CreateFormProps> = observer(({onSave, data}) => {
    const classes = useStyles()
    const globalClasses = useGlobalStyles()
    const [values, setValues] = useState({
        name: '',
        info: '',
        contacts: ''
    })

    useEffect(() => {
        if (data) {
            setValues(data)
        }
    }, [data])

    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })
    const handleSubmit = () => onSave(values)
    return (<Paper className={globalClasses.card}>
        <Typography className={classes.title}>Основные данные</Typography>
        <Box>
            <Box><TextField id="outlined-basic"
                            label="Имя"
                            fullWidth
                            name={'name'}
                            value={values.name}
                            onChange={handleChange}
                            size={'small'}
                            variant="outlined"
                            className={globalClasses.input}/></Box>
        </Box>
        <Box>
            <Box><TextField id="outlined-basic"
                            label="Информация"
                            fullWidth
                            multiline
                            name={'info'}
                            value={values.info}
                            onChange={handleChange}
                            size={'small'}
                            minRows={4}
                            variant="outlined"
                            className={globalClasses.input}/></Box>
        </Box>
        <Box>
            <Box><TextField id="outlined-basic"
                            label="Контакты"
                            fullWidth
                            multiline
                            name={'contacts'}
                            value={values.contacts}
                            onChange={handleChange}
                            size={'small'}
                            minRows={4}
                            variant="outlined"
                            className={globalClasses.input}/></Box>
        </Box>
        <Box>
            <Button variant={'contained'}
                    color={'primary'}
                    className={globalClasses.button}
                    onClick={handleSubmit}
                    fullWidth>Подтвердить</Button>
        </Box>
    </Paper>)
})
export default CreateForm
