import React from "react";

interface SocialLoginButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-5 2xl:py-5.5 text-sm 2xl:text-base text-black [box-shadow:0_0_14px_0_rgba(0,0,0,0.05)] rounded-2xl border border-[#E2E2E2]! hover:bg-gray-50 bg-transparent! flex items-center justify-center gap-3 cursor-pointer font-medium"
    >
      <img src={icon} alt={`${label} logo`} className="w-6 h-6 2xl:w-8 2xl:h-8" />
      {label}
    </button>
  );
};

export default SocialLoginButton;
