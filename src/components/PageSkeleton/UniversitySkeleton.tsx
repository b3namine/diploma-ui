import {Box} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const UniversitySkeleton = () => {
    return (
        <Box marginTop={'16px'}>
            <Box marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
            <Box marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
            <Box marginBottom={'5px'}>
                <Skeleton variant={'rect'} height={100}/>
            </Box>
        </Box>
    )
}
export default UniversitySkeleton
