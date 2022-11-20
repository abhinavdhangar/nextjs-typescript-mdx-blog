import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function RecentPostWidget() {
  return (
    <ThemeProvider theme={darkTheme}>

    <div>

 {[...Array(3)].map(single=>(
    <div className={`flex p-1 items-center gap-2 `}>
<div className='w-[50px] h-[50px] rounded-full bg-green-500'></div>
<div className='flex items-start h-[50px]'>
    <div className='text-xl'>
    mom please make us food ...     mom please make us food ...     mom please make us food ...       mom please make us food ...
        </div>
</div>
        </div>
 ))}
        </div>
    </ThemeProvider>
  );
}