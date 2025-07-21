"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { AuthUserData, editUser } from "@/lib/api/clientApi";
// import { UpdateUserProps } from "@/types/user";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

const Edit = () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const userName = user?.username ?? "";
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = String(formData.get("username")).trim();

    if (user) {
      const updateUser: AuthUserData = {
        username,
        email: user.email,
      };

      try {
        const response = await editUser(updateUser);
        setUser(response);
        router.push("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBack = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={userName}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;