'use client';
import { useRouter } from 'next/navigation';
import css from './page.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import User from '@/types/user';
import { getMe, updateMe } from '@/lib/api/clientApi';

const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
        setUsername(data.username);
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };

    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateMe({ username });
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };
  if (!user) return null;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProfilePage;
