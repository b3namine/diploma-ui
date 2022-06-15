import React, {Fragment, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {MenuBar} from './components/MenuBar';
import {
    Course,
    Courses,
    CreateCourse,
    CreateDepartment,
    CreateUniversity,
    CreateUser,
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
    Universities,
    UsersStatics
} from "./pages";
import {Box, Container, Typography} from "@material-ui/core";
import {useStyles} from "./App.styles";
import ResultTest from "./pages/Tests/ResultTest";
import {observer} from "mobx-react-lite";
import University from "./pages/Universities/University";
import {userService} from "./services/user.service";
import Logout from "./pages/Logout/Logout";
import Profile from "./pages/Profile/Profile";
import {onlyAdmins, onlyAdminsManagers, onlyAuthUser, onlyManagers} from "./utils/checkRole";
import {universityService} from "./services/university.service";
import EditUser from "./pages/Dashboard/EditUser";
import {ToastContainer} from 'react-toastify'

const App = observer(() => {
    const classes = useStyles()
    const [state, setState] = useState(false)
    const {user, isAuth} = userService

    useEffect(() => {
        userService.checkAuth().then((res) => setState(true)).catch(console.log);
    }, [])
    useEffect(() => {
        if (user && onlyManagers(user.roleName)) {
            universityService.getUniversityByUserId(Number(user.id)).catch(console.log)
        }
    }, [user])
    if (!state) return <Fragment>Loading ... </Fragment>
    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}/>
            <MenuBar/>
            <Container className={classes.container}>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/universities" element={<Universities/>}/>
                    <Route path="/university/:universityId" element={<University/>}/>
                    <Route path="/departments/:departmentId" element={<Departments/>}/>
                    <Route path="/courses/:professionId" element={<Courses/>}/>
                    <Route path="/course/:courseId" element={<Course/>}/>

                    {!isAuth && (<Fragment>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </Fragment>)}

                    {!onlyAdminsManagers(user?.roleName) && (
                        <Fragment>
                            <Route path="/test" element={<Test/>}/>
                            <Route path="/resultTest" element={<ResultTest/>}/>
                        </Fragment>
                    )}

                    {onlyAuthUser(user?.roleName) && (<Fragment>

                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        {!onlyAdminsManagers(user?.roleName) && (
                            <Route path="/statics" element={<Statics/>}/>
                        )}
                        {onlyAdminsManagers(user?.roleName) && (
                            <Fragment>
                                <Route path="/createDepartment/:universityId" element={<CreateDepartment/>}/>
                                <Route path="/editDepartment/:departmentId" element={<EditDepartment/>}/>
                                <Route path="/createUniversity" element={<CreateUniversity/>}/>
                                <Route path="/editUniversity/:universityId" element={<EditUniversity/>}/>
                                <Route path="/createCourse/:departmentId" element={<CreateCourse/>}/>
                                <Route path="/editCourse/:courseId" element={<EditCourse/>}/>
                                <Route path="/usersStatics" element={<UsersStatics/>}/>
                            </Fragment>
                        )}
                        {onlyAdmins(user?.roleName) && (<Fragment>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/editUser/:userId" element={<EditUser/>}/>
                            <Route path="/createUser" element={<CreateUser/>}/>
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
            </Container>
        </Fragment>);
})

export default App;


