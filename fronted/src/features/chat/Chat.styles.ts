import { styled } from '@mui/material/styles';
import {
  Box, Paper, Typography, Chip, Avatar, TextField, IconButton
} from '@mui/material';

export const Container = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
});

export const HeaderPaper = styled(Paper)({
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  padding: 16,
  borderRadius: 0,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
});

export const HeaderTypography = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
});

export const ChipsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
  marginTop: 8,
});

export const MessagesBox = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: 16,
});

export const NoMessagesBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: 'rgba(255,255,255,0.8)',
});

export const MessageWrapper = styled(Box)({
  marginBottom: 24,
});

export const MessageContainer = styled(Box)<{ isMyMessage: boolean }>(({ isMyMessage }) => ({
  display: 'flex',
  flexDirection: isMyMessage ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
}));

export const UserAvatar = styled(Avatar)<{ isMyMessage: boolean }>(({ isMyMessage }) => ({
  width: 36,
  height: 36,
  background: isMyMessage
    ? 'linear-gradient(45deg, #e91e63, #ff5722)'
    : 'linear-gradient(45deg, #4caf50, #2196f3)',
  fontSize: '0.9rem',
  marginX: 8,
}));
export const MessagePaper = styled(Paper)<{ isMyMessage: boolean }>(({ isMyMessage }) => ({
  padding: 20,
  background: isMyMessage
    ? 'linear-gradient(135deg, #e91e63, #ff5722)'
    : 'linear-gradient(135deg, #424242, #616161)',
  color: 'white',
  borderRadius: 12,
  display: 'inline-block',  
  whiteSpace: 'nowrap',    
}));


export const TimestampBox = styled(Box)<{ isMyMessage: boolean }>(({ isMyMessage }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
  marginTop: 4,
}));

export const DividerStyled = styled('hr')({
  backgroundColor: 'rgba(255,255,255,0.3)',
  height: 2,
  border: 'none',
});

export const InputSection = styled(Box)({
  padding: 16,
  background: 'rgba(255,255,255,0.95)',
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
});

export const InputWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-end',
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    background: 'linear-gradient(135deg, #2c2c2c, #3c3c3c)',
    color: 'white',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.3)',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.6)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
      borderWidth: 2,
    },
  },
});
