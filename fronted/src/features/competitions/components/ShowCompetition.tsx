import { Box, Button, IconButton, Paper, Modal } from "@mui/material";
import CompetitionList from "./CompetitionList";
import { Add as AddIcon, Chat as ChatIcon, Close as CloseIcon, School as SchoolIcon } from '@mui/icons-material';
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import { selectCurrentCompetition } from '../competitionsStateSlice';
import { useGetCompetitionByCategoryQuery } from "../competitionsAPI";
import UploadCompetitionPopup from "./UploadCompetitionPopup";
import Chat from '../../chat/Chat';

import { styles } from '../styled/ShowCompetition.styles';  
import Quiz from "../quiz/Quiz";

const ShowCompetition = () => {

  const competitionID = useSelector(selectCurrentCompetition);
  const user = useSelector(selectCurrentUser);

  const { refetch } = useGetCompetitionByCategoryQuery(competitionID);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [showChatPopup, setShowChatPopup] = useState<boolean>(false);

  const handleUploadSuccess = (): void => {
    setIsPopupOpen(false);
    refetch();
  };

  const handleEnterChat = (): void => {
    if (!user) {
      alert('Please log in to enter the chat');
      return;
    }

    const currentCompetitionID = competitionID || '';
    if (!user.rooms || !user.rooms.includes(currentCompetitionID)) {
      alert('You do not have access to this chat room');
      return;
    }

    setShowChatPopup(true);
  };

  return (
    <div>
      <CompetitionList />

      <Box sx={styles.fixedBox}>
        {competitionID === 'exams' ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SchoolIcon />}
              onClick={() => setIsQuizOpen(true)} 
              sx={styles.examsButton}
            >
              Start Quiz
            </Button>

            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              onClick={handleEnterChat}
              sx={styles.chatButton}
            >
              Enter Chat
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsPopupOpen(true)}
              sx={styles.addButton}
            >
              Add Competition
            </Button>

            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              onClick={handleEnterChat}
              sx={styles.chatButton}
            >
              Enter Chat
            </Button>
          </>
        )}
      </Box>

      {isPopupOpen && competitionID !== 'exams' && (
        <UploadCompetitionPopup
          onClose={() => setIsPopupOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      <Modal open={isQuizOpen} onClose={() => setIsQuizOpen(false)}>
        <Box sx={styles.quizModalBox}>
          <Quiz/>
        </Box>
      </Modal>

      {showChatPopup && (
        <Paper elevation={8} sx={styles.chatPaper}>
          <Box sx={styles.chatHeaderBox}>
            <IconButton onClick={() => setShowChatPopup(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={styles.chatContentBox}>
            <Chat category={competitionID || ''} onClose={() => setShowChatPopup(false)} />
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default ShowCompetition;
