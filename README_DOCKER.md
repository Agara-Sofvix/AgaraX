# Docker Deployment Guide: AgaraX

This project is fully dockerized and can be launched with a single command.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## How to Run

1.  **Build and Start**:
    Run the following command in the project root:
    ```bash
    docker-compose up --build
    ```

2.  **Access the Platform**:
    - **Frontend**: `http://localhost:3000`
    - **Backend API**: `http://localhost:5000`
    - **MongoDB**: `localhost:27017`

3.  **Stopping the Containers**:
    ```bash
    docker-compose down
    ```

## Deployment Notes
- **API URL**: The project is configured with `NEXT_PUBLIC_API_URL=http://localhost:5000` for local development. If deploying to a remote server, update this value in the `docker-compose.yml` to point to the server's IP or domain.
## Persistence
- **MongoDB Data**: Persisted in a Docker volume named `mongodb_data`.
- **Uploaded Resumes**: Persisted in the `./uploads` directory on the host, mapped to `/app/uploads` in the backend container.

## Nginx Configuration
The platform uses Nginx as a reverse proxy, handling:
- **Port 80**: Public entry point.
- **Static Files**: Serving Next.js assets and uploaded resumes.
- **Load Balancing/Timeouts**: Configured for large file uploads (up to 10MB) with extended timeouts.

## Logs
To view logs for all services:
```bash
docker-compose logs -f
```
