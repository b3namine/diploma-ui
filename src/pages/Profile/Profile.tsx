import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {userService} from "../../services/user.service";
import {useStyles} from "./Profile.styles";
import {useGlobalStyles} from "../../assets/Global.styles";
import {useNavigate} from "react-router-dom";

const Profile = observer(() => {
    const {user, loading} = userService
    const classes = useStyles()
    const globalClasses = useGlobalStyles()
    const navigate = useNavigate();
    const editProfile = () => navigate('/editProfile')
    return (
        <Fragment>
            {loading
                ? 'Loading ... '
                : !user
                    ? null
                    : (
                        <Fragment>
                            <Typography variant={'h4'} className={classes.title}>Личный кабинет</Typography>
                            <Card>
                                <CardContent>
                                    <Box className={classes.itemText}>Логин: {user.login}</Box>
                                    <Box className={classes.itemText}>Имя: {user.firstName}</Box>
                                    <Box className={classes.itemText}>Почта: {user.email}</Box>
                                    <Box className={classes.itemText}>Дата рождения: {user.birthdate}</Box>
                                    <Box className={classes.itemText}>Пол: {user.isMan}</Box>
                                    <Box>
                                        <Button className={globalClasses.selectButton} onClick={editProfile}>
                                            Редактировать данные аккаунта
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Fragment>
                    )}
        </Fragment>
    )
})
export default Profile
