import React from "react";
import WelcomeHeader from "../../components/WelcomeHeader";

function Home() {
  const storedUser = localStorage.getItem("userData");
  let userData = null;
  if (storedUser) {
    userData = JSON.parse(storedUser);
  }
  const name = userData?.name || "User";
  const email = userData?.email || "Email not available";
  const gender = userData?.gender;
  const profilePic = userData?.profilePic;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen gap-28">
      <WelcomeHeader />
      <div className="flex items-center flex-col gap-8 p-5 justify-center border border-[#E2E2E2] [box-shadow:0_4px_14px_0_rgba(0,0,0,0.1)] font-inter rounded-3xl w-2xs">
        <img
          src={profilePic}
          alt="Profile"
          className="h-30 w-30 rounded-full border border-[#E2E2E2]"
          loading="lazy"
        />
        <div className="space-y-2.5 flex flex-col items-center text-center">
          <div className="text-[#6358DC] font-bold ">{name}</div>
          <div className="space-y-1">
            <div className="font-medium">{email}</div>
            <div className="font-medium capitalize">{gender}</div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleLogout}
          className={`py-5.5 bg-[#6358DC] w-32 font-bold text-xs text-white rounded-2xl transition hover:bg-[#4f46e5]`}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
