import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../firebase/config';

const DOCUMENTS_COLLECTION = 'documents';

// Upload a file to Firebase Storage
export const uploadFile = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url: downloadURL,
          path: uploadTask.snapshot.ref.fullPath
        });
      }
    );
  });
};

// Add document metadata to Firestore
export const addDocument = async (documentData) => {
  try {
    const docRef = await addDoc(collection(db, DOCUMENTS_COLLECTION), {
      ...documentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Get all documents from Firestore
export const getDocuments = async () => {
  try {
    const q = query(
      collection(db, DOCUMENTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

// Delete a document and its file from Firebase
export const deleteDocument = async (documentId, filePath) => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, DOCUMENTS_COLLECTION, documentId));

    // Delete file from Storage
    if (filePath) {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Helper function to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Helper function to get file type from filename
export const getFileType = (filename) => {
  const extension = filename.split('.').pop().toUpperCase();
  if (extension === 'PDF') return 'PDF';
  if (['DOC', 'DOCX'].includes(extension)) return 'DOCX';
  return extension;
};
