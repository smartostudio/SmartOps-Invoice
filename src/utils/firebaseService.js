import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveInvoiceToDB = async (invoiceData) => {
  try {
    const docRef = await addDoc(collection(db, "invoices"), invoiceData);
    console.log("Invoice saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding invoice: ", e);
  }
};
