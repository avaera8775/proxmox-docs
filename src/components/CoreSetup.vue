<script lang="ts" setup>
import { useGuideNavigation } from '../composables/useGuideNavigation'

const { currentGuide, nextGuide, previousGuide, navigateToHome, navigateToNext, navigateToPrevious, getProgressInfo, guides } = useGuideNavigation()
const progress = getProgressInfo()
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

    <h1 class="text-4xl font-bold mb-8 text-center">Step-by-Step Core Setup</h1>

    <!-- Step 1 -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Step 1: Proxmox VE Installation</h2>

      <p class="mb-4"><strong>Both Nodes:</strong></p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Download Proxmox VE 8.x ISO from proxmox.com</li>
        <li>Create bootable USB with Rufus/Balena Etcher</li>
        <li>Boot from USB on each system</li>
      </ul>

      <p class="font-semibold mb-2">Network Configuration During Install:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 pl-5">
        <li>PC1: IP 10.10.10.100, Gateway 10.10.10.1, DNS 10.10.10.1</li>
        <li>PC2: IP 10.10.10.200, Gateway 10.10.10.1, DNS 10.10.10.1</li>
      </ul>

      <p>Complete installation with root password and email.</p>
    </section>

    <!-- Step 2 -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Step 2: ZFS Pool Creation</h2>

      <article class="mb-6">
        <h3 class="text-xl font-semibold mb-2">PC1 (Mini PC - Ryzen 5500U, 64GB RAM, 2TB SSD):</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Identify the 2TB SSD
lsblk
# Expected: /dev/sda or /dev/nvme0n1 (2TB SSD)

# Create main storage pool on 2TB SSD
zpool create -o ashift=12 vm-storage /dev/sda

# Optimize for VMs and containers
zfs set compression=lz4 vm-storage
zfs set atime=off vm-storage
zfs set recordsize=64k vm-storage  # Good balance for VMs

# Create datasets for different workloads
zfs create vm-storage/vm-disks
zfs create vm-storage/containers  
zfs create vm-storage/backups
zfs create vm-storage/templates
        </code></pre>
      </article>

      <article>
        <h3 class="text-xl font-semibold mb-2">PC2 (Gaming PC - Ryzen 7 9700X, 64GB RAM, RX 7800XT):</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Identify drives first
lsblk
# Expected layout:
# /dev/nvme0n1 - 500GB NVMe (Gaming VM - fastest)
# /dev/nvme1n1 - 500GB NVMe (Gaming VM mirror or separate)
# /dev/sda - 4TB HDD (Storage pool)
# /dev/sdb - 1TB SSD (Storage pool mirror)
# /dev/sdc - 250GB SSD (Cache/transcoding)

# Fast pool for gaming VM (500GB NVMe)
zpool create -o ashift=12 vm-fast /dev/nvme0n1
zfs set compression=lz4 vm-fast
zfs set atime=off vm-fast
zfs set recordsize=64k vm-fast  # Optimized for gaming workloads

# Storage pool (4TB HDD + 1TB SSD mirror for redundancy)
zpool create -o ashift=12 storage mirror /dev/sda /dev/sdb
# Add 250GB SSD as L2ARC cache for better read performance
zpool add storage cache /dev/sdc
zfs set compression=lz4 storage
zfs set atime=off storage

# Create datasets with specific optimizations
zfs create vm-fast/gaming-vm
zfs set recordsize=64k vm-fast/gaming-vm  # Gaming VM optimization

zfs create storage/media
zfs set recordsize=1M storage/media  # Large file optimization for media
zfs create storage/nextcloud
zfs create storage/backups
zfs create storage/transcoding-cache
zfs set recordsize=128k storage/transcoding-cache  # Video transcoding temp
        </code></pre>
      </article>
    </section>

    <!-- Step 3 -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Step 3: Cluster Setup</h2>

      <article class="mb-6">
        <h3 class="text-xl font-semibold mb-2">On PC1:</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
pvecm create homelab-cluster --link0 10.10.10.100
        </code></pre>
      </article>

      <article class="mb-6">
        <h3 class="text-xl font-semibold mb-2">On PC2:</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
pvecm add 10.10.10.100 --link0 10.10.10.200
        </code></pre>
      </article>

      <article>
        <h3 class="text-xl font-semibold mb-2">Verify:</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code>
