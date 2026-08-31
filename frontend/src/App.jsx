import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8000";

function App() {
  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/food/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food_name: foodName,
          ingredients: ingredients
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis request failed");
      }

      const data = await response.json();
      setResult(data);
        } catch (err) {
      console.error("FoodGuardAI API error:", err);
      setError(err.message || "خطای نامشخص در درخواست API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>🛡️ FoodGuardAI</h1>
          <p>AI-powered Food Safety & Quality Analysis</p>
        </div>
        <span className="status">● API Ready</span>
      </header>

      <section className="hero">
        <h2>Food Safety Analysis</h2>
        <p>
          مواد غذایی را وارد کنید تا ایمنی کیفیت آلرنها و سطح ریسک بررسی شود.
        </p>
      </section>

      <section className="card">
        <form onSubmit={analyzeFood}>
          <label>نام غذا</label>
          <input
            type="text"
            placeholder="مثلاً Raw Chicken"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />

          <label>مواد تشکیلدهنده</label>
          <textarea
            placeholder="raw chicken, egg, milk"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "در حال تحلیل..." : "🔍 Analyze Food"}
          </button>
        </form>
      </section>

      {error && <div className="error">{error}</div>}

      {result && (
        <section className="result">
          <h2>{result.food_name}</h2>

          <div className="scores">
            <div className="score">
              <span>Safety Score</span>
              <strong>{result.safety_score}</strong>
              <small>/ 100</small>
            </div>

            <div className="score">
              <span>Quality Score</span>
              <strong>{result.quality_score}</strong>
              <small>/ 100</small>
            </div>

            <div className={`risk ${result.risk_level}`}>
              Risk: {result.risk_level.toUpperCase()}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="recommendations">
              <h3>Recommendations</h3>
              <ul>
                {result.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length === 0 && (
            <div className="safe">
              ✓ No immediate safety concerns detected.
            </div>
          )}
        </section>
      )}

      <footer>
        FoodGuardAI v0.1.0 · FastAPI + React
      </footer>
    </main>
  );
}

export default App;

