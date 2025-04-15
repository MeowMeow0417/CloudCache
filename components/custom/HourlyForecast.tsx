'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {Card, CardHeader, CardTitle,  CardContent, CardFooter} from "@/components/ui/card";

const HourlyForecast = () => {
  return (
   <Card className=' p-4'>
    <CardHeader className='justify-center '>
        <CardTitle className='text-center text-2xl'>
            Hourly Forecast
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <p>12:00</p>
                    <p>33°</p>
                </div>
                <div className='flex flex-col'>
                    <p>13:00</p>
                    <p>34°</p>
                </div>
                <div className='flex flex-col'>
                    <p>14:00</p>
                    <p>35°</p>
                </div>
            </div>
        </div>
    </CardContent>
   </Card>
  )
}

export default HourlyForecast