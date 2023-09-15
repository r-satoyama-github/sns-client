"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };
  const handleMenuCloseLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">MOJIITO</Link>
        </h1>
        <nav
          className={
            isOpen
              ? "z-40 bg-gray-200 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
              : "fixed right-[-100%] md:right-4"
          }
        >
          <ul
            className={
              isOpen
                ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
                : "block md:flex md:gap-8"
            }
          >
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium w-44 text-center "
                  onClick={handleMenuClose}
                >
                  プロフィール
                </Link>
                <Link
                  href="/"
                  onClick={handleMenuCloseLogout}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium w-44 text-center"
                >
                  ログアウト
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={handleMenuClose}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium w-44 text-center"
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  onClick={handleMenuClose}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium w-44 text-center"
                >
                  サインアップ
                </Link>
              </>
            )}
          </ul>
        </nav>
        <button className="z-50 space-y-2 md:hidden" onClick={handleMenuOpen}>
          <span
            className={
              isOpen
                ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
                : "block w-8 h-0.5 bg-gray-100 duration-300"
            }
          />
          <span
            className={
              isOpen
                ? "block opacity-0 duration-300"
                : "block w-8 h-0.5 bg-gray-100 duration-300"
            }
          />
          <span
            className={
              isOpen
                ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
                : "block w-8 h-0.5 bg-gray-100 duration-300"
            }
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
