import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import fs from 'fs';
import { categories as defaultCategories, featuredProducts } from './src/data/products.jsx';

// Read config
const configContent = fs.readFileSync('src/firebase/config.js', 'utf8');
const configMatch = configContent.match(/const firebaseConfig = ({[\s\S]*?});/);

if (configMatch) {
  const firebaseConfig = eval('(' + configMatch[1] + ')');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function fix() {
    console.log("Deleting old data...");
    const cats = await getDocs(collection(db, 'categories'));
    for (let d of cats.docs) await deleteDoc(d.ref);

    const prods = await getDocs(collection(db, 'products'));
    for (let d of prods.docs) await deleteDoc(d.ref);

    console.log("Importing new data...");
    for (const cat of defaultCategories) {
      const { id, icon, image, count, subCategories, ...rest } = cat;
      await addDoc(collection(db, 'categories'), { 
        ...rest, 
        imageUrl: image || '', 
        subCategories: subCategories ? subCategories.map(s => ({ name: s.name || s, imageUrl: s.image || '' })) : [] 
      });
    }
    for (const prod of featuredProducts) {
      const { id, image, price, ...rest } = prod;
      await addDoc(collection(db, 'products'), { 
        ...rest, 
        imageUrl: image || '',
        category: prod.category || 'General'
      });
    }
    console.log("Done!");
    process.exit(0);
  }
  fix().catch(console.error);
}
