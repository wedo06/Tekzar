import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

// Read config from src/firebase/config.js
// Actually it's easier to just read the file and extract the config object
const configContent = fs.readFileSync('src/firebase/config.js', 'utf8');
const configMatch = configContent.match(/const firebaseConfig = ({[\s\S]*?});/);

if (configMatch) {
  // Use eval to safely parse the JS object literal (it's safe here as we control the file)
  const firebaseConfig = eval('(' + configMatch[1] + ')');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function check() {
    const cats = await getDocs(collection(db, 'categories'));
    console.log("Categories count:", cats.docs.length);
    cats.forEach(doc => console.log(doc.id, doc.data()));

    const prods = await getDocs(collection(db, 'products'));
    console.log("Products count:", prods.docs.length);
    prods.forEach(doc => console.log(doc.id, doc.data()));
    process.exit(0);
  }
  check().catch(console.error);
} else {
  console.error("Could not find firebaseConfig");
}
