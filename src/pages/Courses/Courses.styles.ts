import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    emptyCourse: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:32,
        '& .MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: 8
    },
    card: {
        marginBottom: 10,
        '& .MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    cardUniversity: {
        fontSize: '1.5rem',
        marginBottom: '.5rem',
        fontWeight: 500,
        lineHeight: 1.2
    },
    cardDepartment: {
        fontSize: '1rem',
        color: '#6c757d',
        marginBottom: '.5rem',
    },
    cardCourse: {
        fontSize: '1.1rem',
        color: '#6c757d',
        marginBottom: '1rem',
    },
    selectButton: {
        paddingLeft: 0,
        paddingRight: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))
