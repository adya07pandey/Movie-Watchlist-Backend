# 🎬 Movie Watchlist Backend API

A production-style backend API for managing a personal movie watchlist. This project demonstrates **authentication, authorization, validation, database design, and clean REST APIs** using modern backend tools.

This is my **first complete backend project**, built with real-world practices and tested using Postman and pgAdmin 4.

---

## 🚀 Features

* User authentication (Register / Login)
* JWT-based protected routes
* Add movies to personal watchlist
* Update watchlist items (status, runtime, notes)
* Remove movies from watchlist
* Input validation using **Zod**
* Prisma ORM with PostgreSQL

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL** (via pgAdmin 4)
* **Prisma ORM**
* **JWT Authentication**
* **Zod** (request validation)
* **Postman** (API testing)

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── watchlistcontroller.js
│   ├── middleware/
│   │   ├── authmiddleware.js
│   │   └── validaterequest.js
│   ├── routes/
│   │   ├── authroutes.js
│   │   └── watchlistroutes.js
│   ├── utils/
│   │   └── generatetoken.js
│   ├── validators/
│   │   └── watchlistvalidators.js
│   └── index.js
└── package.json
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server returns a **JWT token**
3. Token must be sent in headers:

```
Authorization: Bearer <token>
```

All watchlist routes are protected using authentication middleware.

---

## ✅ Validation (Zod)

All request bodies are validated using **Zod schemas** before reaching controllers.

Examples:

* Validates UUID format for `movieId`
* Ensures `status` is one of:

  * `PLANNED`
  * `WATCHING`
  * `COMPLETED`
  * `DROPPED`
* Runtime must be an integer between 1–500 minutes

Invalid requests return clear error messages with `400 Bad Request`.

---

## 📌 API Endpoints

### Auth Routes

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

### Watchlist Routes (Protected)

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /watchlist     | Add movie to watchlist |
| PUT    | /watchlist/:id | Update watchlist item  |
| DELETE | /watchlist/:id | Remove from watchlist  |

---

## 🧪 Testing

* APIs tested using **Postman**
* Database inspected and managed using **pgAdmin 4**

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Configure `.env`

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret
```

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

5. Start the server

```bash
npm run dev
```

---

## 🌱 Learning Outcomes

* Designing RESTful APIs
* Implementing authentication & authorization
* Using Prisma with PostgreSQL
* Validating requests using Zod
* Structuring scalable backend projects

---

## 🔮 Future Improvements

* Pagination & filtering
* Movie ratings
* Public movie discovery API integration
* Refresh tokens
* Deployment (Docker / Cloud)

---

## 👤 Author

**Adya Pandey**
Backend Developer (Learning Phase)

---

