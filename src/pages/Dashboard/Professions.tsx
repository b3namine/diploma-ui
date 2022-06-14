import {observer} from "mobx-react-lite";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {useGlobalStyles} from "../../assets/Global.styles";
import {Fragment, useEffect, useState} from "react";
import {professionService} from "../../services/profession.service";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {Profession} from "../../Modal/Profession";


const Professions = observer(() => {
    const classes = useGlobalStyles()
    const {professions} = professionService
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({} as Profession);

    const handleClose = () => setOpen(false)
    useEffect(() => {
        professionService.getAllProfession().catch(console.log)
    }, [])
    const createProfessionModal = () => {
        setOpen(true)
    }
    const handleChange = ({currentTarget: {name, value}}: any) => setValues({...values, [name]: value})
    const createProfession = () => professionService.createProfession(values)
        .then((res) => res ? setOpen(false) : null)
        .catch(console.log)
    const deleteProfession = (professionId: number) => () => professionService.deleteProfession(professionId)
        .catch(console.log)
    return (<Fragment>
            <Box display={'flex'} alignItems={'center'} marginBottom={'16px'}>
                <Button variant={'contained'} color={'primary'} onClick={createProfessionModal}>
                    Create Profession
                </Button>
            </Box>
            {!professions.length ? (
                <EmptyCard message={'No Profession Found'}/>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {professions.map((profession, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {profession.id}
                                    </TableCell>
                                    <TableCell align="left">{profession.name}</TableCell>
                                    <TableCell align="left">{profession.profType}</TableCell>
                                    <TableCell align="left">{profession.coursesAmount}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={'text'} size={'small'}
                                                onClick={deleteProfession(profession.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Create Profession</DialogTitle>
                <DialogContent>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginBottom={'16px'}>
                        <Box width={'100%'}>
                            <TextField value={values.name}
                                       size={"small"}
                                       name={'name'}
                                       label={'Name'}
                                       style={{minWidth: 300}}
                                       variant={'outlined'}
                                       onChange={handleChange}/>
                        </Box>
                        <Box marginTop={'16px'}>
                            <TextField value={values.profType}
                                       size={"small"}
                                       name={'profType'}
                                       label={'Type'}
                                       style={{minWidth: 300}}
                                       variant={'outlined'}
                                       onChange={handleChange}/>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={'text'} color={'inherit'} onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant={'text'} color={'primary'} onClick={createProfession}>
                        save
                    </Button>
                </DialogActions>

            </Dialog>
        </Fragment>

    )
})
export default Professions
