import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOption,
  nextQuestion,
  previousQuestion,
} from '../store/slices/questionnaireSlice';
import {RootState} from '../store/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import Question from '../components/Question';
import {ScaledSheet} from 'react-native-size-matters';

type QuestionnaireScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Questionnaire'
>;

interface Props {
  navigation: QuestionnaireScreenNavigationProp;
}

const styles = ScaledSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '20@ms',
  },
  warningText: {
    color: 'red',
    marginTop: '10@ms',
  },
  warningTextContainer: {
    marginHorizontal: '20@ms',
  },
});

const QuestionnaireScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {questions, currentQuestionIndex} = useSelector(
    (state: RootState) => state.questionnaire,
  );
  const [showWarning, setShowWarning] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    dispatch(selectOption({questionId: currentQuestion.id, optionIndex}));
    setShowWarning(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion.selectedOption === null) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(nextQuestion());
      } else {
        navigation.navigate('Result');
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      dispatch(previousQuestion());
      setShowWarning(false);
    }
  };

  return (
    <View>
      <Question
        currentQuestion={currentQuestion}
        onAnswerPress={handleOptionSelect}
      />
      <View style={styles.warningTextContainer}>
        {showWarning && (
          <Text style={styles.warningText}>
            * Please select an option before proceeding.
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {currentQuestionIndex > 0 ? (
          <Button title={'Back'} onPress={handlePreviousQuestion} />
        ) : (
          <View />
        )}
        <View>
          <Text>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>
        <Button
          title={
            currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'
          }
          onPress={handleNextQuestion}
        />
      </View>
    </View>
  );
};

export default QuestionnaireScreen;
