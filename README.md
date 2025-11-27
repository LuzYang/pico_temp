# FlaskBlog

A lightweight example blog application built with Flask. This project demonstrates common blog features: user authentication, post creation, comments, categories & tags, and a simple admin area. It is intended as a learning resource, a skeleton for new projects, or a starting point for further development.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Database Migrations](#database-migrations)
- [Running Tests](#running-tests)
- [Deployment Recommendations](#deployment-recommendations)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Credits](#credits)
- [License](#license)

## Features
- User registration / login / logout
- Create, edit, delete posts (Markdown supported)
- Categories and tags for posts
- Comment system (optional moderation)
- Basic admin pages for site management
- Environment-variable-based configuration and database migrations

> Note: The exact features available depend on the repository code. This README is a general template. I can inspect the repository and tailor this README to reflect exact routes, commands, and files if you’d like.

## Tech Stack
- Python + Flask
- Flask-Login for authentication
- Flask-Migrate (Alembic) for database migrations
- Flask-WTF for forms
- SQLAlchemy ORM
- Jinja2 templates
- SQLite by default (PostgreSQL recommended for production)

## Prerequisites
- Python 3.8+
- pip
- Optional: PostgreSQL (for production)

## Quick Start (development)
1. Clone the repository:
   ```
   git clone https://github.com/LuzYang/flaskblog.git
   cd flaskblog
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv

   # macOS / Linux
   source venv/bin/activate

   # Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create environment variables (see Configuration below) or add a `.env` file.

5. Initialize and migrate the database:
   ```
   flask db init         # only if migrations haven't been initialized
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. Run the development server:
   ```
   # macOS / Linux
   export FLASK_APP=run.py
   export FLASK_ENV=development
   flask run

   # Windows (PowerShell)
   $env:FLASK_APP = "run.py"
   $env:FLASK_ENV = "development"
   flask run
   ```

Open http://127.0.0.1:5000 in your browser.

## Configuration
Use environment variables or a `.env` file to configure the app. Common variables:

```
# .env example
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///data.db
# For PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

MAIL_SERVER=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=you@example.com
MAIL_PASSWORD=your-mail-password
```

Projects typically use python-dotenv or a similar library to load `.env` into the environment.

## Database Migrations (Flask-Migrate)
If the project uses Flask-Migrate:
- Initialize (first time only): `flask db init`
- Generate a migration: `flask db migrate -m "migration message"`
- Apply migrations: `flask db upgrade`
- Roll back: `flask db downgrade`

## Running Tests
If tests exist (pytest example):
1. Install dev/test dependencies:
   ```
   pip install -r requirements-dev.txt
   ```
2. Run tests:
   ```
   pytest
   ```

Adjust commands to match the test framework used in the repository.

## Deployment Recommendations
- Use Gunicorn + Nginx for production (Nginx as reverse proxy, static files, SSL termination):
  ```
  gunicorn -w 4 -b 0.0.0.0:8000 run:app
  ```
- Use PostgreSQL or another production-grade RDBMS.
- Manage secrets (SECRET_KEY, DATABASE_URL, MAIL_*) via environment variables or a secret manager.
- Use systemd / Supervisor to manage Gunicorn processes.
- Containerize with Docker for reproducible deployments; deploy to Heroku, DigitalOcean, AWS, etc.

## Contributing
Contributions are welcome. Suggested workflow:
1. Fork the repository
2. Create a feature branch
3. Commit changes and push the branch
4. Open a Pull Request with a description of changes and testing steps

Please check for a CONTRIBUTING.md or existing project guidelines before submitting large changes.

## FAQ
Q: How do I seed initial data?
A: Create a script (e.g., `scripts/seed.py`) or use `flask shell` to insert initial records.

Q: How do I enable email (signup confirmation, notifications)?
A: Configure mail settings (MAIL_SERVER, MAIL_USERNAME, MAIL_PASSWORD) and enable Flask-Mail or a similar extension.

## Credits
This project is based on common Flask patterns and community examples. Thanks to the Flask documentation and community tutorials.

## License
Please add a LICENSE file at the repository root and update this section to indicate the chosen license (for example, MIT). The repository currently does not specify a license.
