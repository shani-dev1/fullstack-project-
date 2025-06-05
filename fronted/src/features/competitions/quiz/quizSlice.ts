import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState } from './quizTypes';

const initialState: QuizState = {
    topic: '',
    questionText: '',
    options: [],
    correctAnswer: '',
    selectedAnswer: '',
    result: '',
    questionsAsked: 0,
    score: 0,
    quizFinished: false,
    askedQuestions: [],
    showResult: false,
    isProcessing: false,
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setTopic(state, action: PayloadAction<string>) {
            state.topic = action.payload;
        },
        setQuestionText(state, action: PayloadAction<string>) {
            state.questionText = action.payload;
        },
        setOptions(state, action: PayloadAction<string[]>) {
            state.options = action.payload;
        },
        setCorrectAnswer(state, action: PayloadAction<string>) {
            state.correctAnswer = action.payload;
        },
        setSelectedAnswer(state, action: PayloadAction<string>) {
            state.selectedAnswer = action.payload;
        },
        setResult(state, action: PayloadAction<string>) {
            state.result = action.payload;
        },
        incrementQuestionsAsked(state) {
            state.questionsAsked += 1;
        },
        setScore(state, action: PayloadAction<number>) {
            state.score = action.payload;
        },
        setQuizFinished(state, action: PayloadAction<boolean>) {
            state.quizFinished = action.payload;
        },
        setShowResult(state, action: PayloadAction<boolean>) {
            state.showResult = action.payload;
        },
        setIsProcessing(state, action: PayloadAction<boolean>) {
            state.isProcessing = action.payload;
        },
        resetQuizState() {
            return { ...initialState };
        },
        addAskedQuestion(state, action: PayloadAction<string>) {
            state.askedQuestions.push(action.payload);
        },
        clearCurrentQuestion(state) {
            state.questionText = '';
            state.options = [];
            state.correctAnswer = '';
            state.selectedAnswer = '';
            state.result = '';
            state.showResult = false;
        },
    },
});

export const {
    setTopic,
    setQuestionText,
    setOptions,
    setCorrectAnswer,
    setSelectedAnswer,
    setResult,
    incrementQuestionsAsked,
    setScore,
    setQuizFinished,
    setShowResult,
    setIsProcessing,
    resetQuizState,
    addAskedQuestion,
    clearCurrentQuestion,
} = quizSlice.actions;

export const selectQuizState = (state: { quiz: QuizState }) => state.quiz;

export default quizSlice.reducer;