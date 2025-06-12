<script lang="ts" setup>
import { ref } from 'vue'
import { useGuideNavigation } from '../composables/useGuideNavigation'

const { currentGuide, nextGuide, previousGuide, navigateToHome, navigateToNext, navigateToPrevious, getProgressInfo, guides } = useGuideNavigation()
const progress = getProgressInfo()

// Collapsible sections state
const expandedSections = ref<Record<string, boolean>>({
  prerequisites: true,
  pc1: false,
  pc2: false,
  domains: false,
  production: false,
  backup: false,
  verification: false
})

const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const services = [
  { name: 'Development VM', ip: '10.10.10.101', node: 'PVE-PC1', type: 'VM', purpose: 'Python, Java, Docker dev' },
  { name: 'PiHole', ip: '10.10.10.102', node: 'PVE-PC1', type: 'LXC', purpose: 'DNS filtering' },
  { name: 'Monitoring Stack', ip: '10.10.10.103', node: 'PVE-PC1', type: 'LXC', purpose: 'Prometheus, Grafana' },
  { name: 'Reverse Proxy', ip: '10.10.10.104', node: 'PVE-PC1', type: 'LXC', purpose: 'Traefik/Nginx' },
  { name: 'Documentation Server', ip: '10.10.10.105', node: 'PVE-PC1', type: 'LXC', purpose: 'MkDocs documentation' },
  { name: 'Gaming VM', ip: '10.10.10.201', node: 'PVE-PC2', type: 'VM', purpose: 'Windows + GPU passthrough' },
  { name: 'Storage/Media VM', ip: '10.10.10.202', node: 'PVE-PC2', type: 'VM', purpose: 'Nextcloud, Jellyfin' }
]

const domains = [
  { domain: 'dev.homelab.local', forward: '10.10.10.101:22', purpose: 'SSH to dev server' },
  { domain: 'pihole.homelab.local', forward: '10.10.10.102:80', purpose: 'PiHole admin' },
  { domain: 'monitor.homelab.local', forward: '10.10.10.103:3000', purpose: 'Grafana' },
  { domain: 'docs.homelab.local', forward: '10.10.10.105:80', purpose: 'Documentation' },
  { domain: 'files.homelab.local', forward: '10.10.10.202:8080', purpose: 'Nextcloud' },
  { domain: 'media.homelab.local', forward: '10.10.10.202:8096', purpose: 'Jellyfin' }
]
</script>

<template>
  <main class="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <!-- Navigation Header -->
    <div class="mb-8">
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Step {{ progress.current }} of {{ progress.total }}</span>
          <span>{{ progress.percentage }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: progress.percentage + '%' }"></div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="flex items-center justify-between">
        <button 
          @click="navigateToHome"
          class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          Back to Index
        </button>

        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ currentGuide?.title }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentGuide?.description }}</p>
        </div>

        <button 
          v-if="nextGuide"
          @click="navigateToNext"
          class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Next: {{ nextGuide.title.replace(' Guide', '') }}
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <div v-else class="w-32"></div> <!-- Spacer for alignment -->
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
          <li>Admin-PC: 10.10.10.50 (Admin/Client PC)</li>
          <li>PVE-PC1: 10.10.10.100 (Dev Server)</li>
          <li>PVE-PC2: 10.10.10.200 (Gaming/Storage)</li>
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
        <h2 class="text-2xl font-semibold text-green-900 dark:text-green-100">PVE-PC1 Services Implementation</h2>
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
        <!-- LXC Container Configuration Fix -->
        <div class="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 class="text-xl font-semibold mb-4 text-yellow-900 dark:text-yellow-100">⚠️ Important: Enable Nesting for Docker Containers</h3>
          <p class="mb-4">Before proceeding with Docker-based services, enable nesting on existing LXC containers:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Enable nesting for existing Docker containers
# Run these commands on the Proxmox host:

# Enable nesting for Monitoring Stack LXC
pct set 103 -features nesting=1

# Enable nesting for Reverse Proxy LXC  
pct set 104 -features nesting=1

# Restart containers to apply changes
pct restart 103
pct restart 104

