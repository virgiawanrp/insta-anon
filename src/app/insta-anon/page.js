"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/instagram?ig=${query}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Untuk memverifikasi data yang diterima

      setResults(data); // Simpan data yang diterima ke state
    } catch (err) {
      setError("Error fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="results mt-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : results ? (
            // Jika results adalah array, lakukan iterasi
            results.map((result, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    crossOrigin="anonymous"
                    src={result.profile_picture} // Gambar profil
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {result.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      User ID (PK): {result.user_id}
                    </p>
                  </div>
                </div>

                {/* Follower & Following */}
                <div className="flex space-x-6 mt-6">
                  <div className="flex-1 text-center border p-4 rounded-lg">
                    <p className="text-lg font-semibold text-gray-700">
                      Followers
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.follower}
                    </p>
                  </div>
                  <div className="flex-1 text-center border p-4 rounded-lg">
                    <p className="text-lg font-semibold text-gray-700">
                      Following
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.following}
                    </p>
                  </div>
                </div>

                {/* Story Section */}
                <div className="story-section mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Stories:
                  </h3>
                  {result.story && result.story.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.story.map((story, storyIndex) => {
                        // Jika media adalah gambar (media_type = 1)
                        const isImage = story.media_type === 1;
                        const mediaUrl = isImage
                          ? story.image_versions2?.candidates[0]?.url // URL gambar
                          : story.video_versions?.[0]?.url; // URL video

                        return (
                          <div key={storyIndex} className="relative">
                            {isImage ? (
                              <img
                                crossOrigin="anonymous"
                                src={mediaUrl}
                                alt={`Story ${storyIndex + 1}`}
                                className="rounded-md shadow-md w-full h-auto"
                              />
                            ) : (
                              <video
                                controls
                                className="rounded-md shadow-md w-full h-auto"
                              >
                                <source src={mediaUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-gray-600">
                      fitur story masih dalam tahap pengembangan..
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              Masukkan username atau userId untuk memulai pencarian.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
