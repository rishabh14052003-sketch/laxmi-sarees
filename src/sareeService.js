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

export const MOCK_SAREES = [
  {
    id: 'mock-1',
    name: 'Pure Kanjivaram Silk Saree',
    category: 'Kanjivaram Silk',
    colors: ['Royal Blue', 'Gold Zari'],
    price: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mock-2',
    name: 'Classic Banarasi Brocade Saree',
    category: 'Banarasi',
    colors: ['Crimson Red', 'Gold'],
    price: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mock-3',
    name: 'Pastel Chiffon Georgette Saree',
    category: 'Chiffon & Georgette',
    colors: ['Blush Pink', 'Silver Motif'],
    price: 4800,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mock-4',
    name: 'Handloom Tussar Silk Saree',
    category: 'Cotton Handloom',
    colors: ['Mustard Yellow', 'Maroon Border'],
    price: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mock-5',
    name: 'Bridal Heritage Heavy Kanjivaram',
    category: 'Bridal Collection',
    colors: ['Deep Ruby Red', 'Antique Gold'],
    price: 28000,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mock-6',
    name: 'Organza Embroidered Designer Saree',
    category: 'Designer Sarees',
    colors: ['Lavender', 'Gold Threadwork'],
    price: 6500,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
];

export function subscribeSarees(callback, onError) {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const sarees = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        if (sarees.length === 0) {
          callback(MOCK_SAREES);
        } else {
          callback(sarees);
        }
      },
      (err) => {
        console.warn('Firestore subscription notice, rendering sample sarees:', err);
        callback(MOCK_SAREES);
      }
    );
  } catch (err) {
    console.warn('Firestore query notice, rendering sample sarees:', err);
    callback(MOCK_SAREES);
    return () => {};
  }
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
