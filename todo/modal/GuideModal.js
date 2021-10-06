import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { styles } from '../screen/styles/taskListStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const GuideModal = () => {
  const [showModal, setShowModal] = useState(true);
  const offset = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  useEffect(() => {
    setInterval(() => {
        offset.value = withTiming(-250, { duration: 1500 }, isFinished => {
          offset.value = withTiming(0, {
            duration: 1500,
          });
        });
      }, 4000);
    setImmediate(() => {
        offset.value = withTiming(-250, { duration: 1500 }, isFinished => {
          offset.value = withTiming(0, {
            duration: 1500,
          });
        });
      });
      return () => {
      }
  }, [])
  

  const exitModal = () => {
    setShowModal(false);
  };
  return (
    <Modal isVisible={showModal} avoidKeyboard={true} transparent={true}>
      <View>
        <View
          style={styles.guideHeaderCont}>
          <Text
            style={styles.guideHeaderText}>
            [ 이용 가이드 ]
          </Text>
          <Text
            style={styles.guideText}>
            Task 삭제를 원하실 경우 {'\n'}
            해당 TASK를 아래와 같이 당겨주세요!
          </Text>
        </View>
        <Animated.View style={reanimatedStyle}>
          <Card style={styles.cardForGuide}>
            <View style={styles.taskCont}>
              <View style={styles.task1st}>
                <Text
                  style={styles.taskName}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  Having Lunch
                </Text>
                <Text style={styles.taskPrior}>[ Middle ]</Text>
              </View>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.taskExp}>2021년 12월 25일</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        <View style={styles.rowBackForGuide}>
          <Text style={styles.deleteBtnForGuide}> ＜＜＜Delete </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => exitModal()}>
        <View style={styles.guideModalBtn}>
          <Text style={styles.guideModalBtnText}>확인했습니다.</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
