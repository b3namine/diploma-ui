import {observer} from "mobx-react-lite";
import {Fragment, useEffect} from "react";
import {staticsService} from "../../services/statics.service";
import {Doughnut} from 'react-chartjs-2'
import {Box, Button, Card, CardContent, Grid, Paper, Typography} from "@material-ui/core";
import {useStyles} from "./Statics.styles";
import {testService} from "../../services/test.service";
import {useNavigate} from "react-router-dom";

const Statics = observer(() => {
    const classes = useStyles()
    const {resultTest} = testService
    const navigate = useNavigate();
    const dataDoughnut = {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey", "sss"],
        datasets: [
            {
                data: [300, 50, 100, 40, 120, 100],
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
    }
    useEffect(() => {
        staticsService.getAllResult().catch(console.log)
    })
    const handleGetCourses = (profType: number, prof: string) => () => {
        navigate(`/courses/${profType}`)
    }
    return (
        <Fragment>
            <Typography variant={'h4'} className={classes.title}>Личная статистика</Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <Box className={classes.cardHeader}>Ярко выраженные типы</Box>
                        <CardContent>
                            <Doughnut data={dataDoughnut} options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {pointStyle: 'circle', usePointStyle: true}
                                    }
                                }
                            }}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Box className={classes.cardHeader}>Средне выраженные типы</Box>
                        <CardContent>
                            <Doughnut data={dataDoughnut} options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {pointStyle: 'circle', usePointStyle: true}
                                    }
                                }
                            }}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <Box className={classes.cardHeader}>Слабо выраженные типы</Box>
                        <CardContent>
                            <Doughnut data={dataDoughnut} options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {pointStyle: 'circle', usePointStyle: true}
                                    }
                                }
                            }}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography className={classes.subTitle}>Подходящие профессии</Typography>
            <Grid container spacing={3}>
                {resultTest && resultTest?.professions.map((profession) => (
                    <Grid key={profession.id} item xs={4} sm={4}>
                        <Paper className={classes.cardProfession}>
                            <Typography variant={'h5'} className={classes.cardTitle}>{profession.name}</Typography>
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
        </Fragment>)
})
export default Statics
