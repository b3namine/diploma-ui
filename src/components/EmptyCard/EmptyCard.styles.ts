import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    card: {
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:32,
        '& .MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    }
}))
