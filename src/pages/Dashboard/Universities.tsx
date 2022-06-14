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
import {Fragment, useState} from "react";
import {universityService} from "../../services/university.service";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {useNavigate} from "react-router-dom";

const Universities = observer(() => {
    const classes = useGlobalStyles()
    const {universities} = universityService
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const getUniversity = () => universityService.getUniversities(value).catch(console.log)
    const editUniversity = (universityId: number) => () => navigate(`/editUniversity/${universityId}`)
    const deleteUniversity = (universityId: number) => () => universityService.deleteUniversity(universityId).catch(console.log)
    const handleChangeSearch = ({currentTarget: {value: searchValue}}: any) => setValue(searchValue)
    return (<Fragment>
            <Box display={'flex'} alignItems={'center'} marginBottom={'16px'}>
                <Box>
                    <Button variant={'contained'} color={'primary'} onClick={() => navigate('/createUniversity')}>
                        create
                    </Button>
                </Box>
                <Box marginLeft={'8px'} width={'100%'}>
                    <TextField value={value}
                               size={"small"}
                               fullWidth
                               placeholder={'University name'}
                               variant={'outlined'}
                               onChange={handleChangeSearch}/>
                </Box>
                <Box marginLeft={'8px'}>
                    <Button variant={'contained'} color={'primary'} onClick={getUniversity}>
                        Найти
                    </Button>
                </Box>
            </Box>
            {!universities.length
                ? (<EmptyCard message={'No university found'}/>)
                : (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Название</TableCell>
                                    <TableCell align="left">Контакты</TableCell>
                                    <TableCell align="left">Информация</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {universities.map((university, index) => (
                                    <TableRow key={index} style={{whiteSpace: 'nowrap'}}>
                                        <TableCell component="th" scope="row">
                                            {university.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Tooltip title={university.name}>
                                                <div className={classes.shortText}>{university.name}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Tooltip title={university.contacts}>
                                                <div className={classes.shortText}>{university.contacts}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Tooltip title={university.info}>
                                                <div className={classes.shortText}>{university.info}</div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Box display={'flex'} alignItems={'center'}>
                                                <Box>
                                                    <Button variant={'text'} size={'small'}
                                                            onClick={editUniversity(university.id)}>
                                                        edit
                                                    </Button>
                                                </Box>
                                                <Box>
                                                    <Button variant={'text'}
                                                            size={'small'}
                                                            color={'secondary'}
                                                            onClick={deleteUniversity(university.id)}>
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
export default Universities
