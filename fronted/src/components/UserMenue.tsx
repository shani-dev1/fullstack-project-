import { useState } from 'react';
import { Typography, Divider, Button, DialogTitle, Avatar, Menu, MenuItem, Dialog, DialogActions } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSelector, useDispatch } from 'react-redux';
import { removeCookie, getCookie } from 'typescript-cookie';
import { jwtDecode } from 'jwt-decode';
import { selectCurrentUser, clearUser } from '../features/auth/currentUserSlice';
import { useDeleteUserMutation } from '../features/auth/authAPI';
import { userInfo } from '../features/auth/authTypes';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [deleteUser] = useDeleteUserMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  if (!user) return null;

  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeCookie('token');
    dispatch(clearUser());
    handleMenuClose();
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = getCookie('token');
      if (!token) throw new Error('User not authenticated');
      const decoded = jwtDecode<userInfo>(token);
      await deleteUser(decoded._id).unwrap();
      removeCookie('token');
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
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2">התנתק</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleDeleteAccount} sx={{ color: 'error.main' }}>
          <Typography variant="body2">מחק חשבון</Typography>
        </MenuItem>
      </Menu>
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <WarningAmberIcon color="warning" />
            <Typography variant="h6" component="span" style={{ marginLeft: '8px' }}>
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
