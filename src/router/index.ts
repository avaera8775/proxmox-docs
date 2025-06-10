import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../components/IndexPage.vue'
import CoreSetup from '../components/CoreSetup.vue'
import ServicesGuide from '../components/ServicesGuide.vue'
import GPUPassthrough from '../components/GPUPassthrough.vue'
import SecurityMaintenance from '../components/SecurityMaintenance.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage
  },
  {
    path: '/core-setup',
    name: 'CoreSetup',
    component: CoreSetup
  },
  {
    path: '/services-guide',
    name: 'ServicesGuide',
    component: ServicesGuide
  },
  {
    path: '/gpu-passthrough',
    name: 'GPUPassthrough',
    component: GPUPassthrough
  },
  {
    path: '/security-maintenance',
    name: 'SecurityMaintenance',
    component: SecurityMaintenance
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
