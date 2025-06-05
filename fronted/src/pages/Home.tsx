import { Link } from "react-router-dom";
import { CategoryKeys } from "../features/competitions/competitionsTypes";
import {
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Zoom,
  Fade
} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from "react";
import styles from './Home.styles';
import { useDispatch } from "react-redux";
import { chooseCompetition } from '../features/competitions/competitionsStateSlice';

const categoryData: Record<CategoryKeys, {
  label: string;
  icon: React.ReactElement;
  description: string;
  color: string;
}> = {
  pictures: {
    label: "Pictures",
    icon: <PhotoCameraIcon sx={{ fontSize: 60 }} />,
    description: "Upload and compete with your best photographs",
    color: "rgb(255, 0, 81)"
  },
  recipes: {
    label: "Recipes",
    icon: <RestaurantIcon sx={{ fontSize: 60 }} />,
    description: "Share your culinary creations and cooking skills",
    color: "rgb(245, 0, 172)"
  },
  exams: {
    label: "Exams",
    icon: <SchoolIcon sx={{ fontSize: 60 }} />,
    description: "Test your knowledge and skills in various subjects",
    color: "rgb(245, 41, 0)"
  }
};

const Home = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const dispatch = useDispatch(); 

  const handleCompetitionChange = (key: CategoryKeys) => { 
    dispatch(chooseCompetition(key));
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.backgroundGradient} />
      <Box sx={styles.bodyStyle} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in={animate} timeout={1000}>
          <Box>
            <Typography variant="h2" component="h1" sx={styles.titleGradient}>
              Welcome To Turbo Competition
            </Typography>
            <Typography variant="h6" sx={styles.subtitle}>
              Choose a category and start competing today
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4} sx={styles.categoryGrid}>
          {Object.entries(categoryData).map(([key, { label, icon, description, color }], index) => (
              <Grid item component={Link} to={`/competitions/${key}`} xs={12} sm={6} md={4} key={key}>
              <Zoom in={animate} style={{ transitionDelay: `${index * 200}ms` }}>
                <Card sx={styles.categoryCard}>
                  <CardActionArea onClick={()=>handleCompetitionChange(key as CategoryKeys)} component={Link} to={`/competitions/${key}`}>
                    <Box sx={styles.cardMedia}>
                      <Box
                        sx={{
                          ...styles.cardMediaGradient,
                          background: `linear-gradient(135deg, ${color}, #e91e63, #ff5722)`
                        }}
                      />
                      <Box sx={styles.cardMediaIcon}>
                        {icon}
                      </Box>
                    </Box>
                    <CardContent sx={styles.cardContent}>
                      <Typography gutterBottom variant="h5" component="div" sx={styles.cardTitle}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={styles.cardDescription}>
                        {description}
                      </Typography>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          ...styles.exploreButton,
                          background: `linear-gradient(45deg, #e91e63, #ff5722)`
                        }}
                      >
                        Explore {label}
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
