import apiClient from "@/app/lib/apiClient";
import { PostType } from "@/app/types/PostType";
import { ProfileType } from "@/app/types/ProfileType";
import { error } from "console";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const profile: ProfileType = await apiClient
    .get(`/user/profile/${userId}`)
    .then((res) => res.data)
    .catch((error) => notFound());

  const posts: PostType[] = await apiClient
    .get(`/posts/${userId}`)
    .then((res) => res.data);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={profile.profileImageUrl}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile.user.username}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>

        {posts.map((post: PostType) => (
          <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={post.author.profile?.profileImageUrl}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {post.author.username}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
