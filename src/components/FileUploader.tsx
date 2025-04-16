import { useState, useRef } from "react";

const FileUploader = ({
  onFollowersParsed,
  onFollowingParsed,
  onProcess,
}: {
  onFollowersParsed: (json: any) => void;
  onFollowingParsed: (json: any) => void;
  onProcess: () => void;
}) => {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const followersInputRef = useRef<HTMLInputElement>(null);
  const followingInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "followers" | "following"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "followers") {
        setFollowersFile(file);
        handleUpload(file, "followers");
      } else {
        setFollowingFile(file);
        handleUpload(file, "following");
      }
    }
  };

  const handleUpload = (file: File, type: "followers" | "following") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const json = JSON.parse(content);
        console.log(`Raw JSON structure for ${type}:`, json);
        console.log(`JSON keys for ${type}:`, Object.keys(json));

        if (type === "followers") {
          onFollowersParsed(json);
        } else {
          onFollowingParsed(json);
        }
      } catch (error) {
        console.error(`Error parsing ${type} JSON:`, error);
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = (type: "followers" | "following") => {
    if (type === "followers") {
      followersInputRef.current?.click();
    } else {
      followingInputRef.current?.click();
    }
  };

  return (
    <div className="button-group">
      <div className="upload-btn-wrapper">
        <button type="button" onClick={() => triggerFileInput("followers")}>
          {followersFile ? `Followers JSON Selected` : `Upload Followers JSON`}
        </button>
        <input
          ref={followersInputRef}
          type="file"
          accept=".json"
          onChange={(e) => handleFileChange(e, "followers")}
        />
      </div>

      <div className="upload-btn-wrapper">
        <button type="button" onClick={() => triggerFileInput("following")}>
          {followingFile ? `Following JSON Selected` : `Upload Following JSON`}
        </button>
        <input
          ref={followingInputRef}
          type="file"
          accept=".json"
          onChange={(e) => handleFileChange(e, "following")}
        />
      </div>

      <div className="upload-btn-wrapper">
        <button type="button" onClick={onProcess}>
          Process Files
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
