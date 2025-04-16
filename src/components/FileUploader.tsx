import React, { useRef } from "react";

interface FileUploaderProps {
  onJSONParsed: (json: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onJSONParsed }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        try {
          const json = JSON.parse(fileContent);
          onJSONParsed(json); // Parse JSON dan kirim ke parent
        } catch (error) {
          alert("Gagal mem-parsing file. Pastikan itu file JSON yang valid.");
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: "none" }} // Menyembunyikan input file
      />
      <button className="upload-btn" onClick={triggerFileInput}>
        Upload JSON File
      </button>
    </div>
  );
};

export default FileUploader;
