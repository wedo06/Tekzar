import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';
import fs from 'fs';

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
    console.log("Deleted old data successfully!");
    process.exit(0);
  }
  fix().catch(console.error);
}
