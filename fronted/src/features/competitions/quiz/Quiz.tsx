import { useEffect, useState } from 'react';
import {
    Box, Typography, Button, TextField, Card, CardContent, LinearProgress, Chip, Fade, Zoom,
    Snackbar, Alert, Paper, CircularProgress
} from '@mui/material';
import {PlayArrow as PlayIcon, Star as StarIcon, Quiz as QuizIcon, CheckCircle as CheckIcon, Cancel as CancelIcon,
        Refresh as RefreshIcon, ExitToApp as ExitIcon} from '@mui/icons-material';
import { useCreateCompetitionMutation, useGenerateQuestionMutation } from '../competitionsAPI';
import { selectCurrentUser } from "../../auth/currentUserSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    setTopic, setQuestionText, setOptions, setCorrectAnswer, setSelectedAnswer, setResult, incrementQuestionsAsked,
    setScore, setQuizFinished, setShowResult, setIsProcessing, resetQuizState, clearCurrentQuestion, selectQuizState
} from './quizSlice';
import { NotificationState } from "./quizTypes";
import * as styles from '../styled/Quiz.styles';

const MAX_QUESTIONS = 2;

const Quiz = () => {
    const dispatch = useDispatch();
    const {
        topic, questionText, options, correctAnswer, selectedAnswer, result, questionsAsked, score,
        quizFinished, showResult, isProcessing
    } = useSelector(selectQuizState);

    const currentUser = useSelector(selectCurrentUser);
    const [uploadCompetition] = useCreateCompetitionMutation();
    const [generateQuestion, { isLoading, data, error, reset }] = useGenerateQuestionMutation();
    const { competitionID } = useParams<{ competitionID: string }>();

    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        severity: 'info'
    });

    const showNotification = (message: string, severity: NotificationState['severity']) => {
        setNotification({ open: true, message, severity });
    };

    useEffect(() => {
        if (!data) return;
        dispatch(setQuestionText(data.question));
        dispatch(setOptions(data.options));
        dispatch(setCorrectAnswer(data.correctAnswer));
        dispatch(incrementQuestionsAsked());
        dispatch(setSelectedAnswer(''));
        dispatch(setResult(''));
        dispatch(setShowResult(false));
        dispatch(setIsProcessing(false));
    }, [data, dispatch]);

    const createExam = async (): Promise<void> => {
        const formData = new FormData();
        formData.append("category", competitionID ?? "");
        formData.append("ownerId", currentUser?._id ?? "");
        formData.append("ownerEmail", currentUser?.email ?? "");
        formData.append("rating", score.toString());
        try {
            await uploadCompetition(formData).unwrap();
            showNotification("Results saved successfully! 🎉", "success");
        } catch (err) {
            console.error(err);
            showNotification("Error saving results", "error");
        }
    };

    const handleExitAndSave = async (): Promise<void> => {
        try {
            await createExam();
            window.dispatchEvent(new CustomEvent('closeQuizModal'));
            if (window.parent !== window) {
                window.parent.postMessage('closeQuiz', '*');
            }
            const closeEvent = new Event('close');
            window.dispatchEvent(closeEvent);
        } catch (error) {
            console.error('Error during exit:', error);
            showNotification("Error occurred while saving and exiting", "error");
        }
    };

    const handleGenerateQuestion = async (): Promise<void> => {
        if (quizFinished || isLoading) return;

        if (!topic.trim()) {
            showNotification('Please enter a quiz topic', 'warning');
            return;
        }
        if (questionsAsked >= MAX_QUESTIONS) {
            dispatch(setResult('You have reached the maximum number of questions'));
            dispatch(setQuizFinished(true));
            await createExam();
            return;
        }

        try {
            await generateQuestion({ topic }).unwrap();
        } catch {
            showNotification('Cannot get a new question. Please try again later.', 'error');
        }
    };

    const handleAnswer = (key: string): void => {
        if (selectedAnswer) return;

        dispatch(setSelectedAnswer(key));
        dispatch(setShowResult(true));

        const isCorrect = key === correctAnswer;

        if (isCorrect) {
            dispatch(setScore(score + 0.5));
            dispatch(setResult('Correct! Excellent! ⭐'));
            showNotification('Correct answer! 🎯', 'success');
        } else {
            dispatch(setResult(`Incorrect. The correct answer is: ${correctAnswer}`));
            showNotification('Wrong answer 😔', 'error');
        }

        if (questionsAsked >= MAX_QUESTIONS) {
            dispatch(setQuizFinished(true));
        } else {
            dispatch(clearCurrentQuestion());
            handleGenerateQuestion();
        }
    };

    const handleResetQuiz = (): void => {
        dispatch(resetQuizState());
        reset();
        showNotification('Quiz reset! Starting over 🔄', 'info');
    };

    const renderStars = (score: number) => {
        const stars = [];
        const fullStars = Math.floor(score);
        const halfStar = score % 1 >= 0.5;
        const emptyStars = MAX_QUESTIONS - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarIcon key={`full-${i}`} sx={styles.starIcon} />
            );
        }

        if (halfStar) {
            stars.push(
                <Box key="half\" sx={{ position: 'relative', display: 'inline-block' }}>
                    <StarIcon sx={{ color: '#ddd', fontSize: 28 }} />
                    <StarIcon
                        sx={{
                            color: '#ffd700',
                            fontSize: 28,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            clipPath: 'inset(0 50% 0 0)',
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                        }}
                    />
                </Box>
            );
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <StarIcon key={`empty-${i}`} sx={styles.emptyStarIcon} />
            );
        }

        return stars;
    };

    const progressPercentage = (questionsAsked / MAX_QUESTIONS) * 100;

    return (
        <Box sx={styles.container}>
            <Box sx={styles.contentBox}>
                {questionsAsked > 0 && !quizFinished && (
                    <Card sx={styles.progressCard}>
                        <CardContent>
                            <Box sx={styles.progressBox}>
                                <QuizIcon sx={styles.progressIcon} />
                                <Typography variant="h6" sx={styles.progressText}>
                                    Progress: {questionsAsked}/{MAX_QUESTIONS}
                                </Typography>
                                <Box sx={styles.starBox}>
                                    {renderStars(score)}
                                </Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={progressPercentage}
                                sx={styles.progressBar}
                            />
                        </CardContent>
                    </Card>
                )}

                {questionsAsked === 0 && !quizFinished && (
                    <Fade in={true}>
                        <Card sx={styles.topicCard}>
                            <CardContent>
                                <Typography variant="h5" sx={styles.topicTitle}>
                                    🎯 Choose a Quiz Topic
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter an interesting quiz topic..."
                                    value={topic}
                                    onChange={(e) => dispatch(setTopic(e.target.value))}
                                    sx={styles.topicTextField}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={handleGenerateQuestion}
                                    disabled={isLoading || !topic.trim()}
                                    startIcon={isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <PlayIcon />}
                                    sx={styles.startButton}
                                >
                                    {isLoading ? 'Loading question...' : 'Start Quiz'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Fade>
                )}

                {isLoading && questionsAsked > 0 && !quizFinished && (
                    <Fade in={true}>
                        <Card sx={styles.loadingCard}>
                            <CardContent sx={{ py: 4 }}>
                                <CircularProgress size={40} sx={styles.loadingProgress} />
                                <Typography variant="h6" sx={styles.loadingText}>
                                    Loading next question...
                                </Typography>
                            </CardContent>
                        </Card>
                    </Fade>
                )}

                {questionText && !quizFinished && !isLoading && (
                    <Zoom in={true}>
                        <Card sx={styles.questionCard}>
                            <CardContent>
                                <Typography variant="h5" sx={styles.questionText}>
                                    {questionText}
                                </Typography>

                                <Box sx={styles.optionsBox}>
                                    {options.map((option) => {
                                        const key = option[0];
                                        const isSelected = selectedAnswer === key;
                                        const isCorrect = correctAnswer === key;
                                        const showColors = showResult;

                                        let backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        let borderColor = 'rgba(255, 255, 255, 0.1)';
                                        let textColor = 'white';
                                        let icon = null;

                                        if (showColors) {
                                            if (isSelected && isCorrect) {
                                                backgroundColor = 'rgba(76, 175, 80, 0.2)';
                                                borderColor = '#4caf50';
                                                textColor = '#4caf50';
                                                icon = <CheckIcon sx={{ color: '#4caf50' }} />;
                                            } else if (isSelected && !isCorrect) {
                                                backgroundColor = 'rgba(244, 67, 54, 0.2)';
                                                borderColor = '#f44336';
                                                textColor = '#f44336';
                                                icon = <CancelIcon sx={{ color: '#f44336' }} />;
                                            } else if (isCorrect) {
                                                backgroundColor = 'rgba(76, 175, 80, 0.2)';
                                                borderColor = '#4caf50';
                                                textColor = '#4caf50';
                                                icon = <CheckIcon sx={{ color: '#4caf50' }} />;
                                            }
                                        }

                                        return (
                                            <Button
                                                key={key}
                                                fullWidth
                                                variant="outlined"
                                                size="large"
                                                disabled={!!selectedAnswer}
                                                onClick={() => handleAnswer(key)}
                                                startIcon={icon}
                                                sx={styles.optionButton(backgroundColor, borderColor, textColor)}
                                            >
                                                {option}
                                            </Button>
                                        );
                                    })}
                                </Box>

                                {result && showResult && (
                                    <Fade in={true}>
                                        <Paper sx={styles.resultPaper(result.includes('Correct'))}>
                                            <Typography
                                                variant="h6"
                                                sx={styles.resultText(result.includes('Correct'))}
                                            >
                                                {result}
                                            </Typography>
                                        </Paper>
                                    </Fade>
                                )}
                            </CardContent>
                        </Card>
                    </Zoom>
                )}

                {quizFinished && (
                    <Zoom in={true}>
                        <Card sx={styles.completionCard}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h3" sx={styles.completionTitle}>
                                    🎉 Quiz Completed! 🎉
                                </Typography>

                                <Typography variant="h5" sx={styles.scoreText}>
                                    You earned {score} stars out of {MAX_QUESTIONS}
                                </Typography>

                                <Box sx={styles.starsBox}>
                                    {renderStars(score)}
                                </Box>

                                <Chip
                                    label={`Success Rate: ${Math.round((score / MAX_QUESTIONS) * 100)}%`}
                                    sx={styles.successChip}
                                />

                                <Box sx={styles.buttonsBox}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleResetQuiz}
                                        startIcon={<RefreshIcon />}
                                        sx={styles.resetButton}
                                    >
                                        Start Over
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleExitAndSave}
                                        startIcon={<ExitIcon />}
                                        sx={styles.exitButton}
                                    >
                                        Exit & Save
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                )}
            </Box>

            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                    severity={notification.severity}
                    sx={styles.snackbarAlert}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
            <Box component="style" sx={styles.animations} />
        </Box>
    );
};

export default Quiz;