import React from 'react';
import { Button } from '@mui/material';
import { read, utils } from 'xlsx';

function FileUpload({ onDataUpload }) {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
      
      if (jsonData.length > 0) {
        onDataUpload(jsonData);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Button variant="contained" component="label">
      Upload Excel/CSV
      <input
        type="file"
        hidden
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
      />
    </Button>
  );
}

export default FileUpload;