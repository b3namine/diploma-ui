import {Box, Button, Typography} from "@material-ui/core";
import {homeTest} from "../../services/text.data";
import {useStyles} from "./Home.styles";
import {Fragment} from "react";


const Home = () => {
    const classes = useStyles()
    return <Fragment>
        <div>
            <Typography variant={'h3'} className={classes.title}>О сервисе</Typography>
            <Typography className={classes.text}>{homeTest}</Typography>
            <Box className={classes.buttonContainer}>
                <Button color={'primary'} variant={'contained'}>Пройти тестирование</Button>
            </Box>
        </div>
    </Fragment>
}

export default Home
