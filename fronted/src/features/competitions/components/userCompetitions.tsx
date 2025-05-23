import {useGetUserCompetitionsByUserIdQuery} from '../competitionsAPI';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
} from '@mui/material';

interface UserCompetitionsProps {
  userId: string;
}

function UserCompetitions({ userId }: UserCompetitionsProps) {
  const { data, error, isLoading } = useGetUserCompetitionsByUserIdQuery(userId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">שגיאה בטעינת התחרויות</Typography>;
  }

  if (!data || data.length === 0) {
    return <Typography>אין תחרויות להצגה.</Typography>;
  }

  return (
    <List>
      {data.map((competition) => (
        <ListItem key={competition._id} divider>
          <ListItemAvatar>
            <Avatar
              src={competition.fileUrl}
              alt={competition.category}
              sx={{ width: 60, height: 60 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`קטגוריה: ${competition.category}`}
            secondary={`דירוג: ${competition.rating}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default UserCompetitions;