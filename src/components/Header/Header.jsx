import React from 'react';
import {makeStyles} from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import logo from '../../assets/img/icons/logo2.png';
import { useSelector, useDispatch} from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import {push} from 'connected-react-router';
import {HeaderMenus, ClosableDrawer} from './index';
import { useState } from 'react';
import { useCallback } from 'react';
 
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButoons: {
        margin: '0 0 0 auto'
    }
});

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)

    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open);
    }, [setOpen, open])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <ToolBar className={classes.toolBar} >
                    <img 
                        src={logo} alt="Tatsuya Logo" width="160px" 
                        onClick={() => dispatch(push('/'))}
                    />
                    {isSignedIn && (
                        <div className={classes.iconButoons}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </ToolBar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
};

export default Header;