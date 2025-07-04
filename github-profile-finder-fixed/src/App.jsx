import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUser(res.data);
      setError('');
    } catch (err) {
      setError('User not found');
      setUser(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 transition-all duration-500">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">GitHub Profile Finder</h1>
      <input
        type="text"
        placeholder="Enter GitHub Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 w-full max-w-md border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <button
        onClick={fetchUser}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-lg transition"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {user && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl max-w-md w-full transition-all duration-500">
          <div className="flex items-center space-x-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name || user.login}</h2>
              <p className="text-sm text-gray-500">@{user.login}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{user.bio}</p>
          <div className="mt-4 grid grid-cols-3 text-center text-sm text-gray-600">
            <div><strong>{user.public_repos}</strong><br />Repos</div>
            <div><strong>{user.followers}</strong><br />Followers</div>
            <div><strong>{user.following}</strong><br />Following</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
