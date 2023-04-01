import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar className={styles.root} position='static'>
            <Toolbar sx={{ backgroundColor: 'white' }}>
                <Typography variant='h5' sx={{ flexGrow: 2, color: 'black', mr: 2 }} >
                    Rollergod
                </Typography>
                <div className={styles.buttons}>
                    <Link to="/login">
                        <Button variant="contained">Sign in</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="contained">Sign up</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;