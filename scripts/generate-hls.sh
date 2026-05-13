#!/bin/bash
set -e

HLS_DIR="/home/ubuntu/gavangtv/server/public/hls"
SOURCE_VIDEO="/home/ubuntu/gavangtv/video/videoplayback.mp4"

mkdir -p "$HLS_DIR"

if ! command -v ffmpeg &> /dev/null; then
    echo "📦 Cài ffmpeg..."
    sudo apt update && sudo apt install -y ffmpeg
fi

if [ ! -f "$SOURCE_VIDEO" ]; then
    echo "❌ Không tìm thấy video: $SOURCE_VIDEO"
    exit 1
fi

if [ -f "$HLS_DIR/stream.m3u8" ]; then
    echo "✅ HLS đã tồn tại, bỏ qua. Xóa $HLS_DIR để tạo lại."
    exit 0
fi

ffmpeg -i "$SOURCE_VIDEO" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -hls_playlist_type vod -f hls "$HLS_DIR/stream.m3u8"

echo "✅ Tạo HLS thành công! $(ls "$HLS_DIR"/*.ts | wc -l) segments"
