import {useStyles} from "./Statics.styles";
import {testService} from "../../services/test.service";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {Doughnut} from "react-chartjs-2";
import {Autocomplete} from "@material-ui/lab";
import {genders} from "../../services/text.data";
import {observer} from "mobx-react-lite";
import {ResultFilter} from "../../Modal/user";

const UsersStatics = observer(() => {
    const classes = useStyles()
    const {statics, loading} = testService
    const navigate = useNavigate();
    const [values, setValues] = useState({} as ResultFilter)
    const getDataDoughnut = (data: object) => ({
        labels: ["Реалистичный", "Интеллектуальный", "Артистичный", "Социальный", "Офисный", "Предпринимательский"],
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#4D5318"],
                hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870",
                    "#A8B3C5",
                    "#616774",
                    "#4D5318"
                ]
            }
        ]
    })
    const plugins: any = {
        legend: {
            position: 'bottom',
            labels: {pointStyle: 'circle', usePointStyle: true}
        }
    }

    useEffect(() => {
        testService.getStatics().catch(console.log)
    }, [])

    const handleGetCourses = (profType: number, prof: string) => () => {
        navigate(`/courses/${profType}`)
    }
    const handleChange = ({currentTarget: {name, value}}: any) => setValues({...values, [name]: value})
    const handleChangeAuto = (value: any) => setValues({...values, ...value})
    const handleChangeActual = (event: ChangeEvent<HTMLInputElement>) =>
        setValues({...values, [event.target.name]: event.target.checked})
    const handleFind = () => testService.getStatics(values).catch(console.log)
    return (
        <Fragment>
            <Typography variant={'h4'} className={classes.title}>Общая статистика</Typography>
            <Box marginBottom={'24px'}>
                <Typography variant={'h6'}>Фильтры:</Typography>
                <Box display={'flex'} alignItems={'center'}>
                    <Box>
                        <Autocomplete
                            id="combo-box-demo"
                            options={genders}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => handleChangeAuto({gender: value?.id})}
                            size={'small'}
                            style={{minWidth: 200}}
                            renderInput={(params) => <TextField {...params} label="Gender" variant="outlined"/>}
                        />
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.loginFilter}
                                   size={"small"}
                                   name={'loginFilter'}
                                   label={'Login'}
                                   style={{minWidth: 200}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.ageMin}
                                   size={"small"}
                                   name={'ageMin'}
                                   label={'Min age'}
                                   style={{width: 100}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.ageMax}
                                   size={"small"}
                                   name={'ageMax'}
                                   label={'Max age'}
                                   style={{width: 100}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.dataMin}
                                   size={"small"}
                                   type={'date'}
                                   name={'dataMin'}
                                   placeholder={'Min date'}
                                   style={{width: 120}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <TextField value={values.dataMax}
                                   size={"small"}
                                   type={'date'}
                                   name={'dataMax'}
                                   placeholder={'Min date'}
                                   style={{width: 120}}
                                   variant={'outlined'}
                                   onChange={handleChange}/>
                    </Box>
                    <Box marginLeft={'8px'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={values.actual}
                                    onChange={handleChangeActual}
                                    name="actual"
                                    color="primary"
                                />
                            }
                            label="Учитывать только актуальные"
                        />
                    </Box>
                    <Box marginLeft={'8px'}>
                        <Button variant={'contained'} disabled={loading} color={'primary'}
                                onClick={handleFind}>Подтвердить</Button>
                    </Box>
                </Box>
            </Box>
            {
                loading
                    ? (<Fragment>Loading....</Fragment>)
                    : !statics ? (<EmptyCard message={'no Result found'}/>)
                        : (
                            <Fragment>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Card>
                                            <Box className={classes.cardHeader}>Ярко выраженные типы</Box>
                                            <CardContent>
                                                <Doughnut data={getDataDoughnut(statics.high)} options={{
                                                    responsive: true, plugins
                                                }}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card>
                                            <Box className={classes.cardHeader}>Средне выраженные типы</Box>
                                            <CardContent>
                                                <Doughnut data={getDataDoughnut(statics.middle)}
                                                          options={{responsive: true, plugins}}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card>
                                            <Box className={classes.cardHeader}>Слабо выраженные типы</Box>
                                            <CardContent>
                                                <Doughnut data={getDataDoughnut(statics.low)}
                                                          options={{responsive: true, plugins}}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Typography className={classes.subTitle}>Подходящие профессии</Typography>
                                <Grid container spacing={3}>
                                    {statics.preferedProfessions.map((profession) => (
                                        <Grid key={profession.id} item xs={4} sm={4}>
                                            <Paper className={classes.cardProfession}>
                                                <Typography variant={'h5'}
                                                            className={classes.cardTitle}>{profession.name}</Typography>
                                                <Box>Доступных направлений - {profession.coursesAmount}</Box>
                                                <Box>
                                                    <Button variant={'text'}
                                                            className={classes.selectButton}
                                                            onClick={handleGetCourses(profession.profType, profession.name)}
                                                    >Выбрать направление</Button>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Fragment>
                        )
            }

        </Fragment>)
})

export default UsersStatics
