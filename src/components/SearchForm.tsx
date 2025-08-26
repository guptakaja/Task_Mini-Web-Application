import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (keyword: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex gap-4 items-center justify-center mb-4 px-2"
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
        className="flex-1 max-w-2xl border-2 border-purple-300 bg-purple-50 text-purple-700 
                   rounded-2xl px-5 py-3 text-lg shadow focus:border-pink-400 
                   focus:outline-none transition"
        disabled={loading}
      />

      <button
        type="submit"
        className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow 
                   hover:bg-pink-600 disabled:opacity-50 transition"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;
