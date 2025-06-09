<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  navigate: [page: string]
}>()

const backToIndex = () => {
  emit('navigate', 'index')
}
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
        Core Setup Guide
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
        <h3 class="text-xl font-semibold mb-2">PC1 (after Proxmox installation):</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Create main storage pool
zpool create -o ashift=12 vm-storage /dev/nvme0n1

# Optimize for VMs
zfs set compression=lz4 vm-storage
zfs set atime=off vm-storage

# Create datasets
zfs create vm-storage/vm-disks
zfs create vm-storage/containers  
zfs create vm-storage/backups
        </code></pre>
      </article>

      <article>
        <h3 class="text-xl font-semibold mb-2">PC2 (after Proxmox installation):</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Identify drives first
lsblk

# Fast pool for gaming VM (1TB NVMe)
zpool create -o ashift=12 vm-fast /dev/nvme0n1
zfs set compression=lz4 vm-fast
zfs set atime=off vm-fast

# Storage pool (500GB SSD mirror + 4TB HDD)
zpool create -o ashift=12 storage mirror /dev/sda /dev/sdb
zpool add storage /dev/sdc
zfs set compression=lz4 storage
zfs set atime=off storage

# Create datasets
zfs create vm-fast/gaming
zfs create storage/media
zfs create storage/nextcloud
zfs create storage/backups
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
        <li>PC1: Development VM (24GB), PiHole LXC (2GB), Monitoring LXC (8GB), etc.</li>
        <li>PC2: Gaming VM (32GB + GPU), Storage/Media VM (20GB)</li>
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

    <!-- End note -->
    <section class="mt-10 text-center text-gray-500 dark:text-gray-400">
      <p>— End of detailed setup instructions —</p>
    </section>
  </main>
</template>
