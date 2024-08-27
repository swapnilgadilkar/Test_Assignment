import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import palette from '../theme/palete';
import {GLOBAL_STYLES} from '../theme/gstyles';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  answerItem: {
    marginVertical: '6@ms',
    marginHorizontal: '16@ms',
    padding: '6@ms',
    borderRadius: '4@ms',
    backgroundColor: palette.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    ...GLOBAL_STYLES.shadow,
  },
  otherActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    paddingVertical: '6@ms',
    paddingHorizontal: '16@ms',
    borderBottomRightRadius: '4@ms',
    borderBottomLeftRadius: '4@ms',
  },
  answersListing: {
    marginVertical: '8@ms',
  },
  container: {
    margin: '10@vs',
    borderRadius: '6@ms',
    backgroundColor: palette.white,
    ...GLOBAL_STYLES.shadow,
  },
  answerLabel: {
    fontSize: '15@ms',
    fontWeight: '600',
  },
  questionLabel: {
    marginTop: '12@ms',
    marginBottom: '8@ms',
    marginHorizontal: '16@ms',
    color: palette.questionGrey,
    fontSize: '16@ms',
    fontWeight: '900',
  },
});

interface QuestionProps {
  currentQuestion: Question;
  onAnswerPress: (val: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  selectedOption: number | null;
}
interface Option {
  text: string;
  score: number;
}

const Question: React.FC<QuestionProps> = ({
  currentQuestion,
  onAnswerPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>{currentQuestion?.question}</Text>
      <FlatList
        data={currentQuestion?.options}
        style={styles.answersListing}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.answerItem,
              index === currentQuestion?.selectedOption && {
                backgroundColor: palette.sun_yellow,
              },
            ]}
            onPress={() => {
              onAnswerPress(index);
            }}>
            <Text style={[styles.answerLabel]}>{item?.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item?.score.toString()}
        extraData={currentQuestion?.options}
      />
    </View>
  );
};

export default Question;
