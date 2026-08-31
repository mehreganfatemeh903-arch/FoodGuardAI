# FoodGuardAI

**AI-powered food safety and quality analysis API built with FastAPI.**

FoodGuardAI is a backend API designed to analyze food ingredients and provide food safety and quality insights, including safety scoring, quality scoring, risk classification, allergen detection, and practical recommendations.

> **Current status:** Functional FastAPI backend with rule-based food analysis. The `ml/` directory is reserved for future machine-learning components.

## Features

* Food safety analysis
* Detection of high-risk ingredients
* Common allergen detection
* Food quality scoring
* Risk classification: `low`, `medium`, `high`
* REST API with FastAPI
* Interactive Swagger API documentation
* ReDoc API documentation
* Health check endpoint
* Environment-based configuration
* Automated tests with pytest
* Clean modular project structure
* Ready for future machine-learning integration

## Project Structure

```text
FoodGuardAI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── food.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── models/
│   │   ├── schemas/
│   │   │   └── food.py
│   │   ├── services/
│   │   │   └── food_analysis.py
│   │   └── main.py
│   └── tests/
│       ├── test_food.py
│       └── test_main.py
├── ml/
│   ├── src/
│   └── tests/
├── requirements.txt
├── pytest.ini
├── .env.example
├── .gitignore
└── README.md
```

## Technology Stack

* **Python 3.12+**
* **FastAPI**
* **Uvicorn**
* **Pydantic**
* **Pydantic Settings**
* **Pytest**
* **HTTPX**

## Requirements

* Python 3.12 or newer
* pip
* Git
* Virtual environment

## Installation

Clone the repository:

```bash
git clone https://github.com/mehreganfatemeh903-arch/FoodGuardAI.git
cd FoodGuardAI
```

Create a virtual environment:

### Windows PowerShell

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

## Configuration

Create a `.env` file in the project root based on `.env.example`.

Example:

```env
APP_NAME=FoodGuardAI
APP_ENV=development
DEBUG=true
```

The application uses environment-based configuration through `pydantic-settings`.

## Run the API

Start the development server:

```powershell
uvicorn backend.app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

## API Documentation

FastAPI automatically provides interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

## API Endpoints

### Root

```http
GET /
```

Example response:

```json
{
  "message": "FoodGuardAI API is running",
  "version": "0.1.0",
  "environment": "development"
}
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "FoodGuardAI",
  "environment": "development"
}
```

### Food Analysis

```http
POST /api/food/analyze
```

Example request:

```json
{
  "food_name": "Raw Chicken",
  "ingredients": [
    "raw chicken",
    "egg",
    "milk"
  ]
}
```

Example response:

```json
{
  "food_name": "Raw Chicken",
  "safety_score": 40.0,
  "quality_score": 100.0,
  "risk_level": "high",
  "recommendations": [
    "High-risk ingredients detected. Ensure proper cooking and storage.",
    "Potential allergens detected: egg, milk."
  ]
}
```

## Analysis Logic

### Safety Score

The safety score starts at `100`.

High-risk ingredients can reduce the safety score. The resulting score is used to determine the food risk level.

Current high-risk ingredients include:

* Raw chicken
* Raw meat
* Raw fish
* Raw egg
* Unpasteurized milk

### Quality Score

The quality score starts at `100`.

Ingredients associated with lower food quality reduce the score.

Current low-quality ingredients include:

* Sugar
* High fructose corn syrup
* Trans fat
* Hydrogenated oil
* Artificial flavor
* Artificial color

### Allergen Detection

FoodGuardAI currently checks for common allergens including:

* Milk
* Egg
* Peanut
* Nuts
* Soy
* Wheat
* Fish
* Shellfish

### Risk Classification

The API classifies the result into three levels:

```text
80 - 100  → low
50 - 79   → medium
0 - 49    → high
```

## Testing

Run the complete test suite:

```powershell
pytest -q
```

Current verified result:

```text
5 passed
```

The test suite covers the main API functionality, including:

* Normal food analysis
* High-risk ingredient detection
* Allergen detection
* Low-quality ingredient scoring
* Root and health endpoints

## Current Project Status

FoodGuardAI currently provides a functional and tested FastAPI backend for rule-based food safety and quality analysis.

The current implementation is intentionally rule-based and provides a clean foundation for future development.

The `ml/` directory is reserved for future machine-learning functionality, such as:

* Ingredient classification
* Food image analysis
* Risk prediction
* Nutritional analysis
* Machine-learning based food quality prediction

## Development Roadmap

Future development may include:

* Machine-learning models
* Food image recognition
* Nutrition and calorie analysis
* Database integration
* User authentication
* Analysis history
* Frontend web application
* Production deployment
* Automated CI/CD
* Expanded food and allergen databases

## Project Verification

The current project has been verified locally with:

```text
FastAPI API             ✓
Root endpoint           ✓
Health endpoint         ✓
Food analysis endpoint  ✓
Safety scoring          ✓
Quality scoring         ✓
Allergen detection      ✓
Risk classification     ✓
Automated tests         ✓
Git repository          ✓
GitHub synchronization  ✓
```

Current Git branch:

```text
main
```

Current verified commit:

```text
d9c2b9b
```

## License

This project is currently intended for educational and development purposes.
