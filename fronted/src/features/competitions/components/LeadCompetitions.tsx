import { CompetitionItem } from '../competitionsTypes';

interface Props {
  topCompetitions: CompetitionItem[];
  onSelect: (competition: CompetitionItem) => void;
  onMouseEnter: (competition: CompetitionItem) => void;
  onMouseLeave: () => void;
}

const LeadCompetitions = ({ topCompetitions, onSelect, onMouseEnter, onMouseLeave }: Props) => {
  return (
    <div>
      <div>המובילים שלנו</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
        {topCompetitions.map((competition, index) => (
          <div
            key={competition._id}
            onClick={() => onSelect(competition)}
            onMouseEnter={() => onMouseEnter(competition)}
            onMouseLeave={onMouseLeave}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundImage: `url(${competition.fileUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '3px solid gold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 18,
              position: 'relative',
              transition: 'transform 0.3s ease',
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadCompetitions;
