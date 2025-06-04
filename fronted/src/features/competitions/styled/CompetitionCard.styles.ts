export const cardStyles = (isExams: boolean) => ({
  maxWidth: 360,
  height: isExams ? "auto" : 500,
  display: isExams ? "block" : "flex",
  ...(isExams ? {} : { flexDirection: "column" }),
  borderRadius: 4,
  overflow: "hidden",
  background: "rgba(17, 17, 17, 0.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 48px rgba(233, 30, 99, 0.2)",
    border: "1px solid rgba(233, 30, 99, 0.3)",
  },
  position: "relative",
});

export const personIconStyles = { color: "#4caf50", fontSize: 20 };
export const personTextStyles = { color: "#ccc", fontSize: 14 };

export const starIconStyles = { color: "#ff9800", fontSize: 20 };

export const chipRatingStyles = {
  background: "linear-gradient(45deg, #ff9800, #4caf50)",
  color: "white",
  fontWeight: "bold",
};

export const deleteButtonStyles = {
  position: "absolute",
  top: 12,
  background: "rgba(255,255,255,0.1)",
  "&:hover": {
    background: "rgba(255,255,255,0.2)",
  },
  color: "#f44336",
};

export const deleteButtonRight = {
  ...deleteButtonStyles,
  right: 12,
};

export const deleteButtonLeft = {
  ...deleteButtonStyles,
  left: 12,
};

export const cardMediaStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const chipCategoryStyles = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "linear-gradient(45deg, #e91e63, #ff5722)",
  color: "white",
  fontWeight: "bold",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
};

export const ratingBoxStyles = {
  p: 2,
  borderRadius: 3,
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  mt: "auto",
};

export const ratingTextStyles = { color: "#ccc", mb: 1 };

export const ratingStyles = { color: "#ffd700" };

export const cardContentFlexStyles = {
  p: 3,
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const snackbarStyles = {
  borderRadius: 3,
  backdropFilter: "blur(10px)",
};
