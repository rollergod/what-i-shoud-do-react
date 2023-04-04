import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCredentials, selectCurrentUser, selectIsAuth } from '../../store/slices/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth: boolean = useSelector(selectIsAuth); // TODO : поменять useAppSelector / useAppDispatch
    const userModel = useSelector(selectCurrentUser);

    const handleLogOut = (): void => {
        navigate('/login', { replace: true });
        dispatch(deleteCredentials({}));
    }

    return (
        <AppBar className={styles.root} position='static'>
            <Toolbar sx={{ backgroundColor: 'white' }}>
                <Typography variant='h5' sx={{ flexGrow: 2, color: 'black', mr: 2 }} >
                    Rollergod
                </Typography>
                <div className={styles.buttons}>
                    {
                        isAuth ? (
                            <>
                                {
                                    userModel &&
                                    <Typography variant='caption' sx={{ color: 'black', mr: 2, fontSize: 16 }}>Hello, {userModel.name}</Typography>
                                }
                                <Link to="/add-posts">
                                    <Button variant="contained">Создать пост</Button>
                                </Link>
                                <Button onClick={handleLogOut} variant="contained">
                                    Выйти
                                </Button>
                            </>

                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="contained">Sign in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Sign up</Button>
                                </Link>
                            </>
                        )
                    }

                </div>
            </Toolbar>
        </AppBar >
    )
}

export default Header;