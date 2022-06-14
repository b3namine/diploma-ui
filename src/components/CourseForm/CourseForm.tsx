import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {useGlobalStyles} from "../../assets/Global.styles";
import {ChangeEvent, FC, Fragment, useEffect, useState} from "react";
import {useStyles} from "../../components/CreateForm/CreateForm.styles";
import {CourseFormProps, Data} from "./CourseForm.types";
import {Autocomplete} from "@material-ui/lab";
import {professionService} from "../../services/profession.service";
import {ProfessionItem} from "../../Modal/Profession";

const emptyCourse = {
    id: 0,
    departmentId: 0,
    name: '',
    code: '',
    info: '',
    budgetPlaces: 0,
    contractPlaces: 0,
    years: 0,
    exams: '',
    professionIds: []
}

const CourseForm: FC<CourseFormProps> = observer(({onSave, title, data, departmentId}) => {
    const classes = useStyles()
    const globalClasses = useGlobalStyles()
    const {professions} = professionService
    const [values, setValues] = useState<Data>(emptyCourse)

    useEffect(() => {
        professionService.getAllProfession().catch(console.log)
    }, [])

    useEffect(() => {
        if (data) {
            setValues({
                id: data.id,
                name: data.name,
                code: data.code,
                info: data.info,
                budgetPlaces: data.budgetPlaces,
                contractPlaces: data.contractPlaces,
                years: data.years,
                exams: data.exams,
                professionIds: []
            })
        }
    }, [data])

    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })

    const handleSubmit = () => {
        const outputValues = data ? {...values, id: data.id} : {...values, departmentId}
        onSave(outputValues)
    }
    const handleProfessionChange = (professionItems: ProfessionItem[]) => {

        const professionIds = professionItems.map(({id}) => id)
        setValues({
            ...values,
            professionIds
        })
    }
    const getValues = professions.filter(({id}) => values.professionIds?.includes(id))
    return (
        <Fragment>
            <Typography className={globalClasses.title}>{title}</Typography>
            <Paper className={globalClasses.card}>
                <Typography className={classes.title}>Основные данные</Typography>
                <Box>
                    <TextField id="outlined-basic"
                               label="Название"
                               fullWidth
                               name={'name'}
                               value={values.name}
                               onChange={handleChange}
                               size={'small'}
                               variant="outlined"
                               className={globalClasses.input}/>

                </Box>
                <Box>
                    <TextField id="outlined-basic"
                               label="Код"
                               fullWidth
                               name={'code'}
                               value={values.code}
                               onChange={handleChange}
                               size={'small'}
                               variant="outlined"
                               className={globalClasses.input}/>
                </Box>
                <Box>
                    <TextField id="outlined-basic"
                               label="Информация"
                               fullWidth
                               multiline
                               name={'info'}
                               value={values.info}
                               onChange={handleChange}
                               size={'small'}
                               minRows={3}
                               variant="outlined"
                               className={globalClasses.input}/>
                </Box>
                <Box>
                    <TextField id="outlined-basic"
                               label="Бюджетные места"
                               fullWidth
                               name={'budgetPlaces'}
                               value={values.budgetPlaces}
                               onChange={handleChange}
                               size={'small'}
                               variant="outlined"
                               className={globalClasses.input}/>
                </Box>
                <Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Контрактные места"
                                   fullWidth
                                   name={'contractPlaces'}
                                   value={values.contractPlaces}
                                   onChange={handleChange}
                                   size={'small'}
                                   variant="outlined"
                                   className={globalClasses.input}/>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Продолжительность обучения"
                                   fullWidth
                                   name={'years'}
                                   value={values.years}
                                   onChange={handleChange}
                                   size={'small'}
                                   variant="outlined"
                                   className={globalClasses.input}/>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Вступительные испытания "
                                   fullWidth
                                   name={'exams'}
                                   value={values.exams}
                                   onChange={handleChange}
                                   size={'small'}
                                   variant="outlined"
                                   className={globalClasses.input}/>
                    </Box>
                </Box>
                <Box>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={professions}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        value={getValues}
                        onChange={(_, values) => handleProfessionChange(values)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Профессии"
                                placeholder="Select profession"
                            />
                        )}
                    />
                </Box>
                <Box marginTop={3}>
                    <Button variant={'contained'}
                            color={'primary'}
                            className={globalClasses.button}
                            onClick={handleSubmit}
                            fullWidth>Подтвердить</Button>
                </Box>
            </Paper>
        </Fragment>
    )
})
export default CourseForm
