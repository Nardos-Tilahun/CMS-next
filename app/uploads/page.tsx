'use client'
import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const UploadPage = () => {
  return (
    <CldUploadWidget
      uploadPreset="CMS_NEXT"
      options={{
        folder: 'uploads/excel',
        clientAllowedFormats: ['xls', 'xlsx'], 
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload Excel File
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;