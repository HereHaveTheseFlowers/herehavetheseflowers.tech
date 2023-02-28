import store from '../utils/Store';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import type { Firestore, DocumentData } from 'firebase/firestore/lite';
import type { FirebaseApp } from 'firebase/app';
import type { BlockProps } from '../components/BlockGrid';

const firebaseConfig = {
    apiKey: "AIzaSyAJsmH1fEop_sRciw988ElrUGJnJJMgmiY",
    authDomain: "herehavetheseflowers-com.firebaseapp.com",
    projectId: "herehavetheseflowers-com",
    storageBucket: "herehavetheseflowers-com.appspot.com",
    messagingSenderId: "735041852606",
    appId: "1:735041852606:web:90ce2f1bf8a31f71fafaef",
    measurementId: "G-W3034DRKZQ"
};

export class firestoreController {
    private readonly app: FirebaseApp;
    private readonly db: Firestore;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.updateBlocks();
    }
    public async updateBlocks(lang?: string) {
        const blocks = await this.getBlocks(lang);
        if(blocks) store.set("blocks", blocks);
    }
    private async getBlocks(lang?: string) {
        const collectionName = lang === 'ru' ? 'ru_blocks' : 'blocks'
        const blocksCol = collection(this.db, collectionName);
        const blocksSnapshot = await getDocs(blocksCol);
        const blocksArr: DocumentData[] = [];
        blocksSnapshot.docs.map(doc => {
            const data = doc.data();
            blocksArr.push(data);
        });
        return blocksArr;
    }
    public async writeBlock(props: BlockProps) {
        try {
            const docRef = await addDoc(collection(this.db, "blocks"), {
              ...props
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

const controller = new firestoreController();

// @ts-ignore REMOVE THIS ON PROD
window.firestoreController = controller

export default controller;