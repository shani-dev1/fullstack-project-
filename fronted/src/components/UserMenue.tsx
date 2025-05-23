import { useState } from 'react';
import {
  Typography,
  Divider,
  Button,
  DialogTitle,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, clearUser } from '../features/auth/currentUserSlice';
import { useDeleteUserMutation } from '../features/auth/authAPI';
import UserCompetitions from '../features/competitions/components/userCompetitions';  

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [deleteUser] = useDeleteUserMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openCompetitionsDialog, setOpenCompetitionsDialog] = useState(false);

  if (!user) return null;

  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleMyCompetitions = () => {
    setOpenCompetitionsDialog(true);
    handleMenuClose();
  };

  const confirmDeleteAccount = async () => {
    try {
      await deleteUser(user._id).unwrap();
      dispatch(clearUser());
    } catch (err) {
      console.error(err);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
        {firstLetter}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">שלום, {user.name}</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={handleMyCompetitions}>
          <Typography variant="body2">התחרויות שלי</Typography>
        </MenuItem>

        <MenuItem onClick={handleDeleteAccount} sx={{ color: 'error.main' }}>
          <Typography variant="body2">מחק חשבון</Typography>
        </MenuItem>
      </Menu>

      {/* דיאלוג הצגת תחרויות */}
      <Dialog
        open={openCompetitionsDialog}
        onClose={() => setOpenCompetitionsDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>התחרויות שלי</DialogTitle>
        <UserCompetitions userId={user._id} />
        <DialogActions>
          <Button onClick={() => setOpenCompetitionsDialog(false)} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג אישור מחיקת חשבון */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <WarningAmberIcon color="warning" />
            <Typography variant="h6" component="span" style={{ marginLeft: 8 }}>
              אישור מחיקת חשבון
            </Typography>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary" variant="outlined">
            בטל
          </Button>
          <Button onClick={confirmDeleteAccount} color="error" variant="contained">
            מחק חשבון
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserMenu;