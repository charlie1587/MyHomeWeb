import React, { useState } from 'react';

import './styles/flipcard.css';

const recipesData = [
  {
    id: 1,
    nameChinese: '宫保鸡丁',
    nameEnglish: 'Kung Pao Chicken',
    summary: '鸡肉丁和花生的辣味爆炒。',
    details: '1. 鸡肉切丁，加入淀粉腌制。\n2. 热油中炒香辣椒、花椒，加入鸡丁煸炒。\n3. 加入调味汁、花生，快速翻炒均匀，出锅。',
  },
  {
    id: 2,
    nameChinese: '鱼香肉丝',
    nameEnglish: 'Yu Xiang Shredded Pork',
    summary: '酸甜辣的猪肉丝炒菜。',
    details: '1. 猪肉切丝，加入调味料腌制。\n2. 炒香姜蒜和泡椒，加入猪肉煸炒。\n3. 加入调味汁，炒至入味，出锅。',
  },
  // 可以添加更多食谱
];

function Recipes() {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold text-center mb-6">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <p class="title">FLIP CARD</p>
                    <p>Hover Me</p>
                </div>
                <div class="flip-card-back">
                    <p class="title">BACK</p>
                    <p>Leave Me</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function RecipeCard({ recipe }) {
    const [flipped, setFlipped] = useState(false);
  
    const handleFlip = () => {
      setFlipped(!flipped);
    };
  
    return (
      <div
        className="w-full h-64 cursor-pointer"
        onClick={handleFlip}
        style={{ perspective: '1000px' }} // Adds perspective to give a 3D effect.
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front of the Card */}
          <div
            className="absolute w-full h-full bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <h3 className="text-2xl font-semibold mb-2">
              {recipe.nameChinese} ({recipe.nameEnglish})
            </h3>
            <p className="text-gray-700">{recipe.summary}</p>
          </div>
  
          {/* Back of the Card */}
          <div
            className="absolute w-full h-full bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col justify-center items-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h3 className="text-2xl font-semibold mb-2">
              {recipe.nameChinese} ({recipe.nameEnglish})
            </h3>
            <pre className="text-gray-700 whitespace-pre-wrap">{recipe.details}</pre>
          </div>
        </div>
      </div>
    );
  }

export default Recipes;
