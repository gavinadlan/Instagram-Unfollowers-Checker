interface UnfollowersListProps {
  unfollowers: string[];
}

export default function UnfollowersList({ unfollowers }: UnfollowersListProps) {
  if (!unfollowers.length) {
    return <p className="text-gray-500">Tidak ada yang unfollow kamu 🎉</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      <h2 className="text-xl font-bold">Unfollowers:</h2>
      <ul className="list-disc pl-6">
        {unfollowers.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
