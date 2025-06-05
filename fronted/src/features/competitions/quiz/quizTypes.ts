export interface NotificationState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

export interface QuizState {
    topic: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    selectedAnswer: string;
    result: string;
    questionsAsked: number;
    score: number;
    quizFinished: boolean;
    askedQuestions: string[];
    showResult: boolean;
    isProcessing: boolean;
}