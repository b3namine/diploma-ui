import {observer} from "mobx-react-lite";
import {Box, Button, Typography} from "@material-ui/core";
import {Fragment, useEffect, useState} from "react";
import {useStyles} from "./University.styles";
import {useNavigate, useParams} from "react-router-dom";
import {universityService} from "../../services/university.service";
import InformationCard from "../../components/InformationCard/InformationCard";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {userService} from "../../services/user.service";
import {onlyAdmins} from "../../utils/checkRole";
import PageSkeleton from "../../components/PageSkeleton/PageSkeleton";

const University = observer(() => {
    const classes = useStyles()
    const {universityId = ''} = useParams()
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false)
    const {university, userUniversity, loading} = universityService
    const {user} = userService

    useEffect(() => {
        universityService.getUniversityById(Number(universityId)).catch(console.log)
    }, [universityId])

    useEffect(() => {
        if (user) {
            universityService.getUniversityByUserId(Number(user?.id)).catch(console.log)
        }
        setAllowed(userUniversity?.id === university?.id)
    }, [user, university])
    if (loading) return <PageSkeleton/>
    if (!university) return <EmptyCard message={'There no university with this ID'}/>

    const handleDepartment = (departmentId: number) => () => navigate(`/departments/${departmentId}`)
    const handleOnEdit = () => navigate(`/editUniversity/${university.id}`)
    const handleOnDelete = () => universityService.deleteUniversity(university.id)
        .then((res) => res ? navigate('/universities') : null)
        .catch(console.log)
    const handleCreateDepartment = () => navigate(`/createDepartment/${university.id}`)
    return (<Fragment>
        <InformationCard name={university.name}
                         id={university.id}
                         info={university.info}
                         contacts={university.contacts}
                         editable={allowed || onlyAdmins(user?.roleName)}
                         onDelete={handleOnDelete} onEdit={handleOnEdit}/>
        <Typography variant={'h4'} className={classes.subTitle}>Институты:</Typography>
        {university.departments.map((department) => (
            <SimpleCard key={department.id} name={department.name} handleGoTo={handleDepartment(department.id)}/>
        ))}
        {(onlyAdmins(user?.roleName) || allowed) && <Box marginTop={'24px'}>
            <Button variant={'contained'} color={'primary'} onClick={handleCreateDepartment}>
                Добавить институт
            </Button>
        </Box>}
    </Fragment>)
})
export default University
