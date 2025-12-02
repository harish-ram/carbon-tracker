import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { EmissionRecord } from '@/types';

/**
 * Add a new emission record to Firestore
 */
export const addEmissionRecord = async (userId: string, record: Omit<EmissionRecord, 'id' | 'timestamp'>): Promise<string> => {
  try {
    const recordsRef = collection(db, 'users', userId, 'records');
    const docRef = await addDoc(recordsRef, {
      ...record,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add record');
  }
};

/**
 * Update an existing emission record in Firestore
 */
export const updateEmissionRecord = async (userId: string, recordId: string, updates: Partial<EmissionRecord>): Promise<void> => {
  try {
    const recordRef = doc(db, 'users', userId, 'records', recordId);
    await updateDoc(recordRef, updates);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update record');
  }
};

/**
 * Delete an emission record from Firestore
 */
export const deleteEmissionRecord = async (userId: string, recordId: string): Promise<void> => {
  try {
    const recordRef = doc(db, 'users', userId, 'records', recordId);
    await deleteDoc(recordRef);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete record');
  }
};

/**
 * Get all emission records for a user from Firestore
 */
export const getUserEmissionRecords = async (userId: string): Promise<EmissionRecord[]> => {
  try {
    const recordsRef = collection(db, 'users', userId, 'records');
    const q = query(recordsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString(),
    })) as EmissionRecord[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch records');
  }
};

/**
 * Get emission records filtered by date range
 */
export const getRecordsByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<EmissionRecord[]> => {
  try {
    const recordsRef = collection(db, 'users', userId, 'records');
    const q = query(
      recordsRef,
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      where('timestamp', '<=', Timestamp.fromDate(endDate)),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString(),
    })) as EmissionRecord[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch records by date range');
  }
};

/**
 * Get emission records filtered by category
 */
export const getRecordsByCategory = async (
  userId: string,
  category: string
): Promise<EmissionRecord[]> => {
  try {
    const recordsRef = collection(db, 'users', userId, 'records');
    const q = query(
      recordsRef,
      where('category', '==', category),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString(),
    })) as EmissionRecord[];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch records by category');
  }
};