pvecm status
pvecm nodes
        </code></pre>
      </article>
    </section>

    <!-- Step 4 -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Step 4: Storage Configuration in Web UI</h2>

      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Access <a href="https://10.10.10.100:8006" class="text-blue-500 underline" target="_blank" rel="noopener">https://10.10.10.100:8006</a> or <a href="https://10.10.10.200:8006" class="text-blue-500 underline" target="_blank" rel="noopener">https://10.10.10.200:8006</a></li>
        <li>Go to Datacenter → Storage → Add → ZFS</li>
        <li>Add each pool:
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li><code>vm-storage</code> (PC1) - Enable VM disks, Containers, Backups</li>
            <li><code>vm-fast</code> (PC2) - Enable VM disks only</li>
            <li><code>storage</code> (PC2) - Enable Containers, Backups</li>
          </ul>
        </li>
      </ul>

      <p class="italic">Next Phase Ready</p>
      <p>Core infrastructure complete. Ready for VM/container creation with individual static IPs as needed.</p>

      <p class="mt-4 font-semibold">Perfect numbering scheme! The .100/.200 makes it easy to identify which node services are running on at a glance.</p>
    </section>

    <!-- Clarification on cluster join command -->
    <section class="mb-10 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg border border-gray-300 dark:border-gray-700">
      <h2 class="text-2xl font-semibold mb-4">Cluster Commands Explained</h2>

      <article class="mb-4">
        <h3 class="text-xl font-semibold mb-2">Step 1: Create Cluster (PC1 only)</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm create homelab-cluster --link0 10.10.10.100
        </code></pre>
        <p>This creates the cluster and makes PC1 the first member.</p>
      </article>

      <article class="mb-4">
        <h3 class="text-xl font-semibold mb-2">Step 2: Join Cluster (PC2 only)</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm add 10.10.10.100 --link0 10.10.10.200
        </code></pre>
        <p>This joins PC2 to the existing cluster created on PC1. This IS the join command.</p>
      </article>

      <article>
        <h3 class="text-xl font-semibold mb-2">Step 3: Verify Both Nodes Are Joined</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm status
pvecm nodes
        </code></pre>
        <p>Run this on either node to confirm both are in the cluster.</p>
      </article>

      <p class="mt-4">So no separate join command needed - <code>pvecm add</code> handles the joining process completely.</p>
    </section>

    <!-- Summary after steps -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Summary After Completing These Steps</h2>
      <p>Exactly! After completing those 4 steps, you'll have:</p>
      <ul class="list-disc list-inside space-y-1 mt-3">
        <li>✅ Both Proxmox nodes installed and networked</li>
        <li>✅ ZFS pools created and optimized</li>
        <li>✅ Cluster established and functioning</li>
        <li>✅ Storage configured in web interface</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2">Ready for Next Phase</h3>
      <p>You'll be able to immediately start:</p>
      <ul class="list-disc list-inside space-y-1 mt-3">
        <li>Creating VMs with the hardware allocations we discussed</li>
        <li>Creating LXC containers for lightweight services</li>
        <li>Assigning specific IP addresses to each service</li>
        <li>Setting up GPU passthrough preparation on PC2</li>
        <li>Installing your development stack, PiHole, monitoring, etc.</li>
      </ul>
    </section>

    <!-- Quick verification checklist -->
    <section class="mb-10 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-300 dark:border-gray-700">
      <h2 class="text-2xl font-semibold mb-4">Quick Verification Checklist</h2>
      <p>Before moving to VMs/LXC creation:</p>
      <ul class="list-disc list-inside space-y-1 mt-3">
        <li>Both nodes visible in web UI: <a href="https://10.10.10.100:8006" target="_blank" rel="noopener" class="text-blue-600 underline">https://10.10.10.100:8006</a></li>
        <li><code>pvecm status</code> shows 2 nodes online</li>
        <li>All ZFS pools show "Healthy" in Storage tab</li>
        <li>Can create test VM on each storage pool</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2">Resource Allocation Plan</h3>
      <ul class="list-disc list-inside space-y-1 mt-3">
        <li><strong>PC1 (64GB total):</strong> Development VM (24GB), PiHole LXC (2GB), Monitoring LXC (8GB), Reverse Proxy LXC (2GB), Host reserves (28GB)</li>
        <li><strong>PC2 (64GB total):</strong> Gaming VM (32GB + RX 7800XT), Storage/Media VM (20GB), Host reserves (12GB)</li>
      </ul>

      <p class="mt-4">The foundation will be solid and ready for your services!</p>
    </section>

    <!-- SMB Share Integration -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">SMB Share Integration</h2>
      <p>Add Samba to Storage VM Docker Compose</p>

      <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code>version: '3.8'
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
    links:
      - nextcloud-db
    volumes:
      - nextcloud_data:/var/www/html
      - /mnt/storage/nextcloud:/var/www/html/data
      - /mnt/storage/shared:/mnt/shared  # Shared folder accessible in Nextcloud
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
      - jellyfin_cache:/cache
      - /mnt/storage/media:/media

  samba:
    image: dperson/samba:latest
    restart: unless-stopped
    ports:
      - "139:139"
      - "445:445"
    volumes:
      - /mnt/storage/shared:/shared
      - /mnt/storage/gaming-footage:/gaming-footage
      - /mnt/storage/media:/media:ro  # Read-only access to media
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
  jellyfin_cache:
</code></pre>

      <h3 class="text-xl font-semibold mb-2">Directory Structure on Storage VM</h3>
      <p>Create the directory structure:</p>
      <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># SSH into storage VM (10.10.10.202)
sudo mkdir -p /mnt/storage/{nextcloud,shared,gaming-footage,media}
sudo chown -R 1000:1000 /mnt/storage/
      </code></pre>

      <h3 class="text-xl font-semibold mb-2">ZFS Dataset Organization (Optional Enhancement)</h3>
      <p>If you want better organization, you can create specific ZFS datasets:</p>
      <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># On PC2 Proxmox host
zfs create storage/shared
zfs create storage/gaming-footage  
zfs create storage/media
zfs create storage/nextcloud

# Then mount these in the VM
# Add to VM's /etc/fstab or use bind mounts
      </code></pre>

      <p>This helps keep data organized and provides flexibility for snapshots/backups per dataset.</p>
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