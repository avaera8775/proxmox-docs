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
