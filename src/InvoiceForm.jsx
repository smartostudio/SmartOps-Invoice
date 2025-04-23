import { saveInvoiceToDB } from '../utils/firebaseService';

const handleSaveToFirebase = () => {
  const invoiceData = {
    clientName,
    items,
    total,
    notes,
    date: new Date().toISOString()
  };
  saveInvoiceToDB(invoiceData);
};

<button
  className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
  onClick={handleSaveToFirebase}
>
  Save to Firebase
</button>
