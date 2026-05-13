#!/bin/bash
set -e

cd /home/ubuntu/gavangtv

echo "📥 Pull code mới..."
git pull origin main

echo "📦 Cài dependencies..."
npm install

echo "🔨 Build frontend..."
npm run build

echo "🎬 Tạo HLS..."
bash scripts/generate-hls.sh

echo "📋 Copy nginx config..."
sudo cp gavangtv.weblon.click.conf /etc/nginx/sites-available/
sudo cp api-gavangtv.weblon.click.conf /etc/nginx/sites-available/
sudo nginx -t && sudo systemctl reload nginx

echo "🔄 Restart backend..."
pm2 restart gavangtv-api

echo "✅ Deploy xong!"
