"use client"
import { useEffect } from 'react'

const usePageSwap = () => {

useEffect(() => {
    console.log('add pageswap listener')
    window.addEventListener('pageswap', async (e) => {
      console.log('page swap happened');
    });
    return () => {
//        window.removeEventListener('pageswap', onPopState)
      }
  }, [])

} 

export default usePageSwap