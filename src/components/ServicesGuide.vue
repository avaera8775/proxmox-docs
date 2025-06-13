<script lang="ts" setup>
import { ref } from 'vue'
import { useGuideNavigation } from '../composables/useGuideNavigation'

const { currentGuide, nextGuide, previousGuide, navigateToHome, navigateToNext, navigateToPrevious, getProgressInfo } = useGuideNavigation()
const progress = getProgressInfo()

// Services data
const services = [
  { name: 'Development VM', ip: '10.10.10.101', node: 'PVE-PC1', type: 'VM', purpose: 'Python, Java, Docker dev' },
  { name: 'PiHole', ip: '10.10.10.102', node: 'PVE-PC1', type: 'LXC', purpose: 'DNS filtering' },
  { name: 'Monitoring Stack', ip: '10.10.10.103', node: 'PVE-PC1', type: 'LXC', purpose: 'Prometheus, Grafana' },
  { name: 'Reverse Proxy', ip: '10.10.10.104', node: 'PVE-PC1', type: 'LXC', purpose: 'Traefik/Nginx' },
  { name: 'Documentation Server', ip: '10.10.10.105', node: 'PVE-PC1', type: 'LXC', purpose: 'MkDocs documentation' },
  { name: 'Homepage Dashboard', ip: '10.10.10.106', node: 'PVE-PC1', type: 'LXC', purpose: 'Service dashboard' },
  { name: 'Radarr', ip: '10.10.10.107', node: 'PVE-PC1', type: 'LXC', purpose: 'Movie management' },
  { name: 'Forgejo', ip: '10.10.10.108', node: 'PVE-PC1', type: 'LXC', purpose: 'Git repository hosting' },
  { name: 'Gaming VM', ip: '10.10.10.201', node: 'PVE-PC2', type: 'VM', purpose: 'Windows + GPU passthrough' },
  { name: 'Storage/Media VM', ip: '10.10.10.202', node: 'PVE-PC2', type: 'VM', purpose: 'Nextcloud, Jellyfin' }
]

// Collapsible sections state
const expandedSections = ref<Record<string, boolean>>({
  postInstall: true,
  prerequisites: false,
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
          {{ nextGuide.title }}
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L15.586 11H4a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <div v-else class="w-32"></div>
      </div>
    </div>

    <h1 class="text-4xl font-bold mb-8 text-center">Services & Applications Guide</h1>

    <!-- Service Overview -->
    <div class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 class="text-2xl font-semibold mb-4">Service Overview</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-3">PVE-PC1 Services (Development & Infrastructure)</h3>
          <div class="space-y-2">
            <div v-for="service in services.filter(s => s.node === 'PVE-PC1')" :key="service.ip" 
                 class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <span class="font-medium">{{ service.name }}</span>
                <span class="ml-2 px-2 py-1 text-xs rounded-full" 
                      :class="service.type === 'VM' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'">
                  {{ service.type }}
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ service.ip }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-3">PVE-PC2 Services (Gaming & Storage)</h3>
          <div class="space-y-2">
            <div v-for="service in services.filter(s => s.node === 'PVE-PC2')" :key="service.ip" 
                 class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <span class="font-medium">{{ service.name }}</span>
                <span class="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                  {{ service.type }}
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ service.ip }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Post-Install Configuration -->
    <section class="mb-8">
      <button 
        @click="toggleSection('postInstall')"
        class="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-yellow-900 dark:text-yellow-100">🔧 Post-Install Configuration</h2>
        <svg 
          class="w-6 h-6 text-yellow-600 dark:text-yellow-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.postInstall }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.postInstall" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📋 Important First Step</h4>
          <p class="text-blue-700 dark:text-blue-300 text-sm">
            Complete this configuration on both Proxmox nodes before proceeding with service installation. This removes the subscription nag and ensures a clean UI experience.
          </p>
        </div>

        <h3 class="text-xl font-semibold mb-4">Remove Proxmox Subscription Nag</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          This script automatically removes the subscription warning that appears in the Proxmox web interface and ensures it stays removed after updates:
        </p>
        
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># SSH into each Proxmox node
ssh root@10.10.10.100  # PVE-PC1
ssh root@10.10.10.200  # PVE-PC2

