import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Button, Rate, Tag } from "antd";
import { CompetitionItem } from "../competitionsTypes";
import { useDeleteCompetitionMutation, useUpdateCompetitionRatingMutation, useGetCompetitionByCategoryQuery } from "../competitionsAPI"; // הוסף את ה-hook כאן
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";

interface Props {
  competitionItem: CompetitionItem;
}

const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [updateCompetitionRating] = useUpdateCompetitionRatingMutation();
  const [deleteCompetition] = useDeleteCompetitionMutation();
  const currentUser = useSelector(selectCurrentUser);

  const { refetch } = useGetCompetitionByCategoryQuery(competitionItem.category); // הוסף את השורה הזו

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error"
  >("success");

  const handleRatingChange = async (newValue: number) => {
    if (!currentUser) {
      setSnackbarMessage("עליך להתחבר כדי לדרג");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    if (currentUser._id === competitionItem.ownerId) {
      setSnackbarMessage("בעל התחרות לא יכול לדרג את עצמו");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setValue(newValue);

    try {
      await updateCompetitionRating({
        competitionId: competitionItem._id,
        rating: newValue,
        userId: currentUser._id,
        category: competitionItem.category
      }).unwrap();

      setSnackbarMessage("הדירוג עודכן בהצלחה");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "שגיאה בעדכון הדירוג";

      if (errorMessage === "User has already rated this competition") {
        setSnackbarMessage("כבר דירגת את התחרות הזו. לא ניתן לדרג פעמיים.");
        setSnackbarSeverity("warning");
      } else {
        setSnackbarMessage("שגיאה בעדכון הדירוג. אנא נסה שוב מאוחר יותר.");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Card
        style={{
          width: 320,
          borderRadius: 16,
          overflow: "hidden",
          background: "#1f1f1f",
          border: "1px solid #ffc107",
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)"
        }}
      >
        <CardMedia
          component="img"
          alt="תמונה לתחרות"
          image={competitionItem.fileUrl}
          style={{ height: 200, objectFit: "cover" }}
        />
        <CardContent>
          {currentUser && currentUser._id === competitionItem.ownerId && (
            <Button
              onClick={async () => {
                try {
                  await deleteCompetition(competitionItem._id).unwrap();
                  refetch(); // רענן את הנתונים

                  setSnackbarMessage("התחרות נמחקה בהצלחה");
                  setSnackbarSeverity("success");
                  setOpenSnackbar(true);
                } catch (error: any) {
                  setSnackbarMessage("שגיאה במחיקת התחרות");
                  setSnackbarSeverity("error");
                  setOpenSnackbar(true); 
                }
              }}
            >
              🗑️
            </Button>
          )}
          <Typography
            variant="h6"
            style={{ color: "#ffc107", fontWeight: "bold", fontSize: "18px" }}
          >
            קטגוריה: {competitionItem.category}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ color: "#ccc", fontSize: "14px" }}
          >
            הועלה על ידי: {competitionItem.ownerEmail}
          </Typography>
          <br />
          <Tag color="gold" style={{ marginTop: 8, fontSize: 14 }}>
            ציון: {competitionItem.rating}
          </Tag>

          <div
            style={{
              marginTop: 12,
              backgroundColor: "#2a2a2a",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "inline-block"
            }}
          >
            <Rate
              allowClear
              value={value ?? competitionItem.rating ?? 0}
              onChange={handleRatingChange}
              style={{ color: "#ffca28", fontSize: 24 }}
            />
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CompetitionCard;
