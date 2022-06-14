import {observer} from "mobx-react-lite";
import {Fragment, useEffect} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import {Box, Typography} from "@material-ui/core";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import {useNavigate} from "react-router-dom";
import {universityService} from "../../services/university.service";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import UniversitySkeleton from "../../components/PageSkeleton/UniversitySkeleton";

const Universities = observer(() => {
    const navigate = useNavigate();
    const {universities, loading} = universityService
    const handleUniversity = (universityId: number) => () => navigate(`/university/${universityId}`)
    const handleFind = (value: string) => universityService.getUniversities(value).catch(console.log)

    useEffect(() => {
        universityService.getUniversities().catch(console.log)
    }, [])
    return (<Fragment>
        <Typography variant={'h4'}>ВУЗы</Typography>
        <Box marginTop={'16px'}>
            <SearchBar find={handleFind}/>
        </Box>
        <Box marginTop={'9px'}>
            {loading
                ? <UniversitySkeleton/>
                : !universities.length
                    ? <EmptyCard message={'No University found'}/>
                    : (
                        universities.map((university) => (
                            <SimpleCard key={university.id} name={university.name}
                                        handleGoTo={handleUniversity(university.id)}/>
                        ))
                    )}
        </Box>
    </Fragment>)
})
export default Universities
