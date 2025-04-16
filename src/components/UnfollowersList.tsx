// UnfollowersList.tsx
interface UnfollowerInfo {
  username: string;
  profileUrl: string;
}

interface Props {
  unfollowers: UnfollowerInfo[];
}

export default function UnfollowersList({ unfollowers }: Props) {
  return (
    <ul className="unfollowers-list">
      {unfollowers.map((user, index) => (
        <li key={index}>
          <a
            href={user.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="unfollower-link"
          >
            {user.username}
          </a>
        </li>
      ))}
    </ul>
  );
}
