FROM minio/minio:latest

# Set default env (can override in Render dashboard)
ENV MINIO_ROOT_USER=minioadmin
ENV MINIO_ROOT_PASSWORD=minioadmin123

# Expose only ONE port (Render requirement)
EXPOSE 10000

# Run MinIO on single port
CMD ["server", "/data", "--address", ":10000", "--console-address", ":10000"]