import { useState } from 'react';
import {  Box,Typography, Container,  CircularProgress, Alert,  Grid} from '@mui/material';
import {  useGetCompetitionByCategoryQuery, useGetLeadCompetitionsByCategoryQuery,} from '../competitionsAPI';
import CompetitionCard from './CompetitionCard';
import TopCompetitions from './LeadCompetitions';
import { CompetitionItem } from '../competitionsTypes';
import { loaderBoxStyle, loaderStyle, errorAlertContainer, pageContainerStyle, fixedLabelBox, fixedLabelText, popupCardBox} from '../styled/CompetitionList.styles';
import { selectCurrentCompetition } from '../competitionsStateSlice';
import { useSelector } from 'react-redux';

const CompetitionList =() =>{
  const competitionID = useSelector(selectCurrentCompetition);
  const { data,error, isLoading,} = useGetCompetitionByCategoryQuery(competitionID || '');
  const {
    data: topCompetitions,
    isLoading: isTopLoading,
  } = useGetLeadCompetitionsByCategoryQuery(competitionID || '');

  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);

  const handleMouseEnter = (competition: CompetitionItem): void => {
    setSelectedCompetition(competition);
  };

  const handleMouseLeave = (): void => {
    setSelectedCompetition(null);
  };

  if (isLoading || isTopLoading) {
    return (
      <Box sx={loaderBoxStyle}>
        <CircularProgress size={60} sx={loaderStyle} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={errorAlertContainer}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          שגיאה בשליפת נתונים
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={pageContainerStyle}>
      <Box sx={fixedLabelBox}>
        <Typography variant="h6" sx={fixedLabelText}>
          {competitionID}
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <TopCompetitions
          topCompetitions={topCompetitions || []}
          onSelect={(competition: CompetitionItem) => setSelectedCompetition(competition)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            {data?.map((competitionItem: CompetitionItem) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={competitionItem._id}>
                <CompetitionCard competitionItem={competitionItem} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {selectedCompetition && (
          <Box sx={popupCardBox}>
            <CompetitionCard competitionItem={selectedCompetition} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CompetitionList;
