<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits<{
  navigate: [page: string]
}>()

const backToIndex = () => {
  emit('navigate', 'index')
}

// Collapsible sections state
const expandedSections = ref<Record<string, boolean>>({
  prerequisites: true,
  pc1: false,
  pc2: false,
  domains: false,
  backup: false,
  verification: false
})

const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const services = [
  { name: 'Development VM', ip: '10.10.10.101', node: 'PC1', type: 'VM', purpose: 'Python, Java, Docker dev' },
  { name: 'PiHole', ip: '10.10.10.102', node: 'PC1', type: 'LXC', purpose: 'DNS filtering' },
  { name: 'Monitoring Stack', ip: '10.10.10.103', node: 'PC1', type: 'LXC', purpose: 'Prometheus, Grafana' },
  { name: 'Reverse Proxy', ip: '10.10.10.104', node: 'PC1', type: 'LXC', purpose: 'Traefik/Nginx' },
  { name: 'Gaming VM', ip: '10.10.10.201', node: 'PC2', type: 'VM', purpose: 'Windows + GPU passthrough' },
  { name: 'Storage/Media VM', ip: '10.10.10.202', node: 'PC2', type: 'VM', purpose: 'Nextcloud, Jellyfin' }
]

const domains = [
  { domain: 'dev.homelab.local', forward: '10.10.10.101:22', purpose: 'SSH to dev server' },
  { domain: 'pihole.homelab.local', forward: '10.10.10.102:80', purpose: 'PiHole admin' },
  { domain: 'monitor.homelab.local', forward: '10.10.10.103:3000', purpose: 'Grafana' },
  { domain: 'files.homelab.local', forward: '10.10.10.202:8080', purpose: 'Nextcloud' },
  { domain: 'media.homelab.local', forward: '10.10.10.202:8096', purpose: 'Jellyfin' }
]
</script>

<template>
  <main class="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <!-- Navigation Header -->
    <div class="mb-8 flex items-center justify-between">
      <button 
        @click="backToIndex"
        class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        Back to Index
      </button>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Services Setup Guide
      </div>
    </div>

    <h1 class="text-4xl font-bold mb-8 text-center">Proxmox Homelab Services Setup Guide</h1>

    <!-- Prerequisites Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('prerequisites')"
        class="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-100">Prerequisites</h2>
        <svg 
          class="w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.prerequisites }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.prerequisites" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Core infrastructure complete (Proxmox installed, ZFS pools created, cluster established)</li>
          <li>Network: 10.10.10.0/24 VLAN</li>
          <li>PC1: 10.10.10.100 (Dev Server)</li>
          <li>PC2: 10.10.10.200 (Gaming/Storage)</li>
        </ul>

        <!-- IP Address Plan Table -->
        <h3 class="text-xl font-semibold mb-4">IP Address Plan</h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Service</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">IP</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Node</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.ip" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">{{ service.name }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">{{ service.ip }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ service.node }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <span 
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="service.type === 'VM' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'"
                  >
                    {{ service.type }}
                  </span>
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">{{ service.purpose }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- PC1 Services Implementation -->
    <section class="mb-8">
      <button 
        @click="toggleSection('pc1')"
        class="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-green-900 dark:text-green-100">PC1 Services Implementation</h2>
        <svg 
          class="w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.pc1 }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.pc1" class="mt-4 space-y-6">
        <!-- Development VM -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Development VM (10.10.10.101)</h3>
          <p class="mb-4">Create Ubuntu Server VM for development work:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 101
# Name: Development-VM
# OS: Ubuntu Server 22.04 LTS
# CPU: 6 cores (host type)
# Memory: 24576 MB (24GB)
# Storage: 200GB on vm-storage
# Network: Static IP 10.10.10.101

# After installation, install development tools:
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git vim htop docker.io docker-compose
sudo usermod -aG docker $USER

# Install Node.js and Python
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip

# Install Java
sudo apt install -y openjdk-17-jdk

# Configure SSH for remote development
sudo systemctl enable ssh
sudo systemctl start ssh
          </code></pre>
        </div>

        <!-- PiHole LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">PiHole LXC (10.10.10.102)</h3>
          <p class="mb-4">Create lightweight container for DNS filtering:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 102
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 20GB on vm-storage
# Network: Static IP 10.10.10.102

