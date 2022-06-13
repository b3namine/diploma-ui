import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    block:{
        marginRight:20,
        width:'100%'
    },
    button: {
        padding:'8px 16px'
    }
}))
