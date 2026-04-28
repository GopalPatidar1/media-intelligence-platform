FROM minio/minio:latest

# Set default env (can override in Render dashboard)
ENV MINIO_ROOT_USER: ${MINIO_ROOT_USER}
ENV MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}

# Expose only ONE port (Render requirement)
EXPOSE 10000

# Run MinIO on single port
CMD ["server", "/data", "--address", ":10000"]