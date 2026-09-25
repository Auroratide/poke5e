# SeaweedFS and Storage

SeaweedFS is used as a local solution for user asset storage. It's compatible with the S3 SDK, so it can be swapped out for cloud-based solutions like AWS S3 and CloudFlare R2.

This image is included in docker-compose.yml. Start it with:

```
docker compose up -d
```

The `user-assets` bucket is created by default when run.

Once started, it lives at `http://localhost:9000`. You can also view the file browser at `http://localhost:9001`.

## Old MinIO Context

MinIO used to be used instead of SeaweedFS, but MinIO deprecated their public images and removed them. Therefore, this layer was replaced with Seaweed instead.

Seaweed tastes good in real life anyways.
