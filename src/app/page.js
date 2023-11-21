'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'

export default function Home () {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json')
        const jsonData = await response.json()
        setData(jsonData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleFilter = () => {
    const filtered = data.filter(
      item => item.kecamatan && item.kecamatan.toLowerCase() === 'seyegan'
    )
    setFilteredData(filtered)
  }

  const clearFilter = () => {
    setFilteredData([])
  }

  return (
    <>
      <div className='flex gap-4 py-4'>
        <Button onClick={handleFilter} disabled={filteredData.length > 0}>
          Daerah Seyegan
        </Button>
        <Button onClick={clearFilter} disabled={filteredData.length === 0}>
          Dapil 6
        </Button>
        <div className='flex items-center gap-2'>
          <div className='grow'>
            <form>
              <MagnifyingGlassIcon className='absolute w-6 h-6 left-2 top-2 ' />
            </form>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {(filteredData.length ? filteredData : data).map(item => (
          <Card key={item.name}>
            <CardHeader>
              <div className='flex items-center gap-1'>
                <Image
                  height={50}
                  width={50}
                  src={`/${item.partai.substring(
                    item.partai.lastIndexOf('/') + 1
                  )}`}
                  alt='cek'
                />
                <p>{item.name_partai}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className='w-10/12 mx-auto'>
                <AspectRatio ratio={2 / 3}>
                  <Image
                    src={`/${item.partai.substring(
                      item.partai.lastIndexOf('/') + 1
                    )}`}
                    fill
                    alt='cek'
                    className='object-cover'
                  />
                </AspectRatio>
              </div>
              <div>Name: {item.name}</div>
              <div>Alamat: {item.alamat_lengkap}</div>
              <div>RT: {item['RT :']}</div>
              <div>RW: {item['RW:']}</div>
              <div>Kelurahan: {item['Kelurahan:']}</div>
              <div>Kecamatan: {item.kecamatan}</div>
              <div>Kabupaten/Kota: {item['Kabupaten/Kota:']}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
