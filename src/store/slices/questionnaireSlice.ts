import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  selectedOption: number | null;
}

interface QuestionnaireState {
  questions: Question[];
  currentQuestionIndex: number;
  riskProfileScore: number;
  riskCategory: string;
}
// Score Range
enum SCORE {
  LOW = 8,
  MEDIUM = 14,
}

export const initialState: QuestionnaireState = {
  questions: [
    {
      id: 1,
      question: 'How would you describe your investment knowledge?',
      options: [
        {text: 'Novice', score: 1},
        {text: 'Intermediate', score: 2},
        {text: 'Advanced', score: 3},
      ],
      selectedOption: null,
    },
    {
      id: 2,
      question: 'What is your primary investment objective?',
      options: [
        {text: 'Capital preservation', score: 1},
        {text: 'Income generation', score: 2},
        {text: 'Balanced growth', score: 3},
        {text: 'Aggressive growth', score: 4},
      ],
      selectedOption: null,
    },
    {
      id: 3,
      question:
        'How would you react if your investment dropped by 10% in a month?',
      options: [
        {text: 'Sell all investments immediately', score: 1},
        {text: 'Sell some investments', score: 2},
        {text: 'Hold and wait for recovery', score: 3},
        {text: 'Buy more to lower the average cost', score: 4},
      ],
      selectedOption: null,
    },
    {
      id: 4,
      question:
        'How much of your savings do you want to invest in high-risk investments?',
      options: [
        {text: 'Less than 10%', score: 1},
        {text: '10% - 25%', score: 2},
        {text: '25% - 50%', score: 3},
        {text: 'More than 50%', score: 4},
      ],
      selectedOption: null,
    },
    {
      id: 5,
      question: 'What is your investment time horizon?',
      options: [
        {text: 'Less than 1 year', score: 1},
        {text: '1-3 years', score: 2},
        {text: '3-5 years', score: 3},
        {text: 'More than 5 years', score: 4},
      ],
      selectedOption: null,
    },
    {
      id: 6,
      question:
        'How familiar are you with different types of investment products?',
      options: [
        {text: 'Not familiar at all', score: 1},
        {text: 'Somewhat familiar', score: 2},
        {text: 'Familiar', score: 3},
        {text: 'Very familiar', score: 4},
      ],
      selectedOption: null,
    },
  ],
  currentQuestionIndex: 0,
  riskProfileScore: 0,
  riskCategory: '',
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    selectOption: (
      state,
      action: PayloadAction<{questionId: number; optionIndex: number}>,
    ) => {
      const {questionId, optionIndex} = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.selectedOption = optionIndex;
      }
    },
    calculateRiskProfile: state => {
      const totalScore = state.questions.reduce((acc, question) => {
        const selectedOption = question.options[question.selectedOption || 0];
        return acc + (selectedOption ? selectedOption.score : 0);
      }, 0);
      state.riskProfileScore = totalScore;
      if (totalScore <= SCORE.LOW) {
        state.riskCategory = 'Low';
      } else if (totalScore <= SCORE.MEDIUM) {
        state.riskCategory = 'Medium';
      } else {
        state.riskCategory = 'High';
      }
    },
    nextQuestion: state => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: state => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    resetQuestionnaire: state => {
      state.questions.forEach(question => (question.selectedOption = null));
      state.currentQuestionIndex = 0;
      state.riskProfileScore = 0;
      state.riskCategory = '';
    },
  },
});

export const {
  selectOption,
  calculateRiskProfile,
  nextQuestion,
  previousQuestion,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
