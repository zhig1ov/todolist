import {MenuButton} from '../MenuButton/MenuButton';
import {changeThemeAC} from '../../../app/app-reducer';
import {getTheme} from '../../theme/theme';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {selectThemeMode} from '../../../app/appSelectors';

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton background={theme.palette.primary.dark}>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}