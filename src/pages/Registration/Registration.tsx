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
import {useState, ChangeEvent} from "react";


const Registration = () => {
    const classes = useStyles()
    const [values, setValues] = useState({
        login: '',
        name: '',
        family: '',
        email: '',
        birth: '',
        gender: '',
        password: ''
    })
    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })

    const handleSubmit = () => console.log(values)

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
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           label="Имя"
                           name={'name'}
                           value={values.name}
                           onChange={handleChange}
                           size={'small'}
                           variant="outlined"
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           label="Фамиля"
                           name={'family'}
                           value={values.family}
                           onChange={handleChange}
                           size={'small'} variant="outlined"
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           label="Почта"
                           name={'email'}
                           value={values.email}
                           onChange={handleChange}
                           size={'small'}
                           variant="outlined"
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           type={'date'}
                           name={'birth'}
                           value={values.birth}
                           onChange={handleChange}
                           size={'small'} variant="outlined"
                           className={classes.input}/>
                <RadioGroup aria-label="gender"
                            name={'gender'}
                            value={values.gender}
                            onChange={handleChange}
                            className={classes.sexRadio}>
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
                           className={classes.input}/>
                <Button variant={'contained'}
                        color={'primary'}
                        className={classes.button}
                        onClick={handleSubmit}
                        fullWidth>Подтвердить</Button>
            </CardContent>
        </Card>
    </Box>)
}
export default Registration
