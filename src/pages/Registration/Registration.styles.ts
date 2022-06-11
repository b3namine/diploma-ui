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
    registerCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginBottom: '1rem',
        minWidth: 223,
    },
    button:{
        backgroundColor: '#0d6efd',
        maxWidth: 223,
        marginBottom: '1rem'
    },
    sexRadio:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '1rem'
    }
}));
