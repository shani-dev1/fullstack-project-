import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCompetitionByCategoryQuery,useGetLeadCompetitionsByCategoryQuery} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import UploadCompetitionPopup from './UploadCompetitionPopup';
import Chat from '../../chat/chat';
import { CompetitionItem } from '../competitionsTypes';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/currentUserSlice';

const CompetitionList = () => {
  const { competitionID } = useParams();

  const user = useSelector(selectCurrentUser);

  const { data, error, isLoading, refetch,} = useGetCompetitionByCategoryQuery(competitionID || '');

  const {
    data: topCompetitions,
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

  const handleUploadSuccess = () => {
    setIsPopupOpen(false);
    refetch();
  };

  const handleMouseEnter = (competition: CompetitionItem) => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = () => {
    setSelectedCompetition(null);
  };

  const handleEnterChat = () => {
    if (!user) {
      alert('אנא התחבר כדי להיכנס לצ׳אט');
      return;
    }
    if (!user.rooms || !user.rooms.includes(competitionID || '')) {
      alert('אין לך גישה לחדר הצ׳אט הזה');
      return;
    }
    setShowChatPopup(true);
  };

  if (isLoading || isTopLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בשליפת נתונים</p>;

  return (
    <div style={{ padding: '24px' }}>
      {/* כותרת וכפתור העלאה + כפתור צ'אט */}
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
        <div>
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
              marginRight: '10px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffca28')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
          >
            הוסף תחרות
          </button>

          <button
            onClick={handleEnterChat}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
          >
            כניסה לצ׳אט
          </button>
        </div>
      </div>

      {/* תחרויות מובילות */}
      <TopCompetitions
        topCompetitions={topCompetitions || []}
        onSelect={(competition) => setSelectedCompetition(competition)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            opacity: selectedCompetition ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <CompetitionCard competitionItem={selectedCompetition} />
        </div>
      )}

      {/* פופאפ העלאת תחרות */}
      {isPopupOpen && (
        <UploadCompetitionPopup
          onClose={() => setIsPopupOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {/* פופאפ צ'אט */}
      {showChatPopup && (
        <div
          style={{
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            zIndex: 9999,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}
        >
          <button
            onClick={() => setShowChatPopup(false)}
            style={{ float: 'right', cursor: 'pointer' }}
          >
            X
          </button>
          <Chat category={competitionID || ''} onClose={() => setShowChatPopup(false)} />
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
