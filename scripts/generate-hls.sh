#!/bin/bash
# Generate HLS segments from source video
# Run this on the VPS after git pull

set -e

VIDEO_DIR="/home/ubuntu/gavangtv/video"
HLS_DIR="/home/ubuntu/gavangtv/server/public/hls"
SOURCE_VIDEO="$VIDEO_DIR/videoplayback.mp4"

echo "🎬 Generating HLS segments..."

# Create output directory
mkdir -p "$HLS_DIR"

# Check if source video exists
if [ ! -f "$SOURCE_VIDEO" ]; then
    echo "❌ Source video not found: $SOURCE_VIDEO"
    exit 1
fi

# Check if HLS segments already exist
if [ -f "$HLS_DIR/stream.m3u8" ]; then
    echo "✅ HLS segments already exist. Skipping generation."
    echo "   To regenerate, delete $HLS_DIR and run this script again."
    exit 0
fi

# Convert MP4 to HLS
ffmpeg -i "$SOURCE_VIDEO" \
    -codec: copy \
    -start_number 0 \
    -hls_time 10 \
    -hls_list_size 0 \
    -hls_playlist_type vod \
    -f hls \
    "$HLS_DIR/stream.m3u8"

echo "✅ HLS segments generated successfully!"
echo "   Playlist: $HLS_DIR/stream.m3u8"
echo "   Segments: $(ls "$HLS_DIR"/*.ts 2>/dev/null | wc -l) .ts files"
