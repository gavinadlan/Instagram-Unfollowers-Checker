// File utils/jsonParser.ts yang seharusnya:

export function extractUnfollowers({
  followers,
  relationships_following,
}: {
  followers: any[];
  relationships_following: any[];
}): string[] {
  // Log untuk debugging
  console.log("Extracting unfollowers...");
  console.log("Followers:", followers.length);
  console.log("Following:", relationships_following.length);

  try {
    // Mengambil username dari followers
    const followerUsernames = new Set(
      followers
        .map((entry) => {
          // Pastikan data struktur sesuai
          if (entry.string_list_data && entry.string_list_data[0]) {
            return entry.string_list_data[0].value;
          }
          return null;
        })
        .filter(Boolean)
    );

    console.log("Follower usernames count:", followerUsernames.size);

    // Mengambil username dari following dan filter yang tidak follow balik
    const unfollowers = relationships_following
      .map((entry) => {
        if (entry.string_list_data && entry.string_list_data[0]) {
          return entry.string_list_data[0].value;
        }
        return null;
      })
      .filter(Boolean)
      .filter((username) => !followerUsernames.has(username));

    console.log("Unfollower count:", unfollowers.length);
    console.log("Sample unfollowers:", unfollowers.slice(0, 5));

    return unfollowers;
  } catch (error) {
    console.error("Error extracting unfollowers:", error);
    return [];
  }
}
