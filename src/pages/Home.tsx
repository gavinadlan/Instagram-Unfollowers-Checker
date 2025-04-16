import { useState } from "react";
import FileUploader from "../components/FileUploader";
import UnfollowersList from "../components/UnfollowersList";
import { extractUnfollowers } from "../utils/jsonParser";
import { motion } from "framer-motion";
import "../styles/home.css";

interface StringListData {
  href: string;
  value: string;
  timestamp: number;
}

interface Entry {
  string_list_data: StringListData[];
}

interface UnfollowerInfo {
  username: string;
  profileUrl: string;
}

export default function Home() {
  const [followers, setFollowers] = useState<Entry[]>([]);
  const [following, setFollowing] = useState<Entry[]>([]);
  const [unfollowers, setUnfollowers] = useState<UnfollowerInfo[]>([]);

  const handleProcess = () => {
    console.log("Processing data...");
    console.log("Followers data:", followers);
    console.log("Following data:", following);

    if (!followers.length || !following.length) {
      alert("Please upload both followers and following JSON.");
      return;
    }

    try {
      const result = extractUnfollowers({
        followers,
        relationships_following: following,
      });

      console.log("Unfollowers result:", result);
      setUnfollowers(result);
    } catch (error) {
      console.error("Error in handleProcess:", error);
      alert("Error processing files. Check console for details.");
    }
  };

  const onFollowersParsed = (json: any) => {
    console.log("Followers JSON received:", json);

    // Coba cari struktur data yang tepat
    if (json && json.followers && Array.isArray(json.followers)) {
      console.log("Format 1: Found followers array");
      setFollowers(json.followers);
    }
    // Cek jika JSON adalah array langsung
    else if (Array.isArray(json)) {
      console.log("Format 2: JSON is an array");
      setFollowers(json);
    }
    // Cek jika data berada dalam properti lain
    else {
      // Cari properti yang mungkin berisi data followers
      const possibleKeys = Object.keys(json);
      console.log("Available keys in JSON:", possibleKeys);

      // Coba temukan array dalam json
      for (const key of possibleKeys) {
        if (Array.isArray(json[key])) {
          console.log(`Found array in property: ${key}`);
          setFollowers(json[key]);
          return;
        }
      }

      console.error("Could not find valid followers data in JSON");
      alert(
        "Could not find followers data in the uploaded JSON. Please check the file format."
      );
    }
  };

  const onFollowingParsed = (json: any) => {
    console.log("Following JSON received:", json);

    // Coba cari struktur data yang tepat
    if (
      json &&
      json.relationships_following &&
      Array.isArray(json.relationships_following)
    ) {
      console.log("Format 1: Found following array");
      setFollowing(json.relationships_following);
    }
    // Cek jika JSON adalah array langsung
    else if (Array.isArray(json)) {
      console.log("Format 2: JSON is an array");
      setFollowing(json);
    }
    // Cek jika data berada dalam properti lain
    else {
      // Cari properti yang mungkin berisi data following
      const possibleKeys = Object.keys(json);
      console.log("Available keys in JSON:", possibleKeys);

      // Coba temukan array dalam json
      for (const key of possibleKeys) {
        if (Array.isArray(json[key])) {
          console.log(`Found array in property: ${key}`);
          setFollowing(json[key]);
          return;
        }
      }

      console.error("Could not find valid following data in JSON");
      alert(
        "Could not find following data in the uploaded JSON. Please check the file format."
      );
    }
  };

  return (
    <main className="home-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Instagram Unfollowers Checker
      </motion.h1>
      <motion.p
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Upload your Instagram followers & following JSON file to check who
        unfollowed you.
      </motion.p>

      <div className="upload-container">
        <FileUploader
          onFollowersParsed={onFollowersParsed}
          onFollowingParsed={onFollowingParsed}
          onProcess={handleProcess}
        />
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {unfollowers.length > 0 ? (
          <UnfollowersList unfollowers={unfollowers} />
        ) : (
          <p className="no-unfollowers">No unfollowers found yet!</p>
        )}
      </motion.div>
    </main>
  );
}
