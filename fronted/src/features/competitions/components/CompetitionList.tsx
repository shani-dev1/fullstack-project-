import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCompetitionByCategoryQuery,
  useGetLeadCompetitionsByCategoryQuery,
} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import UploadCompetitionPopup from './UploadCompetitionPopup';
import { CompetitionItem } from '../competitionsTypes';

const CompetitionList = () => {
  const { competitionID } = useParams();
  const {
    data,
    error,
    isLoading,
    refetch,
  } = useGetCompetitionByCategoryQuery(competitionID || '');
  const {
    data: topCompetitions,
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleUploadSuccess = () => {
    setIsPopupOpen(false);
    refetch(); // כדי לטעון מחדש את התחרויות לאחר העלאה מוצלחת
  };

  const handleMouseEnter = (competition: CompetitionItem) => {
    setSelectedCompetition(competition); // עדכון המוביל ברגע של הריחוף
  };

  const handleMouseLeave = () => {
    setSelectedCompetition(null); // נקה את המוביל כשהריחוף עוזב
  };

  if (isLoading || isTopLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בשליפת נתונים</p>;
  return (
    <div style={{ padding: '24px' }}>
      {/* כותרת וכפתור העלאה */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
          תחרויות בקטגוריה: {competitionID}
        </h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          style={{
            backgroundColor: '#ffc107',
            color: '#000',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffca28')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
        >
          הוסף תחרות
        </button>
      </div>

      {/* תחרויות מובילות */}
      <TopCompetitions
        topCompetitions={topCompetitions || []}
        onSelect={(competition) => setSelectedCompetition(competition)}
        onMouseEnter={handleMouseEnter} // כאשר מרחפים מעל התחרות
        onMouseLeave={handleMouseLeave} // כאשר עוזבים את הריחוף
      />

      {/* כל התחרויות */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {data?.map((competitionItem: CompetitionItem) => (
          <CompetitionCard key={competitionItem._id} competitionItem={competitionItem} />
        ))}
      </div>

      {/* תחרות נבחרת מוקפצת */}
      {selectedCompetition && (
        <div
          style={{
            position: 'absolute', // שינוי מ fixed ל absolute כדי למנוע רעידה
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            opacity: selectedCompetition ? 1 : 0, // בשיטה זו הכרטיס לא רועד
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none', // זה מונע שיתפוס את הקלט וייווצר רעש
          }}
        >
          <CompetitionCard competitionItem={selectedCompetition} />
        </div>
      )}

      {isPopupOpen && (
        <UploadCompetitionPopup
          onClose={() => setIsPopupOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default CompetitionList;
