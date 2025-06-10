<script lang="ts" setup>
import { ref } from 'vue'
import { useGuideNavigation } from '../composables/useGuideNavigation'

const { currentGuide, previousGuide, navigateToHome, navigateToPrevious, getProgressInfo, guides } = useGuideNavigation()
const progress = getProgressInfo()

// Collapsible sections state
const expandedSections = ref<Record<string, boolean>>({
  initial: true,
  ssh: false,
  firewall: false,
  ssl: false,
  users: false,
  monitoring: false,
  backup: false,
  maintenance: false,
  performance: false
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

        <div class="w-32 flex justify-end">
          <div class="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium">
            Complete!
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-4xl font-bold mb-8 text-center">Security & Maintenance Guide</h1>

    <!-- Initial Security Hardening -->
    <section class="mb-8">
      <button 
        @click="toggleSection('initial')"
        class="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-red-900 dark:text-red-100">Initial Security Hardening</h2>
        <svg 
          class="w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.initial }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.initial" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Critical First Steps</h4>
          <p class="text-yellow-700 dark:text-yellow-300">Perform these steps immediately after completing the core setup on both Proxmox nodes.</p>
        </div>

        <h3 class="text-xl font-semibold mb-4">1. Change Default Passwords</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On both PC1 (10.10.10.100) and PC2 (10.10.10.200)
# Change root password to something strong
passwd root

# Verify password complexity
# Use at least 16 characters with mix of uppercase, lowercase, numbers, symbols</code></pre>

        <h3 class="text-xl font-semibold mb-4">2. Update System Packages</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Update package lists and upgrade all packages
apt update && apt upgrade -y

# Install essential security tools
apt install -y fail2ban ufw htop iotop

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades</code></pre>

        <h3 class="text-xl font-semibold mb-4">3. Configure Proxmox Repositories</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Remove enterprise repository (requires subscription)
sed -i 's/^deb/#deb/' /etc/apt/sources.list.d/pve-enterprise.list

# Add no-subscription repository
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list

# Update package lists
apt update</code></pre>
      </div>
    </section>

    <!-- SSH Security -->
    <section class="mb-8">
      <button 
        @click="toggleSection('ssh')"
        class="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-100">SSH Security Configuration</h2>
        <svg 
          class="w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.ssh }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.ssh" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">1. Generate SSH Key Pair (on your client machine)</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On your local machine (Windows/Mac/Linux)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key to both Proxmox nodes
ssh-copy-id root@10.10.10.100
ssh-copy-id root@10.10.10.200

# Test key-based authentication
ssh root@10.10.10.100
ssh root@10.10.10.200</code></pre>

        <h3 class="text-xl font-semibold mb-4">2. Harden SSH Configuration</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Backup original SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Edit SSH configuration
nano /etc/ssh/sshd_config

# Apply these security settings:
Port 22
PermitRootLogin yes  # Keep yes for Proxmox management
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
PrintMotd no
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# Restart SSH service
systemctl restart sshd</code></pre>

        <h3 class="text-xl font-semibold mb-4">3. Configure Fail2Ban</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Create custom Fail2Ban configuration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[proxmox]
enabled = true
port = https,http,8006
filter = proxmox
logpath = /var/log/daemon.log
maxretry = 3
bantime = 3600
EOF

# Create Proxmox filter
cat > /etc/fail2ban/filter.d/proxmox.conf << 'EOF'
[Definition]
failregex = pvedaemon\[.*authentication failure; rhost=< HOST > user=.* msg=.*
ignoreregex =
EOF

# Start and enable Fail2Ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status</code></pre>
      </div>
    </section>

    <!-- Maintenance & Updates -->
    <section class="mb-8">
      <button 
        @click="toggleSection('maintenance')"
        class="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-yellow-900 dark:text-yellow-100">System Maintenance & Updates</h2>
        <svg 
          class="w-6 h-6 text-yellow-600 dark:text-yellow-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.maintenance }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.maintenance" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">Regular Update Schedule</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Create update script
cat > /usr/local/bin/system-update.sh << 'EOF'
#!/bin/bash
LOG_FILE="/var/log/system-updates.log"
echo "$(date): Starting system update" >> $LOG_FILE

# Update package lists
apt update >> $LOG_FILE 2>&1

# Upgrade packages
apt upgrade -y >> $LOG_FILE 2>&1

# Clean up
apt autoremove -y >> $LOG_FILE 2>&1
apt autoclean >> $LOG_FILE 2>&1

# Update Proxmox
pveam update >> $LOG_FILE 2>&1

echo "$(date): System update completed" >> $LOG_FILE
EOF

chmod +x /usr/local/bin/system-update.sh

# Schedule weekly updates (Sunday 3 AM)
echo "0 3 * * 0 /usr/local/bin/system-update.sh" | crontab -</code></pre>

        <h3 class="text-xl font-semibold mb-4">ZFS Health Monitoring</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Create ZFS health check script
cat > /usr/local/bin/zfs-health-check.sh << 'EOF'
#!/bin/bash
LOG_FILE="/var/log/zfs-health.log"
echo "$(date): ZFS Health Check" >> $LOG_FILE

# Check pool status
zpool status >> $LOG_FILE 2>&1

# Check for errors
ERRORS=$(zpool status | grep -E "(DEGRADED|FAULTED|OFFLINE|UNAVAIL|REMOVED|FAIL|DESTROYED|corrupt|cannot|unrecover)")
if [ ! -z "$ERRORS" ]; then
    echo "ZFS ALERT: Pool issues detected!" | mail -s "ZFS Health Alert" admin@homelab.local
    echo "$ERRORS" >> $LOG_FILE
fi

# Check disk usage
zfs list -o name,used,avail,refer,mountpoint >> $LOG_FILE 2>&1
EOF

chmod +x /usr/local/bin/zfs-health-check.sh

# Run daily ZFS health check
echo "0 5 * * * /usr/local/bin/zfs-health-check.sh" | crontab -</code></pre>

        <h3 class="text-xl font-semibold mb-4">Log Rotation & Cleanup</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Configure logrotate for custom logs
cat > /etc/logrotate.d/homelab << 'EOF'
/var/log/system-updates.log {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}

/var/log/zfs-health.log {
    weekly
    rotate 8
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
EOF

# Clean old container templates and ISOs
cat > /usr/local/bin/cleanup-storage.sh << 'EOF'
#!/bin/bash
# Remove old container templates (keep last 3 versions)
find /var/lib/vz/template/cache -name "*.tar.*" -type f -printf '%T@ %p\n' | sort -n | head -n -3 | cut -d' ' -f2- | xargs -r rm

# Clean old ISO files if needed (manual review recommended)
echo "ISO files in /var/lib/vz/template/iso:"
ls -lah /var/lib/vz/template/iso/
EOF

chmod +x /usr/local/bin/cleanup-storage.sh</code></pre>
      </div>
    </section>

    <!-- Performance Optimization -->
    <section class="mb-8">
      <button 
        @click="toggleSection('performance')"
        class="w-full flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-pink-900 dark:text-pink-100">Performance Optimization</h2>
        <svg 
          class="w-6 h-6 text-pink-600 dark:text-pink-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.performance }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.performance" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">CPU Governor Optimization</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Install CPU frequency utilities
apt install -y cpufrequtils

# Set performance governor for gaming node (PC2)
# Add to /etc/default/cpufrequtils on PC2:
echo 'GOVERNOR="performance"' >> /etc/default/cpufrequtils

# For PC1 (always-on services), use ondemand
# Add to /etc/default/cpufrequtils on PC1:
echo 'GOVERNOR="ondemand"' >> /etc/default/cpufrequtils

# Apply settings
systemctl restart cpufrequtils

# Verify current governor
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor</code></pre>

        <h3 class="text-xl font-semibold mb-4">Memory Optimization</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Configure hugepages for better VM performance
# Add to /etc/default/grub:
GRUB_CMDLINE_LINUX_DEFAULT="quiet hugepages=1024"

# Update GRUB
update-grub

# Configure transparent hugepages
echo 'never' > /sys/kernel/mm/transparent_hugepage/enabled
echo 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' >> /etc/rc.local

# Optimize swappiness for server workload
echo 'vm.swappiness=10' >> /etc/sysctl.conf
sysctl -p</code></pre>

        <h3 class="text-xl font-semibold mb-4">Network Optimization</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Optimize network settings for virtualization
cat >> /etc/sysctl.conf << 'EOF'
# Network optimizations
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 87380 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr
EOF

# Apply settings
sysctl -p

# Enable BBR congestion control
echo 'tcp_bbr' >> /etc/modules</code></pre>

        <h3 class="text-xl font-semibold mb-4">Storage Performance Tuning</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Optimize ZFS for your workload
# For PC1 (development/services)
zfs set primarycache=all vm-storage
zfs set secondarycache=all vm-storage
zfs set logbias=latency vm-storage

# For PC2 gaming VM pool
zfs set primarycache=all vm-fast
zfs set secondarycache=all vm-fast
zfs set logbias=throughput vm-fast

# For PC2 storage pool
zfs set primarycache=metadata storage
zfs set secondarycache=all storage
zfs set logbias=throughput storage

# Set optimal record sizes (already configured in core setup)
# vm-storage: 64k (good for VMs)
# vm-fast: 64k (gaming VMs)
# storage/media: 1M (large files)</code></pre>
      </div>
    </section>

    <!-- Security Checklist -->
    <section class="mb-8">
      <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h2 class="text-2xl font-semibold text-green-900 dark:text-green-100 mb-4">Security Checklist</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">✅ Essential Security</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Strong root passwords set
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                SSH key authentication enabled
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Fail2Ban configured and running
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Firewall rules configured
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Automatic updates enabled
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-3">🔧 Maintenance Tasks</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Weekly system updates scheduled
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                ZFS health monitoring active
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Log rotation configured
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Performance optimizations applied
              </li>
              <li class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Backup strategy implemented
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 class="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">🚀 Next Steps</h3>
          <ol class="list-decimal list-inside space-y-1 text-sm">
            <li>Review and test all security configurations</li>
            <li>Set up monitoring alerts and notifications</li>
            <li>Document your specific configurations</li>
            <li>Create disaster recovery procedures</li>
            <li>Schedule regular security audits</li>
            <li>Keep security tools and signatures updated</li>
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

        <div class="w-32 flex justify-end">
          <div class="px-6 py-3 bg-green-600 text-white rounded-lg font-medium">
            🎉 Homelab Complete!
          </div>
        </div>
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

      <!-- Completion Message -->
      <div class="mt-8 text-center">
        <div class="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 class="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">🎊 Congratulations!</h3>
          <p class="text-green-700 dark:text-green-300">
            You've successfully completed the entire Proxmox homelab setup journey. Your infrastructure is now secure, optimized, and ready for production use!
          </p>
        </div>
      </div>
    </section>

  </main>
</template>