# Install PiHole
curl -sSL https://install.pi-hole.net | bash

# During installation:
# - Choose eth0 as interface
# - Set static IP: 10.10.10.102/24
# - Gateway: 10.10.10.1
# - DNS: 1.1.1.1, 8.8.8.8
# - Choose blocklists (recommended: all)
# - Install web admin interface
# - Install lighttpd

# Configure additional blocklists
pihole -a -i regex "^(.+[-_.])??adse?rv(er?|ice)?s?[0-9]*[-.]"
pihole -a -i regex "^(.+[-_.])??m?ad[sxv]?[0-9]*[-_.]"

# Set admin password
pihole -a -p
          </code></pre>
        </div>

        <!-- Monitoring Stack LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Monitoring Stack LXC (10.10.10.103)</h3>
          <p class="mb-4">Prometheus + Grafana monitoring:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 103
# Template: Ubuntu 22.04
# CPU: 4 cores
# Memory: 8192 MB (8GB)
# Storage: 50GB on vm-storage
# Network: Static IP 10.10.10.103

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create monitoring stack
mkdir -p ~/monitoring/{prometheus,grafana}
cd ~/monitoring

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:
EOF

# Create Prometheus config
cat > prometheus/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'proxmox'
    static_configs:
      - targets: ['10.10.10.100:8006', '10.10.10.200:8006']
EOF

# Start services
docker-compose up -d
          </code></pre>
        </div>

        <!-- Reverse Proxy LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Reverse Proxy LXC (10.10.10.104)</h3>
          <p class="mb-4">Nginx Proxy Manager for easy domain management:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Create LXC via Proxmox Web UI:
# CT ID: 104
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 30GB on vm-storage
# Network: Static IP 10.10.10.104

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create Nginx Proxy Manager
mkdir -p ~/nginx-proxy-manager
cd ~/nginx-proxy-manager

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  nginx-proxy-manager:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
EOF

# Start service
docker-compose up -d

# Access web interface at http://10.10.10.104:81
# Default login: admin@example.com / changeme
          </code></pre>
        </div>
      </div>
    </section>

    <!-- PC2 Services Implementation -->
    <section class="mb-8">
      <button 
        @click="toggleSection('pc2')"
        class="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-purple-900 dark:text-purple-100">PC2 Services Implementation</h2>
        <svg 
          class="w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.pc2 }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.pc2" class="mt-4 space-y-6">
        <!-- Gaming VM -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Gaming VM (10.10.10.201)</h3>
          <p class="mb-4">Windows 11 VM with RX 7800XT passthrough:</p>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> This VM requires GPU passthrough configuration. 
              See the <strong>GPU Passthrough Guide</strong> for complete setup instructions.
            </p>
          </div>
        </div>

        <!-- Storage/Media VM -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Storage/Media VM (10.10.10.202)</h3>
          <p class="mb-4">Ubuntu Server with Nextcloud, Jellyfin, and Samba:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 202
# Name: Storage-Media-VM
# OS: Ubuntu Server 22.04 LTS
# CPU: 6 cores (host type)
# Memory: 20480 MB (20GB)
# Storage: 100GB on storage pool
# Network: Static IP 10.10.10.202

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create mount points for ZFS datasets
sudo mkdir -p /mnt/storage/{nextcloud,shared,gaming-footage,media,transcoding-cache}
sudo chown -R 1000:1000 /mnt/storage/

