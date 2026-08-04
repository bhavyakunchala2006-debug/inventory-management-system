# Inventra Backend API

Production-ready Express.js & MongoDB API service for Inventra Inventory Management System.

## Architecture

- **Config**: Database (`config/db.js`) & JWT setup.
- **Controllers**: HTTP Request handlers (`controllers/`).
- **Middleware**: Authentication (`protect`, `authorize`), Error Handler, Rate Limiting, File Uploads (`Multer`), Express Validator.
- **Models**: Mongoose schemas for `User`, `Product`, `Category`, `Supplier`, `InventoryLog`.
- **Routes**: RESTful API endpoints.
- **Services**: Encapsulated business logic layer.
- **Utils**: Standardized `ApiError`, `ApiResponse`, `asyncHandler`, and logger.
- **Seed**: Database initialization scripts (`npm run seed`).

## Running Locally

```bash
npm install
npm run seed     # Populate database with sample users, products, suppliers
npm run dev      # Start development server on port 5000
```
