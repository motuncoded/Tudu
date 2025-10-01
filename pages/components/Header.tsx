import Link from "next/link";
import React, { useEffect, useState } from "react";

type User = { email: string };

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data from API:", data);
        setUser(data.user);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/signin"; // Redirect
  };

  return (
    <header className="flex justify-between items-center p-4 relative">
      <div className="flex items-center gap-2">
        <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full" />
        <h1 className="text-3xl font-bold">
          <Link href="/">Tudu</Link>
        </h1>
      </div>

      <nav aria-label="Main Navigation" className="flex items-center">
        <div className="flex items-center justify-center space-x-4 mr-4 relative">
          {user ? (
            <div className="relative">
              {/* Profile circle */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center rounded-full bg-blue-700 text-white font-bold w-8 h-8 focus:outline-none"
              >
                {user.email.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signup"
              className="border-2 border-blue-700 px-6 py-2 rounded-sm bg-blue-700 hover:bg-text-800 text-white hover:bg-transparent hover:text-blue-800 transition-colors duration-200 mr-4"
            >
              Sign Up
            </Link>
          )}
        </div>

        <Link
          href="/todos"
          className="bg-transparent border-2 border-blue-700 px-4 py-2 rounded-sm text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-200"
        >
          View todos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
