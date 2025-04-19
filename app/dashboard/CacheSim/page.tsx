'use client'
import React from 'react'
import CacheSim from '@/components/custom/CacheSim';
import { CacheManager } from '@/lib/utility/cacheManager';
import simulateStrategies from '@/lib/utility/SimulateStrategies';

const page = () => {



  return (
    <div>
      <CacheSim />
    </div>
  )
}

export default page