# Create the script that removes the nag after updates
echo 'DPkg::Post-Invoke { "dpkg -V proxmox-widget-toolkit | grep -q '/proxmoxlib\.js$'; if [ \$? -eq 1 ]; then { echo 'Removing subscription nag from UI...'; sed -i '/.*data\.status.*{/{s/\!//;s/active/NoMoreNagging/}' /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js; }; fi"; };' > /etc/apt/apt.conf.d/no-nag-script

# Apply the fix immediately
apt --reinstall install proxmox-widget-toolkit</code></pre>

        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ What This Does</h4>
          <ul class="text-sm space-y-1 text-green-700 dark:text-green-300">
            <li>• <strong>Removes subscription warning</strong> from Proxmox web interface</li>
            <li>• <strong>Automatically reapplies fix</strong> after system updates</li>
            <li>• <strong>Persistent solution</strong> that survives package updates</li>
            <li>• <strong>No manual intervention</strong> required after initial setup</li>
          </ul>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important Notes</h4>
          <ul class="text-sm space-y-1 text-yellow-700 dark:text-yellow-300">
            <li>• Run this command on <strong>both Proxmox nodes</strong> (PVE-PC1 and PVE-PC2)</li>
            <li>• The fix is applied automatically after each system update</li>
            <li>• Refresh your browser after running the command to see the changes</li>
            <li>• This is for homelab use - consider purchasing a subscription for production environments</li>
          </ul>
        </div>
      </div>
    </section>

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
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Required Setup</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Core Proxmox setup completed
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Network configuration (10.10.10.0/24)
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                ZFS storage pools configured
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Security hardening applied
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3">Download Templates</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Download these container templates before starting:</p>
            <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs"><code># In Proxmox web UI, go to:
# Node → local (storage) → CT Templates
# Download these templates:
- Ubuntu 22.04 Standard
- Ubuntu 20.04 Standard
- Debian 12 Standard</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- PVE-PC1 Services Implementation -->
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
        <!-- Homepage Dashboard LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Homepage Dashboard LXC (10.10.10.106)</h3>
          <p class="mb-4">Modern service dashboard with status monitoring:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 106
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 20GB on vm-storage
# Network: Static IP 10.10.10.106
# Features: nesting=1 (enable during creation)

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create homepage dashboard
mkdir -p ~/homepage
cd ~/homepage

# Create Docker Compose configuration
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - "3000:3000"
    volumes:
      - ./config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
EOF

# Create configuration directory
mkdir -p config

# Create main configuration
cat > config/settings.yaml << 'EOF'
title: Homelab Dashboard
favicon: https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homepage.png
theme: dark
color: slate
headerStyle: clean
layout:
  Infrastructure:
    style: row
    columns: 3
  Media & Storage:
    style: row
    columns: 2
  Development:
    style: row
    columns: 2
  Monitoring:
    style: row
    columns: 2
EOF

# Create services configuration
cat > config/services.yaml << 'EOF'
- Infrastructure:
    - Proxmox PVE-PC1:
        href: https://10.10.10.100:8006
        description: Development & Services Node
        icon: proxmox.png
        ping: 10.10.10.100
    - Proxmox PVE-PC2:
        href: https://10.10.10.200:8006
        description: Gaming & Storage Node
        icon: proxmox.png
        ping: 10.10.10.200
    - PiHole:
        href: http://10.10.10.102/admin
        description: DNS Ad Blocking
        icon: pi-hole.png
        ping: 10.10.10.102
        widget:
          type: pihole
          url: http://10.10.10.102
          key: your-api-key-here

- Media & Storage:
    - Jellyfin:
        href: http://10.10.10.202:8096
        description: Media Server
        icon: jellyfin.png
        ping: 10.10.10.202
        widget:
          type: jellyfin
          url: http://10.10.10.202:8096
          key: your-api-key-here
    - Nextcloud:
        href: http://10.10.10.202:8080
        description: Cloud Storage
        icon: nextcloud.png
        ping: 10.10.10.202
    - Radarr:
        href: http://10.10.10.107:7878
        description: Movie Management
        icon: radarr.png
        ping: 10.10.10.107
        widget:
          type: radarr
          url: http://10.10.10.107:7878
          key: your-api-key-here

- Development:
    - Forgejo:
        href: http://10.10.10.108:3000
        description: Git Repository
        icon: forgejo.png
        ping: 10.10.10.108
    - Development VM:
        href: ssh://10.10.10.101
        description: Dev Environment
        icon: ubuntu.png
        ping: 10.10.10.101

- Monitoring:
    - Grafana:
        href: http://10.10.10.103:3000
        description: Metrics Dashboard
        icon: grafana.png
        ping: 10.10.10.103
    - Prometheus:
        href: http://10.10.10.103:9090
        description: Metrics Collection
        icon: prometheus.png
        ping: 10.10.10.103
EOF

# Start the service
docker-compose up -d

echo "Homepage Dashboard setup complete!"
echo "Access at: http://10.10.10.106:3000"</code></pre>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🏠 Homepage Features</h4>
            <ul class="text-sm space-y-1">
              <li>• <strong>Service Dashboard:</strong> Central hub for all homelab services</li>
              <li>• <strong>Status Monitoring:</strong> Real-time ping status for all services</li>
              <li>• <strong>Widgets:</strong> Live data from PiHole, Jellyfin, Radarr, etc.</li>
              <li>• <strong>Search Integration:</strong> Quick web search functionality</li>
              <li>• <strong>Resource Monitoring:</strong> System resource usage display</li>
              <li>• <strong>Bookmarks:</strong> Quick access to frequently used links</li>
              <li>• <strong>Dark Theme:</strong> Modern, clean interface</li>
            </ul>
          </div>
        </div>

        <!-- Radarr LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Radarr LXC (10.10.10.107)</h3>
          <p class="mb-4">Movie collection management and automation:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 107
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 30GB on vm-storage
# Network: Static IP 10.10.10.107
# Features: nesting=1 (enable during creation)

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create Radarr setup
mkdir -p ~/radarr
cd ~/radarr

# Create Docker Compose configuration
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Stockholm
    volumes:
      - ./config:/config
      - /mnt/media:/movies
      - /mnt/downloads:/downloads
    ports:
      - "7878:7878"
    restart: unless-stopped

  # Optional: Add Prowlarr for indexer management
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Stockholm
    volumes:
      - ./prowlarr-config:/config
    ports:
      - "9696:9696"
    restart: unless-stopped
EOF

# Create mount points (these should be mounted from your storage VM)
sudo mkdir -p /mnt/{media,downloads}

# Note: You'll need to mount these from your storage VM
# Example NFS mounts (add to /etc/fstab):
# 10.10.10.202:/mnt/storage/media /mnt/media nfs defaults 0 0
# 10.10.10.202:/mnt/storage/downloads /mnt/downloads nfs defaults 0 0

# Start services
docker-compose up -d

echo "Radarr setup complete!"
echo "Access Radarr at: http://10.10.10.107:7878"
echo "Access Prowlarr at: http://10.10.10.107:9696"</code></pre>
          
          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🎬 Radarr Configuration</h4>
            <p class="text-sm mb-2">Essential setup steps:</p>
            <ol class="text-sm space-y-1 list-decimal list-inside">
              <li>Configure root folders: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">/movies</code></li>
              <li>Add indexers (via Prowlarr or manually)</li>
              <li>Configure download client (qBittorrent recommended)</li>
              <li>Set up quality profiles (1080p, 4K, etc.)</li>
              <li>Configure naming conventions for organized library</li>
              <li>Connect to Jellyfin for automatic library updates</li>
            </ol>
          </div>
        </div>

        <!-- Forgejo LXC -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Forgejo LXC (10.10.10.108)</h3>
          <p class="mb-4">Self-hosted Git repository with web interface:</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 108
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 4096 MB (4GB)
# Storage: 50GB on vm-storage
# Network: Static IP 10.10.10.108

# Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose git
sudo usermod -aG docker $USER

# Create Forgejo setup
mkdir -p ~/forgejo
cd ~/forgejo

# Create Docker Compose configuration
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:1.21
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - FORGEJO__database__DB_TYPE=postgres
      - FORGEJO__database__HOST=db:5432
      - FORGEJO__database__NAME=forgejo
      - FORGEJO__database__USER=forgejo
      - FORGEJO__database__PASSWD=forgejo_password
    restart: unless-stopped
    volumes:
      - ./data:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "2222:22"
    depends_on:
      - db

  db:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_USER=forgejo
      - POSTGRES_PASSWORD=forgejo_password
      - POSTGRES_DB=forgejo
    volumes:
      - ./postgres:/var/lib/postgresql/data
    expose:
      - "5432"
EOF

# Create data directories
mkdir -p {data,postgres}

# Start services
docker-compose up -d

echo "Forgejo setup complete!"
echo "Access at: http://10.10.10.108:3000"</code></pre>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">🔧 Forgejo Configuration</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Initial Setup:</h5>
                <ul class="text-sm space-y-1">
                  <li>• Database: PostgreSQL (pre-configured)</li>
                  <li>• Site Title: "Homelab Git"</li>
                  <li>• SSH Port: 2222</li>
                  <li>• Admin Account: Create during setup</li>
                </ul>
              </div>
              <div>
                <h5 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Git Access:</h5>
                <ul class="text-sm space-y-1">
                  <li>• HTTP: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">http://10.10.10.108:3000</code></li>
                  <li>• SSH: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">git@10.10.10.108:2222</code></li>
                  <li>• Clone: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">git clone http://10.10.10.108:3000/user/repo.git</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PVE-PC2 Services Implementation -->
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
          <p class="mb-4">Windows VM with GPU passthrough for gaming and high-performance applications:</p>
          
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Prerequisites</h4>
            <ul class="text-sm space-y-1 text-yellow-700 dark:text-yellow-300">
              <li>• Complete GPU passthrough setup from the GPU Passthrough Guide</li>
              <li>• Ensure IOMMU is enabled and GPU is isolated</li>
              <li>• Have Windows 11 ISO ready</li>
              <li>• Dedicated GPU for passthrough (not the one used by Proxmox host)</li>
            </ul>
          </div>

          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 201
# Name: Gaming-VM
# OS: Microsoft Windows
# ISO: Windows 11 (upload to local storage)
# System: 
#   - Machine: q35
#   - BIOS: OVMF (UEFI)
#   - Add EFI Disk: Yes
#   - SCSI Controller: VirtIO SCSI single
# Hard Disk:
#   - Bus/Device: SCSI 0
#   - Storage: vm-storage
#   - Size: 500GB (or more for games)
#   - Cache: Write back
# CPU:
#   - Sockets: 1
#   - Cores: 8 (adjust based on your CPU)
#   - Type: host
# Memory: 16384 MB (16GB) - adjust based on available RAM
# Network:
#   - Bridge: vmbr0
#   - Model: VirtIO (paravirtualized)
#   - Static IP: 10.10.10.201

# After VM creation, add GPU passthrough via CLI:
# Replace with your actual GPU PCI IDs
qm set 201 -hostpci0 01:00,pcie=1,x-vga=1
qm set 201 -hostpci1 01:00.1,pcie=1  # GPU audio if separate

# Add USB controller for peripherals
qm set 201 -usb0 host=1-1  # Adjust USB port as needed

# Start VM and install Windows
qm start 201</code></pre>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎮 Post-Installation Steps</h4>
            <ol class="text-sm space-y-1 list-decimal list-inside">
              <li>Install Windows 11 and complete initial setup</li>
              <li>Install GPU drivers (NVIDIA/AMD)</li>
              <li>Install VirtIO drivers for optimal performance</li>
              <li>Configure Windows for gaming (disable Windows Defender real-time protection for game folders)</li>
              <li>Install Steam, Epic Games, or other game platforms</li>
              <li>Configure network settings (static IP: 10.10.10.201)</li>
              <li>Set up remote access (RDP) for management</li>
            </ol>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🔧 Performance Optimization</h4>
            <ul class="text-sm space-y-1">
              <li>• <strong>CPU Pinning:</strong> Pin VM cores to physical cores for better performance</li>
              <li>• <strong>Hugepages:</strong> Configure hugepages for reduced memory latency</li>
              <li>• <strong>CPU Governor:</strong> Set host CPU governor to 'performance'</li>
              <li>• <strong>Disk Cache:</strong> Use 'Write back' cache mode for better disk performance</li>
              <li>• <strong>Network:</strong> Use VirtIO network driver for best network performance</li>
            </ul>
          </div>
        </div>

        <!-- Storage/Media VM -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold mb-4">Storage/Media VM (10.10.10.202)</h3>
          <p class="mb-4">Ubuntu VM hosting Nextcloud and Jellyfin for file storage and media streaming:</p>
          
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 202
# Name: Storage-Media-VM
# OS: Linux
# ISO: Ubuntu 22.04 Server
# System: Default (i440fx is fine for Linux)
# Hard Disk:
#   - Bus/Device: SCSI 0
#   - Storage: vm-storage
#   - Size: 100GB (for OS and applications)
#   - Additional disk for data: 1TB+ (adjust based on needs)
# CPU:
#   - Sockets: 1
#   - Cores: 4
#   - Type: host
# Memory: 8192 MB (8GB)
# Network:
#   - Bridge: vmbr0
#   - Model: VirtIO
#   - Static IP: 10.10.10.202

# After Ubuntu installation, update system
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create directory structure
mkdir -p ~/services/{nextcloud,jellyfin}
mkdir -p ~/data/{nextcloud,media}/{config,data}

# Set up storage mount points
sudo mkdir -p /mnt/storage
# If using additional disk, format and mount it
# sudo mkfs.ext4 /dev/sdb1
# echo '/dev/sdb1 /mnt/storage ext4 defaults 0 0' | sudo tee -a /etc/fstab
# sudo mount -a</code></pre>

          <h4 class="text-lg font-semibold mb-3 mt-6">Nextcloud Setup</h4>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create Nextcloud Docker Compose
cd ~/services/nextcloud

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  nextcloud-db:
    image: mariadb:10.11
    container_name: nextcloud-db
    restart: unless-stopped
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=nextcloud_root_password
      - MYSQL_PASSWORD=nextcloud_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: unless-stopped
    ports:
      - "8080:80"
    links:
      - nextcloud-db
    volumes:
      - ./data:/var/www/html
      - /mnt/storage/nextcloud:/var/www/html/data
    environment:
      - MYSQL_PASSWORD=nextcloud_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=nextcloud-db
    depends_on:
      - nextcloud-db
EOF

# Start Nextcloud
docker-compose up -d

echo "Nextcloud setup complete!"
echo "Access at: http://10.10.10.202:8080"
echo "Complete setup via web interface"</code></pre>

          <h4 class="text-lg font-semibold mb-3 mt-6">Jellyfin Setup</h4>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create Jellyfin Docker Compose
cd ~/services/jellyfin

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - "8096:8096"
      - "8920:8920"  # HTTPS
      - "7359:7359/udp"  # Auto-discovery
      - "1900:1900/udp"  # DLNA
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/storage/media:/media:ro
    environment:
      - JELLYFIN_PublishedServerUrl=http://10.10.10.202:8096
    # Optional: Hardware acceleration (uncomment if supported)
    # devices:
    #   - /dev/dri:/dev/dri
    # group_add:
    #   - "109"  # render group
EOF

# Create media directory structure
sudo mkdir -p /mnt/storage/media/{movies,tv,music,photos}

# Start Jellyfin
docker-compose up -d

echo "Jellyfin setup complete!"
echo "Access at: http://10.10.10.202:8096"
echo "Complete setup via web interface"</code></pre>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📁 Storage Organization</h4>
            <div class="text-sm">
              <p class="mb-2">Recommended directory structure:</p>
              <pre class="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs"><code>/mnt/storage/
├── nextcloud/          # Nextcloud user data
├── media/
│   ├── movies/         # Movie files for Jellyfin
│   ├── tv/            # TV show files for Jellyfin
│   ├── music/         # Music files for Jellyfin
│   └── photos/        # Photo collections
└── downloads/         # Download staging area</code></pre>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🔧 Configuration Tips</h4>
            <ul class="text-sm space-y-1">
              <li>• <strong>Nextcloud:</strong> Configure external storage to access media files</li>
              <li>• <strong>Jellyfin:</strong> Add media libraries pointing to /media subdirectories</li>
              <li>• <strong>Backup:</strong> Regular backups of configuration and database files</li>
              <li>• <strong>Security:</strong> Configure reverse proxy with SSL certificates</li>
              <li>• <strong>Performance:</strong> Consider hardware transcoding for Jellyfin</li>
              <li>• <strong>Network:</strong> Set up NFS exports for other VMs to access media</li>
            </ul>
          </div>
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
          class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >

          Back To Index
        </button>

        <button 
          v-if="nextGuide"
          @click="navigateToNext"
          class="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ nextGuide.title }}
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L15.586 11H4a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <div v-else class="w-32"></div>
      </div>

    </section>

  </main>
</template>
