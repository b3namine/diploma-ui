import {createStyles, LinearProgress, makeStyles, Theme, withStyles} from "@material-ui/core";

export const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 16,
            borderRadius: 4,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 0
        },
    }),
)(LinearProgress);

export const useStyles = makeStyles((theme) => ({
    barContainer: {
        padding: '10px 0'
    },
    barTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 0',
        fontWeight: 'bold',
        fontSize: '.875em'
    },
    barColorRed: {
        backgroundColor: '#dc3545',
    },
    barColorOrange: {
        backgroundColor: '#ffc107',
    },
    barColorGreen: {
        backgroundColor: '#198754',
    },
    cardProfession: {
        padding: 16
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bolder'
    },
    resultTitle: {
        marginTop: '0',
        marginBottom: '0.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
        fontSize: '2.5rem'
    },
    resultText: {
        fontSize: '1.1em',
        color: '#999'
    },
    subTitle: {
        fontSize: '2rem',
        marginBottom: '0.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
        padding: '30px 0 8px'
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover':{
            backgroundColor: 'transparent'
        }
    }
}))
