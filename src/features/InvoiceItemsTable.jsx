import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DeleteRowButtonRenderer = (props) => {
  const onCellDeleteClick = () => {
    if (props.onDeleteClick) {
      props.onDeleteClick(props.node);
    }
  };

  return (
    <button className="btn btn-error" onClick={onCellDeleteClick}>
      Delete Row
    </button>
  );
};

const InvoiceItemsTable = ({ onRowDataChange }) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([{}]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateValues = (data) => {
    const netAmount = data.unitprice * data.quantity - data.discountprice;
    const isSamePlace = data.supplyAddress === data.deliveryAddress;
    const taxRate = isSamePlace ? 9 : 18;
    const taxType = isSamePlace ? "CGST/SGST" : "IGST";
    const taxAmount = isSamePlace ? (netAmount * taxRate / 100) * 2 : (netAmount * taxRate / 100);
    const totalAmount = netAmount + taxAmount;

    return {
      ...data,
      netprice: netAmount.toFixed(2),
      taxrate: taxRate,
      taxtype: taxType,
      taxamount: taxAmount.toFixed(2),
      totalamount: totalAmount.toFixed(2),
    };
  };

  const updateRowData = (newData) => {
    const updatedRowData = newData.map(calculateValues);
    setRowData(updatedRowData);
    onRowDataChange(updatedRowData);
  };

  useEffect(() => {
    const calculatedTotal = rowData.reduce((total, row) => {
      return total + row.totalamount;
    }, 0);
    setTotalPrice(calculatedTotal);
  }, [rowData]);

  const addEmptyRow = () => {
    const newRow = {};
    setRowData([...rowData, newRow]);
  };

  const handleDeleteRow = (params) => {
    const updatedRowData = rowData.filter((row) => row !== params.data);
    setRowData(updatedRowData);
    onRowDataChange(updatedRowData);
  };

  const columnDefs = [
    {
      headerName: "Sr No.",
      valueGetter: "node.rowIndex + 1",
      width: 80,
    },
    {
      headerName: "Description",
      field: "itemDescription",
      editable: true,
      width: 150,
    },
    {
      headerName: "Unit Price",
      field: "unitprice",
      editable: true,
      width: 100,
      wrapText: true,
    },
    {
      headerName: "Discount",
      field: "discountprice",
      editable: true,
      width: 100,
      wrapText: true,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      editable: true,
      width: 100,
    },
    {
      headerName: "Net Amount",
      field: "netprice",
      width: 120,
    },
    {
      headerName: "Tax Rate",
      field: "taxrate",
      width: 100,
    },
    {
      headerName: "Tax Type",
      field: "taxtype",
      width: 100,
    },
    {
      headerName: "Tax Amount",
      field: "taxamount",
      width: 100,
    },
    {
      headerName: "Total Amount",
      field: "totalamount",
      width: 120,
    },
    {
      headerName: "Delete",
      cellRenderer: DeleteRowButtonRenderer,
      cellRendererParams: {
        onDeleteClick: (node) => {
          handleDeleteRow(node);
        },
      },
      width: 100,
    },
  ];

  const defaultColDef = {
    resizable: true,
    wrapText: true,
    autoHeight: true,
    sortable: true,
  };

  return (
    <>
      <div className="mb-6 w-full justify-between items-center">
        <h1 className="text-2xl">Invoice Items Table</h1>
        <button onClick={addEmptyRow} className="btn btn-primary">
          ADD ROW
        </button>
      </div>
      <div
        className="ag-theme-alpine-dark"
        style={{ height: 500, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellValueChanged={(params) => {
            updateRowData(rowData);
          }}
        />
      </div>
      <div className="mt-4">
        <strong>Total Price:</strong> {totalPrice.toFixed(2)}
      </div>
    </>
  );
};

export default InvoiceItemsTable;

