import {AppBar, Box, Link, Toolbar, Typography} from "@material-ui/core";
import {useStyles} from "./MenuBar.styles";
import {useNavigate} from "react-router-dom";
import {userService} from "../../services/user.service";
import {observer} from "mobx-react-lite";
import {FC, Fragment} from "react";
import {onlyAdmins, onlyAdminsManagers, onlyAuthUser, onlyManagers} from "../../utils/checkRole";
import {universityService} from "../../services/university.service";

type LinkComponentProps = {
    name: string
    path: string
}
const MenuBar = observer(() => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {isAuth, user} = userService
    const {managerUniversity} = universityService

    const handleNavigate = (path: string) => () => navigate(path)
    const LinkComponent: FC<LinkComponentProps> = ({path, name}) => (<Link
        className={classes.appBarLink}
        component="button"
        variant="body2"
        onClick={handleNavigate(path)}
    >
        {name}
    </Link>)
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Box className={classes.leftSide}>
                    <Typography variant="h6" className={classes.title} onClick={() => navigate('/')}>
                        Профориентация абитуриентов
                    </Typography>
                    <Box className={classes.items}>
                        {!onlyAdmins(user?.roleName) && <LinkComponent path={'/universities'} name={'ВУЗы'}/>}
                        {!onlyAdminsManagers(user?.roleName) && (<LinkComponent path={'/test'} name={'Тестирование'}/>)}
                        {!isAuth && (
                            <Fragment>
                                <LinkComponent path={'/login'} name={'Войти'}/>
                                <LinkComponent path={'/registration'} name={'Зарегистрироваться'}/>
                            </Fragment>
                        )}
                        {
                            onlyManagers(user?.roleName) && managerUniversity &&
                            <Link
                                className={classes.appBarLink}
                                component="button"
                                variant="body2"
                                onClick={handleNavigate(`/university/${managerUniversity.id}`)}
                            >
                                Ваш ВУЗ
                            </Link>
                        }
                        {onlyAuthUser(user?.roleName) && (
                            <Fragment>
                                {!onlyAdminsManagers(user?.roleName) &&
                                    <LinkComponent path={'/statics'} name={'Личная статистика'}/>}
                                {onlyManagers(user?.roleName) &&
                                    <LinkComponent path={'/usersStatics'} name={'Общая статистика'}/>}

                                <LinkComponent path={'/profile'} name={'Личный кабинет'}/>
                                {onlyAdmins(user?.roleName) &&
                                    <LinkComponent path={'/dashboard'}
                                                   name={'панель администратора'}/>
                                }

                            </Fragment>
                        )}
                    </Box>
                </Box>
                {onlyAuthUser(user?.roleName) && (<LinkComponent path={'/logout'} name={'Выйти'}/>)}

            </Toolbar>
        </AppBar>
    )
})
export default MenuBar
