import {Card, CardContent} from "@material-ui/core";
import {FC} from "react";
import {useStyles} from "./EmptyCard.styles";
import {EmptyCardProps} from "./EmptyCard.types";


const EmptyCard: FC<EmptyCardProps> = ({message}) => {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent>
                {message}
            </CardContent>
        </Card>
    )
}

export default EmptyCard
