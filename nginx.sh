#!/bin/bash
echo "========== Nasgorcok Nginx Setup =========="

# Install
echo "Installing nginx + certbot..."
apt install -y nginx certbot python3-certbot-nginx

# Domain
DEFAULT_SITE="nasgorcok.com"
read -p "Domain (default: $DEFAULT_SITE): " SITE
SITE=${SITE:-$DEFAULT_SITE}

# Port Next.js
PORT=3000

CONF_FILE="/etc/nginx/sites-available/nasgorcok.conf"

cat > $CONF_FILE <<EOF
server {
    listen 80;
    server_name $SITE www.$SITE;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass         http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    access_log /var/log/nginx/${SITE}_access.log;
    error_log  /var/log/nginx/${SITE}_error.log;
}
EOF

# Hapus default, aktifkan config baru
rm -f /etc/nginx/sites-enabled/default
ln -sf $CONF_FILE /etc/nginx/sites-enabled/

# Test + reload
nginx -t && systemctl reload nginx

# SSL
echo "Setting up SSL untuk $SITE..."
certbot --nginx -d $SITE -d www.$SITE

nginx -t && systemctl reload nginx

echo "========== Done! https://$SITE =========="