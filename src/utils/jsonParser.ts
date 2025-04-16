interface Entry {
  string_list_data: { value: string }[];
}

interface InstagramData {
  relationships_following: Entry[];
  followers: Entry[];
}

export function extractUnfollowers(data: InstagramData): string[] {
  try {
    const following = data.relationships_following.map(
      (entry) => entry.string_list_data[0].value
    );
    const followers = data.followers.map(
      (entry) => entry.string_list_data[0].value
    );

    return following.filter((user) => !followers.includes(user));
  } catch {
    return [];
  }
}
