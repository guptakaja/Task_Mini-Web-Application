import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultsDashboard, { Repo } from './components/ResultsDashboard';

const PAGE_SIZE = 3;

const App: React.FC = () => {
  const [results, setResults] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  const fetchResults = async (searchKeyword: string, pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      await fetch('https://task-backend-lrnu.onrender.com/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: searchKeyword }),
      });

      const res = await fetch(
        `https://task-backend-lrnu.onrender.com/api/results?keyword=${searchKeyword}&page=${pageNum}&limit=${PAGE_SIZE}`
      );

      if (!res.ok) throw new Error('Failed to fetch results');

      const data = await res.json();
      setResults(data.results);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
      setPage(pageNum);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    fetchResults(searchKeyword, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchResults(keyword, newPage);
  };

  useEffect(() => {
  }, []);

  return (
    <div className="w-full bg-gray-50">
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex flex-col items-center justify-start">
        <h1 className="w-full text-4xl font-extrabold text-center mb-8 text-purple-700 drop-shadow-lg py-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-100">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-700 to-blue-700">
            API-Driven Mini Web App
          </span>
        </h1>

        <div className="w-full">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        <div className="w-full">
          <ResultsDashboard
            results={results}
            loading={loading}
            error={error}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