# Create media services stack
mkdir -p ~/media-stack
cd ~/media-stack

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  nextcloud-db:
    image: mariadb:10.6
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpass123
      MYSQL_PASSWORD: nextcloud123
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
    volumes:
      - nextcloud_db:/var/lib/mysql

  nextcloud:
    image: nextcloud:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    depends_on:
      - nextcloud-db
    volumes:
      - nextcloud_data:/var/www/html
      - /mnt/storage/nextcloud:/var/www/html/data
      - /mnt/storage/shared:/mnt/shared
    environment:
      MYSQL_PASSWORD: nextcloud123
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_HOST: nextcloud-db

  jellyfin:
    image: jellyfin/jellyfin:latest
    restart: unless-stopped
    ports:
      - "8096:8096"
    volumes:
      - jellyfin_config:/config
      - /mnt/storage/transcoding-cache:/cache
      - /mnt/storage/media:/media
    environment:
      - JELLYFIN_PublishedServerUrl=http://10.10.10.202:8096
    devices:
      - /dev/dri:/dev/dri  # For hardware transcoding if available

  samba:
    image: dperson/samba:latest
    restart: unless-stopped
    ports:
      - "139:139"
      - "445:445"
    volumes:
      - /mnt/storage/shared:/shared
      - /mnt/storage/gaming-footage:/gaming-footage
      - /mnt/storage/media:/media:ro
    command: >
      -s "Shared;/shared;yes;no;no;all;none;;" 
      -s "Gaming Footage;/gaming-footage;yes;no;no;all;none;;" 
      -s "Media;/media;yes;yes;no;all;none;;" 
      -u "homelab;homelab123"
    environment:
      - USERID=1000
      - GROUPID=1000

volumes:
  nextcloud_db:
  nextcloud_data:
  jellyfin_config:
EOF

# Start services
docker-compose up -d

# Configure Jellyfin
# 1. Access http://10.10.10.202:8096
# 2. Complete setup wizard
# 3. Add media libraries pointing to /media
# 4. Configure transcoding settings for your hardware
          </code></pre>
        </div>
      </div>
    </section>

    <!-- Domain Setup Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('domains')"
        class="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-orange-900 dark:text-orange-100">Domain Setup via Reverse Proxy</h2>
        <svg 
          class="w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.domains }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.domains" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p class="mb-4">Configure these domains in Nginx Proxy Manager (10.10.10.104:81):</p>
        
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Domain</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Forward To</th>
                <th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="domain in domains" :key="domain.domain" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">{{ domain.domain }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm">{{ domain.forward }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">{{ domain.purpose }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Backup Strategy Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('backup')"
        class="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-red-900 dark:text-red-100">Backup Strategy</h2>
        <svg 
          class="w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.backup }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.backup" class="mt-4 space-y-6">
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">ZFS Snapshots (automated)</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Create snapshot script on both nodes
cat > /usr/local/bin/zfs-snapshot.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d-%H%M)
zfs snapshot vm-storage@backup-$DATE
# Keep 7 daily snapshots
zfs list -t snapshot | grep backup- | head -n -7 | awk '{print $1}' | xargs -r -n1 zfs destroy
EOF

chmod +x /usr/local/bin/zfs-snapshot.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/zfs-snapshot.sh" | crontab -</code></pre>
        </div>

        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">VM Backups</h3>
          <p class="mb-4">Configure in Proxmox web UI:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Datacenter → Backup</li>
            <li>Schedule weekly backups of critical VMs</li>
            <li>Store backups on opposite node for redundancy</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Final Verification Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('verification')"
        class="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">Final Verification Checklist</h2>
        <svg 
          class="w-6 h-6 text-indigo-600 dark:text-indigo-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.verification }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.verification" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">✅ Infrastructure Checklist</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                All VMs/LXCs created with correct resource allocation
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Static IPs configured and accessible
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                PiHole filtering DNS requests
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Monitoring stack collecting data
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Reverse proxy routing domains
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-3">🎯 Services Checklist</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Gaming VM with GPU passthrough working
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Storage services (Nextcloud/Jellyfin) accessible
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Backup strategy implemented
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                All services starting automatically after reboot
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 class="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">🚀 Next Steps</h3>
          <ol class="list-decimal list-inside space-y-1 text-sm">
            <li>Configure PiHole as primary DNS for your VLAN</li>
            <li>Set up SSL certificates in Nginx Proxy Manager</li>
            <li>Configure Grafana dashboards for system monitoring</li>
            <li>Optimize Jellyfin transcoding settings</li>
            <li>Test GPU passthrough with games</li>
            <li>Set up development environment in dev VM</li>
            <li>Configure automated backups between nodes</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- End note -->
    <section class="mt-10 text-center text-gray-500 dark:text-gray-400">
      <p>— End of services setup guide —</p>
    </section>
  </main>
</template>
