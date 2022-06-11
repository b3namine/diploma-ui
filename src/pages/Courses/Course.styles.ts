import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    emptyCourse: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        '& .MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: 8
    },
    cardContainer: {
        margin: '30px 0'
    },
    topCard: {
        backgroundColor: 'rgb(13,110,253)',
        padding: 16
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center'
    },
    bigText: {
        color: 'white',
        fontWeight: 700,
        fontSize: '3rem',
    },
    smallText: {
        fontSize: '1.5rem'
    },
    itemText: {
        fontSize: '1.1em',
        fontWeight: 300,
        lineHeight: '1.7em',
        color: '#999'
    },
    infoCardContent: {
        padding: 0
    },
    content: {
        padding: 16
    },
    infoTitle: {
        marginTop: 0,
        marginBottom: '0.5rem',
        fontSize: '1.5rem',
        lineHeight: 1.2,
        fontWeight: 500
    },
    information:{
        color:'#6c757d'
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))
