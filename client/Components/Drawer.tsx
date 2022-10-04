import * as React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import PodsTab from "./PodsTab";
import NodesTab from "./NodesTab";
import PodDisplay from './PodDisplay';
import NodeDisplay from './NodeDisplay';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const drawerWidth = 175;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <img id='logo-icon' src='https://hmp.me/dydh' /> */}
          {/* <img id='logo-icon' src='https://hmp.me/dydi' /> */}
          <img id='logo-icon' src='https://hmp.me/dydj' />
          {/* <img id='logo-icon' src='https://hmp.me/dydm' /> */}
          <img id='logo' src='https://hmp.me/dydf' />
          {/* <img id='logo' src='https://hmp.me/dydk' /> */}
          {/* <img id='logo' src='https://hmp.me/dydl' /> */}
          {/* <Typography variant="h6" noWrap component="div">
            KubernOcular
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem key='Cluster' disablePadding sx={{ display: 'block' }}>
              <Link to='/' style={{ color: 'white', textDecoration: 'none' }}><ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary='Cluster' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton></Link>
            </ListItem>
            <ListItem key='Nodes' disablePadding sx={{ display: 'block' }}>
            <Link to='/nodes' style={{ color: 'white', textDecoration: 'none' }}><ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DeveloperBoardIcon />
                </ListItemIcon>
                <ListItemText primary='Nodes' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton></Link>
            </ListItem>
            <ListItem key='Pods' disablePadding sx={{ display: 'block' }}>
              <Link to='/pods' style={{ color: 'white', textDecoration: 'none' }}><ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AutoAwesomeMotionIcon />
                </ListItemIcon>
                <ListItemText primary='Pods' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton></Link>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/pods' element={<PodsTab />} />
          <Route path='/nodes' element={<NodesTab />} />
          <Route path='/poddisplay' element={<PodDisplay />} />
          <Route path='/nodedisplay' element={<NodeDisplay />} />
        </Routes>
      </Box>
    </Box>
  );
}