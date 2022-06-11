import {Box, Button, Typography} from "@material-ui/core";
import {Fragment, useEffect, useState} from "react";
import {useStyles} from "./Test.styles";
import {testService} from "../../services/test.service";
import {Profession} from "../../Modal/test";
import {observer} from "mobx-react-lite";
import ChooseSkeleton from "../../components/ChooseSkeleton/ChooseSkeleton";
import {useNavigate} from "react-router-dom";


const Test = observer(() => {
    const classes = useStyles()
    const navigate = useNavigate();
    const {questions, selectedResponse, loading} = testService
    const [activeStep, setActiveStep] = useState<number>(-1);
    const [error, setError] = useState<boolean>(false)
    const invalidStep = activeStep === -1
    const active = (value: number) => !invalidStep && selectedResponse[activeStep] === value ? classes.activeChoose : ''

    useEffect(() => {
        testService.getQuestions().catch(console.log)
    }, [])
    useEffect(() => {
        setActiveStep(0)
    }, [questions])

    const handleNext = () => {
        if (!invalidStep && !selectedResponse[activeStep]) return setError(true)
        setError(false)
        setActiveStep(Number(activeStep) + 1);
    }
    const handleFinish = () => {
        if (activeStep && !selectedResponse[activeStep]) return setError(true)
        testService.generateResult()
            .then((res) => res ? navigate('/resultTest') : null)
            .catch(console.log)
    }
    const buttonClick = () => activeStep === questions.length - 1 ? handleFinish() : handleNext()
    const buttonText = activeStep === questions.length - 1 ? 'Завершить' : 'Далее'
    const handleResponse = (value: number) => () => {
        testService.setResponse({[Number(activeStep)]: value})
    }

    const QuestionsHead = () => (<Box>
        <Typography variant={'h4'}>Профессиональная направленность личности</Typography>
        <Typography>Выбери более интересную профессию из 30 пар и узнай, какая у тебя профессиональная
            направленность.</Typography>
    </Box>)
    const ChooseQuestion = () => {
        if (invalidStep) return null
        return (<Fragment>
            <Box className={classes.responseContainer}>
                {questions[activeStep].professions.map((profession: Profession) => (
                    <Box key={profession.id}
                         className={`${classes.response} ${active(profession.id)}`}
                         onClick={handleResponse(profession.id)}>
                        {profession.name}
                    </Box>
                ))}
            </Box>
            {error && 'Please choose one response'}
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={buttonClick}
                >
                    {buttonText}
                </Button>
            </Box>
        </Fragment>)
    }

    return (
        <Box className={classes.container}>
            <QuestionsHead/>
            {loading ? <ChooseSkeleton/> : <ChooseQuestion/>}
        </Box>
    )
})
export default Test
