import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION = 'sarees';

export function subscribeSarees(callback, onError) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const sarees = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      callback(sarees);
    },
    onError
  );
}

export async function addSaree({ name, category, colors, price, imageFile }) {
  const timestamp = Date.now();
  const imagePath = `sarees/${timestamp}-${imageFile.name}`;
  const storageRef = ref(storage, imagePath);

  await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, COLLECTION), {
    name,
    category,
    colors,
    price: Number(price),
    imageUrl,
    imagePath,
    createdAt: serverTimestamp(),
  });
}

export async function deleteSaree(saree) {
  if (saree.imagePath) {
    try {
      await deleteObject(ref(storage, saree.imagePath));
    } catch {
      // File may already be deleted
    }
  }
  await deleteDoc(doc(db, COLLECTION, saree.id));
}

export function getUniqueCategories(sarees) {
  const cats = [...new Set(sarees.map((s) => s.category).filter(Boolean))];
  return cats.sort((a, b) => a.localeCompare(b));
}
