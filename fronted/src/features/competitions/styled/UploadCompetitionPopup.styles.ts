export const styles = {
  dialogPaper: {
    borderRadius: 4,
    background: 'rgba(17, 17, 17, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #e91e63, #2196f3)',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    position: 'relative' as const,
  },
  closeButton: {
    position: 'absolute' as const,
    right: 8,
    top: 8,
    color: 'white',
    minWidth: 'auto',
    p: 1,
  },
  dialogContentPaper: {
    p: 4,
    borderRadius: 3,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  typographyGradient: {
    background: 'linear-gradient(45deg, #ff9800, #4caf50)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    mb: 3,
  },
  fileUploadBox: (fileSelected: boolean) => ({
    display: 'block',
    p: 4,
    borderRadius: 3,
    border: '2px dashed',
    borderColor: fileSelected ? '#4caf50' : 'rgba(255, 255, 255, 0.3)',
    background: fileSelected
      ? 'linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))'
      : 'rgba(255, 255, 255, 0.02)',
    cursor: fileSelected ? 'default' : 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': !fileSelected
      ? {
          borderColor: 'rgba(233, 30, 99, 0.5)',
          background: 'rgba(233, 30, 99, 0.05)',
        }
      : {},
  }),
  uploadIcon: (fileSelected: boolean) => ({
    fontSize: 48,
    color: fileSelected ? '#4caf50' : '#ccc',
    mb: 2,
  }),
  fileNameTypography: {
    color: '#ccc',
    fontSize: 14,
  },
  errorAlert: {
    mt: 2,
    borderRadius: 2,
    background: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid rgba(244, 67, 54, 0.3)',
  },
  dialogActions: {
    p: 3,
    gap: 2,
  },
  cancelButton: {
    borderRadius: 3,
    px: 3,
    py: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: '#ccc',
    '&:hover': {
      borderColor: 'rgba(244, 67, 54, 0.5)',
      color: '#f44336',
    },
  },
  submitButton: {
    borderRadius: 3,
    px: 4,
    py: 1,
    background: 'linear-gradient(45deg, #4caf50, #2196f3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #388e3c, #1976d2)',
    },
    '&:disabled': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  snackbarAlert: {
    borderRadius: 3,
    background: 'rgba(76, 175, 80, 0.9)',
    backdropFilter: 'blur(10px)',
  },
};
