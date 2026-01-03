#!/bin/sh

# --- Config ---
REPO_URL="https://github.com/semukhin/sem.git"
APP_DIR="/var/www/sem"
NODE_VERSION="20.x"
DOMAIN="slavicemigrantsministry.org www.slavicemigrantsministry.org"
PORT=3000

# --- Logs ---
LOG_FILE="/var/log/cloud-init-deployment.log"
exec > "$LOG_FILE" 2>&1
echo "Starting deployment script..."

# 1. Update & Upgrade System
echo "Updating system packages..."
apt-get update -y && apt-get upgrade -y

# 2. Install Essentials
echo "Installing essential packages..."
apt-get install -y curl git nginx certbot python3-certbot-nginx build-essential

# 3. Install Node.js
echo "Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION | bash -
apt-get install -y nodejs

# 4. Install PM2 Global
echo "Installing PM2..."
npm install -g pm2

# 5. Prepare Application Directory
echo "Setting up application directory at $APP_DIR..."
mkdir -p $(dirname $APP_DIR)

# 6. Clone Repository
if [ -d "$APP_DIR" ]; then
    echo "Directory exists, pulling latest changes..."
    cd $APP_DIR
    git pull
else
    echo "Cloning repository..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# 7. Install Dependencies & Build
echo "Installing dependencies..."
npm ci --production=false # Install all deps including devDeps for build

echo "Building application..."
npm run build

# 8. Start Application with PM2
echo "Starting application with PM2..."
pm2 start npm --name "sem-web" -- start
pm2 save
pm2 startup | bash # Follow instructions if needed, but this usually works

# 9. Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Test and Reload Nginx
nginx -t && systemctl reload nginx

# 10. Firewall Setup (UFW)
echo "Configuring Firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# 11. SSL Certificate (Certbot)
echo "Setting up SSL..."
# Using non-interactive mode with the email from README
certbot --nginx --non-interactive --agree-tos -m slavicemigrantsministry@gmail.com -d slavicemigrantsministry.org -d www.slavicemigrantsministry.org

echo "Deployment finished! Visit your server IP to see the site."
