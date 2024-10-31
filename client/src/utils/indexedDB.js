import { openDB } from 'idb';

export const openDatabase = async () => {
  return await openDB('my-database', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tokens')) {
        db.createObjectStore('tokens', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    },
  });
};

export const storeTokens = async (accessToken, refreshToken) => {
  const createdAt = new Date(); 
  const tokens = { id: 1, accessToken, refreshToken, createdAt}; 
  const db = await openDatabase();
  await db.put('tokens', tokens); 
};

export const getTokens = async () => {
  const db = await openDatabase();
  return await db.get('tokens', 1); }

export const clearTokens = async () => {
  const db = await openDatabase();
  await db.delete('tokens', 1);
};

export const storeUser = async (userData) => {
  const db = await openDatabase();
  const user = { id: 1, ...userData }; 
  await db.put('users', user); 
};

export const getUser = async () => {
  const db = await openDatabase();
  return await db.get('users', 1); 
};

export const clearUser = async () => {
  const db = await openDatabase();
  await db.delete('users', 1);
};
