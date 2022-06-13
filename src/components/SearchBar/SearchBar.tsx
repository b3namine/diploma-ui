import {observer} from "mobx-react-lite";
import {ChangeEvent, FC, useState} from "react";
import {useStyles} from "./SearchBar.styles";
import {Box, Button, TextField} from "@material-ui/core";
import {SearchBarProps} from "./SearchBar.types";

const SearchBar: FC<SearchBarProps> = observer(({find}) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const handleChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => setValue(value)
    const handleFind = () => find(value)
    return (<Box className={classes.root}>
        <Box width={'100%'} className={classes.block}>
            <TextField fullWidth
                       variant={'outlined'}
                       size={'small'}
                       placeholder={'Поиска вуза по названию'}
                       value={value}
                       onChange={handleChange}
                       />
        </Box>
        <Box>
            <Button disableElevation
                    variant={'contained'}
                    color={"primary"}
                    className={classes.button}
                    onClick={handleFind}>
                Поиск
            </Button>
        </Box>

    </Box>)
})
export default SearchBar
