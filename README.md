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




old .env file : 
AWS_ACCESS_KEY_ID=AKIA47GB7YMOHQU47MUV
AWS_SECRET_ACCESS_KEY=yIcuplNrQf09kULGVups+G91p+XFyM+8kv5mp0bL
BUCKET_NAME=blog-storage-printable
REGION=us-east-1
DATABASE_URL=postgresql://neondb_owner:npg_XRSN6kcE7ylA@ep-rough-glitter-a15ya1tf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2VjdXJlLXN3aWZ0LTczLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_uFVYZ5AX8Nh6V3jm2kcpvQRwISnBbuYluKyshnfu37
SIGNING_SECRET=whsec_123

PUSHER_APP_ID=1962552
PUSHER_KEY=7e1f499e8a4730060fd6
PUSHER_SECRET=0e3cd13a31bd56f8dfe6
PUSHER_CLUSTER=ap2
GOOGLE_API_BASE_URL=https://maps.googleapis.com/maps/api/distancematrix/json
DISTANCE_MATRIX_GOOGLE_API_KEY=AIzaSyBbS0wf98OmaJ9ecaxjGq3bH2dm64AJj-8
RESEND_API=re_BRYvaRZr_6zYuJ2yQ1TXBmBdBsWEENnra
# 

RAZORPAY_KEY_ID = rzp_test_7TyZL5TEpLytmQ
RAZORPAY_KEY_SECRET = 3Ks7TGo9RjkagnRDcJ4ALih0