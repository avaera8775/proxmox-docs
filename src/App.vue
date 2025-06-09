<script lang="ts" setup>
import { ref } from 'vue'
import IndexPage from './components/IndexPage.vue'
import CoreSetup from './components/CoreSetup.vue'
import ServicesGuide from './components/ServicesGuide.vue'

const currentPage = ref('index')

const handleNavigation = (page: string) => {
  currentPage.value = page
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <IndexPage 
      v-if="currentPage === 'index'" 
      @navigate="handleNavigation" 
    />
    <CoreSetup 
      v-else-if="currentPage === 'core-setup'" 
      @navigate="handleNavigation" 
    />
    <ServicesGuide 
      v-else-if="currentPage === 'services-guide'" 
      @navigate="handleNavigation" 
    />
  </div>
</template>
