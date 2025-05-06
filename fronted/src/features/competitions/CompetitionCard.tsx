import { useState } from "react";
import { CompetitionItem } from "./competitionsTypes";
import { Rating } from "@mui/material";

interface Props {
  competitionItem: CompetitionItem;
}

const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);

  const handleRatingChange = (newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <p>Category: {competitionItem.category}</p>
      <p>Score: {competitionItem.score}</p>
      <Rating
        name={`user-rating-${competitionItem._id}`}
        value={value}
        onChange={(_, newValue) => handleRatingChange(newValue)}
      />
    </div>
  );
};

export default CompetitionCard;