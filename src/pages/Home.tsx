import { useState } from "react";
import FileUploader from "../components/FileUploader";
import UnfollowersList from "../components/UnfollowersList";
import { extractUnfollowers } from "../utils/jsonParser";

export default function Home() {
  const [unfollowers, setUnfollowers] = useState<string[]>([]);

  const handleJSONParsed = (json: any) => {
    const result = extractUnfollowers(json);
    setUnfollowers(result);
  };

  return (
    <main className="min-h-screen flex items-center justify-center flex-col p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Instagram Unfollowers Checker</h1>
      <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-300">
        Upload file JSON dari Instagram (followers & following) dan lihat siapa
        yang unfollow kamu.
      </p>
      <FileUploader onJSONParsed={handleJSONParsed} />
      <UnfollowersList unfollowers={unfollowers} />
    </main>
  );
}
