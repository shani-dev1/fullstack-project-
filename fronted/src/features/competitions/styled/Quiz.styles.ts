export const container = {
    minHeight: '80vh',
    padding: 3,
    direction: 'rtl'
};

export const contentBox = {
    maxWidth: 800,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
};

export const progressCard = {
    background: 'rgba(17, 17, 17, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 4
};

export const progressBox = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2
};

export const progressIcon = {
    color: '#4caf50'
};

export const progressText = {
    color: 'white'
};

export const starBox = {
    flexGrow: 1,
    display: 'flex',
    gap: 1
};

export const progressBar = {
    height: 12,
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.1)',
    '& .MuiLinearProgress-bar': {
        background: 'linear-gradient(45deg, #e91e63, #ff5722)',
        borderRadius: 6
    }
};

export const topicCard = {
    background: 'rgba(17, 17, 17, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
};

export const topicTitle = {
    color: 'white',
    mb: 3,
    textAlign: 'center'
};

export const topicTextField = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 3,
        fontSize: 18,
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        '&:hover fieldset': {
            borderColor: 'rgba(233, 30, 99, 0.5)'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#e91e63'
        }
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)'
    }
};

export const startButton = {
    background: 'linear-gradient(45deg, #e91e63, #ff5722)',
    borderRadius: 3,
    py: 2,
    fontSize: 18,
    fontWeight: 'bold',
    boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
    '&:hover': {
        background: 'linear-gradient(45deg, #c2185b, #e64a19)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(233, 30, 99, 0.4)'
    },
    '&:disabled': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'none'
    }
};

export const loadingCard = {
    background: 'rgba(17, 17, 17, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    textAlign: 'center'
};

export const loadingProgress = {
    color: '#e91e63',
    mb: 2
};

export const loadingText = {
    color: 'white',
    fontWeight: 'bold'
};

export const questionCard = {
    background: 'rgba(17, 17, 17, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
};

export const questionText = {
    color: 'white',
    mb: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 1.6
};

export const optionsBox = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

export const optionButton = (backgroundColor: string, borderColor: string, textColor: string) => ({
    backgroundColor,
    borderColor,
    color: textColor,
    borderRadius: 3,
    py: 2,
    px: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    justifyContent: 'flex-start',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        borderColor: '#e91e63',
        transform: 'translateX(-8px)'
    },
    '&:disabled': {
        transform: 'none'
    }
});

export const resultPaper = (isCorrect: boolean) => ({
    mt: 3,
    p: 3,
    textAlign: 'center',
    background: isCorrect
      ? 'linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2))'
      : 'linear-gradient(45deg, rgba(244, 67, 54, 0.2), rgba(233, 30, 99, 0.2))',
    border: `1px solid ${isCorrect ? '#4caf50' : '#f44336'}`,
    borderRadius: 3
});

export const resultText = (isCorrect: boolean): { color: string; fontWeight: string } => ({
    color: isCorrect ? '#4caf50' : '#f44336',
    fontWeight: 'bold'
});

export const completionCard = {
    background: 'rgba(17, 17, 17, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(233, 30, 99, 0.3)',
    borderRadius: 4,
    boxShadow: '0 16px 48px rgba(233, 30, 99, 0.2)',
    textAlign: 'center'
};

export const completionTitle = {
    background: 'linear-gradient(45deg, #e91e63, #ff5722)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    mb: 2
};

export const scoreText = {
    color: 'white',
    mb: 3
};

export const starsBox = {
    display: 'flex',
    justifyContent: 'center',
    gap: 1,
    mb: 4
};

export const successChip = {
    background: 'linear-gradient(45deg, #ff9800, #4caf50)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    py: 2,
    px: 3,
    mb: 4
};

export const buttonsBox = {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    flexWrap: 'wrap'
};

export const resetButton = {
    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
    borderRadius: 3,
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    '&:hover': {
        background: 'linear-gradient(45deg, #388e3c, #689f38)',
        transform: 'translateY(-2px)'
    }
};

export const exitButton = {
    background: 'linear-gradient(45deg, #f44336, #e91e63)',
    borderRadius: 3,
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    '&:hover': {
        background: 'linear-gradient(45deg, #d32f2f, #c2185b)',
        transform: 'translateY(-2px)'
    }
};

export const snackbarAlert = {
    borderRadius: 3,
    backdropFilter: 'blur(10px)',
    fontWeight: 'bold'
};

export const starIcon = {
    color: '#ffd700',
    fontSize: 28,
    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
    animation: 'pulse 2s infinite'
};

export const emptyStarIcon = {
    color: '#444',
    fontSize: 28
};

export const animations = {
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    },
    '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.7 }
    }
};
