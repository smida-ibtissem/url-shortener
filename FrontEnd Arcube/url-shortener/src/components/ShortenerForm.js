import React, { useState } from "react";
import axios from "axios";

const ShortenerForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        longUrl,
      });

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          required
          placeholder="Enter a long URL"
          className="w-full p-2 border rounded"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-semibold">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default ShortenerForm;
