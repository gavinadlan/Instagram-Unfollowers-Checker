interface Props {
  unfollowers: string[];
}

export default function UnfollowersList({ unfollowers }: Props) {
  return (
    <ul className="unfollowers-list">
      {unfollowers.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
}
