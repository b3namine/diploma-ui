import {observer} from "mobx-react-lite";
import {Box, Button, Card, CardContent} from "@material-ui/core";
import {useStyles} from "./SimpleCard.styles";
import {FC} from "react";
import {SimpleCardProps} from "./SimpleCard.types";


const SimpleCard:FC<SimpleCardProps> = observer(({name,handleGoTo})=>{
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent>
                <Box className={classes.cardName}>{name}</Box>
                <Box>
                    <Button variant={'text'}
                            className={classes.selectButton}
                            onClick={handleGoTo}
                    >
                        Подробнее
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
})

export default SimpleCard
