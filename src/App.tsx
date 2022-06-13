import React, {Fragment, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {MenuBar} from './components/MenuBar';
import {
    Course,
    Courses,
    CreateDepartment,
    CreateUniversity,
    Departments,
    EditProfile,
    Home,
    Login,
    Registration,
    Statics,
    Test,
    Universities
} from "./pages";
import {Box, Container, Typography} from "@material-ui/core";
import {useStyles} from "./App.styles";
import ResultTest from "./pages/Tests/ResultTest";
import {observer} from "mobx-react-lite";
import University from "./pages/Universities/University";
import {userService} from "./services/user.service";
import Logout from "./pages/Logout/Logout";
import Profile from "./pages/Profile/Profile";
import {AuthProvider} from "./Provider/AuthProvider";


const App = observer(() => {
    const classes = useStyles()
    const [state, setState] = useState(false)
    useEffect(() => {
        userService.checkAuth().then(() => setState(true)).catch(console.log);
    }, [])
    if (!state) return <Fragment>Loading ... </Fragment>
    return (
        <Fragment>
            <MenuBar/>
            <Container className={classes.container}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/resultTest" element={<ResultTest/>}/>
                        <Route path="/courses/:professionId" element={<Courses/>}/>
                        <Route path="/course/:courseId" element={<Course/>}/>
                        <Route path="/universities" element={<Universities/>}/>
                        <Route path="/university/:universityId" element={<University/>}/>
                        <Route path="/departments/:departmentId" element={<Departments/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>

                        <Route path="/createUniversity" element={<CreateUniversity/>}/>
                        <Route path="/createDepartment" element={<CreateDepartment/>}/>

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/statics" element={<Statics/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/"/>}
                        />
                    </Routes>
                    <Box className={classes.footer}>
                        <Typography>Copyright © 2022 GorshunoVLSU</Typography>
                    </Box>
                </AuthProvider>
            </Container>
        </Fragment>);
})

export default App;


