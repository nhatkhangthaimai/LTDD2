import { storageService } from '../storage/storageService';
import { CURRENT_USER } from '../data/users';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const authService = {
  async login(email, password, rememberMe = true) {
    await delay(500);
    if (!email || !password) {
      throw new Error('Please fill in both email and password.');
    }
    
    // Check registered users in storage
    const registered = await storageService.getRegisteredUsers();
    const foundUser = registered.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    let userToSession;
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      userToSession = userWithoutPassword;
    } else if (email.toLowerCase() === 'abc@email.com' || email.toLowerCase() === CURRENT_USER.email.toLowerCase()) {
      userToSession = CURRENT_USER;
    } else {
      // Default fallback demo user for any non-registered valid input
      userToSession = {
        ...CURRENT_USER,
        email: email.toLowerCase(),
        fullName: email.split('@')[0].toUpperCase(),
      };
    }

    if (rememberMe) {
      await storageService.saveUserSession(userToSession);
    }
    return userToSession;
  },

  async register(fullName, email, password) {
    await delay(500);
    if (!fullName || !email || !password) {
      throw new Error('All fields are required.');
    }

    const registered = await storageService.getRegisteredUsers();
    const exists = registered.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('Email is already registered. Please sign in.');
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      fullName,
      email: email.toLowerCase(),
      password,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      followers: 0,
      following: 0,
      about: 'EventHub enthusiast and passionate community member.',
      interests: ['Concert', 'Music', 'Food'],
      location: 'New York, USA',
      phone: '+1 202 555 0100',
    };

    await storageService.saveRegisteredUser(newUser);
    return newUser;
  },

  async verifyOTP(otpCode) {
    await delay(400);
    if (!otpCode || otpCode.length < 4) {
      throw new Error('Please enter a valid 4-digit code.');
    }
    if (otpCode !== '2222' && otpCode !== '1234' && otpCode !== '4444') {
      // Allow any 4-digit code in demo if not strictly matching mock code, or accept 4444
      // We will allow all 4-digit numeric entries for smooth demo!
    }
    return { success: true, message: 'Verification successful!' };
  },

  async resetPassword(email, newPassword) {
    await delay(500);
    if (!email || !newPassword) {
      throw new Error('Email and new password are required.');
    }
    const registered = await storageService.getRegisteredUsers();
    const user = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.password = newPassword;
      await storageService.saveRegisteredUser(user);
    }
    return { success: true, message: 'Password updated successfully!' };
  },

  async logout() {
    await delay(200);
    await storageService.clearUserSession();
    return true;
  },

  async getCurrentSession() {
    return await storageService.getUserSession();
  },
};
