# MinIO and Storage

MinIO is used as a local solution for user asset storage. It's compatible with the S3 SDK, so it can be swapped out for cloud-based solutions like AWS S3 and CloudFlare R2.

This image is included in docker-compose.yml. Start it with:

```
docker compose up -d
```

The `user-assets` bucket is created by default when run.

Once started, it lives at `http://localhost:9000`. You can also view the dashboard at `http://localhost:9001`.

## Why the image comes from quay.io

MinIO stopped publishing to Docker Hub — the `minio/minio` and `minio/mc`
repositories there no longer exist, so `FROM minio/minio:latest` now 404s.
The images are still published at `quay.io/minio/minio`, which is where the
Dockerfile pulls from.

The tag is pinned rather than `latest` because upstream community releases have
stopped; `RELEASE.2025-09-07T16-13-09Z` is the last one. Pinning keeps the build
reproducible instead of silently tracking whatever `latest` happens to point at.
