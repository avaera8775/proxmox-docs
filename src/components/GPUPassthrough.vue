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
  bios: false,
  grub: false,
  vfio: false,
  vm: false,
  troubleshooting: false
})

const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section]
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
        GPU Passthrough Guide
      </div>
    </div>

    <h1 class="text-4xl font-bold mb-8 text-center">RX 7800XT GPU Passthrough Setup</h1>

    <!-- Prerequisites Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('prerequisites')"
        class="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-100">Prerequisites & Hardware Check</h2>
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
        <h3 class="text-xl font-semibold mb-4">Hardware Requirements ✅</h3>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>CPU:</strong> Ryzen 7 9700X (supports IOMMU) ✅</li>
          <li><strong>GPU:</strong> RX 7800XT (RDNA3 architecture) ✅</li>
          <li><strong>Motherboard:</strong> Must support IOMMU/VT-d</li>
          <li><strong>RAM:</strong> 64GB (sufficient for host + gaming VM) ✅</li>
          <li><strong>Storage:</strong> 500GB NVMe for gaming VM ✅</li>
        </ul>

        <h3 class="text-xl font-semibold mb-4">Check IOMMU Groups</h3>
        <p class="mb-4">First, verify your GPU is in its own IOMMU group:</p>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Check IOMMU groups
for d in /sys/kernel/iommu_groups/*/devices/*; do 
  n=${d#*/iommu_groups/*}; n=${n%%/*}
  printf 'IOMMU Group %s ' "$n"
  lspci -nns "${d##*/}"
done | grep -E "(VGA|Audio)"

# Look for your RX 7800XT - should be in separate group from other devices
# Example output:
# IOMMU Group 15 01:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [1002:15bf]
# IOMMU Group 15 01:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [1002:1640]
        </code></pre>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Note</h4>
          <p class="text-yellow-700 dark:text-yellow-300">The GPU and its audio controller should be in the same IOMMU group. If they're mixed with other devices, you may need ACS override patches.</p>
        </div>
      </div>
    </section>

    <!-- BIOS Configuration Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('bios')"
        class="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-orange-900 dark:text-orange-100">BIOS/UEFI Configuration</h2>
        <svg 
          class="w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.bios }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.bios" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">Required BIOS Settings</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold mb-3">Enable These Settings:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>IOMMU:</strong> Enable</li>
              <li><strong>VT-d/AMD-Vi:</strong> Enable</li>
              <li><strong>SVM Mode:</strong> Enable</li>
              <li><strong>Above 4G Decoding:</strong> Enable</li>
              <li><strong>Re-Size BAR Support:</strong> Enable</li>
              <li><strong>CSM:</strong> Disable (UEFI only)</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-3">AMD-Specific Settings:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>IOMMU:</strong> Enable</li>
              <li><strong>NX Mode:</strong> Enable</li>
              <li><strong>SVM Mode:</strong> Enable</li>
              <li><strong>IOMMU Mode:</strong> Auto or Enable</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Tip for Ryzen 7 9700X</h4>
          <p class="text-blue-700 dark:text-blue-300">Modern AMD motherboards usually have good IOMMU grouping. The 9700X supports all necessary virtualization features out of the box.</p>
        </div>
      </div>
    </section>

    <!-- GRUB Configuration Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('grub')"
        class="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-green-900 dark:text-green-100">GRUB & Kernel Configuration</h2>
        <svg 
          class="w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.grub }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.grub" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">Step 1: Enable IOMMU in GRUB</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Edit GRUB configuration
nano /etc/default/grub

# Find the line starting with GRUB_CMDLINE_LINUX_DEFAULT
# Add AMD IOMMU parameters:
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt"

# Update GRUB
update-grub

# Reboot to apply changes
reboot
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Step 2: Verify IOMMU is Working</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># After reboot, check if IOMMU is enabled
dmesg | grep -i iommu

# Should see output like:
# AMD-Vi: IOMMU performance counters supported
# AMD-Vi: Found IOMMU cap 0x40
# AMD-Vi: Extended features (0x58f77ef22294ade): PPR X2APIC NX GT IA GA PC GA_vAPIC
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Step 3: Load Required Modules</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Add modules to load at boot
echo 'vfio' >> /etc/modules
echo 'vfio_iommu_type1' >> /etc/modules
echo 'vfio_pci' >> /etc/modules
echo 'vfio_virqfd' >> /etc/modules

# Update initramfs
update-initramfs -u
        </code></pre>
      </div>
    </section>

    <!-- VFIO Configuration Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('vfio')"
        class="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-purple-900 dark:text-purple-100">VFIO Driver Configuration</h2>
        <svg 
          class="w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.vfio }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.vfio" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">Step 1: Identify GPU PCI IDs</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Find your RX 7800XT PCI IDs
lspci -nn | grep -E "(VGA|Audio)" | grep AMD

# Example output for RX 7800XT:
# 01:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [1002:15bf] (rev c1)
# 01:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [1002:1640]

# Note the vendor:device IDs: 1002:15bf (GPU) and 1002:1640 (Audio)
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Step 2: Blacklist AMD GPU Driver</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create blacklist file for AMD drivers
cat > /etc/modprobe.d/blacklist-amdgpu.conf << EOF
blacklist amdgpu
blacklist radeon
EOF

