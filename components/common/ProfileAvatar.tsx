import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUserCircle } from "react-icons/fa";

const sizeMap: Record<number, string> = {
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
  16: "w-16 h-16",
  20: "w-20 h-20",
  24: "w-24 h-24",
  40: "w-40 h-40",
};

const ProfileAvatar = ({
  profileUrl,
  size = 8,
  initials = "U",
}: {
  profileUrl?: string | undefined;
  size?: number;
  initials?: string;
}) => {
  const avatarSize = sizeMap[size] ?? "w-8 h-8";

  return profileUrl ? (
    <Avatar className={avatarSize}>
      <AvatarImage src={profileUrl} className="object-cover" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  ) : (
    <FaUserCircle size={size * 4} color="var(--color-primary)" />
  );
};

export default ProfileAvatar;
