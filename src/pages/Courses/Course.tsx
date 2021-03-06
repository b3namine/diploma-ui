import {Box, Button, Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {useStyles} from "./Course.styles";
import {useEffect} from "react";
import {coursesService} from "../../services/courses.service";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {userService} from "../../services/user.service";
import {onlyAdminsManagers} from "../../utils/checkRole";
import CourseSkeleton from "../../components/PageSkeleton/CourseSkeleton";

const Course = observer(() => {
    const classes = useStyles()
    const {courseId = ''} = useParams()
    const navigate = useNavigate();
    const {course, loadingCourse} = coursesService
    const {user} = userService
    useEffect(() => {
        coursesService.getCourse(Number(courseId)).catch(console.log)
    }, [courseId])
    const getYearsText = (value: number) => value < 2
        ? 'год'
        : value < 5
            ? 'года'
            : 'лет'
    if (loadingCourse) return <CourseSkeleton/>
    const handleDepartments = (universityId: number) => () => navigate(`/university/${universityId}`)
    const handleCourses = (departmentId: number) => () => navigate(`/departments/${departmentId}`)
    const handleCourseEdit = (departmentId: number) => () => navigate(`/editCourse/${departmentId}`)
    const handleCourseDelete = (courseId: number) => () => {
        coursesService.deleteCourse(courseId).catch(console.log)
        navigate(`/universities`)
    }

    return (
        <Box>
            <Typography variant={'h4'} className={classes.title}>{course.code} {course.name}</Typography>
            <Card className={classes.cardContainer}>
                <CardContent className={classes.topCard}>
                    <Grid container spacing={3}>
                        <Grid item xs={3} className={classes.item}>
                            <Box className={classes.bigText}>{course.budgetPlaces}</Box>
                            <Box className={classes.itemText}>Бюджетных мест</Box>
                        </Grid>
                        <Grid item xs={3} className={classes.item}>
                            <Box className={classes.bigText}>{course.contractPlaces}</Box>
                            <Box className={classes.itemText}>Контрактных мест</Box>
                        </Grid>
                        <Grid item xs={3} className={classes.item}>
                            <Box className={classes.bigText}>{course.years} {getYearsText(course.years)}</Box>
                            <Box className={classes.itemText}>Продолжительность обучения</Box>
                        </Grid>
                        <Grid item xs={3} className={classes.item}>
                            <Box className={`${classes.bigText} ${classes.smallText}`}>{course.exams}</Box>
                            <Box className={classes.itemText}>Вступительные испытания</Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardContent className={classes.infoCardContent}>
                    <Box className={classes.content}>
                        <Box className={classes.infoTitle}>
                            {course.university.name}
                        </Box>
                        <Box className={classes.itemText}>{course.university.info}</Box>
                        <Box>Контакты:</Box>
                        <Box className={classes.itemText}>{course.university.contacts}</Box>
                        <Box>
                            <Button variant={'text'}
                                    className={classes.selectButton}
                                    onClick={handleDepartments(course.university.id)}
                            >Все институты</Button>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box className={classes.content}>
                        <Box className={classes.infoTitle}>
                            {course.department.name}
                        </Box>
                        <Box className={classes.itemText}>{course.department.info}</Box>
                        <Box>Контакты:</Box>
                        <Box className={classes.itemText}>{course.department.contacts}</Box>
                        <Box>
                            <Button variant={'text'}
                                    className={classes.selectButton}
                                    onClick={handleCourses(course.department.id)}
                            >Все направления</Button>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box className={classes.content}>
                        <Typography variant={'h6'} className={classes.information}>Информация о
                            направление:</Typography>
                        <Box className={classes.itemText}>
                            {course.info}
                        </Box>
                    </Box>
                    {
                        onlyAdminsManagers(user?.roleName) && <Box display={'flex'} padding={'0 16px'}>
                            <Box padding={'0 8px'}>
                                <Button variant={'text'}
                                        className={classes.selectButton}
                                        onClick={handleCourseEdit(course.department.id)}
                                >Редактировать</Button>
                            </Box>
                            <Box padding={'0 8px'}>
                                <Button variant={'text'}
                                        className={classes.selectButton}
                                        onClick={handleCourseDelete(course.id)}
                                >Удалить</Button>
                            </Box>
                        </Box>
                    }
                </CardContent>
            </Card>
        </Box>
    )
})
export default Course
