<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const guides = [
  {
    id: 'core-setup',
    title: 'Core Setup Guide',
    description: 'Step-by-step Proxmox VE installation, ZFS pool creation, cluster setup, and storage configuration.',
    path: '/core-setup'
  },
  {
    id: 'services-guide',
    title: 'Services Setup Guide',
    description: 'Complete homelab services deployment including development environments, monitoring, and media services.',
    path: '/services-guide'
  },
  {
    id: 'gpu-passthrough',
    title: 'GPU Passthrough Guide',
    description: 'Complete RX 7800XT GPU passthrough setup for gaming VM with VFIO configuration and troubleshooting.',
    path: '/gpu-passthrough'
  },
  {
    id: 'security-maintenance',
    title: 'Security & Maintenance Guide',
    description: 'Essential security hardening, user management, monitoring, and ongoing maintenance procedures.',
    path: '/security-maintenance'
  }
]

const navigateToGuide = (path: string) => {
  router.push(path)
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
  @click="navigateToGuide(guide.path)"
  class="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/90"
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

      <!-- Footer -->
      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center space-x-1">
              <span>© Copyright 2025 All Rights Reserved</span>
            </div>
            <div class="flex items-center space-x-1">
              <span>Powered by</span>
              <a 
                href="https://www.proxmox.com/en/products/proxmox-virtual-environment/overview" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Proxmox VE 8.4
              </a>
            </div>
            <div class="flex items-center space-x-2">
              <a 
                href="https://github.com/avaera8775/proxmox-docs/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
