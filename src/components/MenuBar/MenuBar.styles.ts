import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffc107',
        padding: '2px 0px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    leftSide: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        paddingTop: '0.3125rem',
        paddingBottom: '0.3125rem',
        marginRight: '1rem',
        fontSize: '1.25rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    items: {
        margin: '0 10px'
    },
    appBarLink: {
        color: 'rgba(0,0,0,.55)',
        padding: '1rem 0.5rem',
        fontSize: '1rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        fontWeight: 400
    }
}));