# Verify nesting is enabled
pct config 103 | grep nesting
pct config 104 | grep nesting</code></pre>
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Why Nesting is Required</h4>
            <p class="text-sm">Docker requires access to kernel features that are restricted in LXC containers by default. Enabling nesting allows Docker to function properly within the container while maintaining security isolation.</p>
          </div>
        </div>

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

        <!-- Documentation Server LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Documentation Server LXC (10.10.10.105)</h3>
          <p class="mb-4">MkDocs with Material theme for professional documentation:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 105
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 30GB on vm-storage
# Network: Static IP 10.10.10.105
# Features: nesting=1 (enable during creation)

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose git
sudo usermod -aG docker $USER

# Create documentation stack
mkdir -p ~/documentation
cd ~/documentation

# Create directory structure for multiple documentation projects
mkdir -p docs/{homelab,api,runbooks}

# Create main MkDocs configuration
cat > mkdocs.yml << 'EOF'
site_name: Homelab Documentation
site_description: Complete documentation for homelab infrastructure and services
site_author: Homelab Admin
site_url: https://docs.homelab.local

theme:
  name: material
  palette:
    - scheme: default
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: blue
      accent: blue
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.highlight
    - search.share
    - content.code.copy

plugins:
  - search
  - git-revision-date-localized

markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.tabbed:
      alternate_style: true
  - attr_list
  - md_in_html

nav:
  - Home: index.md
  - Infrastructure:
    - Overview: infrastructure/overview.md
    - Proxmox Setup: infrastructure/proxmox.md
    - Network Configuration: infrastructure/network.md
    - Storage: infrastructure/storage.md
  - Services:
    - Service Overview: services/overview.md
    - PiHole: services/pihole.md
    - Monitoring: services/monitoring.md
    - Media Stack: services/media.md
    - Development: services/development.md
  - Runbooks:
    - Backup Procedures: runbooks/backup.md
    - Troubleshooting: runbooks/troubleshooting.md
    - Maintenance: runbooks/maintenance.md
  - API Documentation:
    - API Overview: api/overview.md
    - Endpoints: api/endpoints.md
EOF

# Create sample documentation structure
cat > docs/index.md << 'EOF'
# Homelab Documentation

Welcome to the comprehensive documentation for our Proxmox-based homelab infrastructure.

## Quick Links

- [Infrastructure Overview](infrastructure/overview.md)
- [Service Status](services/overview.md)
- [Runbooks](runbooks/backup.md)
- [API Documentation](api/overview.md)

## Recent Updates

- ✅ Added MkDocs documentation server
- ✅ Configured reverse proxy with SSL
- ✅ Implemented monitoring stack
- ✅ Set up backup procedures

## Architecture Overview

```mermaid
graph TB
    A[Internet] --> B[Router]
    B --> C[Proxmox Cluster]
    C --> D[PVE-PC1 - Development]
    C --> E[PVE-PC2 - Gaming/Storage]
    D --> F[PiHole]
    D --> G[Monitoring]
    D --> H[Reverse Proxy]
    D --> I[Documentation]
    E --> J[Gaming VM]
    E --> K[Media Server]
```

## Getting Started

1. Review the [Infrastructure Overview](infrastructure/overview.md)
2. Check [Service Status](services/overview.md)
3. Familiarize yourself with [Runbooks](runbooks/backup.md)
EOF

# Create infrastructure documentation
mkdir -p docs/infrastructure
cat > docs/infrastructure/overview.md << 'EOF'
# Infrastructure Overview

## Hardware

- **PVE-PC1**: Development and services node
- **PVE-PC2**: Gaming and storage node

## Network

- **VLAN**: 10.10.10.0/24
- **Gateway**: 10.10.10.1
- **DNS**: 10.10.10.102 (PiHole)

## Services

| Service | IP | Node | Type | Purpose |
|---------|----|----- |------|---------|
| Development VM | 10.10.10.101 | PVE-PC1 | VM | Development environment |
| PiHole | 10.10.10.102 | PVE-PC1 | LXC | DNS filtering |
| Monitoring | 10.10.10.103 | PVE-PC1 | LXC | Prometheus/Grafana |
| Reverse Proxy | 10.10.10.104 | PVE-PC1 | LXC | Nginx Proxy Manager |
| Documentation | 10.10.10.105 | PVE-PC1 | LXC | MkDocs server |
| Gaming VM | 10.10.10.201 | PVE-PC2 | VM | Windows + GPU passthrough |
| Media Server | 10.10.10.202 | PVE-PC2 | VM | Nextcloud/Jellyfin |
EOF

