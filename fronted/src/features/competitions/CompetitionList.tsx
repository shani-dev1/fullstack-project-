import { useParams } from "react-router-dom";
import { useGetCompetitionByCategoryQuery } from "./competitionsAPI";
import CompetitionCard from "./CompetitionCard";
import { CompetitionItem } from "./competitionsTypes";

const CompetitionList = () => {
  const { competitionID } = useParams(); 

  const { data, error, isLoading } = useGetCompetitionByCategoryQuery(competitionID); 
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בשליפת נתונים</p>;

  if (!data || data.length === 0) {
    return <p>אין נתונים זמינים</p>;
  }

  return (
    <div>
      {data.map((competitionItem: CompetitionItem) => (
        <CompetitionCard key={competitionItem._id} competitionItem={competitionItem} />
      ))}
    </div>
  );
};

export default CompetitionList;
