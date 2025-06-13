<script lang="ts" setup>
import { ref } from "vue";
import { useGuideNavigation } from "../composables/useGuideNavigation";

const {
  currentGuide,
  previousGuide,
  navigateToHome,
  navigateToPrevious,
  getProgressInfo,
  guides,
} = useGuideNavigation();
const progress = getProgressInfo();

// Collapsible sections state
const expandedSections = ref<Record<string, boolean>>({
  critical: true,
  userManagement: false,
  fail2ban: false,
  firewall: false,
  vmHardening: false,
  monitoring: false,
  troubleshooting: false,
});

const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section];
};
</script>

<template>
  <main
    class="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans"
  >
    <!-- Navigation Header -->
    <div class="mb-8">
      <!-- Progress Bar -->
      <div class="mb-4">
        <div
          class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"
        >
          <span>Step {{ progress.current }} of {{ progress.total }}</span>
          <span>{{ progress.percentage }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress.percentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="flex items-center justify-between">
        <button
          @click="navigateToHome"
          class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Back to Index
        </button>

        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ currentGuide?.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ currentGuide?.description }}
          </p>
        </div>

        <div class="w-32 flex justify-end">
          <div
            class="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium"
          >
            Complete!
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-4xl font-bold mb-8 text-center">
      Enhanced Proxmox Security Setup Guide
    </h1>

    <!-- Critical First Steps -->
    <section class="mb-8">
      <button
        @click="toggleSection('critical')"
        class="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-red-900 dark:text-red-100">
          ⚠️ Critical First Steps
        </h2>
        <svg
          class="w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.critical }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.critical"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div
          class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6"
        >
          <p class="text-yellow-700 dark:text-yellow-300">
            Perform these steps immediately after completing the core setup on
            both Proxmox nodes.
          </p>
        </div>

        <h3 class="text-xl font-semibold mb-4">1. Change Default Passwords</h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># On both PC1 (10.10.10.100) and PC2 (10.10.10.200)
# Change root password to something strong
passwd root

# Verify password complexity
# Use at least 16 characters with mix of uppercase, lowercase, numbers, symbols</code></pre>

        <h3 class="text-xl font-semibold mb-4">2. Update System Packages</h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Update package lists and upgrade all packages
apt update && apt upgrade -y

# Install essential security tools
apt install -y fail2ban ufw htop iotop sudo

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          3. Configure Proxmox Repositories
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"
        ><code># Remove enterprise repository (requires subscription)
sed -i 's/^deb/#deb/' /etc/apt/sources.list.d/pve-enterprise.list

# Add no-subscription repository
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list

# Update package lists
apt update</code></pre>
      </div>
    </section>

    <!-- Enhanced User Management & SSH Security -->
    <section class="mb-8">
      <button
        @click="toggleSection('userManagement')"
        class="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-100">
          🔐 Enhanced User Management & SSH Security
        </h2>
        <svg
          class="w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.userManagement }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.userManagement"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold mb-4">
          4. Create Administrative User (Instead of Using Root)
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Create a dedicated admin user for management
useradd -m -s /bin/bash -G sudo,adm admin

# Set a strong password
passwd admin

# Add user to Proxmox admin group (for PVE management)
usermod -aG www-data admin

# Create SSH directory for the new user
mkdir -p /home/admin/.ssh
chmod 700 /home/admin/.ssh
chown admin:admin /home/admin/.ssh</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          5. Generate and Deploy SSH Keys
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># On your local machine (Windows/Mac/Linux)
# Generate a strong SSH key pair
ssh-keygen -t ed25519 -C "proxmox-homelab-admin-$(date +%Y%m%d)"

# Alternative naming options:
# ssh-keygen -t ed25519 -C "your-name-proxmox-admin-2025"
# ssh-keygen -t ed25519 -C "proxmox-cluster-admin-key"

# For additional security, consider using a passphrase-protected key
# Store the key in a specific location, e.g., ~/.ssh/proxmox_ed25519

# Copy public key to admin user (preferred method)
ssh-copy-id -i ~/.ssh/proxmox_ed25519.pub admin@10.10.10.100
ssh-copy-id -i ~/.ssh/proxmox_ed25519.pub admin@10.10.10.200

# If ssh-copy-id doesn't work, manually copy:
# cat ~/.ssh/proxmox_ed25519.pub | ssh admin@10.10.10.100 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          6. Configure SSH Client for Easy Access
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># On your local machine, create/edit ~/.ssh/config
cat >> ~/.ssh/config << 'EOF'
Host proxmox1
    HostName 10.10.10.100
    User admin
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

