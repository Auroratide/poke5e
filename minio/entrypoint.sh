#!/bin/bash

minio server /data --console-address ":9001" &

echo "Waiting for MinIO to start..."
while ! curl -f http://localhost:9000/minio/health/live > /dev/null 2>&1; do
	sleep 2
done

echo "MinIO is ready. Setting up buckets..."
mc alias set local http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

echo "Creating buckets..."
mc mb local/user-assets --ignore-existing
mc anonymous set public local/user-assets

echo "MinIO setup complete."

wait
