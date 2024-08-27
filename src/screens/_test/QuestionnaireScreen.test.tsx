import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {setupStore} from '../../store/store';
import QuestionnaireScreen from '../../screens/QuestionnaireScreen';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<Provider store={setupStore()}>{component}</Provider>);
};

describe('QuestionnaireScreen', () => {
  it('renders correctly', () => {
    const {getByText} = renderWithProviders(
      <QuestionnaireScreen navigation={undefined as any} />,
    );
    expect(
      getByText('How would you describe your investment knowledge?'),
    ).toBeTruthy();
  });

  it('shows warning when no option is selected and "Next" is pressed', () => {
    const {getByText} = renderWithProviders(
      <QuestionnaireScreen navigation={undefined as any} />,
    );
    fireEvent.press(getByText('Next'));
    expect(
      getByText('* Please select an option before proceeding.'),
    ).toBeTruthy();
  });

  it('navigates to the next question on selecting an option and pressing "Next"', () => {
    const {getByText} = renderWithProviders(
      <QuestionnaireScreen navigation={undefined as any} />,
    );
    fireEvent.press(getByText('Novice'));
    fireEvent.press(getByText('Next'));
    expect(
      getByText('What is your primary investment objective?'),
    ).toBeTruthy();
  });
});
