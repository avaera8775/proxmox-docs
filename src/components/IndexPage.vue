<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  navigate: [page: string]
}>()

const guides = [
  {
    id: 'core-setup',
    title: 'Core Setup Guide',
    description: 'Step-by-step Proxmox VE installation, ZFS pool creation, cluster setup, and storage configuration.'
  },
  {
    id: 'services-guide',
    title: 'Services Setup Guide',
    description: 'Complete homelab services deployment including development environments, monitoring, and media services.'
  },
  {
    id: 'gpu-passthrough',
    title: 'GPU Passthrough Guide',
    description: 'Complete RX 7800XT GPU passthrough setup for gaming VM with VFIO configuration and troubleshooting.'
  },
  {
    id: 'security-maintenance',
    title: 'Security & Maintenance Guide',
    description: 'Essential security hardening, user management, monitoring, and ongoing maintenance procedures.'
  }
]

const navigateToGuide = (guideId: string) => {
  emit('navigate', guideId)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Proxmox Homelab Documentation
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete guides for setting up and managing your Proxmox homelab infrastructure. 
          From basic installation to advanced service deployment.
        </p>
      </div>

      <!-- Guide Cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div 
          v-for="guide in guides" 
          :key="guide.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
        >
          <div class="p-8">
            <!-- Header -->
            <div class="mb-4">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ guide.title }}
              </h2>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {{ guide.description }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                @click="navigateToGuide(guide.id)"
                class="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Open Guide
                <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Info Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Before You Begin
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Hardware Requirements</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">PCs with adequate RAM, storage, GPU, and network connectivity</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Network Setup</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">10.10.10.0/24 VLAN with proper gateway configuration</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Prerequisites</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Basic Linux knowledge and familiarity with virtualization concepts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
