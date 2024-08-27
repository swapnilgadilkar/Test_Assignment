import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Question from '../../components/Question';

const mockQuestion = {
  id: 1,
  question: 'How would you describe your investment knowledge?',
  options: [
    {text: 'Novice', score: 1},
    {text: 'Intermediate', score: 2},
    {text: 'Advanced', score: 3},
  ],
  selectedOption: null,
};

describe('Question Component', () => {
  it('renders question and options correctly', () => {
    const {getByText} = render(
      <Question currentQuestion={mockQuestion} onAnswerPress={() => {}} />,
    );
    expect(
      getByText('How would you describe your investment knowledge?'),
    ).toBeTruthy();
    expect(getByText('Novice')).toBeTruthy();
    expect(getByText('Intermediate')).toBeTruthy();
    expect(getByText('Advanced')).toBeTruthy();
  });

  it('calls onAnswerPress with correct index when an option is selected', () => {
    const onAnswerPress = jest.fn();
    const {getByText} = render(
      <Question currentQuestion={mockQuestion} onAnswerPress={onAnswerPress} />,
    );
    fireEvent.press(getByText('Novice'));
    expect(onAnswerPress).toHaveBeenCalledWith(0);
  });
});
