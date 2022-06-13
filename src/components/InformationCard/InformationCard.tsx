import {observer} from "mobx-react-lite";
import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {FC, Fragment} from "react";
import {useStyles} from "./InformationCard.styles";
import {InformationCardProps} from "./InformationCard.types";


const InformationCard: FC<InformationCardProps> = observer(({name, info, contacts, handleGoTo}) => {
    const classes = useStyles()
    return (
        <Fragment>
            <Typography variant={'h4'} className={classes.title}>{name}</Typography>
            <Card className={classes.informationCard}>
                <CardContent>
                    <Box className={classes.itemText}>{info}</Box>
                    <Box>Контакты:</Box>
                    <Box className={classes.itemText}>
                        {contacts}
                    </Box>
                    {handleGoTo && <Box>
                        <Button variant={'text'}
                                className={classes.selectButton}
                                onClick={handleGoTo}
                        >Все институты</Button>
                    </Box>}
                </CardContent>
            </Card>
        </Fragment>
    )
})
export default InformationCard