Host proxmox2
    HostName 10.10.10.200
    User admin
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

# For root access when absolutely necessary
Host proxmox1-root
    HostName 10.10.10.100
    User root
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

Host proxmox2-root
    HostName 10.10.10.200
    User root
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22
EOF

# Set proper permissions
chmod 600 ~/.ssh/config</code></pre>

        <h3 class="text-xl font-semibold mb-4">7. Harden SSH Configuration</h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Backup original SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Create enhanced SSH configuration
cat > /etc/ssh/sshd_config << 'EOF'
# Enhanced SSH Security Configuration for Proxmox

# Network
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Authentication
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes

# Root access - RESTRICTED
PermitRootLogin prohibit-password  # Only key-based root login
# Consider changing to 'no' after testing admin user access

# User restrictions
AllowUsers admin root
MaxAuthTries 3
MaxSessions 3
LoginGraceTime 30

# Session management
ClientAliveInterval 300
ClientAliveCountMax 2
TCPKeepAlive yes

# Security features
X11Forwarding no
AllowTcpForwarding yes
GatewayPorts no
PermitTunnel no
PrintMotd yes
Banner /etc/issue.net

# Logging
SyslogFacility AUTH
LogLevel VERBOSE

# Subsystems
Subsystem sftp /usr/lib/openssh/sftp-server
EOF

# Create security banner
cat > /etc/issue.net << 'EOF'
***************************************************************************
                            AUTHORIZED ACCESS ONLY
***************************************************************************
This system is for authorized users only. All activities are monitored
and logged. Unauthorized access is prohibited and will be prosecuted.
***************************************************************************
EOF

# Test configuration and restart SSH
sshd -t && systemctl restart sshd</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          8. Configure Sudo for Admin User
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"
        ><code># Create sudo configuration for admin user
cat > /etc/sudoers.d/admin << 'EOF'
# Admin user sudo configuration
admin ALL=(ALL:ALL) ALL

# Optional: Allow admin to run specific commands without password
# admin ALL=(ALL) NOPASSWD: /usr/bin/systemctl, /usr/sbin/pct, /usr/sbin/qm
EOF

# Set proper permissions
chmod 440 /etc/sudoers.d/admin

# Test sudo configuration
visudo -c</code></pre>
      </div>
    </section>

    <!-- Enhanced Fail2Ban Configuration -->
    <section class="mb-8">
      <button
        @click="toggleSection('fail2ban')"
        class="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-purple-900 dark:text-purple-100">
          🛡️ Enhanced Fail2Ban Configuration
        </h2>
        <svg
          class="w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.fail2ban }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.fail2ban"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold mb-4">
          9. Configure Advanced Fail2Ban
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Create comprehensive Fail2Ban configuration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Ban settings
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

# Notification (optional - configure email)
# destemail = admin@yourdomain.com
# sendername = Fail2Ban-Proxmox
# mta = sendmail

# Whitelist your management network
ignoreip = 127.0.0.1/8 ::1 10.10.10.0/24

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 7200

[proxmox]
enabled = true
port = https,http,8006
filter = proxmox
logpath = /var/log/daemon.log
maxretry = 3
bantime = 3600

[proxmox-web]
enabled = true
port = 8006
filter = proxmox-web
logpath = /var/log/daemon.log
maxretry = 5
bantime = 1800
EOF</code></pre>

        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Create Proxmox web interface filter
cat > /etc/fail2ban/filter.d/proxmox-web.conf << 'EOF'
[Definition]
failregex = pveproxy\[.*\]: authentication failure; rhost=< HOST > user=.* msg=.*
ignoreregex =
EOF

# Enhanced Proxmox filter
cat > /etc/fail2ban/filter.d/proxmox.conf << 'EOF'
[Definition]
failregex = pvedaemon\[.*\]: authentication failure; rhost=< HOST > user=.* msg=.*
            pveproxy\[.*\]: authentication failure; rhost= < HOST > user=.* msg=.*
ignoreregex =
EOF

# Start and enable Fail2Ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status
fail2ban-client status sshd
fail2ban-client status proxmox</code></pre>
      </div>
    </section>

    <!-- Firewall Configuration -->
    <section class="mb-8">
      <button
        @click="toggleSection('firewall')"
        class="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-orange-900 dark:text-orange-100">
          🔥 Firewall Configuration
        </h2>
        <svg
          class="w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.firewall }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.firewall"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold mb-4">
          10. Configure UFW on Proxmox Hosts (Recommended)
        </h3>
        <div
          class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
        >
          <p class="text-blue-700 dark:text-blue-300 font-medium">
            Run this on PROXMOX HOSTS (not VMs/LXCs)
          </p>
        </div>

        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Reset UFW to defaults
