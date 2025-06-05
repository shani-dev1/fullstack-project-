import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/currentUserSlice";
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, Box, Typography,
 Snackbar,Alert,CircularProgress,Paper,} from "@mui/material";
import { CloudUpload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import { selectCurrentCompetition } from '../competitionsStateSlice';
import { useCreateCompetitionMutation } from "../competitionsAPI";
import { useState } from "react";
import { styles } from "../styled/UploadCompetitionPopup.styles";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const UploadCompetitionPopup = ({ onClose, onSuccess }: Props) => {
  const competitionID = useSelector(selectCurrentCompetition);
  const [uploadCompetition, { isLoading }] = useCreateCompetitionMutation();
  const currentUser = useSelector(selectCurrentUser);

  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select an image");
      return;
    }

    if (!currentUser || !currentUser._id || !currentUser.email) {
      setErrorMessage("Error: User not logged in.");
      return;
    }

    const data = new FormData();
    data.append("category", competitionID || "pictures");
    data.append("image", file);
    data.append("ownerId", currentUser._id);
    data.append("ownerEmail", currentUser.email);

    try {
      await uploadCompetition(data).unwrap();
      setOpenSnackbar(true);
      onSuccess();
      setFile(null);
    } catch (err) {
      console.error(err);
      setErrorMessage("Upload failed");
    }
  };

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{ "& .MuiDialog-paper": styles.dialogPaper }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          Upload Competition
          <Button onClick={onClose} sx={styles.closeButton}>
            <CloseIcon />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Paper elevation={0} sx={styles.dialogContentPaper}>
            <Typography variant="h6" sx={styles.typographyGradient}>
              Choose an image to upload
            </Typography>

            <Box
              component="label"
              htmlFor="file-upload"
              sx={styles.fileUploadBox(!!file)}
            >
              <UploadIcon sx={styles.uploadIcon(!!file)} />
              <Typography
                variant="h6"
                sx={{ color: file ? "#4caf50" : "#ccc", fontWeight: "bold", mb: 1 }}
              >
                {file ? "✓ File selected successfully" : "Click to select a file"}
              </Typography>

              {file && (
                <Typography sx={styles.fileNameTypography}>
                  {file.name}
                </Typography>
              )}

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!!file}
                style={{ display: "none" }}
              />
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={styles.errorAlert}>
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </DialogContent>

        <DialogActions sx={styles.dialogActions}>
          <Button onClick={onClose} variant="outlined" sx={styles.cancelButton}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading || !file}
            sx={styles.submitButton}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={styles.snackbarAlert}>
          Competition uploaded successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadCompetitionPopup;
