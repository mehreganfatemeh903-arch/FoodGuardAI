import { useState } from "react";
import "./App.css";

const API_URL = "https://foodguardai.fastapicloud.dev";

const RISK_LABELS = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
};

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
        <div className="brand">
          <div className="brand-icon">🛡️</div>

          <div>
            <h1>FoodGuardAI</h1>
            <p>تحلیل هوشمند ایمنی و کیفیت غذا</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          سرویس آماده است
        </div>
      </header>

      <section className="hero">
        <div className="hero-badge">ایمنی غذایی هوشمند</div>

        <h2>تحلیل ایمنی غذا</h2>

        <p>
          مواد غذایی را وارد کنید تا ایمنی، کیفیت، آلرژن‌ها و سطح ریسک به‌صورت هوشمند بررسی شود.
        </p>
      </section>

      <section className="card analysis-card">
        <div className="card-header">
          <div>
            <h3>تحلیل غذای شما</h3>
            <p>اطلاعات غذا و مواد تشکیل‌دهنده را وارد کنید.</p>
          </div>

          <span className="card-icon">🔍</span>
        </div>

        <form onSubmit={analyzeFood}>
          <div className="form-group">
            <label htmlFor="foodName">نام غذا</label>

            <input
              id="foodName"
              type="text"
              placeholder="مثلاً کیک شکلاتی"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">مواد تشکیل‌دهنده</label>

            <textarea
              id="ingredients"
              placeholder="آرد تخم مرغ شیر شکلات"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />

            <span className="input-help">
              مواد را با کاما (,) از یکدیگر جدا کنید.
            </span>
          </div>

          <button
            className="analyze-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                در حال تحلیل...
              </>
            ) : (
              <>
                <span>💡</span>
                تحلیل غذا
              </>
            )}
          </button>
        </form>
      </section>

      {error && (
        <div className="error" role="alert">
          <span>⚠️</span>

          <div>
            <strong>خطا در تحلیل</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {result && (
        <section className="result" aria-live="polite">
          <div className="result-header">
            <div>
              <span className="result-label">نتیجه تحلیل</span>
              <h2>{result.food_name}</h2>
            </div>

            <div className={`risk risk-${result.risk_level}`}>
              <span className="risk-dot"></span>
              سطح ریسک: {RISK_LABELS[result.risk_level] || result.risk_level}
            </div>
          </div>

          <div className="scores">
            <div className="score-card">
              <span className="score-icon">🛡️</span>
              <span className="score-title">امتیاز ایمنی</span>
              <strong>{result.safety_score}</strong>
              <small>/ 100</small>
            </div>

            <div className="score-card">
              <span className="score-icon">✨</span>
              <span className="score-title">امتیاز کیفیت</span>
              <strong>{result.quality_score}</strong>
              <small>/ 100</small>
            </div>
          </div>

          {result.recommendations.length > 0 ? (
            <div className="recommendations">
              <div className="recommendations-title">
                <span>💡</span>
                <h3>توصیه‌ها</h3>
              </div>

              <ul>
                {result.recommendations.map((item, index) => (
                  <li key={index}>
                    <span>✨</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="safe">
              <span>✨</span>

              <div>
                <strong>نگرانی ایمنی فوری وجود ندارد</strong>
                <p>
                  در این تحلیل هیچ نگرانی ایمنی فوری‌ای شناسایی نشد.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      <footer>
        <strong>FoodGuardAI</strong>
        <span>·</span>
        <span>قدرت‌گرفته از FastAPI و React</span>
      </footer>
    </main>
  );
}

export default App;