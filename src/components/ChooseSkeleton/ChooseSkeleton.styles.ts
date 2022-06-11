import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px',
    },
    skeleton: {
        margin: 10,
        borderRadius: 4
    }
}))
