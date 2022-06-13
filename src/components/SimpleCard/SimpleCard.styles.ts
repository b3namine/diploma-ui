import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    card: {
        marginBottom: 10
    },
    cardName: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        lineHeight: 1.2,
        fontWeight: 500
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))
