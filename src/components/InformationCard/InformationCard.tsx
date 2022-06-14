import {observer} from "mobx-react-lite";
import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {FC, Fragment} from "react";
import {useStyles} from "./InformationCard.styles";
import {InformationCardProps} from "./InformationCard.types";
import {userService} from "../../services/user.service";
import {onlyAdminsManagers} from "../../utils/checkRole";


const InformationCard: FC<InformationCardProps> = observer(({
                                                                id,
                                                                name,
                                                                info,
                                                                contacts,
                                                                handleGoTo,
                                                                editable = false,
                                                                onEdit,
                                                                onDelete
                                                            }) => {
    const classes = useStyles()
    const {user} = userService


    const ButtonWithRole = () => {
        if (!editable || !onlyAdminsManagers(user?.roleName)) return null
        return <Fragment>
            <Box>
                <Button variant={'text'} className={classes.selectButton} onClick={onEdit}>
                    Редактировать
                </Button>
            </Box>
            <Box marginLeft={'8px'}>
                <Button variant={'text'} className={classes.selectButton} onClick={onDelete}>
                    Удалить
                </Button>
            </Box>
        </Fragment>
    }

    const ButtonMore = () => {
        if (!handleGoTo) return null
        return (
            <Box marginRight={'8px'}>
                <Button variant={'text'}
                        className={classes.selectButton}
                        onClick={handleGoTo}
                >Все институты</Button>
            </Box>
        )
    }

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
                    <Box display={'flex'}>
                        <ButtonMore/>
                        <ButtonWithRole/>
                    </Box>
                </CardContent>
            </Card>
        </Fragment>
    )
})
export default InformationCard
