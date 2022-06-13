import {Box, Button, Card, CardContent, Grid, Paper, Typography} from "@material-ui/core";
import {BorderLinearProgress, useStyles} from "./ResultTest.styles";
import {useEffect} from "react";
import {testService} from "../../services/test.service";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const ResultTest = observer(() => {
    const classes = useStyles()
    const navigate = useNavigate();
    const {resultTest} = testService
    useEffect(() => {
        if (!resultTest) return navigate('/test')
    }, [resultTest])
    if (!resultTest) return null
    const {results, professionalType, professions} = resultTest
    const barColor = (value: number) => value < 50 ? classes.barColorRed : value >= 80 ? classes.barColorGreen : classes.barColorOrange
    const handleGetCourses = (profType: number, prof: string) => () => {
        localStorage.setItem('prof', prof)
        navigate(`/courses/${profType}`)
    }
    return <Box style={{flexGrow: 1}}>
        <Box marginBottom={'16px'}>
            <Typography variant={'h4'} className={classes.resultTitle}>Ваш тип
                личности <strong>"{professionalType.name}"</strong></Typography>
            <Typography variant={'body1'} className={classes.resultText}>
                {professionalType.description}
            </Typography>
        </Box>
        <Card elevation={6}>
            <CardContent>
                {results.map((result, index) => (
                    <Box className={classes.barContainer} key={index}>
                        <Box className={classes.barTitle}>
                            <Box>{result.name}</Box>
                            <Box>{result.value} из 10</Box>
                        </Box>
                        <Box>
                            <BorderLinearProgress variant="determinate"
                                                  classes={{bar: barColor(result.value * 10)}}
                                                  value={result.value * 10}/>
                        </Box>
                    </Box>
                ))}
            </CardContent>
        </Card>
        <Box marginTop={'48px'}>
            <Typography variant={'h5'} className={classes.subTitle}>Подходящие профессии</Typography>
            <Grid container spacing={3}>
                {professions.map((profession) => (
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
        </Box>
    </Box>
})
export default ResultTest
