import {Avatar, Box, Button, Card, CardContent, TextField, Typography} from "@material-ui/core";
import {useStyles} from "./Login.styles";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {userService} from "../../services/user.service";
import {observer} from "mobx-react-lite";

const Login = observer(() => {
    const classes = useStyles()
    const {error} = userService
    const [values, setValues] = useState({
        login: '',
        password: ''
    })

    const handleChange = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => setValues({
        ...values,
        [name]: value
    })

    const handleSubmit = () => userService.login(values).catch(console.log)
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' ? handleSubmit() : null
    return (<Box className={classes.root}>
        <Typography variant={'h5'} className={classes.title}>Вход</Typography>
        <Card className={classes.cardContainer}>
            <CardContent className={classes.loginCard}>
                <Avatar className={classes.large}>H</Avatar>
                {error.status && error.message && <Box marginBottom={'12px'}><Typography variant={'subtitle2'}>{error.message}</Typography></Box>}
                <TextField id="outlined-basic"
                           name={'login'}
                           value={values.login}
                           error={error.status}
                           onChange={handleChange}
                           label="Логин"
                           size={'small'}
                           variant="outlined"
                           onKeyPress={handleKeyPress}
                           className={classes.input}/>
                <TextField id="outlined-basic"
                           label="Пароль"
                           size={'small'}
                           error={error.status}
                           type={'password'}
                           variant="outlined"
                           name={'password'}
                           value={values.password}
                           onChange={handleChange}
                           onKeyPress={handleKeyPress}
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
