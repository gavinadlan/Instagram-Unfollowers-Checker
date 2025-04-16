import { useState } from "react";
import FileUploader from "../components/FileUploader";
import UnfollowersList from "../components/UnfollowersList";
import { extractUnfollowers } from "../utils/jsonParser";
import { motion } from "framer-motion";
import "../styles/home.css"; // Import CSS

export default function Home() {
  const [unfollowers, setUnfollowers] = useState<string[]>([]);

  const handleJSONParsed = (json: any) => {
    const result = extractUnfollowers(json);
    setUnfollowers(result);
  };

  return (
    <main className="home-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Instagram Unfollowers Checker
      </motion.h1>
      <motion.p
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Upload your Instagram followers & following JSON file to check who
        unfollowed you. Simple & Fast!
      </motion.p>

      <FileUploader onJSONParsed={handleJSONParsed} />

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {unfollowers.length > 0 && (
          <UnfollowersList unfollowers={unfollowers} />
        )}
        {unfollowers.length === 0 && (
          <p className="no-unfollowers">
            No unfollowers found yet! Upload your file to get started.
          </p>
        )}
      </motion.div>
    </main>
  );
}
