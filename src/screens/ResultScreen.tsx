import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  calculateRiskProfile,
  resetQuestionnaire,
} from '../store/slices/questionnaireSlice';
import {RootState} from '../store/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ScaledSheet} from 'react-native-size-matters';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

interface Props {
  navigation: ResultScreenNavigationProp;
}

const ResultScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {riskProfileScore, riskCategory} = useSelector(
    (state: RootState) => state.questionnaire,
  );

  useEffect(() => {
    dispatch(calculateRiskProfile());
  }, [dispatch]);

  const handleRestart = () => {
    dispatch(resetQuestionnaire());
    navigation.navigate('Questionnaire');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          Your Risk Profile Score: {riskProfileScore}
        </Text>
        <Text style={styles.textStyle}>Risk Category: {riskCategory}</Text>
      </View>
      <Button title="Restart" onPress={handleRestart} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  textContainer: {marginVertical: '12@ms'},
  textStyle: {fontWeight: 'bold'},
});

export default ResultScreen;
