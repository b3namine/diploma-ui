import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    title: {
        fontSize: '2.5rem'
    },
    informationCard:{
        marginBottom: 24
    },
    itemText: {
        fontSize: '1.1em',
        fontWeight: 300,
        lineHeight: '1.7em',
        color: '#999'
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))
