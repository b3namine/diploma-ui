import {observer} from "mobx-react-lite";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Box, Button, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography} from "@material-ui/core";
import {userService} from "../../services/user.service";
import {UserUpdate} from "../../Modal/user";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../utils/dateFormate";

const emptyUser = {
    id: 0,
    login: '',
    firstName: '',
    secondName: '',
    email: '',
    birthdate: '12-12-1970',
    isMan: '',
    password: ''
}


const EditProfile = observer(() => {
    const globalClasses = useGlobalStyles()
    const {user} = userService
    const navigate = useNavigate();
    const [values, setValues] = useState<UserUpdate>(emptyUser)

    useEffect(() => {
        if (user) {
            userService.getUser(user.id)
                .then((data) => {
                    setValues({...data, isMan: data.isMan ? 'male' : 'female'})
                })
                .catch(console.log)
        }
    }, [user])

    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => userService.updateUserInfo(values)
        .then((res) => res ? navigate('/profile') : null)
        .catch(console.log)

    if (!values) return null

    return (
        <Fragment>
            <Typography className={globalClasses.title}>Редактирование данных аккаунта</Typography>
            <Paper className={globalClasses.card}>
                <Box>
                    <Box className={globalClasses.label}>Имя</Box>
                    <Box><TextField id="outlined-basic"
                                    label="Имя"
                                    fullWidth
                                    name={'firstName'}
                                    value={values.firstName}
                                    onChange={handleChange}
                                    size={'small'}
                                    variant="outlined"
                                    className={globalClasses.input}/></Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Фамиля</Box>
                    <Box> <TextField id="outlined-basic"
                                     label="Фамиля"
                                     fullWidth
                                     name={'secondName'}
                                     value={values.secondName}
                                     onChange={handleChange}
                                     size={'small'} variant="outlined"
                                     className={globalClasses.input}/></Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Логин</Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Логин"
                                   fullWidth
                                   name={'login'}
                                   value={values.login}
                                   onChange={handleChange}
                                   size={'small'}
                                   variant="outlined"
                                   className={globalClasses.input}/>
                    </Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Почта</Box>
                    <Box><TextField id="outlined-basic"
                                    label="Почта"
                                    fullWidth
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    size={'small'}
                                    variant="outlined"
                                    className={globalClasses.input}/></Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Дата рождения</Box>
                    <Box><TextField id="outlined-basic"
                                    type={'date'}
                                    fullWidth
                                    name={'birthdate'}
                                    value={formatDate(values.birthdate)}
                                    onChange={handleChange}
                                    size={'small'} variant="outlined"
                                    className={globalClasses.input}/></Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Пол</Box>
                    <Box>
                        <RadioGroup aria-label="gender"
                                    name={'isMan'}
                                    value={values.isMan}
                                    onChange={handleChange}
                        >
                            <FormControlLabel value="male"
                                              control={<Radio color="primary" size={'small'}/>}
                                              label="Мужчина"/>
                            <FormControlLabel value="female"
                                              control={<Radio color="primary" size={'small'}/>}
                                              label="Женщина"/>
                        </RadioGroup>
                    </Box>
                </Box>
                <Box>
                    <Box className={globalClasses.label}>Пароль</Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Пароль"
                                   fullWidth
                                   name={'password'}
                                   value={values.password}
                                   onChange={handleChange}
                                   type={'password'}
                                   size={'small'}
                                   variant="outlined"
                                   className={globalClasses.input}/>
                    </Box>
                </Box>
                <Box>
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
export default EditProfile
