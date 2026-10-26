import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Explore Upcoming and Nearby Events',
    description: 'In publishing and graphic design, Lorem is a placeholder text commonly used to demonstrate.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Web Have Modern Events Calendar Feature',
    description: 'In publishing and graphic design, Lorem is a placeholder text commonly used to demonstrate.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'To Look Up More Events or Activities Nearby By Map',
    description: 'In publishing and graphic design, Lorem is a placeholder text commonly used to demonstrate.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
  },
];

export const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { completeOnboarding } = useContext(AuthContext);

  const handleNext = async () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await finishOnboarding();
    }
  };

  const handleSkip = async () => {
    await finishOnboarding();
  };

  const finishOnboarding = async () => {
    await completeOnboarding();
    navigation.replace('SignIn');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.bottomCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.footerRow}>
                <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                <View style={styles.dotsRow}>
                  {SLIDES.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index ? styles.dotActive : styles.dotInactive,
                      ]}
                    />
                  ))}
                </View>

                <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
                  <Text style={styles.nextText}>
                    {currentIndex === SLIDES.length - 1 ? 'Start' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slide: {
    width,
    height: '100%',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: height * 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  bottomCard: {
    height: height * 0.45,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 36,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  skipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.white,
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  nextBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nextText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
