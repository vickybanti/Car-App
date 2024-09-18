import { CarProps } from "@/types";

import {FilterProps} from '@/types'

export  const fetchCars = async(filters:FilterProps) => {
    const {manufacturer, year, model, limit, fuel} = filters;
    const apiKey=process.env.NEXT_PUBLIC_RAPID_CARS_API

    console.log(apiKey)
  
    const headers = new Headers({
      'X-Api-Key': `${apiKey}`  });

  
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, 
         {headers:headers},
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch cars: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
  
    } catch (error) {
      console.error("Error fetching cars:", error);
      return null;
    }
  }



export const calculateCarRent = (city_mpg:number, year:number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car:CarProps, angle?:string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const {make, year,model} = car;
  url.searchParams.append('customer',`${process.env.CAR_IMAGE_API|| ''}`)
  url.searchParams.append('make',make)
  url.searchParams.append('modelFamily',model.split(' ')[0])
  url.searchParams.append('zoomType','fullscreen')
  url.searchParams.append('modelYear',`${year}`)
  url.searchParams.append('angle',`${angle}`)

  return `${url}`;

}

export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname
}

