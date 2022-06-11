import React, {Fragment} from 'react';
import {Route, Routes} from "react-router-dom";
import {MenuBar} from './components/MenuBar';
import {Course, Courses, Home, Login, Registration, Test, Universities} from "./pages";
import {Box, Container, Typography} from "@material-ui/core";
import {useStyles} from "./App.styles";
import ResultTest from "./pages/Tests/ResultTest";
import {observer} from "mobx-react-lite";


const App = observer(() => {
    const classes = useStyles()
    return (
        <Fragment>
            <MenuBar/>
            <Container className={classes.container}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/universities" element={<Universities/>}/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/resultTest" element={<ResultTest/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/courses/:professionId" element={<Courses/>}/>
                    <Route path="/course/:courseId" element={<Course/>}/>
                </Routes>
                <Box className={classes.footer}>
                    <Typography>Copyright © 2022 GorshunoVLSU</Typography>
                </Box>
            </Container>
        </Fragment>);
})

export default App;
