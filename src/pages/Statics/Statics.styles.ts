import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    title: {
        marginBottom: 24,
        fontSize: '2.5rem'
    },
    cardHeader: {
        backgroundColor: 'rgba(0,0,0,.03)',
        padding: '5px',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 16,
        color: '#0d6efd'
    },
    subTitle: {
        marginTop: 30,
        fontSize: '2rem',
        lineHeight: 1.2,
        marginBottom: '0.5rem'
    },
    cardProfession: {
        padding: 16
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bolder'
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover':{
            backgroundColor: 'transparent'
        }
    }
}))