# Create services documentation
mkdir -p docs/services
cat > docs/services/overview.md << 'EOF'
# Service Overview

## Service Status

- 🟢 PiHole: Active
- 🟢 Monitoring: Active  
- 🟢 Reverse Proxy: Active
- 🟢 Documentation: Active
- 🟢 Media Server: Active

## Access URLs

- [PiHole Admin](http://pihole.homelab.local)
- [Grafana](http://monitor.homelab.local)
- [Nextcloud](http://files.homelab.local)
- [Jellyfin](http://media.homelab.local)
- [Documentation](http://docs.homelab.local)
EOF

# Create runbooks
mkdir -p docs/runbooks
cat > docs/runbooks/backup.md << 'EOF'
# Backup Procedures

## ZFS Snapshots

Automated daily snapshots are configured on both nodes:

```bash
# Manual snapshot
zfs snapshot vm-storage@manual-$(date +%Y%m%d-%H%M)

# List snapshots
zfs list -t snapshot

# Restore from snapshot
zfs rollback vm-storage@snapshot-name
```

## VM Backups

Weekly backups are configured in Proxmox:

1. Navigate to Datacenter → Backup
2. Verify backup schedule
3. Check backup storage usage
EOF

# Create API documentation
mkdir -p docs/api
cat > docs/api/overview.md << 'EOF'
# API Documentation

## Available APIs

- **Proxmox API**: https://10.10.10.100:8006/api2/json
- **Grafana API**: http://monitor.homelab.local/api
- **PiHole API**: http://pihole.homelab.local/admin/api.php

## Authentication

Most APIs require authentication tokens or API keys.
EOF

# Create Docker Compose for MkDocs
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  mkdocs:
    image: squidfunk/mkdocs-material:latest
    container_name: mkdocs
    ports:
      - "8000:8000"
    volumes:
      - .:/docs
    command: serve --dev-addr=0.0.0.0:8000
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: mkdocs-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - mkdocs
    restart: unless-stopped
EOF

# Create Nginx configuration for production serving
cat > nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    upstream mkdocs {
        server mkdocs:8000;
    }

    server {
        listen 80;
        server_name docs.homelab.local;

        location / {
            proxy_pass http://mkdocs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF

# Build initial site
docker-compose up -d mkdocs
sleep 10
docker exec mkdocs mkdocs build
docker cp mkdocs:/docs/site ./
docker-compose up -d

# Create update script for documentation
cat > update-docs.sh << 'EOF'
#!/bin/bash
# Update documentation script

echo "Pulling latest documentation changes..."
git pull

echo "Rebuilding documentation..."
docker exec mkdocs mkdocs build

echo "Copying built site..."
docker cp mkdocs:/docs/site ./

echo "Restarting nginx..."
docker-compose restart nginx

echo "Documentation updated successfully!"
echo "Access at: http://docs.homelab.local"
EOF

chmod +x update-docs.sh

# Initialize git repository for version control
git init
git add .
git commit -m "Initial documentation setup"

echo "Documentation server setup complete!"
echo "Access at: http://10.10.10.105"
echo "Or via domain: http://docs.homelab.local (after reverse proxy setup)"
          </code></pre>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📚 Documentation Features</h4>
            <ul class="text-sm space-y-1">
              <li>• <strong>Material Theme:</strong> Professional, responsive design</li>
              <li>• <strong>Search:</strong> Full-text search across all documentation</li>
              <li>• <strong>Dark/Light Mode:</strong> User preference toggle</li>
              <li>• <strong>Code Highlighting:</strong> Syntax highlighting for code blocks</li>
              <li>• <strong>Git Integration:</strong> Version control for documentation</li>
              <li>• <strong>Live Reload:</strong> Automatic updates during development</li>
              <li>• <strong>Multi-Project:</strong> Organized sections for different topics</li>
            </ul>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🔄 Updating Documentation</h4>
            <p class="text-sm mb-2">To add or update documentation:</p>
            <ol class="text-sm space-y-1 list-decimal list-inside">
              <li>SSH into the documentation server: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">ssh root@10.10.10.105</code></li>
              <li>Navigate to documentation directory: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">cd ~/documentation</code></li>
              <li>Edit markdown files in the <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">docs/</code> directory</li>
              <li>Run update script: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">./update-docs.sh</code></li>
              <li>Changes are immediately visible at <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">http://docs.homelab.local</code></li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- PC2 Services Implementation -->
    <section class="mb-8">
      <button 
        @click="toggleSection('pc2')"
        class="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-purple-900 dark:text-purple-100">PVE-PC2 Services Implementation</h2>
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

    <!-- Production Domain Setup Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('production')"
        class="w-full flex items-center justify-between p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-teal-900 dark:text-teal-100">Production Domain Setup with SSL & External Access</h2>
        <svg 
          class="w-6 h-6 text-teal-600 dark:text-teal-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.production }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.production" class="mt-4 space-y-6">
        <!-- Overview -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🌐 Overview</h3>
          <p class="mb-4">Upgrade from local-only access to production-ready setup with real domains, SSL certificates, and secure external access.</p>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Current (Local Only)</h4>
              <ul class="text-sm space-y-1">
                <li>• http://files.homelab.local</li>
                <li>• http://media.homelab.local</li>
                <li>• No SSL encryption</li>
                <li>• Internal network only</li>
              </ul>
            </div>
            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Production (Upgraded)</h4>
              <ul class="text-sm space-y-1">
                <li>• https://files.yourdomain.com</li>
                <li>• https://media.yourdomain.com</li>
                <li>• SSL certificates (Let's Encrypt)</li>
                <li>• Secure external access via Tailscale</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Prerequisites -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">📋 Prerequisites</h3>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important Requirements</h4>
            <ul class="text-sm space-y-1">
              <li>• <strong>Domain ownership:</strong> You must own a domain (e.g., yourdomain.com)</li>
              <li>• <strong>DNS control:</strong> Access to domain's DNS settings</li>
              <li>• <strong>Cost consideration:</strong> Domain registration (~$10-15/year)</li>
              <li>• <strong>Security awareness:</strong> External access requires proper security measures</li>
            </ul>
          </div>
          
          <h4 class="font-semibold mb-2">Recommended Domain Registrars:</h4>
          <ul class="list-disc list-inside text-sm space-y-1">
            <li>Cloudflare (best for DNS management)</li>
            <li>Namecheap (good balance of price/features)</li>
            <li>Google Domains (simple interface)</li>
          </ul>
        </div>

        <!-- PiHole DNS Configuration -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🔧 Step 1: PiHole DNS Configuration</h3>
          <p class="mb-4">Configure split-brain DNS - internal devices resolve to local IP, external devices use Tailscale:</p>
          
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Access PiHole admin interface
# http://10.10.10.102/admin

# Add these DNS records in PiHole:
# Local DNS Records → Add new domain/IP

# Domain: media.yourdomain.com
# IP: 10.10.10.104

# Domain: files.yourdomain.com  
# IP: 10.10.10.104

# Domain: pihole.yourdomain.com
# IP: 10.10.10.104

# Domain: monitor.yourdomain.com
# IP: 10.10.10.104

# Domain: docs.yourdomain.com
# IP: 10.10.10.104</code></pre>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 How Split-Brain DNS Works</h4>
            <p class="text-sm">Internal devices query PiHole → Get local IP (10.10.10.104)<br>
            External devices query public DNS → Get Tailscale IP → Tunnel to your network</p>
          </div>
        </div>

        <!-- Nginx Proxy Manager SSL Setup -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🔒 Step 2: Nginx Proxy Manager SSL Setup</h3>
          <p class="mb-4">Configure SSL certificates and proxy hosts in Nginx Proxy Manager:</p>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Access Nginx Proxy Manager:</h4>
              <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Open web interface
http://10.10.10.104:81

# Default login (change immediately):
# Email: admin@example.com
# Password: changeme</code></pre>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Create Proxy Hosts with SSL:</h4>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm mb-2"><strong>For each domain (media, files, pihole, monitor):</strong></p>
                <ol class="list-decimal list-inside text-sm space-y-1">
                  <li>Click "Proxy Hosts" → "Add Proxy Host"</li>
                  <li><strong>Domain:</strong> media.yourdomain.com</li>
                  <li><strong>Forward Hostname/IP:</strong> 10.10.10.202</li>
                  <li><strong>Forward Port:</strong> 8096 (for Jellyfin)</li>
                  <li>Enable "Block Common Exploits"</li>
                  <li>Go to "SSL" tab</li>
                  <li>Select "Request a new SSL Certificate"</li>
                  <li>Enable "Force SSL", "HTTP/2 Support"</li>
                  <li>Enter your email for Let's Encrypt</li>
                  <li>Accept Terms of Service</li>
                  <li>Click "Save"</li>
                </ol>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Complete Domain Mapping:</h4>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                  <thead>
                    <tr class="bg-gray-100 dark:bg-gray-700">
                      <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">Domain</th>
                      <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">Forward To</th>
                      <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">media.yourdomain.com</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">10.10.10.202:8096</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2">Jellyfin</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">files.yourdomain.com</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">10.10.10.202:8080</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2">Nextcloud</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">pihole.yourdomain.com</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">10.10.10.102:80</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2">PiHole Admin</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">monitor.yourdomain.com</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">10.10.10.103:3000</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2">Grafana</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">docs.yourdomain.com</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">10.10.10.105:80</td>
                      <td class="border border-gray-300 dark:border-gray-600 px-3 py-2">MkDocs Documentation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Tailscale External Access -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🌍 Step 3: Tailscale External Access</h3>
          <p class="mb-4">Install Tailscale for secure external access without port forwarding:</p>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Install Tailscale on Reverse Proxy (10.10.10.104):</h4>
              <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># SSH into reverse proxy LXC
ssh root@10.10.10.104

# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Connect to your Tailscale network
sudo tailscale up

# Follow the URL to authenticate in your browser
# This will give your reverse proxy a Tailscale IP (e.g., 100.x.x.x)

# Enable subnet routing (optional - allows access to entire homelab)
sudo tailscale up --advertise-routes=10.10.10.0/24

# Check status
sudo tailscale status</code></pre>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Install Tailscale on External Devices:</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📱 Mobile Devices</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Download Tailscale app from App Store/Play Store</li>
                    <li>• Sign in with same account</li>
                    <li>• Connect to your network</li>
                  </ul>
                </div>
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">💻 Laptops/Computers</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Download from tailscale.com</li>
                    <li>• Install and authenticate</li>
                    <li>• Same URLs work everywhere</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Configure Domain DNS (External Resolution):</h4>
              <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># In your domain registrar's DNS settings, add A records:
# (Replace 100.x.x.x with your reverse proxy's Tailscale IP)

# A Record: media.yourdomain.com → 100.x.x.x
# A Record: files.yourdomain.com → 100.x.x.x  
# A Record: pihole.yourdomain.com → 100.x.x.x
# A Record: monitor.yourdomain.com → 100.x.x.x

# Or use a wildcard:
# A Record: *.yourdomain.com → 100.x.x.x</code></pre>
            </div>
          </div>
        </div>

        <!-- Security Considerations -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🔐 Security Considerations</h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Security Benefits</h4>
                <ul class="text-sm space-y-1">
                  <li>• No port forwarding required</li>
                  <li>• End-to-end encryption via Tailscale</li>
                  <li>• SSL certificates for HTTPS</li>
                  <li>• Access control via Tailscale ACLs</li>
                  <li>• Device authentication required</li>
                </ul>
              </div>
              
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🛡️ Additional Security</h4>
                <ul class="text-sm space-y-1">
                  <li>• Enable 2FA on all services</li>
                  <li>• Use strong passwords</li>
                  <li>• Regular security updates</li>
                  <li>• Monitor access logs</li>
                  <li>• Backup configurations</li>
                </ul>
              </div>
            </div>
            
            <div>
              <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important Notes</h4>
                <ul class="text-sm space-y-1">
                  <li>• Keep Tailscale as backup access method</li>
                  <li>• Monitor SSL certificate expiry</li>
                  <li>• Test external access regularly</li>
                  <li>• Document emergency access procedures</li>
                  <li>• Consider firewall rules for extra security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- How It All Works Together -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🔄 How It All Works Together</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3 text-blue-900 dark:text-blue-100">🏠 Internal Devices</h4>
              <div class="space-y-2 text-sm">
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span>Connect to WiFi</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span>PiHole resolves domains to 10.10.10.104</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  <span>Nginx Proxy Manager routes to services</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span><strong>Result:</strong> https://media.yourdomain.com works</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-3 text-purple-900 dark:text-purple-100">🌍 External Devices</h4>
              <div class="space-y-2 text-sm">
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  <span>Connect to Tailscale app</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  <span>Join your network virtually</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                  <span>DNS resolves to Tailscale IP</span>
                </div>
                <div class="flex items-center">
                  <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  <span><strong>Result:</strong> Same URLs work everywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Verification & Testing -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">✅ Verification & Testing</h3>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Test Internal Access:</h4>
              <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># From any device on your network:
curl -I https://media.yourdomain.com
curl -I https://files.yourdomain.com

# Should return HTTP/2 200 with SSL certificate info</code></pre>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">Test External Access:</h4>
              <ol class="list-decimal list-inside text-sm space-y-1">
                <li>Connect phone/laptop to mobile data (not home WiFi)</li>
                <li>Connect to Tailscale</li>
                <li>Visit https://media.yourdomain.com</li>
                <li>Should work exactly like internal access</li>
              </ol>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">Monitor SSL Certificates:</h4>
              <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Check certificate expiry
openssl s_client -connect media.yourdomain.com:443 -servername media.yourdomain.com 2>/dev/null | openssl x509 -noout -dates

# Nginx Proxy Manager auto-renews Let's Encrypt certificates
# Check renewal logs in NPM interface</code></pre>
            </div>
          </div>
        </div>

        <!-- Troubleshooting -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">🔧 Troubleshooting</h3>
          
          <div class="space-y-4">
            <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">❌ SSL Certificate Issues</h4>
              <ul class="text-sm space-y-1">
                <li>• <strong>Problem:</strong> Certificate generation fails</li>
                <li>• <strong>Solution:</strong> Check domain DNS propagation (use dig or nslookup)</li>
                <li>• <strong>Wait time:</strong> DNS changes can take 24-48 hours to propagate</li>
              </ul>
            </div>
            
            <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ External Access Not Working</h4>
              <ul class="text-sm space-y-1">
                <li>• Check Tailscale connection status on both ends</li>
                <li>• Verify domain DNS points to correct Tailscale IP</li>
                <li>• Test with `tailscale ping [device-name]`</li>
                <li>• Check if subnet routing is enabled and accepted</li>
              </ul>
            </div>
            
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 DNS Resolution Issues</h4>
              <ul class="text-sm space-y-1">
                <li>• Internal: Check PiHole local DNS records</li>
                <li>• External: Verify domain registrar DNS settings</li>
                <li>• Use `nslookup media.yourdomain.com` to test resolution</li>
                <li>• Clear DNS cache: `sudo systemctl flush-dns` (Linux)</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Final Summary -->
        <div class="p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
          <h3 class="text-xl font-semibold mb-4 text-teal-900 dark:text-teal-100">🎉 Configuration Complete!</h3>
          
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 class="font-semibold mb-2">✅ What You've Achieved:</h4>
              <ul class="space-y-1">
                <li>• Professional SSL certificates</li>
                <li>• Clean domain names</li>
                <li>• Secure external access</li>
                <li>• No port forwarding needed</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">🔗 Your New URLs:</h4>
              <ul class="space-y-1 font-mono">
                <li>• https://media.yourdomain.com</li>
                <li>• https://files.yourdomain.com</li>
                <li>• https://pihole.yourdomain.com</li>
                <li>• https://monitor.yourdomain.com</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">🚀 Next Steps:</h4>
              <ul class="space-y-1">
                <li>• Set up monitoring for certificates</li>
                <li>• Configure Tailscale ACLs</li>
                <li>• Add more services as needed</li>
                <li>• Enjoy your professional homelab!</li>
              </ul>
            </div>
          </div>
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

    <!-- Bottom Navigation -->
    <section class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <button 
          v-if="previousGuide"
          @click="navigateToPrevious"
          class="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          {{ previousGuide.title }}
        </button>
        <div v-else class="w-32"></div>

        <button 
          @click="navigateToHome"
          class="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Back to Index
        </button>

        <button 
          v-if="nextGuide"
          @click="navigateToNext"
          class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ nextGuide.title }}
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <div v-else class="w-32"></div>
      </div>

      <!-- Guide Progress Indicator -->
      <div class="mt-6 flex justify-center">
        <div class="flex space-x-2">
          <div 
            v-for="(guide, index) in guides" 
            :key="guide.path"
            class="w-3 h-3 rounded-full transition-colors"
            :class="index <= progress.current - 1 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'"
          ></div>
        </div>
      </div>
    </section>

  </main>
</template>
