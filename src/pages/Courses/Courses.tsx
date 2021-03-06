import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {coursesService} from "../../services/courses.service";
import {useStyles} from "./Courses.styles";
import {observer} from "mobx-react-lite";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Courses = observer(() => {
    const classes = useStyles()
    const navigate = useNavigate();
    const {professionId = ''} = useParams()
    const {courses} = coursesService
    const [profName, setProfName] = useState('')
    useEffect(() => {
        if (professionId) {
            coursesService.getCoursesByProfession(Number(professionId)).catch(() => console.log('error'))
            setProfName(String(localStorage.getItem('prof')))
            return
        }
    }, [professionId])
    const handleCourseDetails = (courseId: number) => () => navigate(`/course/${courseId}`)
    if (!courses.length) {
        return <EmptyCard message={'No course found'}/>
    }
    return (
        <Box>
            <Typography variant={'h4'} className={classes.title}>
                Направления обучения для профессии <strong>"{profName}"</strong>
            </Typography>
            {
                courses.map((course) => (
                    <Card key={course.id} className={classes.card}>
                        <CardContent>
                            <Box className={classes.cardUniversity}>{course.university.name}</Box>
                            <Box className={classes.cardDepartment}>{course.department.name}</Box>
                            <Box className={classes.cardCourse}>{course.name}</Box>
                            <Box>
                                <Button variant={'text'}
                                        className={classes.selectButton}
                                        onClick={handleCourseDetails(course.id)}
                                >Подробнее</Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            }
        </Box>
    )
})
export default Courses
