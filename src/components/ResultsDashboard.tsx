import React from 'react';
import { FaGithub } from "react-icons/fa6";

export interface Repo {
  _id?: string;
  name: string;
  html_url: string;
  description?: string;
  owner?: { login: string };
}

interface ResultsDashboardProps {
  results: Repo[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  results, 
  loading, 
  error, 
  page, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex flex-col items-center justify-start">
      <div className="w-full px-2">
        <h2 className="text-4xl font-extrabold mt-10 text-center text-purple-700 flex items-center justify-center gap-3 drop-shadow-lg">
          {FaGithub({ className: "inline-block text-5xl text-pink-500" })}
          Results Dashboard
        </h2>

        <div className="flex flex-col justify-start items-center">
          {error && <div className="text-center text-xl text-red-600 font-bold">{error}</div>}
          {loading && <div className="text-center text-xl text-purple-700 font-bold animate-pulse">Loading...</div>}

          {results.length === 0 && !loading && !error && (
            <div className="text-gray-400 text-center text-lg">No results found.</div>
          )}

          <div className="flex flex-col gap-6 w-full mt-6">
            {results.map((repo) => (
              <div key={repo.html_url} className="w-full bg-gradient-to-br from-white via-blue-50 to-purple-100 border border-purple-200 rounded-3xl p-6 shadow-md">
                {FaGithub({ className: "text-pink-500 text-4xl flex-shrink-0 mb-2" })}
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-700 font-bold text-2xl hover:underline"
                >
                  {repo.name}
                </a>
                <div className="text-base text-gray-700 mt-2">
                  {repo.description || <span className="italic text-gray-400">No description</span>}
                </div>
                {repo.owner && (
                  <div className="text-sm text-blue-600 mt-3">
                    Owner: <span className="font-semibold">{repo.owner.login}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8 mb-8">
          <button
            className="px-6 py-3 rounded-2xl bg-pink-200 hover:bg-pink-300 text-purple-700 font-bold shadow-lg transition"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="px-4 text-xl text-purple-700 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            className="px-6 py-3 rounded-2xl bg-pink-200 hover:bg-pink-300 text-purple-700 font-bold shadow-lg transition"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsDashboard;
