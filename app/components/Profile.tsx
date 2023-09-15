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
    <div className="bg-white shadow-md rounded-lg py-6 px-3 mb-4">
      <div className="flex items-center w-full">
        <img
          className="w-20 h-20 rounded-full mr-4"
          alt="User Avatar"
          src={profile.profileImageUrl}
        />
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-1">
            {profile.user.username}
          </h2>
          {isEdit ? (
            <div className="container w-full justify-between items-center flex">
              <input
                className="border-gray-300 bg-gray-100 px-2 py-1 rounded text-gray-600 text-xs md:text-sm w-full flex-grow"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={(e) => handleEditButton(e)}
                className="bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded text-xs md:text-sm col-span-2 w-16 md:w-24 ml-1"
              >
                保存
              </button>
            </div>
          ) : (
            <div className="container w-full justify-between items-center flex">
              <p className="text-gray-600 px-2 py-1 text-xs md:text-sm flex-grow">
                {bio}
              </p>
              <button
                type="button"
                onClick={(e) => handleEditButton(e)}
                className="bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded text-xs md:text-sm   w-16 md:w-24"
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
