// Create and Download PDF file
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const InvoicePDF = ({ invoiceInfoHeaderData, invoiceItemsTableData }) => {
  const timeStamp = new Date().toISOString();

  const generatePDF = () => {
    // if (
    //   !invoiceInfoHeaderData.companyName ||
    //   !invoiceInfoHeaderData.invoiceNumber
    // ) {
    //   alert("Company Name and Invoice Number are required to generate the PDF.");
    //   return;
    // }
    const doc = new jsPDF();

    // Set font size
    doc.setFontSize(12);

    // Add content to this pdf document
    //seller details
    // doc.text("Tax Invoice/Bill of Supply/Cash Memo", 50, 50);
    doc.text(`Sold by:\n ${invoiceInfoHeaderData.sellerName}`, 20, 40);
    doc.text(`${invoiceInfoHeaderData.sellerAddress}`, 20, 50);
    doc.text(`PAN No: ${invoiceInfoHeaderData.sellerPan}`, 20, 60);
    doc.text(`GST Registration No: ${invoiceInfoHeaderData.sellerGst}`, 20, 65);

    // Calculate the width of the text segments
    const billingNameWidth = doc.getTextWidth(invoiceInfoHeaderData.billingName);
    const billingAddressWidth = doc.getTextWidth(invoiceInfoHeaderData.billingAddress);
    const stateCodeText = `State/UT Code: ${invoiceInfoHeaderData.stateCode}`;
    const stateCodeWidth = doc.getTextWidth(stateCodeText);

    // Set the starting position from the right
    const startX = doc.internal.pageSize.getWidth() - 20; // 20 is the margin from the right
    const startY = 40;

    // Draw the text from right to left for billing address
    doc.text('Billing Address:', startX - doc.getTextWidth('Billing Address:'), startY);
    doc.text(invoiceInfoHeaderData.billingName, startX - billingNameWidth, startY + 5);
    doc.text(invoiceInfoHeaderData.billingAddress, startX - billingAddressWidth, startY + 10);
    doc.text(stateCodeText, startX - stateCodeWidth, startY + 15);

    // Calculate the width of the text segments for shipping address
    const shippingNameWidth = doc.getTextWidth(invoiceInfoHeaderData.shippingName);
    const shippingAddressWidth = doc.getTextWidth(invoiceInfoHeaderData.shippingAddress);
    const shippingStateCodeText = `State/UT Code: ${invoiceInfoHeaderData.stateCode}`;
    const shippingStateCodeWidth = doc.getTextWidth(shippingStateCodeText);
    const placeOfSupplyText = `Place of Supply ${invoiceInfoHeaderData.supplyAddress}`;
    const placeOfSupplyWidth = doc.getTextWidth(placeOfSupplyText);
    const placeOfDeliveryText = `Place of Delivery ${invoiceInfoHeaderData.deliveryAddress}`;
    const placeOfDeliveryWidth = doc.getTextWidth(placeOfDeliveryText);
    const invoiceNumberText = `Invoice Number ${invoiceInfoHeaderData.invoiceNumber}`;
    const invoiceNumberWidth = doc.getTextWidth(invoiceNumberText);
    const invoiceDetailsText = `Invoice Details ${invoiceInfoHeaderData.invoiceDetails}`;
    const invoiceDetailsWidth = doc.getTextWidth(invoiceDetailsText);
    const invoiceDateText = `Invoice Date ${invoiceInfoHeaderData.invoiceDate}`;
    const invoiceDateWidth = doc.getTextWidth(invoiceDateText);

    // Draw the text from right to left for shipping address
    doc.text('Shipping Address:', startX - doc.getTextWidth('Shipping Address:'), 70);
    doc.text(invoiceInfoHeaderData.shippingName, startX - shippingNameWidth, 75);
    doc.text(invoiceInfoHeaderData.shippingAddress, startX - shippingAddressWidth, 80);
    doc.text(shippingStateCodeText, startX - shippingStateCodeWidth, 85);
    doc.text(placeOfSupplyText, startX - placeOfSupplyWidth, 90);
    doc.text(placeOfDeliveryText, startX - placeOfDeliveryWidth, 95);
    doc.text(invoiceNumberText, startX - invoiceNumberWidth, 100);
    doc.text(invoiceDetailsText, startX - invoiceDetailsWidth, 105);
    doc.text(invoiceDateText, startX - invoiceDateWidth, 110);


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
    }));

    // Create the table using jspdf-autotable
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: 130, // Adjust this as needed
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
