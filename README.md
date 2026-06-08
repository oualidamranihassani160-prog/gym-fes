# Gym FES

Simple instructions to get this project running locally after cloning.

**Prerequisites**
- **PHP**: 8.1+ and extensions required by Laravel
- **Composer**: for PHP dependencies
- **Node.js**: 16+ and **npm** or **yarn**
- **Database**: MySQL, MariaDB, or PostgreSQL
- **Git**

**Clone**

```bash
git clone git@github.com:oualidamranihassani160-prog/gym-fes.git
cd gym-fes
```

**Backend (Laravel)**
- **Install dependencies**:

```bash
cd backend
composer install
```

- **Environment**: create `.env` from example and set DB credentials:

```bash
cp .env.example .env
php artisan key:generate
```

- **Database**:

```bash
php artisan migrate
php artisan db:seed
```

- **Storage link**:

```bash
php artisan storage:link
```

- **Frontend assets for Laravel (optional)**:

```bash
npm install
npm run dev
```

- **Run backend**:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

Visit `http://127.0.0.1:8000` (or your configured `APP_URL`).

**Frontend (separate React app)**
- This project also contains a standalone frontend in `frontend/`.

```bash
cd frontend
npm install
# Install additional frontend packages used by this project
npm install @reduxjs/toolkit tailwindcss@4 axios lucide-react
npm run dev
```

Open the dev URL shown by Vite (commonly `http://localhost:5173`).