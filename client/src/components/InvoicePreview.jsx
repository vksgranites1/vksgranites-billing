import { forwardRef } from "react";
import company from "../data/company";
import signature from "../assets/signature.png";
const formatDate = (date) => {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year}`;
};
const InvoicePreview = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className=""
      className="a4-print"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        boxSizing: "border-box",
        width: "210mm",
        minHeight: "297mm",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      {/* ================= HEADER ================= */}
      
    



    

<div className="border-3 border-blue-900 py-0">

  {/* Top Strip */}

  <div className="relative flex items-center justify-between px-5 py-0 text-sm font-semibold">

    <div>
      GSTIN No. {company.gstin}
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 font-bold text-blue-900 text-xl">
      TAX INVOICE
    </div>

    <div className="text-right">
      <div>{company.phone}</div>
      <div>{company.phone2}</div>
    </div>

  </div>

  {/* Company */}

  <div className="flex items-center border-t border-blue-900 py-1">

    <div className=" w-35 flex justify-center ml-2">

      <img
        src={company.logo}
        alt="logo"
        className="w-30 h-30"
      />

    </div>

    <div className="flex-1">

      <h1 className="text-5xl font-bold text-blue-900 tracking-wide ml-1 text-left ml-16"style={{ fontFamily: "Times New Roman, Times, serif" }} >

        V.K.S GRANITES

      </h1>

      <p className="font-semibold mt-2 ml-32">

        3/6, Moolakadu,
        Masakalipatti (PO)

      </p>

      <p className="font-semibold ml-34">

        Rasipuram,
        Tamil Nadu  - 637401

      </p>

    </div>

  </div>

</div>

      {/* Receiver */}

      {/* ================= RECEIVER & CONSIGNEE ================= */}

<div className="grid grid-cols-2 border-l-3 border-r-3 border-b-2 border-blue-900">

  {/* Receiver */}

  <div className="border-r-2 border-blue-900">

    <div className="bg-blue-900 text-white text-center font-bold py-0">
      Details of Receiver Billed To
    </div>

    <table className="w-full text-sm">

      <tbody>

        <tr className="border-b">
          <td className="p-2 font-semibold w-40 py-1">
            Reverse Charge (Y/N)
          </td>
          <td className="p-0 py-1 ">{data.reverseCharge}</td>
        </tr>

        <tr className="border-b">
          <td className="p-2 font-semibold py-1">
            Invoice No :
          </td>
          <td className="p-0 py-1">
            {data.invoiceNo}
          </td>
        </tr>

        <tr className="border-b">
          <td className="p-2 font-semibold py-1">
            Invoice Date :
          </td>
          <td className="p-0 py-1">
            {formatDate(data.invoiceDate)}
          </td>
        </tr>

        

        <tr className="border-b">
          <td className="p-2 font-semibold py-1">
            Name  :
          </td>

          <td className="p-0 py-1">
            {data.customerName || "-"}
          </td>

        </tr>

        <tr className="border-b align-top">

          <td className="p-2 font-semibold py-1">
            Address   :
          </td>

          <td className="p-0 py-1 whitespace-pre-line">
            {data.customerAddress || "-"}
          </td>

        </tr>

        <tr className="border-b">

          <td className="p-2 font-semibold py-1">
            GSTIN   :
          </td>

          <td className="p-0 py-1">
            {data.customerGSTIN || "-"}
          </td>

        </tr>

        <tr className="border-b">
          <td className="p-2 font-semibold py-1">
            State :
          </td>

          <td className="p-0 py-1">
            {data.state || "-"}
          </td>
        </tr>

        <tr className="border-b">
          <td className="p-2 font-semibold py-1">
            State Code :
          </td>

          <td className="p-0 py-1">
            {data.stateCode || "-"}
          </td>
        </tr>

      </tbody>

    </table>

  </div>

  {/* Consignee */}

  <div>

  <div className="bg-blue-900 text-white text-center font-bold py-0">
    Details of Consignee Shipped To
  </div>

  <table className="w-full text-sm">

    <tbody>

      <tr className="border-b">

        <td className="p-2 font-semibold w-40 py-1">
          Transport Mode :
        </td>

        <td className="p-0 py-1">
          {data.transportMode}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          Vehicle Number :
        </td>

        <td className="p-0 py-1">
          {data.vehicleNumber}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          Date of Supply :
        </td>

        <td className="p-0 py-1">
          {formatDate(data.dateOfSupply)}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          Place of Supply :
        </td>

        <td className="p-0 py-1">
          {data.placeOfSupply || "-"}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          Name :
        </td>

        <td className="p-0 py-1">
          {data.consigneeName || "-"}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          Address :
        </td>

        <td className="p-0 py-1 whitespace-pre-line">
          {data.consigneeAddress || "-"}
        </td>

      </tr>

      <tr className="border-b">

        <td className="p-2 font-semibold py-1">
          GSTIN :
        </td>

        <td className="p-0 py-1">
          {data.consigneeGSTIN || "-"}
        </td>

      </tr>

      <tr>

        <td className="p-2 font-semibold py-1">
          State :
        </td>

        <td className="p-0 py-1 flex justify-between">
          {data.consigneeState || "-"}
          <span className="float-right mr-10">
            <span className="font-bold p-1">Code :</span> &nbsp;&nbsp;&nbsp;{data.consigneeStateCode  || "- "}
          </span>
        </td>

      </tr>

    </tbody>

  </table>

</div>
</div>

      {/* Product */}

      {/* ================= PRODUCT DETAILS ================= */}

<div className="border-l-2 border-r-2 border-b-2 border-blue-900 ">

  <table className="w-full border-collapse text-sm">

    <thead>

      <tr className="bg-blue-900 text-white">

        <th className="border border-blue-900 p-1 w-12">
          Sl.No
        </th>

        <th className="border border-blue-900 p-1">
          Name of Product / Service
        </th>

        <th className="border border-blue-900 p-1 w-20">
          HSN
           Code
        </th>

        <th className="border border-blue-900 p-1 w-20">
          Rate / Sq.ft
        </th>

        <th className="border border-blue-900 p-1 w-20">
          Cu.ft
        </th>

        <th className="border border-blue-900 p-1 w-36">
          Amount (₹)
        </th>

      </tr>

    </thead>

    <tbody>

      <tr>

        <td className="border p-2 w-12 h-25 text-center">
          1
        </td>

        <td className="border p-2 h-40">
          {company.product}
        </td>

        <td className="border p-2 text-center ">
          {company.hsn}
        </td>

        <td className="border p-2  text-center">
          ₹ {Number(data.rate).toFixed(2)}
        </td>

        <td className="border p-2 text-center">
          {Number(data.cuFeet).toFixed(2)}
        </td>

        <td className="border p-2  font-semibold text-center">
          ₹ {Number(data.amount).toFixed(2)}
        </td>

      </tr>

      {/* Empty rows for invoice appearance */}

      

    </tbody>

  </table>

</div>

      {/* GST */}

      {/* ===================== TOTALS ===================== */}

<div className="grid grid-cols-2 border-l-3 border-r-2 border-b-3 border-blue-900">

 {/* Amount in Words & Bank Details */}

<div className="border-r border-blue-900 ">

  {/* Amount in Words */}

  <div className="border-b border-blue-900 p-2 min-h-[70px]">

    <p className="font-bold">
      Total Amount in words :
    </p>

    <p className="mt-1 font-semibold leading-5">
      {data.amountWords}
    </p>

  </div>

  {/* Bank Details */}

  <div className="border-b border-blue px-2 py-0 min-h-[120px]">

    <h2 className="text-lg font-bold underline mb-1">
      Bank Details
    </h2>

    <table className="w-full text-sm leading-4">

      <tbody>

        <tr>
          <td className="font-bold w-40 py-0.5">
            Bank Name
          </td>
          <td className="w-5">:</td>
          <td>{company.bank.name}</td>
        </tr>

        <tr>
          <td className="font-bold py-0.5">
            Branch
          </td>
          <td>:</td>
          <td>{company.bank.branch}</td>
        </tr>

        <tr>
          <td className="font-bold py-0.5">
            Bank A/c No.
          </td>
          <td>:</td>
          <td>{company.bank.account}</td>
        </tr>

        <tr>
          <td className="font-bold py-0.5">
            Bank IFSC No.
          </td>
          <td>:</td>
          <td>{company.bank.ifsc}</td>
        </tr>

      </tbody>

    </table>

  </div>

  {/* Terms */}

  <div className="px-2 py-1 text-xs leading-4">


    <p className="font-bold underline">
      Terms of Sales
    </p>

    <p className="mt-1">
      Goods Once Sold Cannot be taken back or exchanged.
    </p>

    <p>
      Subject to Salem Jurisdiction Only.
    </p>

  </div>

</div>
  {/* Totals */}

        <div>

  <table className="w-full border-l-1 border-r-2 border-blue-900 ">

    <tbody>

      <tr>
        <td className="border px-2 py-0.5">
          Total Amount Before Tax
        </td>

        <td className="border px-2 py-0.5 text-right">
          ₹ {Number(data.amount).toFixed(2)}
        </td>
      </tr>

      <tr>
        <td className="border px-2 py-0.5">
          CGST @ {data.cgst}%
        </td>

        <td className="border px-2 py-0.5 text-right">
          ₹ {Number(data.cgstAmount).toFixed(2)}
        </td>
      </tr>

      <tr>
        <td className="border px-2 py-0.5">
          SGST @ {data.sgst}%
        </td>

        <td className="border px-2 py-0.5 text-right">
          ₹ {Number(data.sgstAmount).toFixed(2)}
        </td>
      </tr>

      <tr>
        <td className="border px-2 py-0.5">
          IGST @ {data.igst}%
        </td>

        <td className="border px-2 py-0.5 text-right">
          ₹ {Number(data.igstAmount).toFixed(2)}
        </td>
      </tr>

      <tr>

        <td className="border px-4 py-0.5 font-bold">
        Total GST
        </td>

        <td className="border px-4 py-0.5 text-right font-bold">
        ₹ {Number(data.totalGST).toFixed(2)}
        </td>

      </tr>

      <tr>
        
        <td className="border px-4 py-2 font-bold">
        Total Amount After Tax
        </td>

        <td className="border px-4 py-2 text-right font-bold">
        ₹ {Number(data.grandTotal).toFixed(2)}
        </td>

      </tr>

    </tbody>

  </table>

  <div className="mt-0 text-center text-xs leading-4 border-r-2 border-blue-900">

    <p>
      Certified that the particulars given above are true and correct.
    </p>

    <div className="text-center mt-1">

      <p>
        For
        <span className="font-bold text-xl text-blue-900 ml-2"style={{ fontFamily: "Times New Roman, Times, serif" }}>
          VKS GRANITES
        </span>
      </p>
      <div className="mt-4">
        <div className="flex justify-center">
          <div className="text-right" style={{ width: "40%" }}>
            <div className="border-t border-blue-900 mx-auto" style={{ height: 60, width: "0%" }} />
            <p className="font-semibold mt-1">Authorised Signatory</p>
          </div>
        </div>
      </div>

    </div>

  </div>


    

    


    </div>

  </div>

</div>
    
  );
});

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;