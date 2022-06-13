import {observer} from "mobx-react-lite";
import {useStyles} from "./Departments.styles";
import {Typography} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect} from "react";
import {departmentService} from "../../services/department.service";
import InformationCard from "../../components/InformationCard/InformationCard";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Departments = observer(() => {
    const classes = useStyles()
    const {departmentId = ''} = useParams()
    const navigate = useNavigate();
    const {department} = departmentService
    useEffect(() => {
        departmentService.getDepartmentById(Number(departmentId)).catch(console.log)
    }, [departmentId])

    if (!department) return <EmptyCard message={'There no department with this ID'}/>

    const handleDepartments = () => navigate(`/university/${department.universityId}`)
    const handleCourse = (courseId: number) => () => navigate(`/course/${courseId}`)

    return (<Fragment>
        <InformationCard name={department.name}
                         info={department.info}
                         contacts={department.contacts}
                         handleGoTo={handleDepartments}/>

        <Typography variant={'h4'} className={classes.subTitle}>Направления:</Typography>
        {!department.courses ? null : department.courses.map((course) => (
            <SimpleCard key={course.id} name={course.name} handleGoTo={handleCourse(course.id)}/>
        ))}
    </Fragment>)
})
export default Departments
