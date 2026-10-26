import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../constants/colors';

export const ShareModal = ({ visible, onClose, eventTitle = 'Event' }) => {
  const shareUrl = `https://eventhub.app/events/${encodeURIComponent(eventTitle)}`;

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(shareUrl);
      Alert.alert('Link Copied!', `Event link copied to clipboard:\n${shareUrl}`);
      onClose();
    } catch (e) {
      Alert.alert('Error', 'Failed to copy link.');
    }
  };

  const handleSocialClick = (platform) => {
    Alert.alert('Share Event', `Sharing "${eventTitle}" via ${platform}...`);
    onClose();
  };

  const options = [
    {
      id: 'copy',
      name: 'Copy Link',
      icon: <Ionicons name="link-outline" size={24} color="#5566FF" />,
      bgColor: '#EAEAFF',
      action: handleCopyLink,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FontAwesome name="whatsapp" size={24} color="#25D366" />,
      bgColor: '#E8F9F0',
      action: () => handleSocialClick('WhatsApp'),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FontAwesome name="facebook" size={24} color="#1877F2" />,
      bgColor: '#E7F1FF',
      action: () => handleSocialClick('Facebook'),
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: <MaterialCommunityIcons name="facebook-messenger" size={24} color="#0084FF" />,
      bgColor: '#E6F3FF',
      action: () => handleSocialClick('Messenger'),
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <FontAwesome name="twitter" size={24} color="#1DA1F2" />,
      bgColor: '#E7F5FF',
      action: () => handleSocialClick('Twitter'),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FontAwesome name="instagram" size={24} color="#E4405F" />,
      bgColor: '#FCEAEF',
      action: () => handleSocialClick('Instagram'),
    },
    {
      id: 'skype',
      name: 'Skype',
      icon: <FontAwesome name="skype" size={24} color="#00AFF0" />,
      bgColor: '#E5F7FD',
      action: () => handleSocialClick('Skype'),
    },
    {
      id: 'message',
      name: 'Message',
      icon: <Ionicons name="chatbubble-ellipses-outline" size={24} color="#34C759" />,
      bgColor: '#EAFAF0',
      action: () => handleSocialClick('Message'),
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.contentContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.indicator} />
          
          <Text style={styles.title}>Share with friends</Text>

          <View style={styles.gridContainer}>
            {options.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem} onPress={item.action}>
                <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  cancelButton: {
    height: 48,
    backgroundColor: '#F5F5F9',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
});
