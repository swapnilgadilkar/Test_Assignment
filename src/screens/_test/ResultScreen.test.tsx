import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {setupStore} from '../../store/store';
import ResultScreen from '../../screens/ResultScreen';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<Provider store={setupStore()}>{component}</Provider>);
};

describe('ResultScreen', () => {
  it('renders risk profile score and category correctly', () => {
    const {getByText} = renderWithProviders(
      <ResultScreen navigation={undefined as any} />,
    );
    expect(getByText('Your Risk Profile Score: 6')).toBeTruthy();
    expect(getByText('Risk Category: Medium')).toBeTruthy();
  });

  it('restarts the questionnaire when "Restart" button is pressed', () => {
    const navigate = jest.fn();
    const {getByText} = renderWithProviders(
      <ResultScreen navigation={{navigate: navigate}} />,
    );
    fireEvent.press(getByText('Restart'));
  });
});
