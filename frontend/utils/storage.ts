import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const STORAGE_KEYS = {
  USER_DATA: "@user_data",
  HEALTH_RECORDS: "@health_records",
  APPOINTMENTS: "@appointments",
  IS_LOGGED_IN: "@is_logged_in",
  USER_LOCATION: "@user_location",
};

// Save data
export const saveData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

// Get data
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting data:", error);
    return null;
  }
};

// Remove data
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing data:", error);
    return false;
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};

// User specific functions
export const saveUserData = async (userData: any) => {
  return await saveData(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = async () => {
  return await getData(STORAGE_KEYS.USER_DATA);
};

export const saveLoginStatus = async (status: boolean) => {
  return await saveData(STORAGE_KEYS.IS_LOGGED_IN, status);
};

export const getLoginStatus = async () => {
  return await getData(STORAGE_KEYS.IS_LOGGED_IN);
};

// Health records
export const saveHealthRecord = async (record: any) => {
  const records = (await getData(STORAGE_KEYS.HEALTH_RECORDS)) || [];
  records.unshift(record); // Add to beginning
  return await saveData(STORAGE_KEYS.HEALTH_RECORDS, records);
};

export const getHealthRecords = async () => {
  return (await getData(STORAGE_KEYS.HEALTH_RECORDS)) || [];
};

// Appointments
export const saveAppointment = async (appointment: any) => {
  const appointments = (await getData(STORAGE_KEYS.APPOINTMENTS)) || [];
  appointments.unshift(appointment);
  return await saveData(STORAGE_KEYS.APPOINTMENTS, appointments);
};

export const getAppointments = async () => {
  return (await getData(STORAGE_KEYS.APPOINTMENTS)) || [];
};

export const saveUserLocation = async (location: any) => {
  return await saveData(STORAGE_KEYS.USER_LOCATION, location);
};

export const getUserLocation = async () => {
  return await getData(STORAGE_KEYS.USER_LOCATION);
};
