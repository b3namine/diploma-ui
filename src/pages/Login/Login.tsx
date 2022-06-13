import {Avatar, Box, Button, Card, CardContent, TextField, Typography} from "@material-ui/core";
import {useStyles} from "./Login.styles";
import {ChangeEvent, useState} from "react";
import {userService} from "../../services/user.service";
import {observer} from "mobx-react-lite";

const Login = observer(() => {
    const classes = useStyles()
    const [values, setValues] = useState({
        login: '',
        password: ''
    })

    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })

    const handleSubmit = () => userService.login(values).catch(console.log)
    return (<Box className={classes.root}>
        <Typography variant={'h5'} className={classes.title}>Вход</Typography>
        <Card className={classes.cardContainer}>
            <CardContent className={classes.loginCard}>
                <Avatar className={classes.large}>H</Avatar>
                <TextField id="outlined-basic"
                           name={'login'}
                           value={values.login}
                           onChange={handleChange}
                           label="Логин"
                           size={'small'}
                           variant="outlined"
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           label="Пароль"
                           size={'small'}
                           type={'password'}
                           variant="outlined"
                           name={'password'}
                           value={values.password}
                           onChange={handleChange}
                           className={classes.input}/>
                <Button variant={'contained'}
                        color={'primary'}
                        className={classes.button}
                        onClick={handleSubmit}
                        fullWidth>Подтвердить</Button>
            </CardContent>
        </Card>
    </Box>)
})
export default Login
