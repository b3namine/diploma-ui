import {observer} from "mobx-react-lite";
import {useStyles} from "./Departments.styles";
import {Box, Button, Typography} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {departmentService} from "../../services/department.service";
import InformationCard from "../../components/InformationCard/InformationCard";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {userService} from "../../services/user.service";
import {onlyAdmins, onlyAdminsManagers} from "../../utils/checkRole";
import {universityService} from "../../services/university.service";
import PageSkeleton from "../../components/PageSkeleton/PageSkeleton";

const Departments = observer(() => {
    const classes = useStyles()
    const {departmentId = ''} = useParams()
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false)
    const {department, loading} = departmentService
    const {userUniversity} = universityService
    const {user} = userService
    useEffect(() => {
        departmentService.getDepartmentById(Number(departmentId)).catch(console.log)
    }, [departmentId])
    useEffect(() => {
        if (!user) return
        universityService.getUniversityByUserId(Number(user.id)).catch(console.log)
        if (!userUniversity) return
        const departmentIds = userUniversity.departments.map(({id}) => id)
        if (!department) return
        setAllowed(departmentIds.includes(department.id))
    }, [user, department])
    if (loading) return <PageSkeleton/>
    if (!department) return <EmptyCard message={'There no department with this ID'}/>

    const handleDepartments = () => navigate(`/university/${department.universityId}`)
    const handleCourse = (courseId: number) => () => navigate(`/course/${courseId}`)
    const handleCreateCourse = (departmentId: number) => () => navigate(`/createCourse/${departmentId}`)
    const handleOnEdit = () => navigate(`/editDepartment/${department.id}`)
    const handleOnDelete = () => departmentService.deleteDepartments(department.id)
        .then((res) => res ? handleDepartments() : null)
        .catch(console.log)

    return (<Fragment>
        <InformationCard name={department.name}
                         id={department.id}
                         info={department.info}
                         contacts={department.contacts}
                         handleGoTo={handleDepartments}
                         editable={allowed || onlyAdmins(user?.roleName)}
                         onDelete={handleOnDelete}
                         onEdit={handleOnEdit}
        />

        <Typography variant={'h4'} className={classes.subTitle}>Направления:</Typography>
        {!department.courses ? null : department.courses.map((course) => (
            <SimpleCard key={course.id} name={course.name} handleGoTo={handleCourse(course.id)}/>
        ))}
        {(onlyAdmins(user?.roleName) || allowed) && <Box marginTop={'24px'}>
            <Button variant={'contained'} color={'primary'} onClick={handleCreateCourse(department.id)}>
                Добавить направление
            </Button>
        </Box>}
    </Fragment>)
})
export default Departments
