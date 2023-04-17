import Header from '../components/header';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Drawer, Toolbar } from '@mui/material';

const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, textAlign: 'center', paddingBottom: 1, paddingTop: 1 }}
      >
        Life Goals
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            marginTop: 5,
          },
        }}
      >
        <Header />
      </Drawer>
      <Container>
        <Box
          component={'main'}
          sx={{ flexGrow: 1, p: 5, marginTop: -8, textAlign: 'center' }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default Root;
