import {AppBar, Box, Link, Toolbar, Typography} from "@material-ui/core";
import {useStyles} from "./MenuBar.styles";
import {useNavigate} from "react-router-dom";
import {userService} from "../../services/user.service";
import {observer} from "mobx-react-lite";
import {FC, Fragment} from "react";
import {onlyAdmins, onlyAdminsManagers, onlyAuthUser} from "../../utils/checkRole";

type LinkComponentProps = {
    name: string
    path: string
}
const MenuBar = observer(() => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {isAuth, user} = userService


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
                        <LinkComponent path={'/universities'} name={'ВУЗы'}/>
                        <LinkComponent path={'/test'} name={'Тестирование'}/>
                        {!isAuth && (
                            <Fragment>
                                <LinkComponent path={'/login'} name={'Войти'}/>
                                <LinkComponent path={'/registration'} name={'Зарегистрироваться'}/>
                            </Fragment>
                        )}
                        {
                            onlyAdminsManagers(user?.roleName) &&
                            <LinkComponent path={'/manage'} name={'Ваш ВУЗ'}/>
                        }

                        {onlyAuthUser(user?.roleName) && (
                            <Fragment>
                                <LinkComponent path={'/statics'} name={'Личная статистика'}/>
                                <LinkComponent path={'/profile'} name={'Личный кабинет'}/>
                                <LinkComponent path={'/logout'} name={'Выйти'}/>
                            </Fragment>
                        )}
                    </Box>
                </Box>

                {onlyAdmins(user?.roleName) &&
                    <LinkComponent path={'/dashboard'}
                                   name={'панель администратора'}/>
                }
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*    <MenuIcon/>*/}
                {/*</IconButton>*/}
            </Toolbar>
        </AppBar>
    )
})
export default MenuBar
