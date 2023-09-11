import Profile from "@/app/components/Profile";
import apiClient from "@/app/lib/apiClient";
import { PostType } from "@/app/types/PostType";
import { ProfileType } from "@/app/types/ProfileType";
import { error } from "console";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import React, { Suspense, useEffect, useState } from "react";

const getProfile = async (userId: string) => {
  return await apiClient.get(`/user/profile/${userId}`).then((res) => res.data);
};

const getPosts = async (userId: string) => {
  return await apiClient.get(`/posts/${userId}`).then((res) => res.data);
};
const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  // const profile: ProfileType = await apiClient
  //   .get(`/user/profile/${userId}`)
  //   .then((res) => res.data)
  //   .catch((error) => notFound());

  // const posts: PostType[] = await apiClient
  //   .get(`/posts/${userId}`)
  //   .then((res) => res.data);

  const profile = await getProfile(userId);
  const posts = await getPosts(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Profile profile={profile} />
        </Suspense>

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
