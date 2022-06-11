import {Box, Button, Container, Typography} from "@material-ui/core";
import {homeTest} from "../services/text.data";


const Home = () => {
    return <Container>
        <div>
            <Typography variant={'h3'}>О сервисе</Typography>
            <Typography>{homeTest}</Typography>
            <Box>
                <Button color={'primary'} variant={'contained'}>Пройти тестирование</Button>
            </Box>
        </div>
        <Box>
            <Typography>Copyright © 2022 GorshunoVLSU</Typography>
        </Box>
    </Container>
}

export default Home
