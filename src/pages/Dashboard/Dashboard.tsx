import {observer} from "mobx-react-lite";
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {userService} from "../../services/user.service";
import {onlyAdmins} from "../../utils/checkRole";
import {useNavigate} from "react-router-dom";
import {Box, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import Users from "./Users";
import Universities from "./Universities";
import Departments from "./Departments";
import Courses from "./Courses";
import {universityService} from "../../services/university.service";
import Professions from "./Professions";

interface TabPanelProps {
    children?: ReactNode;
    index: any;
    value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: 500,
        borderRadius: 5,
        '& > div[role=tabpanel]': {
            width: '100%'
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: 200,
        '& .MuiTab-wrapper': {
            textAlign: 'left',
            display: 'block'
        }
    }
}));

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Dashboard = observer(() => {
    const {user} = userService
    const navigate = useNavigate()
    const classes = useStyles();
    const [value, setValue] = useState(0);
    useEffect(() => {
        universityService.getUniversities().catch(console.log)
    }, [])
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!onlyAdmins(user?.roleName)) {
            navigate('/')
        }
    }, [user])

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Пользователи" {...a11yProps(0)} />
                <Tab label="ВУЗы" {...a11yProps(1)} />
                <Tab label="Институты" {...a11yProps(2)} />
                <Tab label="Направления" {...a11yProps(3)} />
                <Tab label="Профессии" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Users/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Universities/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Departments/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Courses/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Professions/>
            </TabPanel>
        </div>
    )
})
export default Dashboard
