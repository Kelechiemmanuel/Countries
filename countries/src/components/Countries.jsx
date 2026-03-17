import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,currencies,region");
                setTimeout(() => {
                    setCountries(response.data);
                    setLoading(false)
                }, 2000);
            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
            }
        };
        fetchCountries();
    }, [])

    const filteredCountries = countries.filter((country) => {
        const matchesSearch = country.name.common
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesRegion = region ? country.region === region : true;
        return matchesSearch && matchesRegion;

    });

    if (loading) return <p className='text-center my-5'>Loading...</p>
    return (
        <div>
            <div className='flex justify-center items-center flex-col '>
                <h1 className='text-6xl my-10'>Countries</h1>
                <div className='flex flex-wrap justify-center items-center w-full gap-5 mx-auto px-10'>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        className="border p-2 mb-5 w-full md:w-[50%] outline-0 rounded-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border p-2 mb-5 w-30% rounded-sm outline-0"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <option value="">Select Regions</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Americas">Americas</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-5 px-10 shrink-0'>
                {filteredCountries.map((country, index) => {
                    const currency = country.currencies
                        ? Object.values(country.currencies)[0]
                        : null;
                    const capital = country.capital?.[0] || country.name?.common;
                    const regionName = country.region || "Unknown";
                    const population = country.population?.toLocaleString() || "N/A";
                    return (
                        <div key={index} className='flex flex-col text-center justify-center rounded-sm items-center w-full mx-auto'>
                            {/* <div> */}
                            <img src={country.flags.png} alt={country.name.common} className='lg:w-100 w-full h-40 object-cover rounded-t-sm border-2 border-gray-200' />
                            {/* </div> */}
                            <div className='bg-mist-200 w-full py-10 px-2 rounded-b-sm'>
                                <h3 className='text-sm font-bold md:text-sm my-1'>{country.name.common}</h3>
                                <p className='text-sm my-1'>Capital: {capital}</p>
                                <p className='text-sm my-1'>Region: {regionName}</p>
                                <p className='text-sm my-1'>Population: {population}</p>
                                <p className='text-sm my-1'>Currency: {currency?.name} ({currency?.symbol})</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {countries.length === 0 && (
                <p className="mt-5 text-red-500 font-semibold">
                    No country found with that name.
                </p>
            )}

        </div>
    )
}

export default Countries