# FoodGuardAI

AI-powered food safety and quality analysis platform built with FastAPI and React.

FoodGuardAI analyzes food names and ingredients to provide safety risk assessment, safety score, quality score, and recommendations through a clean web interface and production-ready REST API.

## Live Demo

- Frontend: https://mehreganfatemeh903-arch.github.io/FoodGuardAI/
- API: https://foodguardai.fastapicloud.dev
- API Documentation: https://foodguardai.fastapicloud.dev/docs
- GitHub: https://github.com/mehreganfatemeh903-arch/FoodGuardAI

## Features

- Food safety analysis
- Ingredient-based risk assessment
- Safety score from 0 to 100
- Quality score from 0 to 100
- Risk level classification
- Safety recommendations
- Persian-friendly food and ingredient input
- Responsive modern web interface
- FastAPI REST API
- React + Vite frontend
- Interactive API documentation
- Automated frontend deployment
- Backend automated testing
- GitHub Pages deployment
- Production FastAPI deployment

## Architecture

FoodGuardAI
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── models
│   │   ├── schemas
│   │   └── services
│   └── tests
├── frontend
│   ├── public
│   └── src
├── ml
├── .github
│   └── workflows
├── requirements.txt
├── pytest.ini
└── README.md

## Technology Stack

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Pydantic Settings
- Pytest
- HTTPX

### Frontend

- React
- Vite
- JavaScript
- CSS

### Deployment

- FastAPI Cloud
- GitHub Pages
- GitHub Actions

## API

### Analyze Food

POST /api/food/analyze

Example request:

{
  "food_name": "Chocolate Cake",
  "ingredients": [
    "flour",
    "egg",
    "milk",
    "chocolate",
    "butter"
  ]
}

Example response:

{
  "food_name": "Chocolate Cake",
  "risk_level": "low",
  "safety_score": 100,
  "quality_score": 100,
  "recommendations": []
}

## Local Development

### Clone the repository

git clone https://github.com/mehreganfatemeh903-arch/FoodGuardAI.git
cd FoodGuardAI

### Create and activate virtual environment

Windows PowerShell:

python -m venv .venv
.venv\Scripts\Activate.ps1

### Install backend dependencies

pip install -r requirements.txt

### Run backend

uvicorn backend.app.main:app --reload

Local API:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

### Run frontend

Open another terminal:

cd frontend
npm install
npm run dev

## Testing

Run the backend test suite from the project root:

pytest -q

Current verification:

5 passed

The project currently passes all backend tests. A dependency deprecation warning may be displayed by the testing environment, but it does not cause test failure.

## Production Build

Build the frontend:

cd frontend
npm run build

Production files are generated in:

frontend/dist

## Environment Variables

Sensitive configuration must be stored in environment variables and must not be committed to Git.

Use .env.example as the configuration template.

## Deployment

### Frontend

The React frontend is deployed to GitHub Pages using GitHub Actions.

Production frontend:

https://mehreganfatemeh903-arch.github.io/FoodGuardAI/

The Vite application uses the repository base path:

/FoodGuardAI/

### Backend

The FastAPI backend is deployed to FastAPI Cloud.

Production API:

https://foodguardai.fastapicloud.dev

API documentation:

https://foodguardai.fastapicloud.dev/docs

## CI/CD

Frontend deployment is automated through:

.github/workflows/deploy-frontend.yml

Changes pushed to the main branch can trigger the production frontend deployment workflow.

## Project Status

FoodGuardAI is currently a functional full-stack application with:

- Production frontend
- Production FastAPI backend
- Frontend-to-backend API integration
- Responsive user interface
- SEO metadata
- Favicon
- Automated frontend deployment
- Backend automated tests
- Production API documentation
- GitHub repository documentation

## Roadmap

Future improvements may include:

- Advanced allergen detection
- Expanded food safety knowledge base
- More detailed ingredient analysis
- User accounts and analysis history
- Analytics dashboard
- Improved ML-based risk prediction
- Multilingual interface
- Advanced reporting
- Production monitoring and observability
- Additional automated integration tests

## Disclaimer

FoodGuardAI is an analytical software project and should not be considered a substitute for professional medical, nutritional, regulatory, or food-safety advice.

Food safety decisions involving allergies, contamination, or health risks should be verified using appropriate professional and regulatory guidance.

## License

This project is currently provided for development and educational purposes.

A commercial licensing model can be introduced as the product evolves.

---

FoodGuardAI - AI-powered food safety and quality analysis.
