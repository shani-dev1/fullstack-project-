import { useParams } from "react-router-dom";
import { useGetCompetitionByCategoryQuery } from "./competitionsAPI";
import CompetitionCard from "./CompetitionCard";
import { CompetitionItem } from "./competitionsTypes";
import UploadCompetitionPopup from "./UploadCompetitionPopup";
import { useState } from "react";

const CompetitionList = () => {
  const { competitionID } = useParams();
  const { data, error, isLoading, refetch } = useGetCompetitionByCategoryQuery(competitionID);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleUploadSuccess = () => {
    console.log("העלאה הצליחה - מרענן את הדף");
    setIsPopupOpen(false);
    refetch();
  };

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) {
    console.error("שגיאה בשליפת נתונים", error);
    return <p>שגיאה בשליפת נתונים</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>
          תחרויות בקטגוריה: {competitionID}
        </h2>
        <button
          onClick={() => {
            console.log("נלחץ כפתור פתיחת פופאפ");
            setIsPopupOpen(true);
          }}
          style={{
            backgroundColor: "#ffc107",
            color: "#000",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "9999px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffca28")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffc107")}
        >
          הוסף תחרות
        </button>
      </div>

      {(!data || data.length === 0) ? (
        <p>אין נתונים זמינים</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {data.map((competitionItem: CompetitionItem) => (
            <CompetitionCard key={competitionItem._id} competitionItem={competitionItem} />
          ))}
        </div>
      )}

      {isPopupOpen && (
        <UploadCompetitionPopup
          onClose={() => {
            console.log("סוגרים את הפופאפ");
            setIsPopupOpen(false);
          }}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default CompetitionList;
