import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    responseContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px',
    },
    response: {
        border: '1px solid rgba(0,0,0,0.125)',
        backgroundColor: 'rgba(222,226,230,0.8)',
        padding: '16px',
        margin: '10px',
        borderRadius: 4,
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            border: '1px solid rgba(0,0,0,0.5)',
        },
        '&:active': {
            backgroundColor: 'rgba(222,226,230,1)',
        }
    },
    activeChoose:{
        border: '1px solid rgba(13,110,253,0.5)',
        backgroundColor: 'rgba(13,110,253,0.2)',
    }
}))