ufw --force reset

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH access
ufw allow ssh

# Allow Proxmox web interface
ufw allow 8006/tcp

# Allow cluster communication (if using clustering)
ufw allow from 10.10.10.0/24 to any port 5404,5405

# Allow SPICE/VNC for VM console access
ufw allow from 10.10.10.0/24 to any port 5900:6000

# Allow common services that VMs might need
# HTTP/HTTPS (if you have web servers)
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status verbose</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Alternative: Per-VM/Container Firewall (Advanced)
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          If you prefer granular control, install UFW inside each VM/container:
        </p>

        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Inside each VM/LXC - basic template
apt install -y ufw

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (always needed for management)
ufw allow ssh

# Add service-specific rules, examples:
# For web servers:
# ufw allow 80/tcp
# ufw allow 443/tcp

# For database servers:
# ufw allow from 10.10.10.0/24 to any port 3306  # MySQL
# ufw allow from 10.10.10.0/24 to any port 5432  # PostgreSQL

# Enable firewall
ufw --force enable</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Proxmox Built-in Firewall (Alternative Option)
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"
        ><code># Enable Proxmox firewall
pvesh set /nodes/$(hostname)/firewall/options --enable 1

# Configure via web interface: Datacenter → Firewall
# Or via command line - but web interface is easier for initial setup</code></pre>
      </div>
    </section>

    <!-- VM/Container Hardening -->
    <section class="mb-8">
      <button
        @click="toggleSection('vmHardening')"
        class="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-green-900 dark:text-green-100">
          🖥️ VM/Container Hardening Process
        </h2>
        <svg
          class="w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.vmHardening }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.vmHardening"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div
          class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
        >
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            📝 VM/Container User Setup Process
          </h4>
          <p class="text-blue-700 dark:text-blue-300 text-sm">
            Follow this step-by-step process for each new VM/container to avoid using root access and implement SSH key authentication.
            <br><strong>Note:</strong> VM IPs are available in the Services Guide component for reference.
          </p>
        </div>

        <h3 class="text-xl font-semibold mb-4">
          Step 1: Initial Access (Usually Root-Only)
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Most VMs/containers start with only root access available:
        </p>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Connect to your new VM/container using actual service IPs:
ssh root@10.10.10.101  # Development VM
ssh root@10.10.10.102  # PiHole LXC
ssh root@10.10.10.103  # Monitoring Stack LXC
ssh root@10.10.10.104  # Reverse Proxy LXC
ssh root@10.10.10.105  # Documentation Server LXC
ssh root@10.10.10.201  # Gaming VM (Windows)
ssh root@10.10.10.202  # Storage/Media VM</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 2: Create Admin User Inside VM/Container
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Inside each VM/container, create admin user
useradd -m -s /bin/bash -G sudo admin
passwd admin

# Create SSH directory for admin user
mkdir -p /home/admin/.ssh
chmod 700 /home/admin/.ssh
chown admin:admin /home/admin/.ssh</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 3: Deploy SSH Keys to Both Users
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          From your admin PC, copy your SSH key to BOTH users for safety:
        </p>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># From your admin PC - copy to BOTH users for each VM/container:
# Development VM
ssh-copy-id admin@10.10.10.101
ssh-copy-id root@10.10.10.101    # Keep root access initially for safety

# PiHole LXC
ssh-copy-id admin@10.10.10.102
ssh-copy-id root@10.10.10.102

# Monitoring Stack LXC
ssh-copy-id admin@10.10.10.103
ssh-copy-id root@10.10.10.103

# Reverse Proxy LXC
ssh-copy-id admin@10.10.10.104
ssh-copy-id root@10.10.10.104

# Documentation Server LXC
ssh-copy-id admin@10.10.10.105
ssh-copy-id root@10.10.10.105

# Storage/Media VM
ssh-copy-id admin@10.10.10.202
ssh-copy-id root@10.10.10.202

# Alternative manual method if ssh-copy-id doesn't work:
# cat ~/.ssh/id_ed25519.pub | ssh admin@10.10.10.101 "cat >> ~/.ssh/authorized_keys"
# cat ~/.ssh/id_ed25519.pub | ssh root@10.10.10.101 "cat >> ~/.ssh/authorized_keys"</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 4: Test SSH Key Authentication
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Test both connections work with SSH keys for each VM/container:
# Development VM
ssh admin@10.10.10.101
ssh root@10.10.10.101

