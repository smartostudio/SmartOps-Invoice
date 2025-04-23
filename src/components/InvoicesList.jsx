import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function InvoicesList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(fetched);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">📜 Saved Invoices</h2>
      {invoices.map(inv => (
        <div key={inv.id} className="border p-4 mb-2">
          <p><strong>Client:</strong> {inv.clientName}</p>
          <p><strong>Total:</strong> R{inv.total}</p>
          <p><strong>Notes:</strong> {inv.notes}</p>
          <p><strong>Date:</strong> {new Date(inv.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default InvoicesList;
