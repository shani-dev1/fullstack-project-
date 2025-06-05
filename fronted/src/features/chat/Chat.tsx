import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Chip, Fade, Tooltip, Box, Typography, IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

import { selectCurrentUser } from '../auth/currentUserSlice';
import { useSocket } from './useSocket';
import { Message } from './chatTypes';
import { userInfo } from '../auth/authTypes';

import {
  Container,
  HeaderPaper,
  HeaderTypography,
  ChipsWrapper,
  MessagesBox,
  NoMessagesBox,
  MessageWrapper,
  MessageContainer,
  UserAvatar,
  MessagePaper,
  TimestampBox,
  InputSection,
  InputWrapper,
  StyledTextField,
} from './Chat.styles';

alert(5555555)
const normalize = (str: string | undefined | null): string =>
  (str || '').trim().toLowerCase();

const formatTime = (time?: string): string => {
  if (!time) return new Date().toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const date = new Date(time);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else {
    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
};

const Chat = ({
  category,
  onClose,
}: {
  category: string;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const user = useSelector(selectCurrentUser) as userInfo | null;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const socket = useSocket({
    category,
    onUnauthorized: onClose,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chatHistory', (msgs: Message[]) => {
      setMessages(msgs);
      setTimeout(scrollToBottom, 100);
    });

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
      setTypingUsers((prev) => prev.filter(email => email !== message.email));
    });

    socket.on('userTyping', (usersTyping: string[]) => {
      setTypingUsers(usersTyping.filter(email => email !== user?.email));
      setIsTyping(usersTyping.length > 0);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('receiveMessage');
      socket.off('userTyping');
    };
  }, [socket, user?.email]);

  const sendMessage = (): void => {
    if (input.trim() && socket && user) {
      socket.emit('sendMessage', {
        category,
        message: input,
        email: user.email,
        userName: user.name,
      });
      setInput('');
      if (socket && user) {
        socket.emit('stopTyping', { category, email: user.email });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else {
      if (socket && user) {
        socket.emit('startTyping', { category, email: user.email });
      }
    }
  };

  return (
    <Container>
      {/* Header */}
      <HeaderPaper elevation={0}>
        <HeaderTypography variant="h6">
          💬 צ'אט {category}
        </HeaderTypography>
        <ChipsWrapper>
          <Chip
            icon={<PersonIcon />}
            label={`${messages.length} הודעות`}
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
            }}
          />
          {typingUsers.length > 0 && (
            <Chip
              label={
                typingUsers.length === 1
                  ? `מקליד... ${typingUsers[0]}`
                  : `מקלידים... ${typingUsers.length} משתמשים`
              }
              size="small"
              sx={{
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                color: 'white',
              }}
            />
          )}
        </ChipsWrapper>
      </HeaderPaper>

      <MessagesBox ref={messagesContainerRef}>
        {messages.length === 0 ? (
          <Fade in timeout={1000}>
            <NoMessagesBox>
              <AccountCircleIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography>אין הודעות עדיין, התחל לכתוב!</Typography>
            </NoMessagesBox>
          </Fade>
        ) : (
          messages.map((msg, idx) => {
            const isMyMessage = user?.email === msg.email;
            const avatarLetters = msg.name
              ? msg.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : '?';

            const tooltipTitle = (
              <Box>
                <Typography variant="subtitle2">{msg.name || 'משתמש'}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {msg.email}
                </Typography>
              </Box>
            );

            return (
              <MessageWrapper key={idx}>
                <MessageContainer isMyMessage={isMyMessage}>
                  <Tooltip title={tooltipTitle} arrow>
                    <UserAvatar isMyMessage={isMyMessage}>
                      {avatarLetters}
                    </UserAvatar>
                  </Tooltip>

                  <Box>
                    <MessagePaper isMyMessage={isMyMessage} elevation={3}>
                      <Typography
                        variant="body1"
                      >
                        {msg.text}
                      </Typography>
                    </MessagePaper>
                    <TimestampBox isMyMessage={isMyMessage}>
                      <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {formatTime(msg.time)}
                      </Typography>
                    </TimestampBox>
                  </Box>
                </MessageContainer>
              </MessageWrapper>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </MessagesBox>

      <InputSection>
        <InputWrapper>
          <StyledTextField
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="כתוב הודעה..."
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={sendMessage}
                    disabled={!input.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: {
                color: 'white',
                fontSize: '1rem',
              },
            }}
          />
        </InputWrapper>
      </InputSection>
    </Container>
  );
};

export default Chat;
