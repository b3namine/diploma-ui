import {Box, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const CourseSkeleton = () => {
    return (
        <Box>
            <Box marginBottom={'5px'}  width={'80%'}>
                <Typography component="div" variant={'h4'}>
                    <Skeleton/>
                </Typography>
            </Box>
            <Box marginBottom={'24px'}>
                <Skeleton variant={'rect'} height={200}/>
            </Box>
            <Box>
                <Skeleton variant={'rect'} height={500}/>
            </Box>
        </Box>
    )
}
export default CourseSkeleton
