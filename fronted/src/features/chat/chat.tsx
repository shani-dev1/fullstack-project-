// תחילת הקובץ

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, TextField, Typography, Paper, Avatar, Divider, InputAdornment, IconButton, Chip,
  Fade,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  AccessTime as TimeIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

import { selectCurrentUser } from '../auth/currentUserSlice';
import { useSocket } from './useSocket';
import { Message } from './chatTypes';
import { userInfo } from '../auth/authTypes';

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
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000', // ← רקע שחור
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          p: 2,
          borderRadius: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          💬 צ'אט {category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
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
        </Box>
      </Paper>

      <Box
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#000', // ← גם כאן שחור
        }}
      >
        {messages.length === 0 ? (
          <Fade in timeout={1000}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 64, mb: 2, opacity: 0.6 }} />
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.8,
                  textAlign: 'center',
                }}
              >
                ✨ אין הודעות עדיין. אתה הראשון לכתוב! ✨
              </Typography>
            </Box>
          </Fade>
        ) : (
          messages.map((msg, i) => {
            const isMyMessage = normalize(msg.email) === normalize(user?.email);
            return (
              <Zoom in key={i} timeout={300} style={{ transitionDelay: `${i * 50}ms` }}>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: isMyMessage ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Tooltip
                      title={
                        <Box
                          sx={{
                            p: 2,
                            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                            borderRadius: 2,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ fontSize: 16, mr: 1, color: '#64b5f6' }} />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                              פרטי משתמש
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#90caf9' }}>
                            📧 {msg.email}
                          </Typography>
                        </Box>
                      }
                      arrow
                      placement={isMyMessage ? 'left' : 'right'}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: isMyMessage
                            ? 'linear-gradient(45deg, #e91e63, #ff5722)'
                            : 'linear-gradient(45deg, #4caf50, #2196f3)',
                          fontSize: '0.9rem',
                          mx: 1,
                        }}
                      >
                        {msg.email.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                    <Box sx={{ maxWidth: '70%', position: 'relative' }}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2.5,
                          background: isMyMessage
                            ? 'linear-gradient(135deg, #e91e63, #ff5722)'
                            : 'linear-gradient(135deg, #424242, #616161)',
                          color: 'white',
                          borderRadius: 3,
                        }}
                      >
                        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                          {msg.text}
                        </Typography>
                      </Paper>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
                          mt: 0.5,
                        }}
                      >
                        <TimeIcon sx={{ fontSize: 12, mr: 0.5, color: 'rgba(255,255,255,0.6)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {formatTime(msg.time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Zoom>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Divider
        sx={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          height: '2px',
        }}
      />

      <Box
        sx={{
          p: 2,
          background: '#121212', // ← שחור כהה
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (socket && user) {
                socket.emit('startTyping', { category, email: user.email });
              }
            }}
            onBlur={() => {
              if (socket && user) {
                socket.emit('stopTyping', { category, email: user.email });
              }
            }}
            onKeyDown={handleKeyPress}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                background: '#1f1f1f',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.6)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} disabled={!input.trim()} size="small">
                    <SendIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
