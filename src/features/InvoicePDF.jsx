import { jsPDF } from "jspdf";
import "jspdf-autotable";

const InvoicePDF = ({ invoiceInfoHeaderData, invoiceItemsTableData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set font size
    doc.setFontSize(12);

    // Function to split text into lines based on a maximum width
    const splitTextIntoLines = (text, maxWidth) => {
      return doc.splitTextToSize(text, maxWidth);
    };

    // Define maximum width and starting Y position
    const maxWidth = doc.internal.pageSize.getWidth() / 2 - 30;
    const startY = 40;

    // Helper function to draw bold text
    const drawBoldText = (text, x, y) => {
      doc.setFont("helvetica", "bold");
      doc.text(text, x, y);
      doc.setFont("helvetica", "normal"); // Reset to normal font after drawing
    };

    let currentY = startY;

    // Add seller details
    const sellerNameLines = splitTextIntoLines(`Sold by:\n${invoiceInfoHeaderData.sellerName}`, maxWidth);
    const sellerAddressLines = splitTextIntoLines(invoiceInfoHeaderData.sellerAddress, maxWidth);
    const sellerPanLines = splitTextIntoLines(`PAN No: ${invoiceInfoHeaderData.sellerPan}`, maxWidth);
    const sellerGstLines = splitTextIntoLines(`GST Registration No: ${invoiceInfoHeaderData.sellerGst}`, maxWidth);

    sellerNameLines.forEach(line => {
      drawBoldText(line, 20, currentY);
      currentY += 5;
    });
    sellerAddressLines.forEach(line => {
      doc.text(line, 20, currentY);
      currentY += 5;
    });
    sellerPanLines.forEach(line => {
      drawBoldText(line, 20, currentY);
      currentY += 5;
    });
    sellerGstLines.forEach(line => {
      drawBoldText(line, 20, currentY);
      currentY += 5;
    });

    // Add billing address details
    const billingNameLines = splitTextIntoLines(invoiceInfoHeaderData.billingName, maxWidth);
    const billingAddressLines = splitTextIntoLines(invoiceInfoHeaderData.billingAddress, maxWidth);
    const billingStateCodeText = `State/UT Code: ${invoiceInfoHeaderData.stateCode}`;
    const billingStateCodeLines = splitTextIntoLines(billingStateCodeText, maxWidth);

    const startX = doc.internal.pageSize.getWidth() - 20;
    currentY = startY;

    drawBoldText('Billing Address:', startX - doc.getTextWidth('Billing Address:'), currentY);
    currentY += 5;

    billingNameLines.forEach(line => {
      doc.text(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    billingAddressLines.forEach(line => {
      doc.text(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    billingStateCodeLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });

    // Add shipping address details
    const shippingNameLines = splitTextIntoLines(invoiceInfoHeaderData.shippingName, maxWidth);
    const shippingAddressLines = splitTextIntoLines(invoiceInfoHeaderData.shippingAddress, maxWidth);
    const shippingStateCodeText = `State/UT Code: ${invoiceInfoHeaderData.stateCode}`;
    const shippingStateCodeLines = splitTextIntoLines(shippingStateCodeText, maxWidth);
    const placeOfSupplyText = `Place of Supply: ${invoiceInfoHeaderData.supplyAddress}`;
    const placeOfSupplyLines = splitTextIntoLines(placeOfSupplyText, maxWidth);
    const placeOfDeliveryText = `Place of Delivery: ${invoiceInfoHeaderData.deliveryAddress}`;
    const placeOfDeliveryLines = splitTextIntoLines(placeOfDeliveryText, maxWidth);
    const invoiceNumberText = `Invoice Number: ${invoiceInfoHeaderData.invoiceNumber}`;
    const invoiceNumberLines = splitTextIntoLines(invoiceNumberText, maxWidth);
    const invoiceDetailsText = `Invoice Details: ${invoiceInfoHeaderData.invoiceDetails}`;
    const invoiceDetailsLines = splitTextIntoLines(invoiceDetailsText, maxWidth);
    const invoiceDateText = `Invoice Date: ${invoiceInfoHeaderData.invoiceDate}`;
    const invoiceDateLines = splitTextIntoLines(invoiceDateText, maxWidth);

    currentY = 70;

    drawBoldText('Shipping Address:', startX - doc.getTextWidth('Shipping Address:'), currentY);
    currentY += 5;

    shippingNameLines.forEach(line => {
      doc.text(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    shippingAddressLines.forEach(line => {
      doc.text(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    shippingStateCodeLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    placeOfSupplyLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    placeOfDeliveryLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    invoiceNumberLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    invoiceDetailsLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });
    invoiceDateLines.forEach(line => {
      drawBoldText(line, startX - doc.getTextWidth(line), currentY);
      currentY += 5;
    });

    // Define columns
    const columns = [
      { header: "Sr No.", dataKey: "srno" },
      { header: "Description", dataKey: "itemDescription" },
      { header: "Unit Price", dataKey: "unitprice" },
      { header: "Discount", dataKey: "discountprice" },
      { header: "Qty", dataKey: "quantity" },
      { header: "Net Amount", dataKey: "netprice" },
      { header: "Tax Rate", dataKey: "taxrate" },
      { header: "Tax Type", dataKey: "taxtype" },
      { header: "Tax Amount", dataKey: "taxamount" },
      { header: "Total Amount", dataKey: "totalamount" },
    ];

    // Define rows
    const rows = invoiceItemsTableData.map((item) => ({
      srno: item.srno,
      itemDescription: item.itemDescription,
      unitprice: item.unitprice,
      discountprice: item.discountprice,
      quantity: item.quantity,
      netprice: item.netprice,
      taxrate: item.taxrate,
      taxtype: item.taxtype,
      taxamount: item.taxamount,
      totalamount: item.totalamount,
      total: item.totalamount
    }));

    // Create the table using jspdf-autotable
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: currentY + 20, // Adjust this as needed
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineWidth: 0.1, // 1px border width
        lineColor: [0, 0, 0], // Black border color
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 60 },
        2: { cellWidth: 15 },
        3: { cellWidth: 17 },
        4: { cellWidth: 10 },
        5: { cellWidth: 20 },
        6: { cellWidth: 12 },
        7: { cellWidth: 15 },
        8: { cellWidth: 20 },
        9: { cellWidth: 20 },
      },
      margin: { left: 10, right: 10 },
    });

    doc.save(`${invoiceInfoHeaderData.invoiceNumber}.pdf`);
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={generatePDF} className="btn btn-primary">
        Generate PDF
      </button>
    </div>
  );
};

export default InvoicePDF;








