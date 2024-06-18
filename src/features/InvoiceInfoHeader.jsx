import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling

const InvoiceInfoHeader = ({ invoiceInfoData, onInvoiceInfoChange }) => {
  const handleDateChange = (date) => {
    onInvoiceInfoChange("invoiceDate", date); // Update the state with the selected date
  };

  // Ensure invoiceInfoHeadersArray is always an array
  const invoiceInfoHeadersArray = [
    {
      label: "Seller Name",
      value: invoiceInfoData.sellerName,
      onChange: (value) => onInvoiceInfoChange("sellerName", value),
    },
    {
      label: "Seller Address",
      value: invoiceInfoData.sellerAddress,
      onChange: (value) => onInvoiceInfoChange("sellerAddress", value),
    },
    {
      label: "Seller PAN",
      value: invoiceInfoData.sellerPan,
      onChange: (value) => onInvoiceInfoChange("sellerPan", value),
    },
    {
      label: "Seller GST",
      value: invoiceInfoData.sellerGst,
      onChange: (value) => onInvoiceInfoChange("sellerGst", value),
    },
    {
      label: "Order Number",
      value: invoiceInfoData.orderNumber,
      onChange: (value) => onInvoiceInfoChange("orderNumber", value),
    },
    {
      label: "Order Date",
      value: invoiceInfoData.oderDate,
      onChange: (value) => onInvoiceInfoChange("oderDate", value),
    },
  ];


  const invoiceInfoHeadersArray1 = [
    {
      label: "Billing Name",
      value: invoiceInfoData.billingName,
      onChange: (value) => onInvoiceInfoChange("billingName", value),
    },
    {
      label: "Billing Address",
      value: invoiceInfoData.billingAddress,
      onChange: (value) => onInvoiceInfoChange("billingAddress", value),
    },
  ];


  const invoiceInfoHeadersArray2 = [
    {
      label: "Shipping Name",
      value: invoiceInfoData.shippingName,
      onChange: (value) => onInvoiceInfoChange("shippingName", value),
    },
    {
      label: "Shipping Address",
      value: invoiceInfoData.shippingAddress,
      onChange: (value) => onInvoiceInfoChange("shippingAddress", value),
    },
    {
      label: "State code ut",
      value: invoiceInfoData.stateCode,
      onChange: (value) => onInvoiceInfoChange("stateCode", value),
    },
    {
      label: "Place of Supply",
      value: invoiceInfoData.supplyAddress,
      onChange: (value) => onInvoiceInfoChange("supplyAddress", value),
    },
    {
      label: "Place of Delivery",
      value: invoiceInfoData.deliveryAddress,
      onChange: (value) => onInvoiceInfoChange("deliveryAddress", value),
    },
    {
      label: "Invoice Number",
      value: invoiceInfoData.invoiceNumber,
      onChange: (value) => onInvoiceInfoChange("invoiceNumber", value),
    },
    {
      label: "Invoice Details",
      value: invoiceInfoData.invoiceDetails,
      onChange: (value) => onInvoiceInfoChange("invoiceDetails", value),
    },
    {
      label: "Invoice Date",
      value: invoiceInfoData.invoiceDate,
      onChange: (value) => onInvoiceInfoChange("invoiceDate", value),
    },
  ];

  return (
    <>
      <h1>Sold by Invoice Info Header</h1>
      <div className="flex flex-wrap">
        {invoiceInfoHeadersArray.map((item) => (
          <div key={item.label} className="w-full sm:w-1/2 md:w-1/4 p-2">
            <label className="block text-sm text-neutral-content pb-1">
              {item.label}
            </label>
            <div className="relative"> {/* Use a wrapper div for consistent styling */}
              {item.label === "Invoice Date" ? (
                <DatePicker
                  selected={item.value}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="input input-bordered w-full" // Apply the same CSS class
                />
              ) : (
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <h1>Billing address</h1>
      <div className="flex flex-wrap">
        {invoiceInfoHeadersArray1.map((item) => (
          <div key={item.label} className="w-full sm:w-1/2 md:w-1/4 p-2">
            <label className="block text-sm text-neutral-content pb-1">
              {item.label}
            </label>
            <div className="relative"> {/* Use a wrapper div for consistent styling */}
              {item.label === "Invoice Date" ? (
                <DatePicker
                  selected={item.value}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="input input-bordered w-full" // Apply the same CSS class
                />
              ) : (
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <h1>Shipping address</h1>
      <div className="flex flex-wrap">
        {invoiceInfoHeadersArray2.map((item) => (
          <div key={item.label} className="w-full sm:w-1/2 md:w-1/4 p-2">
            <label className="block text-sm text-neutral-content pb-1">
              {item.label}
            </label>
            <div className="relative"> {/* Use a wrapper div for consistent styling */}
              {item.label === "Invoice Date" ? (
                <DatePicker
                  selected={item.value}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="input input-bordered w-full" // Apply the same CSS class
                />
              ) : (
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceInfoHeader;
