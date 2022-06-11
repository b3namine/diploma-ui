import {AppBar, Box, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from "./MenuBar.styles";
import {useNavigate} from "react-router-dom";


const MenuBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleNavigate = (path: string) => () => navigate(path)
    const menuList = [
        {
            title: 'ВУЗы',
            path: '/universities'
        },
        {
            title: 'Тестирование',
            path: '/test'
        },
        {
            title: 'Войти',
            path: '/login'
        },
        {
            title: 'Зарегистрироваться',
            path: '/registration'
        },
    ]
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Box className={classes.leftSide}>
                    <Typography variant="h6" className={classes.title} onClick={() => navigate('/')}>
                        Профориентация абитуриентов
                    </Typography>
                    <Box className={classes.items}>
                        {menuList.map((item, index) => (
                            <Link
                                key={index}
                                className={classes.appBarLink}
                                component="button"
                                variant="body2"
                                onClick={handleNavigate(item.path)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                </Box>

                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*    <MenuIcon/>*/}
                {/*</IconButton>*/}
            </Toolbar>
        </AppBar>
    )
}
export default MenuBar
