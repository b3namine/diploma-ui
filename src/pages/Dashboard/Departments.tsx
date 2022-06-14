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
import {departmentService} from "../../services/department.service";
import {universityService} from "../../services/university.service";
import {Autocomplete} from "@material-ui/lab";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {useNavigate} from "react-router-dom";

const Departments = observer(() => {
    const classes = useGlobalStyles()
    const {departments} = departmentService
    const {universities} = universityService
    const navigate = useNavigate()
    const [values, setValues] = useState({universityId: 0, searchValue: ''})
    useEffect(() => {
        return () => departmentService.clearDepartments()
    }, [])
    const getDepartments = () => departmentService.getDepartments(values.universityId, values.searchValue).catch(console.log)
    const editDepartment = (departmentId: number) => () => navigate(`/editDepartment/${departmentId}`)
    const deleteDepartment = (departmentId: number) => () => departmentService.deleteDepartments(departmentId).catch(console.log)
    const handleChange = (value: any) => setValues({...values, universityId: value.id})
    const handleChangeSearch = ({currentTarget: {value: searchValue}}: any) => setValues({...values, searchValue})

    return (
        <Fragment>
            <Box display={'flex'} alignItems={'center'} marginBottom={'16px'}>
                <Box width={'100%'}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={universities}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => handleChange(value)}
                        size={'small'}
                        style={{minWidth: 300}}
                        renderInput={(params) => <TextField {...params} label="University" variant="outlined"/>}
                    />
                </Box>
                <Box marginLeft={'8px'}>
                    <TextField value={values.searchValue}
                               size={"small"}
                               placeholder={'Department name'}
                               style={{minWidth: 300}}
                               variant={'outlined'}
                               onChange={handleChangeSearch}/>
                </Box>
                <Box marginLeft={'8px'}>
                    <Button variant={'contained'} color={'primary'} onClick={getDepartments}>
                        Найти
                    </Button>
                </Box>
                {values.universityId ? <Box marginLeft={'8px'}>
                    <Button variant={'contained'} color={'primary'}
                            onClick={() => navigate(`/createDepartment/${values.universityId}`)}>
                        Create
                    </Button>
                </Box> : null}
            </Box>
            {!departments.length ? (
                <EmptyCard message={'No department found'}/>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" className={classes.headTitle}>ID</TableCell>
                                <TableCell align="left" className={classes.headTitle}>name</TableCell>
                                <TableCell align="left" className={classes.headTitle}>contacts</TableCell>
                                <TableCell align="left" className={classes.headTitle}>info</TableCell>
                                <TableCell align="left" className={classes.headTitle}>universityId</TableCell>
                                <TableCell align="left" className={classes.headTitle}>courses</TableCell>
                                <TableCell align="left" className={classes.headTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department, index) => (
                                <TableRow key={index} style={{whiteSpace: 'nowrap'}}>
                                    <TableCell component="th" scope="row">
                                        {department.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={department.name}>
                                            <div className={classes.shortText}>
                                                {department.name}
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={department.contacts}>
                                            <div className={classes.shortText}>{department.contacts}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={department.info}>
                                            <div className={classes.shortText}>{department.info}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">{department.universityId}</TableCell>
                                    <TableCell align="left">{department.courses?.length}</TableCell>
                                    <TableCell align="left">
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Box>
                                                <Button variant={'text'} size={'small'}
                                                        onClick={editDepartment(department.id)}>
                                                    edit
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button variant={'text'} size={'small'}
                                                        color={'secondary'}
                                                        onClick={deleteDepartment(department.id)}>
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
export default Departments
