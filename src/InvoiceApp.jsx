import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function InvoiceApp() {
  const [client, setClient] = useState('');
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }]);
  const [tax, setTax] = useState(0);
  const [note, setNote] = useState('');

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { desc: '', qty: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = total * (tax / 100);
  const grandTotal = total + taxAmount;

  const exportPDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow" id="invoice">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
        <div className="mb-4">
          <label className="block">Client Name:</label>
          <input
            className="border w-full p-2"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h2 className="font-bold mb-2">Items</h2>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
              <input
                className="border p-1 col-span-2"
                placeholder="Description"
                value={item.desc}
                onChange={(e) => handleChange(index, 'desc', e.target.value)}
              />
              <input
                type="number"
                className="border p-1"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) => handleChange(index, 'qty', parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="border p-1"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, 'price', parseFloat(e.target.value))}
              />
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={addItem} className="text-blue-600">+ Add Item</button>
        </div>
        <div className="mb-4">
          <label className="block">Tax %:</label>
          <input
            type="number"
            className="border w-full p-2"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block">Note:</label>
          <textarea
            className="border w-full p-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="text-right font-bold">
          Subtotal: R{total.toFixed(2)} <br />
          Tax: R{taxAmount.toFixed(2)} <br />
          Total: R{grandTotal.toFixed(2)}
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}

export default InvoiceApp;