# PiHole LXC
ssh admin@10.10.10.102
ssh root@10.10.10.102

# Monitoring Stack LXC
ssh admin@10.10.10.103
ssh root@10.10.10.103

# Reverse Proxy LXC
ssh admin@10.10.10.104
ssh root@10.10.10.104

# Documentation Server LXC
ssh admin@10.10.10.105
ssh root@10.10.10.105

# Storage/Media VM
ssh admin@10.10.10.202
ssh root@10.10.10.202

# If successful, you should connect without password prompts</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 5: Harden SSH Configuration
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Once SSH key authentication is confirmed working, harden the SSH configuration:
        </p>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Inside the VM/container, harden SSH (run as root or with sudo)
# Restrict root login to key-only (safer than completely disabling)
sed -i 's/PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config

# Disable password authentication entirely
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Restart SSH service to apply changes
systemctl restart sshd</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 6: Configure SSH Client Shortcuts (Optional)
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Add convenient SSH shortcuts to your local ~/.ssh/config:
        </p>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># On your admin PC, add to ~/.ssh/config
cat >> ~/.ssh/config << 'EOF'
# Development VM
Host dev-vm
    HostName 10.10.10.101
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host dev-vm-root
    HostName 10.10.10.101
    User root
    IdentityFile ~/.ssh/id_ed25519

# Web Server VM
Host web-vm
    HostName 10.10.10.102
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host web-vm-root
    HostName 10.10.10.102
    User root
    IdentityFile ~/.ssh/id_ed25519

# Database VM
Host db-vm
    HostName 10.10.10.103
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host db-vm-root
    HostName 10.10.10.103
    User root
    IdentityFile ~/.ssh/id_ed25519
EOF

# Now you can connect easily:
# ssh dev-vm      # Connect as admin user
# ssh dev-vm-root # Connect as root when needed</code></pre>

        <h3 class="text-xl font-semibold mb-4">
          Step 7: Additional Security (Optional)
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Inside each VM/container, install additional security tools
apt update && apt upgrade -y
apt install -y fail2ban ufw

# Configure basic fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Configure basic firewall (adjust ports as needed for your services)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
# ufw allow 80/tcp   # For web servers
# ufw allow 443/tcp  # For HTTPS
# ufw allow 3306/tcp # For MySQL (from local network only)
ufw --force enable</code></pre>

        <div
          class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6"
        >
          <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            ⚠️ Important Safety Notes
          </h4>
          <ul
            class="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300"
          >
            <li>
              <strong>Always test SSH key authentication</strong> before
              disabling password authentication
            </li>
            <li>
              <strong>Keep root access available</strong> initially in case you
              need to troubleshoot admin user issues
            </li>
            <li>
              <strong>Use Proxmox console access</strong> as a backup if you get
              locked out via SSH
            </li>
            <li>
              <strong>Document your VM IPs and access methods</strong> for easy
              reference
            </li>
            <li>
              <strong>Test connectivity</strong> from your admin PC before
              proceeding to the next VM
            </li>
          </ul>
        </div>

        <div
          class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6"
        >
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">
            ✅ VM Hardening Checklist
          </h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">
                For Each VM/Container:
              </h5>
              <ul class="space-y-1 text-sm text-green-600 dark:text-green-400">
                <li>□ Admin user created with sudo access</li>
                <li>□ SSH keys deployed to admin user</li>
                <li>□ SSH keys deployed to root user (backup)</li>
                <li>□ SSH key authentication tested</li>
                <li>□ Password authentication disabled</li>
                <li>□ Root login restricted to keys only</li>
                <li>□ SSH shortcuts configured locally</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">
                Optional Security:
              </h5>
              <ul class="space-y-1 text-sm text-green-600 dark:text-green-400">
                <li>□ Fail2ban installed and configured</li>
                <li>□ UFW firewall configured</li>
                <li>□ System packages updated</li>
                <li>□ Service-specific firewall rules</li>
                <li>□ Regular update schedule planned</li>
                <li>□ Backup access method verified</li>
                <li>□ Documentation updated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Monitoring -->
    <section class="mb-8">
      <button
        @click="toggleSection('monitoring')"
        class="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">
          🔍 Security Monitoring
        </h2>
        <svg
          class="w-6 h-6 text-indigo-600 dark:text-indigo-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.monitoring }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.monitoring"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold mb-4">
          12. Basic Security Monitoring Commands
        </h3>
        <pre
          class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"
        ><code># Check failed login attempts
