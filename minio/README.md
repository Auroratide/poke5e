# MinIO and Storage

MinIO is used as a local solution for user asset storage. It's compatible with the S3 SDK, so it can be swapped out for cloud-based solutions like AWS S3 and CloudFlare R2.

This image is included in docker-compose.yml. Start it with:

```
docker compose up -d
```

The `user-assets` bucket is created by default when run.

Once started, it lives at `http://localhost:9000`. You can also view the dashboard at `http://localhost:9001`.