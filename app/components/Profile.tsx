"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ProfileType } from "../types/ProfileType";
import apiClient from "../lib/apiClient";

type Props = {
  profile: ProfileType;
};

const Profile = (props: Props) => {
  const { profile } = props;
  const [bio, setBio] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setBio(profile.bio);
  }, []);

  const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(!isEdit);

    if (isEdit) {
      await apiClient
        .put(`/user/profile/${profile.userId}`, {
          bio: bio,
        })
        .then((res) => {
          setBio(res.data.bio);
        });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full mr-4"
          alt="User Avatar"
          src={profile.profileImageUrl}
        />
        <div className="container w-full">
          <h2 className="text-2xl font-semibold mb-1">
            {profile.user.username}
          </h2>
          {isEdit ? (
            <div className="container flex w-full justify-between items-center">
              <input
                className="border-gray-300 bg-gray-100 px-2 py-1 rounded text-gray-600 focus:border-blue-200 focus:ring-blue-200"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={(e) => handleEditButton(e)}
                className="bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
              >
                保存
              </button>
            </div>
          ) : (
            <div className="container flex w-full justify-between items-center">
              <p className="text-gray-600 px-2 py-1">{bio}</p>
              <button
                type="button"
                onClick={(e) => handleEditButton(e)}
                className="bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
              >
                編集
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
