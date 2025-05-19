import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/currentUserSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCreateCompetitionMutation } from "./competitionsAPI";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const UploadCompetitionPopup = ({ onClose, onSuccess }: Props) => {
  const { competitionID } = useParams();
  const [uploadCompetition] = useCreateCompetitionMutation();
  const currentUser = useSelector(selectCurrentUser);

  const [formData] = useState({
    category: competitionID || "pictures",
  });
  const [file, setFile] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("בחר תמונה");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    data.append("image", file);
    data.append("ownerId", currentUser?._id || "");
    data.append("ownerEmail", currentUser?.email || "");

    try {
      await uploadCompetition(data).unwrap();
      setOpenSnackbar(true);
      onSuccess();
    } catch (err) {
      console.error(err);
      setErrorMessage("שגיאה בהעלאה");
    }
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: "#2d2d2d",
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "16px 16px 0 0",
            padding: 3,
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          }}
        >
          העלאת תחרות
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "#333",
            borderRadius: "0 0 16px 16px",
            padding: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#444",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ffca28",
                marginBottom: 2,
                fontWeight: "bold",
              }}
            >
              בחר תמונה:
            </Typography>

            <Box
              component="label"
              htmlFor="file-upload"
              sx={{
                display: "block",
                backgroundColor: "#555",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px dashed #ffca28",
                cursor: "pointer",
                marginBottom: 2,
              }}
            >
              לחץ לבחירת קובץ
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Box>

            {file && (
              <Typography sx={{ color: "#ccc", fontSize: "14px" }}>
                {file.name}
              </Typography>
            )}

            {errorMessage && (
              <Typography
                sx={{
                  color: "red",
                  marginTop: 2,
                  fontSize: "14px",
                }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "#2d2d2d", padding: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            sx={{
              textTransform: "none",
              color: "#fff",
              borderColor: "#ffca28",
              borderRadius: "12px",
              padding: "8px 16px",
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              backgroundColor: "#ffca28",
              color: "#2d2d2d",
              borderRadius: "12px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#ffb300" },
            }}
          >
            שלח
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%", borderRadius: "8px" }}
        >
          התחרות הועלתה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadCompetitionPopup;
