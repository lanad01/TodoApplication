import React, { useState, useEffect, Component } from 'react';
import {  View, Text, StyleSheet, Button, TextInput, TouchableOpacity, }  from 'react-native';
import Modal from 'react-native-modal';


<Modal
  isVisible={modalShow}
  avoidKeyboard={true}
  transparent={true}
  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <View>
    <TouchableOpacity onPress={pickOnePhoto} style={styles.choicebox}>
      <Text textAlign="center" style={styles.photochoose}>
        갤러리에서 사진 선택!
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={callCamera} style={styles.choicebox}>
      <Text style={styles.photochoose}>사진 촬영</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setModal(!modalShow)}
      style={styles.choicebox}>
      <Text textAlign="center" style={styles.photochoose}>
        나 가 기
      </Text>
    </TouchableOpacity>
  </View>
  <ErrorModal
    modalOn={errorModal}
    message="이름은 반드시 적어주셔야   합니다."
    modalOff={() => setErrorModal(false)}
  />
</Modal>;
