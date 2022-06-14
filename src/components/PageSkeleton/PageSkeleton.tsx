import {Box, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const PageSkeleton = () => {
    return (
        <Box>
            <Box marginBottom={'5px'}  width={'80%'}>
                <Typography component="div" variant={'h4'}>
                    <Skeleton/>
                </Typography>
            </Box>
            <Box marginBottom={'28px'}>
                <Skeleton variant={'rect'} height={200}/>
            </Box>
            <Box marginBottom={'5px'}  width={'80%'}>
                <Typography component="div" variant={'h4'}>
                    <Skeleton/>
                </Typography>
            </Box>
            <Box  marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
            <Box  marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
            <Box  marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
        </Box>
    )
}
export default PageSkeleton
