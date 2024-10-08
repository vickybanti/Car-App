"use client"
import { CustomFilter, Hero, SearchBar, ShowMore } from "./components";
import {fetchCars} from '@/utils'
import CarCard from "./components/CarCard";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {

  const [allCars, setAllCars] = useState([])

  const[year, setYear] = useState(2002)

  const [fuel, setFuel] = useState("")

  const [limit, setLimit] = useState(10)

  const [loading, setLoading] = useState(false)

  const [manufacturer, setManufacturer] = useState("")

  const [model, setModel] = useState("")

    
    const getCars =  async () => {
      setLoading(true)
      try {
        const result = await fetchCars({
          manufacturer:manufacturer || '',
          year:year || 2022,
          fuel:fuel || '',
          limit:limit || 10,
          model:model ||  ''
        });
        console.log(result)
  
        setAllCars(result)
        
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
     
    useEffect(() => {
      getCars()
    },[model, manufacturer, fuel, year, limit])

  const isEmpty = !Array.isArray(allCars)  || allCars.length <1 || !allCars
  return (
      <main className="overflow-hidden">
        <Hero />


        <div className="mt-12 padding-x padding-y max-width "
        id="discover">
          <div className="home__text-container">
            <h1 className="text=4xl font-extrabold">
              Car Catalogue
            </h1>

            <p>
              Explore your interested cars
            </p>
          </div>
          <div className="home__filters">
            <SearchBar setManufacturer={setManufacturer}
            setModel={setModel}
            />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
              <CustomFilter  title="year" options={yearsOfProduction} setFilter={setYear}/>
            </div>
          </div>

          {allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars.map((car)=>(
                  <CarCard car={car}/>
                ))}
              </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image 
                  src="/loader.svg" 
                  alt="loader"
                  width={50}
                  className="object-contain"
                  height={50}

                  />
                </div>
              )}

              <ShowMore 
                pageNumber={limit/ 10}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Oops, no result
              </h2>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
        
    </main>
    
  );
}
