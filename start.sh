#!/usr/bin/env bash
# start.sh — Khởi động prototype AI Travel Planner (Day 18 / Day 20)
# Cách dùng:  ./start.sh        (mặc định port 8080)
#             ./start.sh 9000   (port tuỳ chọn)

set -e
cd "$(dirname "$0")"

PORT="${1:-8080}"
URL="http://localhost:${PORT}"

# Tìm Python
if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "[!] Không tìm thấy Python. Cài tại https://www.python.org/downloads/"
  exit 1
fi

echo "[*] Khởi động server tại ${URL} (Ctrl+C để dừng)..."

# Mở browser (macOS: open, Linux: xdg-open)
( sleep 1
  if command -v open >/dev/null 2>&1; then open "$URL"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"
  fi ) >/dev/null 2>&1 &

exec "$PY" -m http.server "$PORT"
