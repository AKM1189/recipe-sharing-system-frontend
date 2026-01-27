import EmailChangeForm from "@/components/profile/EmailChangeForm";
import Logout from "@/components/profile/Logout";
import PasswordChangeForm from "@/components/profile/PasswordChangeForm";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";

export default function Profile() {
  return (
    <div className="flex justify-center">
      <div className="my-10 w-[1000px] max-w-[1000px]">
        {/* Update Profile */}
        <div className="border-b pb-8">
          <h1 className="text-2xl font-bold mb-8">Profile</h1>
          <ProfileUpdateForm />
        </div>

        {/* Change Email */}
        <div className="border-b py-8">
          <h1 className="text-2xl font-bold mb-8">Change Email</h1>
          <EmailChangeForm />
        </div>
        {/* Change Password */}
        <div className="border-b py-8">
          <h1 className="text-2xl font-bold mb-8">Change Password</h1>
          <PasswordChangeForm />
        </div>

        <div className="mt-10">
          <Logout />
        </div>
      </div>
    </div>
  );
}
