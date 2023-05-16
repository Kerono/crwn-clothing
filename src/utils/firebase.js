import { initializeApp} from "firebase/app"
import {
	getAuth, 
	signInWithRedirect, 
	signInWithPopup, 
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth"
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCKGHkDcWyC38RJP8XqHQ6WtXIhNY19dmI",
	authDomain: "crown-clothing-4a48e.firebaseapp.com",
	projectId: "crown-clothing-4a48e",
	storageBucket: "crown-clothing-4a48e.appspot.com",
	messagingSenderId: "930232019835",
	appId: "1:930232019835:web:2504f35c63d1cf6b3b2bde"
 };
 // Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const addColectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object)
	})
	await batch.commit();
	console.log("done")
}

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories")
	const q = query(collectionRef)
	
	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items
		return acc
	}, {})
	
	return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
	
	if (!userAuth) return 
	
	const userDocRef = doc(db, "users", userAuth.uid )
	const userSnapshot= await getDoc(userDocRef)
	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			})
		} catch (error) {
			console.log("Error create user", error.message)
		}
	}
	
	return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async(email, password) => {
	if (!email || !password) return ;
	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
	if (!email || !password) return ;
	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
