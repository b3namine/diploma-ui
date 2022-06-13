import {observer} from "mobx-react-lite";
import {Typography} from "@material-ui/core";
import {Fragment, useEffect} from "react";
import {useStyles} from "./University.styles";
import {useNavigate, useParams} from "react-router-dom";
import {universityService} from "../../services/university.service";
import InformationCard from "../../components/InformationCard/InformationCard";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const University = observer(() => {
    const classes = useStyles()
    const {universityId = ''} = useParams()
    const navigate = useNavigate();
    const {university} = universityService

    useEffect(() => {
        universityService.getUniversityById(Number(universityId)).catch(console.log)
    }, [universityId])

    const handleDepartment = (departmentId: number) => () => navigate(`/departments/${departmentId}`)

    if (!university) return <EmptyCard message={'There no university with this ID'}/>

    return (<Fragment>
        <InformationCard name={university.name} info={university.info} contacts={university.contacts}/>
        <Typography variant={'h4'} className={classes.subTitle}>Институты:</Typography>
        {university.departments.map((department) => (
            <SimpleCard key={department.id} name={department.name} handleGoTo={handleDepartment(department.id)}/>
        ))}
    </Fragment>)
})
export default University
