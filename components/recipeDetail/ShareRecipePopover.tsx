import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Mail, Share } from "lucide-react";
import CardActionIcon from "../recipes/CardActionIcon";
import { ReactElement, useState } from "react";
import { FaFacebook, FaPinterest, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Recipe } from "@/types";
import { SHARE_MEDIA } from "@/lib/constants";
import { IconType } from "react-icons/lib";

const ShareRecipePopover = ({ recipe }: { recipe: Recipe }) => {
  const [open, setOpen] = useState(false);
  const url = `${window.location.origin}/recipes/${recipe.id}`;
  const title = recipe.title;
  const icon = { size: 22, color: "var(--color-primary)" };
  type MediaNameType = (typeof SHARE_MEDIA)[keyof typeof SHARE_MEDIA];
  const medias: {
    name: MediaNameType;
    icon: ReactElement<IconType>;
    url: string;
  }[] = [
    {
      name: SHARE_MEDIA.FACEBOOK,
      icon: <FaFacebook size={icon.size} color={icon.color} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: SHARE_MEDIA.TELEGRAM,
      icon: <FaTelegram size={icon.size} color={icon.color} />,
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: SHARE_MEDIA.PINTEREST,
      icon: <FaPinterest size={icon.size} color={icon.color} />,
      url: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url,
      )}&media=${encodeURIComponent(recipe.imageUrl)}&description=${encodeURIComponent(title)}`,
    },
    {
      name: SHARE_MEDIA.X,
      icon: <FaXTwitter size={icon.size} color={icon.color} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: SHARE_MEDIA.MAIL,
      icon: <Mail size={icon.size} color={icon.color} />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  const handleShareClick = (type: MediaNameType) => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
      });
      return;
    }

    const shareLink = medias.find((item) => item.name === type)?.url;
    window.open(shareLink, "_blank");
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <CardActionIcon
          tooltip="Share"
          icon={<Share size={22} color="var(--color-primary)" />}
          handleClick={() => setOpen(!open)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="end" side="top">
        <div className="flex flex-col gap-1 p-2">
          {medias.map((media) => (
            <div
              key={media.name}
              className="flex items-center px-3 py-2.5 gap-4 select-none cursor-pointer hover:bg-slate rounded-md"
              onClick={() => handleShareClick(media.name)}
            >
              {media.icon}
              <h5 className="font-medium text-sm">{media.name}</h5>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareRecipePopover;
