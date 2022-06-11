import {Box} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {useStyles} from "./ChooseSkeleton.styles";

const ChooseSkeleton = () => {
    const classes = useStyles()
    return (
        <Box>
            <Box className={classes.container}>
                <Skeleton variant="rect" width={150} height={67} className={classes.skeleton}/>
                <Skeleton variant="rect" width={150} height={67} className={classes.skeleton}/>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
                <Skeleton variant="rect" width={81} height={37} className={classes.skeleton}/>
            </Box>
        </Box>
    )
}
export default ChooseSkeleton
