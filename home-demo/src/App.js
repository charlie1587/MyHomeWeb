import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import Recipes from './Recipes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-10">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <header className="bg-blue-600 text-white py-6">
                  <h1 className="text-6xl font-bold">2177 Rietta</h1>
                </header>
                <div className="mt-8 space-y-4">
                  <Link to="/shopping-list">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                      Go to Shopping List
                    </button>
                  </Link>
                  <Link to="/recipes">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
                      Go to Recipes
                    </button>
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
