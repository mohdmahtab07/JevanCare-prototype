// App configuration
export const APP_CONFIG = {
  appName: "JeevanCare",
  version: "1.0.0",

  // Gemini AI Configuration
  geminiApiKey: "YOUR_GEMINI_API_KEY", // We'll add this later

  // Dummy OTP for prototype
  dummyOTP: "123456",

  // App settings
  otpLength: 6,
  otpTimer: 30, // seconds

  // Consultation fees
  defaultConsultationFee: 500,
  videoConsultationFee: 400,

  // Appointment slots
  slotDuration: 30, // minutes
};

// Make sure this is at the bottom
export default APP_CONFIG;
