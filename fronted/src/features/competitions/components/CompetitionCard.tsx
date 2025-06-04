import { useState } from "react";
import {Card, CardContent,CardMedia,Typography,Snackbar,Alert,Box,Chip,Rating,IconButton,} from "@mui/material";
import {Person as PersonIcon,Star as StarIcon,Delete as DeleteIcon,} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import { useUpdateCompetitionRatingMutation, useDeleteCompetitionMutation,
} from "../competitionsAPI";
import { CompetitionItem } from "../competitionsTypes";
import { cardStyles,personIconStyles,personTextStyles,starIconStyles,chipRatingStyles,deleteButtonRight,
deleteButtonLeft,cardMediaStyles,chipCategoryStyles,ratingBoxStyles,ratingTextStyles,ratingStyles,cardContentFlexStyles,snackbarStyles,} from "../styled/CompetitionCard.styles";

interface Props {
  competitionItem: CompetitionItem;
  onDelete?: (id: string) => void;
}

const CompetitionCard = ({ competitionItem, onDelete }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error"
  >("success");

  const currentUser = useSelector(selectCurrentUser);
  const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
  const [deleteCompetition] = useDeleteCompetitionMutation();

  const isOwner = currentUser?._id === competitionItem.ownerId;
  const isExams = competitionItem.category === "exams";

  const showSnackbar = (
    message: string,
    severity: "success" | "warning" | "error"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const submitRating = async (newValue: number) => {
    if (!currentUser) return;

    try {
      await updateCompetitionRating({
        competitionId: competitionItem._id,
        rating: newValue,
        userId: currentUser._id,
        category: competitionItem.category,
      }).unwrap();

      showSnackbar("Rating updated successfully", "success");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Error updating rating";
      if (errorMessage === "User has already rated this competition") {
        showSnackbar(
          "You have already rated this competition. You cannot rate it twice.",
          "warning"
        );
      } else {
        showSnackbar("Error updating rating. Please try again later.", "error");
      }
    }
  };

  const handleRatingChange = async (
    _: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (!newValue) return;

    if (!currentUser) {
      showSnackbar("You must be logged in to rate", "warning");
      return;
    }

    if (isOwner) {
      showSnackbar("The owner of the competition cannot rate themselves", "warning");
      return;
    }

    setValue(newValue);
    await submitRating(newValue);
  };

  const handleDelete = async () => {
    try {
      await deleteCompetition(competitionItem._id).unwrap();
      showSnackbar("Competition deleted successfully", "success");
      onDelete?.(competitionItem._id);
    } catch {
      showSnackbar("Failed to delete competition", "error");
    }
  };

  const renderCommonInfo = () => (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <PersonIcon sx={personIconStyles} />
        <Typography variant="body2" sx={personTextStyles}>
          {competitionItem.ownerEmail}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <StarIcon sx={starIconStyles} />
        <Chip
          label={`Rating: ${competitionItem.rating}`}
          size="small"
          sx={chipRatingStyles}
        />
      </Box>
    </>
  );

  return (
    <>
      <Card sx={cardStyles(isExams)}>
        {isExams ? (
          <CardContent sx={{ p: 3 }}>
            {renderCommonInfo()}
            {isOwner && (
              <IconButton onClick={handleDelete} sx={deleteButtonRight}>
                <DeleteIcon />
              </IconButton>
            )}
          </CardContent>
        ) : (
          <>
            <Box sx={{ position: "relative", height: 200 }}>
              <CardMedia
                component="img"
                alt="Competition image"
                image={competitionItem.fileUrl}
                sx={cardMediaStyles}
              />
              <Chip label={competitionItem.category} sx={chipCategoryStyles} />
              {isOwner && (
                <IconButton onClick={handleDelete} sx={deleteButtonLeft}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <CardContent sx={cardContentFlexStyles}>
              <Box>{renderCommonInfo()}</Box>

              <Box sx={ratingBoxStyles}>
                <Typography variant="body2" sx={ratingTextStyles}>
                  Rate this competition:
                </Typography>
                <Rating
                  value={value ?? competitionItem.rating ?? 0}
                  onChange={handleRatingChange}
                  precision={0.5}
                  sx={ratingStyles}
                />
              </Box>
            </CardContent>
          </>
        )}
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={snackbarStyles}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CompetitionCard;
