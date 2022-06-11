import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
    title: {
        marginBottom: 8,
        fontSize: '2.5rem'
    },
    text: {
        fontSize: '1.1em',
        fontWeight: 300,
        lineHeight: '1.7rem',
        color: '#999',
        marginBottom: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 48,
        '& button':{
            color: '#fff',
            backgroundColor: '#0d6efd',
            borderColor: ' #0d6efd'
        }
    }
})
