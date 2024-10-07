import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import Recipes from './Recipes';
import FoodExpiry from './FoodExpiry'; // 新增的组件

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
                <div className="mt-8 space-y-4 flex flex-col items-center">
                  <Link to="/shopping-list">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition mb-4">
                      Go to Shopping List
                    </button>
                  </Link>
                  <Link to="/recipes">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition mb-4">
                      Go to Recipes
                    </button>
                  </Link>
                  <Link to="/food-expiry">
                    <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
                      Record Food Expiry
                    </button>
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/food-expiry" element={<FoodExpiry />} /> {/* 新增的路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;