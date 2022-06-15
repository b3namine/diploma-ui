import {Box, Button, Typography} from "@material-ui/core";
import {homeTest} from "../../services/text.data";
import {useStyles} from "./Home.styles";
import {Fragment, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {userService} from "../../services/user.service";
import {onlyAdmins, onlyAdminsManagers, onlyManagers} from "../../utils/checkRole";
import {observer} from "mobx-react-lite";


const Home = observer(() => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {user} = userService

    useEffect(() => {
        if (onlyAdmins(user?.roleName)) {
            navigate('/dashboard')
        }
    }, [user])


    if (onlyAdmins(user?.roleName)) return null
    return <Fragment>
        <div>
            <Typography variant={'h3'} className={classes.title}>О сервисе</Typography>
            <Typography className={classes.text}>{homeTest}</Typography>
            <Box className={classes.buttonContainer}>
                {
                    onlyManagers(user?.roleName) &&
                    <Button color={'primary'} variant={'contained'} onClick={() => navigate('/createUniversity')}>
                        Добавить ВУЗ
                    </Button>
                }
                {!onlyAdminsManagers(user?.roleName) && (
                    <Button color={'primary'} variant={'contained'} onClick={() => navigate('/test')}>
                        Пройти тестирование
                    </Button>)}
            </Box>
        </div>
    </Fragment>
})

export default Home
