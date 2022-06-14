import {
    Box,
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import {useStyles} from "./Registration.styles"
import {ChangeEvent, useState} from "react";
import {observer} from "mobx-react-lite";
import {userService} from "../../services/user.service";
import {useGlobalStyles} from "../../assets/Global.styles";


const Registration = observer(() => {
    const classes = useStyles()
    const globalClasses = useGlobalStyles()
    const {errorReg} = userService
    const [values, setValues] = useState({
        login: '',
        firstName: '',
        secondName: '',
        email: '',
        birthdate: '',
        isMan: '',
        password: ''
    })
    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })

    const handleSubmit = () => userService.registration(values).catch(console.log)

    return (<Box className={classes.root}>
        <Typography variant={'h5'} className={classes.title}>Регистрация</Typography>
        <Card className={classes.cardContainer}>
            <CardContent className={classes.registerCard}>
                <TextField id="outlined-basic"
                           label="Логин"
                           name={'login'}
                           value={values.login}
                           onChange={handleChange}
                           size={'small'}
                           variant="outlined"
                           className={globalClasses.input}/>
                <TextField id="outlined-basic"
                           label="Имя"
                           name={'firstName'}
                           value={values.firstName}
                           onChange={handleChange}
                           size={'small'}
                           variant="outlined"
                           className={globalClasses.input}/>
                <TextField id="outlined-basic"
                           label="Фамиля"
                           name={'secondName'}
                           value={values.secondName}
                           onChange={handleChange}
                           size={'small'} variant="outlined"
                           className={globalClasses.input}/>
                <TextField id="outlined-basic"
                           label="Почта"
                           name={'email'}
                           value={values.email}
                           onChange={handleChange}
                           size={'small'}
                           variant="outlined"
                           className={globalClasses.input}/>
                <TextField id="outlined-basic"
                           type={'date'}
                           name={'birthdate'}
                           value={values.birthdate}
                           onChange={handleChange}
                           size={'small'} variant="outlined"
                           className={globalClasses.input}/>
                <RadioGroup aria-label="gender"
                            name={'isMan'}
                            value={values.isMan}
                            onChange={handleChange}
                            className={globalClasses.sexRadio}>
                    <FormControlLabel value="male"
                                      control={<Radio color="primary" size={'small'}/>}
                                      label="Муж."/>
                    <FormControlLabel value="female"
                                      control={<Radio color="primary" size={'small'}/>}
                                      label="Жен."/>
                </RadioGroup>
                <TextField id="outlined-basic"
                           label="Пароль"
                           name={'password'}
                           value={values.password}
                           onChange={handleChange}
                           type={'password'}
                           size={'small'}
                           variant="outlined"
                           className={globalClasses.input}/>
                {errorReg.status &&
                    <Box marginTop={'10px'} marginBottom={'10px'}><Typography variant={'subtitle2'}>Пожалуйста, заполните всю информацию</Typography></Box>}
                <Button variant={'contained'}
                        color={'primary'}
                        className={globalClasses.button}
                        onClick={handleSubmit}
                        fullWidth>Подтвердить</Button>
            </CardContent>
        </Card>
    </Box>)
})
export default Registration
