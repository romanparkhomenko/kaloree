import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const MealDraft: React.FC = () => {
  const [food, setFood] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [grams, setGrams] = useState(null);
  const [ounces, setOunces] = useState(null);
  const [calories, setCalories] = useState(null);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { food, foodCategory, grams, ounces, calories };
      await fetch(`/api/meal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Log A Meal</h1>
          <input
            autoFocus
            onChange={e => setFood(e.target.value)}
            placeholder="Food"
            type="text"
            value={food}
          />
          <input
            autoFocus
            onChange={e => setFoodCategory(e.target.value)}
            placeholder="Food Category (ie: Carbs)"
            type="text"
            value={foodCategory}
          />
          <input
            autoFocus
            onChange={e => setGrams(parseInt(e.target.value))}
            placeholder="Grams"
            type="number"
            value={grams}
          />
          <input
            autoFocus
            onChange={e => setOunces(parseInt(e.target.value))}
            placeholder="Ounces"
            type="number"
            value={ounces}
          />
          <input
            autoFocus
            onChange={e => setCalories(parseInt(e.target.value))}
            placeholder="Calories"
            type="number"
            value={calories}
          />

          <input disabled={!food || !foodCategory} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        input[type='number'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default MealDraft;
