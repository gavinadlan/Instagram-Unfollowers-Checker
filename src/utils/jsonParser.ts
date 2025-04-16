interface UnfollowerInfo {
  username: string;
  profileUrl: string;
}

export function extractUnfollowers({
  followers,
  relationships_following,
}: {
  followers: any[];
  relationships_following: any[];
}): UnfollowerInfo[] {
  console.log("Extracting unfollowers...");
  console.log("Followers:", followers.length);
  console.log("Following:", relationships_following.length);

  try {
    // Mengambil username dari followers
    const followerUsernames = new Set(
      followers
        .map((entry) => {
          if (entry.string_list_data && entry.string_list_data[0]) {
            return entry.string_list_data[0].value;
          }
          return null;
        })
        .filter(Boolean)
    );

    console.log("Follower usernames count:", followerUsernames.size);

    // Untuk setiap following, periksa jika mereka tidak ada di followers
    const unfollowers = relationships_following
      .map((entry) => {
        if (entry.string_list_data && entry.string_list_data[0]) {
          const username = entry.string_list_data[0].value;
          const profileUrl =
            entry.string_list_data[0].href ||
            `https://instagram.com/${username}`;

          // Jika username tidak ditemukan di followers, anggap mereka unfollower
          if (!followerUsernames.has(username)) {
            return { username, profileUrl };
          }
        }
        return null;
      })
      .filter((item): item is UnfollowerInfo => item !== null); // Tipe guard untuk TypeScript

    console.log("Unfollower count:", unfollowers.length);
    console.log("Sample unfollowers:", unfollowers.slice(0, 5));

    return unfollowers;
  } catch (error) {
    console.error("Error extracting unfollowers:", error);
    return [];
  }
}
