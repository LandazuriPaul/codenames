import { styled } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

export const ChatContainer = styled(Paper)(({ theme }) => ({
  height: '100%',
  background: theme.palette.grey[300],
  display: 'flex',
  flexDirection: 'column',

  '& .MuiTab-root, & .MuiTabs-root': {
    minHeight: theme.spacing(3),
  },

  '& .MuiTab-textColorInherit': {
    opacity: 0.3,
  },
  '& .MuiTab-textColorInherit.Mui-selected': {
    opacity: 1,
  },

  [theme.breakpoints.up('sm')]: {
    '& .MuiTab-root': {
      minWidth: 'unset',
    },
  },
}));

export const MessageListContainer = styled('div')(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(5)}px)`,
  overflow: 'hidden',
}));
