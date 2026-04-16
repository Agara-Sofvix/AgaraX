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
- **Persistence**: MongoDB data is persisted in a Docker volume named `mongodb_data`.

## Logs
To view logs for all services:
```bash
docker-compose logs -f
```
