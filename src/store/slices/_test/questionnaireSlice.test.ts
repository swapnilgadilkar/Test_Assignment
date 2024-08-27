import questionnaireReducer, {
  selectOption,
  nextQuestion,
  previousQuestion,
  resetQuestionnaire,
  calculateRiskProfile,
  initialState,
} from '../../slices/questionnaireSlice';

describe('Questionnaire Slice', () => {
  it('should handle initial state', () => {
    expect(questionnaireReducer(undefined, {type: 'unknown'})).toEqual(
      initialState,
    );
  });

  it('should handle selectOption', () => {
    const action = selectOption({questionId: 1, optionIndex: 0});
    const state = questionnaireReducer(initialState, action);
    expect(state.questions[0].selectedOption).toEqual(0);
  });

  it('should handle nextQuestion', () => {
    const action = nextQuestion();
    const state = questionnaireReducer(initialState, action);
    expect(state.currentQuestionIndex).toEqual(1);
  });

  it('should handle previousQuestion', () => {
    const initialStateWithCurrentQuestionIndexOne = {
      ...initialState,
      currentQuestionIndex: 1,
    };
    const action = previousQuestion();
    const state = questionnaireReducer(
      initialStateWithCurrentQuestionIndexOne,
      action,
    );
    expect(state.currentQuestionIndex).toEqual(0);
  });

  it('should handle resetQuestionnaire', () => {
    const action = resetQuestionnaire();
    const state = questionnaireReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should calculate risk profile correctly', () => {
    const state = {
      ...initialState,
      questions: [
        {
          id: 1,
          question: '',
          options: [{text: '', score: 1}],
          selectedOption: 0,
        },
        {
          id: 2,
          question: '',
          options: [{text: '', score: 1}],
          selectedOption: 0,
        },
        {
          id: 3,
          question: '',
          options: [{text: '', score: 1}],
          selectedOption: 0,
        },
      ],
    };
    const newState = questionnaireReducer(state, calculateRiskProfile());
    expect(newState.riskProfileScore).toEqual(3);
    expect(newState.riskCategory).toEqual('Low');
  });
});
