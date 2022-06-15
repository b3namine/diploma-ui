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
import {userService} from "../../services/user.service";
import {Fragment, useEffect, useState} from "react";
import {formatDate} from "../../utils/dateFormate";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {Autocomplete} from "@material-ui/lab";
import {UserFilter} from "../../Modal/user";
import {useNavigate} from "react-router-dom";
import {genders, roles} from "../../services/text.data";


const Users = observer(() => {
    const classes = useGlobalStyles()
    const {users} = userService
    const [values, setValues] = useState({} as UserFilter)
    const navigate = useNavigate()
    useEffect(() => {
        userService.getAllUsers().catch(console.log)
    }, [])
    const handleChange = ({currentTarget: {name, value}}: any) => setValues({...values, [name]: value})
    const handleChangeAuto = (value: any) => setValues({...values, ...value})
    const getUser = () => userService.getAllUsers(values).catch(console.log)
    const editUser = (userId: number) => () => navigate(`/editUser/${userId}`)
    const createUser = () => navigate(`/createUser`)
    const deleteUser = (userId: number) => () => userService.deleteUser(userId).catch(console.log)

    return (
        <Fragment>
            <Box marginBottom={'16px'}>
                <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} marginBottom={'8px'}>
                    <Box>
                        <TextField value={values.firstNameFilter}
                                   size={"small"}
                                   name={'firstNameFilter'}
                                   placeholder={'FirstName Filter'}
                                   style={{minWidth: 200}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.secondNameFilter}
                                   size={"small"}
                                   name={'secondNameFilter'}
                                   placeholder={'secondName Filter'}
                                   style={{minWidth: 200}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.loginFilter}
                                   size={"small"}
                                   name={'loginFilter'}
                                   placeholder={'Login Filter'}
                                   style={{minWidth: 200}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.emailFilter}
                                   size={"small"}
                                   name={'emailFilter'}
                                   placeholder={'Email Filter'}
                                   style={{minWidth: 200}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                </Box>
                <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'}>
                    <Box>
                        <TextField value={values.ageMin}
                                   size={"small"}
                                   name={'ageMin'}
                                   placeholder={'Min age'}
                                   style={{width: 80}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.ageMax}
                                   size={"small"}
                                   name={'ageMax'}
                                   placeholder={'Max age'}
                                   style={{width: 80}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={genders}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => handleChangeAuto({gender: value?.id})}
                            size={'small'}
                            style={{minWidth: 300}}
                            renderInput={(params) => <TextField {...params} label="Gender" variant="outlined"/>}
                        />
                    </Box>
                    <Box marginLeft={'8px'}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={roles}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => handleChangeAuto({role: value?.name})}
                            size={'small'}
                            style={{minWidth: 300}}
                            renderInput={(params) => <TextField {...params} label="Role" variant="outlined"/>}
                        />
                    </Box>
                    <Box marginLeft={'8px'}>
                        <Button variant={'contained'} color={'primary'} onClick={getUser}>
                            Найти
                        </Button>
                    </Box>
                </Box>
                <Box marginTop={'8px'}>
                    <Button variant={'contained'} color={'primary'} onClick={createUser}>
                        Create User
                    </Button>
                </Box>
            </Box>
            {!users.length ? (
                <EmptyCard message={'No User Found'}/>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" className={classes.headTitle}>ID</TableCell>
                                <TableCell align="left" className={classes.headTitle}>firstName</TableCell>
                                <TableCell align="left" className={classes.headTitle}>secondName</TableCell>
                                <TableCell align="left" className={classes.headTitle}>login</TableCell>
                                <TableCell align="left" className={classes.headTitle}>birthdate</TableCell>
                                <TableCell align="left" className={classes.headTitle}>grander</TableCell>
                                <TableCell align="left" className={classes.headTitle}>email</TableCell>
                                <TableCell align="left" className={classes.headTitle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index} style={{whiteSpace: 'nowrap'}}>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="left">{user.firstName}</TableCell>
                                    <TableCell align="left">{user.secondName}</TableCell>
                                    <TableCell align="left">{user.login}</TableCell>
                                    <TableCell align="left">{formatDate(user.birthdate)}</TableCell>
                                    <TableCell align="left">{user.isMan ? 'male' : 'female'}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={user.email}>
                                            <div className={classes.shortText}>{user.email}</div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Box>
                                                <Button variant={'text'} size={'small'}
                                                        onClick={editUser(user.id)}>
                                                    edit
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button variant={'text'}
                                                        size={'small'}
                                                        color={'secondary'}
                                                        onClick={deleteUser(user.id)}>
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
export default Users
