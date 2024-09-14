'use client';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import * as XLSX from 'xlsx';

interface CloudinaryUploadWidgetResults {
  event: string;
  info: CloudinaryResult;
}
interface CloudinaryResult {
  secure_url: string;
}
interface Row {
  [key: number]: string;
}

interface BillOfQuantity {
  boq_item_id?: number;
  project_id?: number;
  item_name: string;
  quantity: number;
  unit?: string | null;
  unit_cost: number;
  amount: number;
}

export default function UploadPage() {
  const [fileUrl, setFileUrl] = useState('');
  const [parsedData, setParsedData] = useState<BillOfQuantity[]>([]);
  const [loading, setLoading] = useState(false);

  // // Handle file upload success
  // const handleOnUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
  //   if (result.event !== 'success') {
  //     return;
  //   }
  //   const info = result.info;
  //   setFileUrl(info.secure_url); // URL of uploaded file
  // };

  // Fetch and read the file from Cloudinary, then parse it to JSON
  const handleReadFile = async () => {
    if (!fileUrl) return;

    const response = await fetch(fileUrl);
    const fileBlob = await response.blob();
    const reader = new FileReader();

    reader.onload = e => {
      const arrayBuffer = e.target!.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      const binaryStr = new TextDecoder('latin1').decode(uint8Array);
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: Row[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      rows.shift(); // Remove header row
      rows.shift(); // Remove header row
      const parsedBoqItems = rows.map(row => ({
        project_id: 1,
        item_name: row[0] || '',
        quantity: parseInt(row[1], 10) || 0, // Convert to number
        unit: row[2] || '',
        unit_cost: parseInt(row[3], 10) || 0, // Convert to number
        amount: parseInt(row[4], 10) || 0, // Convert to number
      }));

      setParsedData(parsedBoqItems);

      setParsedData(parsedBoqItems);
    };

    reader.readAsArrayBuffer(fileBlob);
  };

  // Send the parsed data to the server to upload to the database
  const handleUploadToServer = async () => {
    setLoading(true);
    const response = await fetch('/api/boq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedData), // Send parsed BOQ data to the API
    });

    const result = await response.json();
    console.log(result);
    setLoading(false);
  };

  return (
    <div>
      <h1>Upload Excel File to Cloudinary</h1>
      <CldUploadWidget
        uploadPreset="cms-next"
        onSuccess={result => {
          if (result.event !== 'success') {
            return;
          }
          const info = result.info as CloudinaryResult;
          setFileUrl(info.secure_url);
          console.log(result);
        }}
        // onSuccess={ (results: CloudinaryUploadWidgetResults) => {
        //   if (results.event !== 'success') {
        //     return;
        //   }
        //   const info = results.info;
        //   setFileUrl(info.secure_url); // URL of uploaded file
        // }}
        options={{ resourceType: 'raw' }} // Allows for non-image file uploads like Excel
      >
        {({ open }) => <button onClick={open}>Upload Excel File</button>}
      </CldUploadWidget>

      {fileUrl && (
        <>
          <p>File uploaded: {fileUrl}</p>
          <button onClick={handleReadFile}>Read File from Cloudinary</button>
        </>
      )}

      {parsedData.length > 0 && (
        <>
          <h2>Parsed BOQ Data</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          <button onClick={handleUploadToServer} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload to Database'}
          </button>
        </>
      )}
    </div>
  );
}

// import React, { useState } from 'react';
// import { CldUploadWidget, CldImage } from 'next-cloudinary';
// import { Button } from '@/components/ui/button';

// interface CloudinaryResult {
//   public_id: string;
// }
// const UploadPage = () => {
//   const [publicId, setPublicId] = useState('');
//   return (
//     <>
//       {publicId && (
//         <CldImage src={publicId} width={270} height={180} alt="coffee image" />
//       )}
//       <CldUploadWidget
//         uploadPreset="cms-next"
//         onSuccess={result => {
//           if (result.event !== 'success') {
//             return;
//           }
//           const info = result.info as CloudinaryResult;
//           setPublicId(info.public_id);
//           console.log(result);
//         }}
//       >
//         {({ open }) => <Button onClick={() => open()}>Upload</Button>}
//       </CldUploadWidget>
//     </>
//   );
// };

// export default UploadPage;
