import {setupStore} from '../../store/store';
import {initialState} from '../slices/questionnaireSlice';

describe('Redux Store', () => {
  it('should configure store with questionnaire slice', () => {
    const store = setupStore();
    const state = store.getState();
    expect(state.questionnaire).toEqual(initialState);
    expect(store.getState().questionnaire).toEqual(initialState);
  });
});
