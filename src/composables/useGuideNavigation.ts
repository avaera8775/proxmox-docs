import { useRouter, useRoute } from 'vue-router'

export interface GuideInfo {
  path: string
  name: string
  title: string
  description: string
}

export const guides: GuideInfo[] = [
  {
    path: '/core-setup',
    name: 'CoreSetup',
    title: 'Core Setup Guide',
    description: 'Proxmox installation, ZFS pools, and cluster setup'
  },
  {
    path: '/services-guide',
    name: 'ServicesGuide', 
    title: 'Services Setup Guide',
    description: 'Deploy homelab services and applications'
  },
  {
    path: '/gpu-passthrough',
    name: 'GPUPassthrough',
    title: 'GPU Passthrough Guide',
    description: 'RX 7800XT passthrough for gaming VM'
  },
  {
    path: '/security-maintenance',
    name: 'SecurityMaintenance',
    title: 'Security & Maintenance Guide',
    description: 'Hardening and ongoing maintenance'
  }
]

export function useGuideNavigation() {
  const router = useRouter()
  const route = useRoute()

  const currentGuideIndex = guides.findIndex(guide => guide.path === route.path)
  const currentGuide = guides[currentGuideIndex]
  
  const previousGuide = currentGuideIndex > 0 ? guides[currentGuideIndex - 1] : null
  const nextGuide = currentGuideIndex < guides.length - 1 ? guides[currentGuideIndex + 1] : null

  const navigateToHome = () => {
    router.push('/')
  }

  const navigateToPrevious = () => {
    if (previousGuide) {
      router.push(previousGuide.path)
    }
  }

  const navigateToNext = () => {
    if (nextGuide) {
      router.push(nextGuide.path)
    }
  }

  const getProgressInfo = () => {
    return {
      current: currentGuideIndex + 1,
      total: guides.length,
      percentage: Math.round(((currentGuideIndex + 1) / guides.length) * 100)
    }
  }

  return {
    currentGuide,
    previousGuide,
    nextGuide,
    navigateToHome,
    navigateToPrevious,
    navigateToNext,
    getProgressInfo,
    guides
  }
}
