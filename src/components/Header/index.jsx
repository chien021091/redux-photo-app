import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.scss'
import { KEYS_TOKEN_CREDENTIEL } from 'constants/keys';
import { saveUser } from 'app/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

Header.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Header(props) {
    const classes = useStyles();
    const isLogin = useSelector(state => state.user.isLogin);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem(KEYS_TOKEN_CREDENTIEL);
        const action = saveUser({
            current : {},
            isLogin : false
        });
        dispatch(action);
        history.push("/photos");
    }

    const handleLogin = () => {
        history.push("/sign-in");
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Photos
                </Typography>
                {isLogin && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                )}
                {
                    !isLogin && <Button color="inherit" onClick={handleLogin}>Login</Button>
                }
                </Toolbar>
            </AppBar>
        </div>







        
    );
}

export default Header;