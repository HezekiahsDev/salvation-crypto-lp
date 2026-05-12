#!/usr/bin/env bash
set -e

DOMAIN="salvationacademy.com"
APP_PORT=9004
NGINX_AVAILABLE="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

echo "🚀 Starting setup for $DOMAIN"

# 1️⃣ Ensure script is run as root
if [[ $EUID -ne 0 ]]; then
  echo "❌ Please run this script as root or with sudo"
  exit 1
fi

# 2️⃣ Remove existing symlink (if any)
if [[ -L "$NGINX_ENABLED" ]]; then
  echo "🧹 Removing existing enabled site"
  rm -f "$NGINX_ENABLED"
fi

# 3️⃣ Remove existing config (if any)
if [[ -f "$NGINX_AVAILABLE" ]]; then
  echo "🧹 Removing existing available site config"
  rm -f "$NGINX_AVAILABLE"
fi

# 4️⃣ Create fresh Nginx config
echo "📝 Creating new Nginx config"

cat > "$NGINX_AVAILABLE" <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 5️⃣ Enable site
echo "🔗 Enabling site"
ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"

# 6️⃣ Test Nginx config
echo "🧪 Testing Nginx configuration"
nginx -t

# 7️⃣ Reload Nginx
echo "🔄 Reloading Nginx"
systemctl reload nginx

# 8️⃣ Run Certbot
echo "🔐 Requesting SSL certificate via Certbot"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect

# 9️⃣ Final check
echo "✅ Setup complete!"
echo "🌐 Your App should now be live at: https://$DOMAIN and https://www.$DOMAIN"
