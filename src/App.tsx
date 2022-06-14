import React, {Fragment, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {MenuBar} from './components/MenuBar';
import {
    Course,
    Courses,
    CreateCourse,
    CreateDepartment,
    CreateUniversity,
    Dashboard,
    Departments,
    EditCourse,
    EditDepartment,
    EditProfile,
    EditUniversity,
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
import {onlyAdmins, onlyAuthUser} from "./utils/checkRole";


const App = observer(() => {
    const classes = useStyles()
    const [state, setState] = useState(false)
    const {user,isAuth} = userService
    useEffect(() => {
        userService.checkAuth().then((res) => setState(true)).catch(console.log);
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
                        {!isAuth && (<Fragment>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                        </Fragment>)}


                        {onlyAuthUser(user?.roleName) && (<Fragment>

                            <Route path="/departments/:departmentId" element={<Departments/>}/>
                            <Route path="/createDepartment/:universityId" element={<CreateDepartment/>}/>
                            <Route path="/editDepartment/:departmentId" element={<EditDepartment/>}/>

                            <Route path="/universities" element={<Universities/>}/>
                            <Route path="/university/:universityId" element={<University/>}/>
                            <Route path="/createUniversity" element={<CreateUniversity/>}/>
                            <Route path="/editUniversity/:universityId" element={<EditUniversity/>}/>

                            <Route path="/courses/:professionId" element={<Courses/>}/>
                            <Route path="/course/:courseId" element={<Course/>}/>
                            <Route path="/createCourse/:departmentId" element={<CreateCourse/>}/>
                            <Route path="/editCourse/:courseId" element={<EditCourse/>}/>


                            <Route path="/editProfile" element={<EditProfile/>}/>
                            <Route path="/statics" element={<Statics/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            {onlyAdmins(user?.roleName) && (<Fragment>
                                <Route path={'dashboard'}>
                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                </Route>
                            </Fragment>)}
                        </Fragment>)}


                        <Route
                            path="*"
                            element={<Navigate to="/"/>}
                        />
                    </Routes>
                    <Box className={classes.footer}>
                        <Typography>Copyright © 2022 GorshunovVLSU</Typography>
                    </Box>
                </AuthProvider>
            </Container>
        </Fragment>);
})

export default App;


