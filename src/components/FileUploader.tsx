import { useState, ChangeEvent } from "react";

interface FileUploaderProps {
  onJSONParsed: (data: any) => void;
}

export default function FileUploader({ onJSONParsed }: FileUploaderProps) {
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === "string") {
          const data = JSON.parse(result);
          onJSONParsed(data);
          setError("");
        }
      } catch {
        setError("File tidak valid atau bukan JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="block w-full text-sm file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
