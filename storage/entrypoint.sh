#!/bin/sh

weed server -dir=/data -s3 -s3.config=/etc/seaweedfs/s3.json -master.volumeSizeLimitMB=64 -volume.max=0 &

echo "Waiting for SeaweedFS to start..."
while ! curl -f http://localhost:8333/healthz > /dev/null 2>&1; do
	sleep 2
done

echo "SeaweedFS is ready. Setting up buckets..."
echo "s3.bucket.create -name user-assets" | weed shell

echo "SeaweedFS setup complete."

wait