# Alternative: Use driver_override method (recommended)
echo "vfio-pci" > /sys/bus/pci/devices/0000:01:00.0/driver_override
echo "vfio-pci" > /sys/bus/pci/devices/0000:01:00.1/driver_override
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Step 3: Configure VFIO PCI IDs</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Method 1: Using modprobe configuration
cat > /etc/modprobe.d/vfio.conf << EOF
options vfio-pci ids=1002:15bf,1002:1640
EOF

# Method 2: Add to GRUB (alternative)
# Edit /etc/default/grub and modify:
# GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt vfio-pci.ids=1002:15bf,1002:1640"

# Update initramfs and reboot
update-initramfs -u
reboot
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Step 4: Verify VFIO Binding</h3>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># After reboot, check if GPU is bound to VFIO
lspci -nnk -d 1002:15bf

# Should show:
# Kernel driver in use: vfio-pci
# Kernel modules: amdgpu

# Check VFIO groups
ls /dev/vfio/
# Should show: vfio and numbered groups (e.g., 15, 16)
        </code></pre>
      </div>
    </section>

    <!-- VM Configuration Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('vm')"
        class="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">Gaming VM Configuration</h2>
        <svg 
          class="w-6 h-6 text-indigo-600 dark:text-indigo-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.vm }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.vm" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold mb-4">VM Creation via Proxmox Web UI</h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="font-semibold mb-3">Basic VM Settings:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>VM ID:</strong> 201</li>
              <li><strong>Name:</strong> Gaming-VM</li>
              <li><strong>OS Type:</strong> Microsoft Windows</li>
              <li><strong>Machine:</strong> q35</li>
              <li><strong>BIOS:</strong> OVMF (UEFI)</li>
              <li><strong>Add EFI Disk:</strong> Yes</li>
              <li><strong>Add TPM:</strong> Yes (for Windows 11)</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-3">Hardware Configuration:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>CPU:</strong> 8 cores (host type)</li>
              <li><strong>Memory:</strong> 32768 MB (32GB)</li>
              <li><strong>Storage:</strong> 400GB on vm-fast pool</li>
              <li><strong>Network:</strong> VirtIO (bridge to vmbr0)</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-semibold mb-4 mt-6">GPU Passthrough Configuration</h3>
        <p class="mb-4">After creating the VM, edit the configuration file:</p>
        <pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Edit VM configuration
nano /etc/pve/qemu-server/201.conf

# Add these lines for GPU passthrough:
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'
cpu: host,hidden=1,flags=+pcid
machine: pc-q35-7.1
hostpci0: 01:00,pcie=1,x-vga=1
hostpci1: 01:00.1,pcie=1

# Additional optimizations:
balloon: 0
bios: ovmf
boot: order=scsi0;ide2;net0
cores: 8
efidisk0: vm-fast:vm-201-disk-0,efitype=4m,size=4M
machine: pc-q35-7.1
memory: 32768
numa: 1
ostype: win11
scsi0: vm-fast:vm-201-disk-1,cache=writeback,discard=on,size=400G,ssd=1
scsihw: virtio-scsi-pci
sockets: 1
vga: none
        </code></pre>

        <h3 class="text-xl font-semibold mb-4">Windows Installation Tips</h3>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Install Windows first with VGA display</li>
            <li>Install VirtIO drivers</li>
            <li>Install AMD GPU drivers</li>
            <li>Shut down VM and add GPU passthrough</li>
            <li>Set display output to "none" in Proxmox</li>
            <li>Connect monitor directly to RX 7800XT</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Troubleshooting Section -->
    <section class="mb-8">
      <button 
        @click="toggleSection('troubleshooting')"
        class="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-red-900 dark:text-red-100">Troubleshooting Common Issues</h2>
        <svg 
          class="w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform"
          :class="{ 'rotate-180': expandedSections.troubleshooting }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <div v-show="expandedSections.troubleshooting" class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="space-y-6">
          <div>
            <h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ VM Won't Start</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Check if GPU is properly bound to VFIO: <code>lspci -nnk -d 1002:15bf</code></li>
              <li>Verify IOMMU groups are correct</li>
              <li>Ensure no other process is using the GPU</li>
              <li>Check VM logs: <code>journalctl -u qemu-server@201</code></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Black Screen After GPU Passthrough</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Ensure monitor is connected to GPU, not motherboard</li>
              <li>Try different display outputs (HDMI, DisplayPort)</li>
              <li>Check if Windows is detecting the GPU in Device Manager</li>
              <li>Install latest AMD drivers in Windows</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Poor Gaming Performance</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Enable CPU pinning for better performance</li>
              <li>Set CPU governor to performance: <code>cpupower frequency-set -g performance</code></li>
              <li>Disable Windows power saving features</li>
              <li>Enable MSI mode for GPU in Windows</li>
              <li>Consider hugepages for memory optimization</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Audio Issues</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Ensure GPU audio device is also passed through</li>
              <li>Install AMD audio drivers in Windows</li>
              <li>Set GPU audio as default device in Windows</li>
              <li>Alternative: Use USB audio or network audio streaming</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Success Indicators</h4>
          <ul class="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
            <li>GPU shows up in Windows Device Manager</li>
            <li>AMD Software/Adrenalin detects the GPU</li>
            <li>Games run at expected performance levels</li>
            <li>GPU temperature monitoring works</li>
            <li>Multiple monitors work if connected</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- End note -->
    <section class="mt-10 text-center text-gray-500 dark:text-gray-400">
      <p>— End of GPU passthrough guide —</p>
    </section>
  </main>
</template>
