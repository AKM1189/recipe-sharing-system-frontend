"use client";
import CardActionIcon from "../recipes/CardActionIcon";
import { Facebook, Mail, Share, X } from "lucide-react";
import { Recipe } from "@/types";
import { FaFacebook, FaPinterest, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const ShareRecipe = ({ recipe }: { recipe: Recipe }) => {
  const handleShareClick = (
    type: "facebook" | "telegram" | "pinterest" | "email" | "x",
  ) => {
    const url = `${window.location.origin}/recipes/${recipe.id}`;
    const title = recipe.title;

    // ✅ Native share (mobile first)
    if (navigator.share) {
      navigator.share({
        title,
        url,
      });
      return;
    }

    // ✅ Fallback (desktop)
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url,
      )}&media=${encodeURIComponent(recipe.imageUrl)}&description=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      x: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    window.open(shareLinks[type], "_blank");
  };
  return (
    <div>
      <h2 className="text-sm font-medium">Share this on</h2>
      <div className="flex gap-2 mt-2">
        <CardActionIcon
          tooltip="Facebook"
          icon={<FaFacebook size={22} color="var(--color-primary)" />}
          handleClick={() => handleShareClick("facebook")}
        />
        <CardActionIcon
          tooltip="Pinterest"
          icon={<FaPinterest size={22} color="var(--color-primary)" />}
          handleClick={() => handleShareClick("pinterest")}
        />
        <CardActionIcon
          tooltip="Telegram"
          icon={<FaTelegram size={22} color="var(--color-primary)" />}
          handleClick={() => handleShareClick("telegram")}
        />
        <CardActionIcon
          tooltip="X"
          icon={<FaXTwitter size={22} color="var(--color-primary)" />}
          handleClick={() => handleShareClick("x")}
        />
        <CardActionIcon
          tooltip="Email"
          icon={<Mail size={22} color="var(--color-primary)" />}
          handleClick={() => handleShareClick("email")}
        />
      </div>
    </div>
  );
};

export default ShareRecipe;
