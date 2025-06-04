import { Box, Typography, Avatar, Chip } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { CompetitionItem } from '../competitionsTypes';
import { useParams } from 'react-router-dom';
import { styles } from '../styled/LeadCompetitions.styles';

interface Props {
  topCompetitions: CompetitionItem[];
  onSelect: (competition: CompetitionItem) => void;
  onMouseEnter: (competition: CompetitionItem) => void;
  onMouseLeave: () => void;
}

const LeadCompetitions = ({ topCompetitions, onSelect, onMouseEnter, onMouseLeave }: Props) => {
  const { competitionID } = useParams();
  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerBox}>
        <TrophyIcon sx={styles.trophyIcon} />
        <Typography variant="h5" sx={styles.headerTypography}>
          Our Top Competitors
        </Typography>
        <TrophyIcon sx={styles.trophyIcon} />
      </Box>

      <Box sx={styles.competitionsWrapper}>
        {topCompetitions.slice(0, 3).map((competition, index) => {
          const isExams = competitionID === 'exams';

          if (isExams) {
            return (
              <Box key={competition._id} sx={styles.examBoxContainer}>
                <Box sx={styles.examAvatarWrapper(index)}>
                  <Avatar src={competition.fileUrl} sx={styles.examAvatar} />
                  <Box sx={styles.examBadge} />
                </Box>
                <Typography sx={styles.examRating}>
                  {competition.rating ?? 'N/A'}
                </Typography>
                <Typography sx={styles.examEmail}>
                  {competition.ownerEmail}
                </Typography>
              </Box>
            );
          }

          return (
            <Box
              key={competition._id}
              onClick={() => onSelect(competition)}
              onMouseEnter={() => onMouseEnter(competition)}
              onMouseLeave={onMouseLeave}
              sx={styles.competitionBox(index)}
            >
              <Avatar src={competition.fileUrl} sx={styles.competitionAvatar(index)} />
              <Chip label={index + 1} sx={styles.chip(index)} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default LeadCompetitions;
