import {
  useGetUserCompetitionsByUserIdQuery,
} from '../competitionsAPI';
import { List,ListItem,ListItemAvatar, Avatar, ListItemText, CircularProgress, Typography, Box,} from '@mui/material';
import { styles } from '../styled/UserCompetitions.styles';

interface UserCompetitionsProps {
  userId: string;
}

function UserCompetitions({ userId }: UserCompetitionsProps) {
  const { data, error, isLoading } = useGetUserCompetitionsByUserIdQuery(userId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error loading competitions</Typography>;
  }

  if (!data || data.length === 0) {
    return <Typography>No competitions to display.</Typography>;
  }

  return (
    <Box sx={styles.wrapper}>
      <List>
        {data.map((competition) => (
          <ListItem key={competition._id} divider>
            <ListItemAvatar>
              <Avatar
                src={competition.fileUrl}
                alt={competition.category}
                sx={styles.avatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`Category: ${competition.category}`}
              secondary={`Rating: ${competition.rating}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default UserCompetitions;
