# Trabahanap Backend API

A Spring Boot REST API for the Trabahanap job portal application.

## Technologies Used

- **Spring Boot 3.2.0** - Java framework for building web applications
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **PostgreSQL** - Database
- **JWT (JSON Web Tokens)** - Authentication tokens
- **Maven** - Dependency management and build tool

## Project Structure

```
src/main/java/com/trabahanap/
├── config/          # Configuration classes (Security, JWT)
├── controller/      # REST API controllers
├── dto/            # Data Transfer Objects
├── exception/      # Custom exceptions and global exception handler
├── model/          # JPA entities
├── repository/     # JPA repositories
├── service/        # Business logic services
└── TrabahanapApplication.java  # Main application class
```

## Features

- JWT-based authentication
- Role-based authorization (USER, EMPLOYER, ADMIN)
- User registration and login
- PostgreSQL database integration
- Global exception handling
- CORS configuration
- Security configuration
- Health check endpoint

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL database

### Database Setup

1. Create a PostgreSQL database named `trabahanap_db`
2. Update the database configuration in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/trabahanap_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Environment Variables

Set the following environment variables:

- `DB_USERNAME` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password  
- `JWT_SECRET` - JWT secret key (minimum 256 bits)

### Running the Application

1. Clone the repository
2. Navigate to the backend directory
3. Configure your database settings
4. Run the application:

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

## API Endpoints

### Public Endpoints

- `POST /auth/signin` - User login
- `POST /auth/signup` - User registration
- `GET /health` - Health check

### Protected Endpoints

- `GET /api/test/user` - User content (requires authentication)
- `GET /api/test/employer` - Employer content (requires EMPLOYER role)
- `GET /api/test/admin` - Admin content (requires ADMIN role)

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **ROLE_USER** - Regular job seekers
- **ROLE_EMPLOYER** - Companies posting jobs
- **ROLE_ADMIN** - System administrators

## Development

### Adding New Features

1. Create models in the `model` package
2. Create repositories in the `repository` package
3. Implement business logic in the `service` package
4. Create DTOs in the `dto` package
5. Add controllers in the `controller` package

### Database Migration

The application uses Hibernate's `ddl-auto=update` strategy. For production, consider using Flyway or Liquibase for database migrations.

## Security Notes

- Change the default JWT secret in production
- Use environment variables for sensitive configuration
- Enable HTTPS in production
- Configure proper CORS origins for production
