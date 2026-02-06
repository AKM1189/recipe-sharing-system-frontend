import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUserCircle } from "react-icons/fa";

const ProfileAvatar = ({
  profileUrl,
  size = 8,
}: {
  profileUrl?: string | undefined;
  size?: number;
}) => {
  return (
    <div>
      {profileUrl ? (
        <Avatar className={`size-${size}`}>
          <AvatarImage src={profileUrl} />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      ) : (
        <FaUserCircle size={size * 4} color="var(--color-primary)" />
      )}
    </div>
  );
};

export default ProfileAvatar;