grep "Failed password" /var/log/auth.log | tail -10

# Check Fail2Ban status
fail2ban-client status
fail2ban-client banned

# Monitor active connections
ss -tuln
netstat -tulpn

# Check running processes
ps aux | grep -E "(ssh|pve)"

# Review recent logins
last -n 20

# Check for suspicious processes
ps aux --sort=-%cpu | head -10</code></pre>

        <div
          class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            🚀 Next Steps After Setup
          </h4>
          <ol
            class="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300"
          >
            <li>
              <strong>Test everything</strong>: Verify you can access both
              Proxmox nodes with your admin user
            </li>
            <li>
              <strong>Backup configurations</strong>: Save your SSH keys and
              configuration files
            </li>
            <li>
              <strong>Document access</strong>: Keep a secure record of all
              credentials and keys
            </li>
            <li>
              <strong>Regular updates</strong>: Set up automated security
              updates
            </li>
            <li>
              <strong>Monitor logs</strong>: Regularly check authentication and
              system logs
            </li>
            <li>
              <strong>Consider additional security</strong>: VPN access,
              certificate-based authentication
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Troubleshooting -->
    <section class="mb-8">
      <button
        @click="toggleSection('troubleshooting')"
        class="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-yellow-900 dark:text-yellow-100">
          🔧 Troubleshooting & Important Notes
        </h2>
        <svg
          class="w-6 h-6 text-yellow-600 dark:text-yellow-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.troubleshooting }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        v-show="expandedSections.troubleshooting"
        class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
        >
          <h4 class="font-semibold text-red-800 dark:text-red-200 mb-2">
            ⚠️ Important Security Notes
          </h4>
          <ul
            class="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300"
          >
            <li>
              <strong>Never</strong> disable root access until you've thoroughly
              tested admin user access
            </li>
            <li>
              Keep a backup method to access your systems (console access,
              recovery media)
            </li>
            <li>Regularly rotate SSH keys (every 6-12 months)</li>
            <li>Use different keys for different environments if possible</li>
            <li>
              Consider using SSH jump hosts for additional security layers
            </li>
            <li>Monitor your systems regularly for unusual activity</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold mb-4">If you get locked out:</h3>
        <ol
          class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6"
        >
          <li>Use Proxmox console access through the web interface</li>
          <li>
            Check SSH configuration:
            <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >sshd -t</code
            >
          </li>
          <li>
            Review SSH logs:
            <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >tail -f /var/log/auth.log</code
            >
          </li>
          <li>
            Verify user permissions:
            <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >id admin</code
            >
          </li>
          <li>
            Check SSH key permissions:
            <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >ls -la /home/admin/.ssh/</code
            >
          </li>
        </ol>

        <div
          class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">
            ✅ Security Checklist
          </h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">
                Essential Security:
              </h5>
              <ul class="space-y-1 text-sm text-green-600 dark:text-green-400">
                <li>✓ Strong root passwords set</li>
                <li>✓ Admin user created</li>
                <li>✓ SSH key authentication enabled</li>
                <li>✓ Password authentication disabled</li>
                <li>✓ Fail2Ban configured and running</li>
                <li>✓ Firewall rules configured</li>
                <li>✓ Automatic updates enabled</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-green-700 dark:text-green-300 mb-2">
                Best Practices:
              </h5>
              <ul class="space-y-1 text-sm text-green-600 dark:text-green-400">
                <li>✓ SSH keys backed up securely</li>
                <li>✓ Access documented</li>
                <li>✓ Regular monitoring scheduled</li>
                <li>✓ VM security templates ready</li>
                <li>✓ Recovery procedures documented</li>
                <li>✓ Security updates automated</li>
                <li>✓ Log monitoring configured</li>
              </ul>
            </div>
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
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
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

        <div class="w-34 flex justify-end">
          <div class="px-6 py-3 bg-green-600 text-white rounded-lg font-medium">
            Security Complete!
          </div>
        </div>
      </div>



      <!-- Completion Message -->
      <div class="mt-8 text-center">
        <div
          class="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800"
        >
          <h3
            class="text-xl font-semibold text-green-900 dark:text-green-100 mb-2"
          >
            🔒 Security Setup Complete!
          </h3>
          <p class="text-green-700 dark:text-green-300">
            Your Proxmox infrastructure is now secured with enterprise-grade
            security measures. Remember to test all configurations and keep your
            security tools updated!
          </p>
        </div>
      </div>
    </section>
  </main>
</template>