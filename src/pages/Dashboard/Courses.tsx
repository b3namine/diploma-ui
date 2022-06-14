import {observer} from "mobx-react-lite";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@material-ui/core";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Fragment, useEffect, useState} from "react";
import {coursesService} from "../../services/courses.service";
import {departmentService} from "../../services/department.service";
import {universityService} from "../../services/university.service";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {Autocomplete} from "@material-ui/lab";
import {useNavigate} from "react-router-dom";

const Courses = observer(() => {
    const classes = useGlobalStyles()
    const {courses} = coursesService
    const {departments} = departmentService
    const {universities} = universityService
    const navigate = useNavigate()
    const [values, setValues] = useState({universityId: 0, departmentId: 0, searchValue: '', searchCode: ''})
    useEffect(() => {
        return () => coursesService.clearCourses()
    }, [])
    const getCourses = () => coursesService.getCourses(values.departmentId, values.searchValue, values.searchCode).catch(console.log)
    const handleChange = (value: any) => {
        if (!value) return
        departmentService.getDepartments(value.id).catch(console.log)
        setValues({...values, universityId: value.id})
    }
    const handleChangeDep = (value: any) => setValues({...values, departmentId: value.id})
    const handleChangeSearch = ({currentTarget: {name, value}}: any) => setValues({...values, [name]: value})

    const editCourse = (courseId: number) => () => navigate(`/editCourse/${courseId}`)
    const deleteCourse = (courseId: number) => () => coursesService.deleteCourse(courseId).catch(console.log)
    return (<Fragment>
            <Box display={'flex'} alignItems={'center'} marginBottom={'16px'}>
                <Box width={'100%'}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={universities}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => handleChange(value)}
                        size={'small'}
                        style={{minWidth: 200}}
                        renderInput={(params) => <TextField {...params} label="University" variant="outlined"/>}
                    />
                </Box>
                <Box marginLeft={'8px'} width={'100%'}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={departments}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => handleChangeDep(value)}
                        size={'small'}
                        style={{minWidth: 200}}
                        renderInput={(params) => <TextField {...params} label="Departments" variant="outlined"/>}
                    />
                </Box>
                <Box marginLeft={'8px'}>
                    <TextField value={values.searchValue}
                               size={"small"}
                               name={'searchValue'}
                               label={'Name'}
                               style={{minWidth: 200}}
                               variant={'outlined'}
                               onChange={handleChangeSearch}/>
                </Box>
                <Box marginLeft={'8px'}>
                    <TextField value={values.searchCode}
                               size={"small"}
                               name={'searchCode'}
                               label={'Code'}
                               style={{minWidth: 150}}
                               variant={'outlined'}
                               onChange={handleChangeSearch}/>
                </Box>
                <Box marginLeft={'8px'}>
                    <Button variant={'contained'} color={'primary'} onClick={getCourses}>
                        Найти
                    </Button>
                </Box>
                {values.departmentId ? <Box marginLeft={'8px'}>
                    <Button variant={'contained'} color={'primary'}
                            onClick={() => navigate(`/createCourse/${values.departmentId}`)}>
                        create
                    </Button>
                </Box> : null}
            </Box>
            {!courses.length ? (
                <EmptyCard message={'No Course Found'}/>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">name</TableCell>
                                <TableCell align="left">code</TableCell>
                                <TableCell align="left">info</TableCell>
                                <TableCell align="left">budgetPlaces</TableCell>
                                <TableCell align="left">contractPlaces</TableCell>
                                <TableCell align="left">years</TableCell>
                                <TableCell align="left">exams</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course, index) => (
                                <TableRow key={index} >
                                    <TableCell component="th" scope="row">
                                        {course.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={course.name}>
                                            <div className={classes.shortText}>{course.name}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">{course.code}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={course.info}>
                                            <div className={classes.shortText}>{course.info}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">{course.budgetPlaces}</TableCell>
                                    <TableCell align="left">{course.contractPlaces}</TableCell>
                                    <TableCell align="left">{course.years}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={course.exams}>
                                            <div className={classes.shortText}>{course.exams}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Box>
                                                <Button variant={'text'} size={'small'}
                                                        onClick={editCourse(course.id)}>
                                                    edit
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button variant={'text'}
                                                        size={'small'}
                                                        color={'secondary'}
                                                        onClick={deleteCourse(course.id)}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        </Fragment>

    )
})
export default Courses
