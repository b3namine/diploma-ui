import {makeStyles} from "@material-ui/core";

export const useGlobalStyles = makeStyles(() => ({
    title: {
        marginBottom: 8,
        fontSize: '2.5rem'
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
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    input: {
        marginBottom: '1rem',
        minWidth: 223,
    },
    button: {
        backgroundColor: '#0d6efd',
        maxWidth: 223,
        marginBottom: '1rem'
    },
    sexRadio: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '1rem'
    },
    card: {
        padding: 16
    },
    label: {
        marginBottom: 8
    }
}))
