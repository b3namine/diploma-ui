import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    cardContainer:{
        minWidth: 300
    },
    title: {
        marginBottom: '3rem'
    },
    loginCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: '24px 0',
        backgroundColor: '#0d6efd'
    },
    input: {
        marginBottom: '1rem'
    },
    button:{
        backgroundColor: '#0d6efd',
        maxWidth: 223,
        marginBottom: '1rem'
    }
}));
