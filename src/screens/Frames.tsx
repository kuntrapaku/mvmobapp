import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: '2',
    url: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: '3',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const Frames = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const navigation = useNavigation();

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search" size={26} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Video
            source={{ uri: item.url }}
            style={styles.video}
            resizeMode="cover"
            repeat
            paused={true} // 🔴 No autoplay
            muted
            controls // user must press play
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 80 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: height,
  },
  topBar: {
    position: 'absolute',
    top: 40,
    zIndex: 10,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Frames;
