const gradients = [
  'linear-gradient(45deg, #e91e63, #ff5722)',
  'linear-gradient(45deg, #ff5722, #ff9800)',
  'linear-gradient(45deg, #ff9800, #4caf50)',
];

export const styles = {
  container: { mb: 4 },

  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    mb: 3,
  },

  trophyIcon: {
    color: '#ff9800',
    fontSize: 32,
  },

  headerTypography: {
    background: 'linear-gradient(45deg, #e91e63, #2196f3)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  },

  competitionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 3,
    flexWrap: 'wrap',
  },

  examBoxContainer: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
  },

  examAvatarWrapper: (index: number) => ({
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: gradients[index] || gradients[2],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0 4px 12px rgba(233, 30, 99, 0.3)`,
  }),

  examAvatar: {
    width: 40,
    height: 40,
    border: '2px solid white',
  },

  examBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#ff9800',
    border: '2px solid white',
  },

  examRating: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#333',
  },

  examEmail: {
    fontSize: '0.7rem',
    color: '#777',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  competitionBox: (index: number) => ({
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.05)',
    },
  }),

  competitionAvatar: (index: number) => ({
    width: 120,
    height: 120,
    border: `4px solid transparent`,
    background: gradients[index] || gradients[2],
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow: `0 8px 32px rgba(233, 30, 99, 0.3)`,
    '&:hover': {
      boxShadow: `0 12px 40px rgba(233, 30, 99, 0.4)`,
    },
  }),

  chip: (index: number) => ({
    position: 'absolute',
    top: -8,
    right: -8,
    background: gradients[index] || gradients[2],
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    width: 32,
    height: 32,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  }),
};
