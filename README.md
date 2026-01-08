# printablev2Backend
Backend


main  → production / final code
dev   → development / testing

Flow:

Work on dev
Push dev
Review
Merge into main



printablev2backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js                # Neon PostgreSQL connection
│   │   ├── env.js               # Environment variables
│   │   └── index.js
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.routes.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── merchant/
│   │   │   ├── merchant.controller.js
│   │   │   ├── merchant.service.js
│   │   │   ├── merchant.routes.js
│   │   │   └── merchant.validation.js
│   │   │
│   │   ├── admin/
│   │   │   ├── admin.controller.js
│   │   │   ├── admin.service.js
│   │   │   ├── admin.routes.js
│   │   │   └── admin.validation.js
│   │   │
│   │   └── orders/
│   │       ├── order.controller.js
│   │       ├── order.service.js
│   │       ├── order.routes.js
│   │       └── order.validation.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT verification
│   │   ├── role.middleware.js   # Role-based access (RBAC)
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   ├── response.js
│   │   └── logger.js
│   │
│   ├── routes/
│   │   └── index.js             # Combine all routes
│   │
│   ├── constants/
│   │   ├── roles.js             # user | merchant | admin
│   │   └── status.js
│   │
│   ├── app.js                   # Express app setup
│   └── server.js                # App start point
│
├── prisma/ OR db/
│   ├── schema.prisma OR sql/
│   │   ├── users.sql
│   │   ├── merchants.sql
│   │   └── orders.sql
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── nodemon.json
