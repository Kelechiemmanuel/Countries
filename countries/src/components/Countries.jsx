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
                setCountries(response.data);
                setLoading(false)
            } catch (error) {
                console.log(error);

                setLoading(false)
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

    if (loading) return <p>Loading...</p>
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h1>Countries</h1>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    className="border p-2 mb-5 w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border p-2 mb-5 w-full md:w-1/4"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Americas">Americas</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
            </div>
            <div className='grid grid-cols-4 justify-items-center gap-5 px-10'>
                {filteredCountries.map((country, index) => {
                    const currency = country.currencies
                        ? Object.values(country.currencies)[0]
                        : null;
                    const capital = country.capital?.[0] || country.name?.common;
                    const regionName = country.region || "Unknown";
                    const population = country.population?.toLocaleString() || "N/A";
                    return (
                        <div key={index} className='flex flex-col justify-center items-center w-full mx-auto border-2 border-amber-600'>
                            <div>
                                <img src={country.flags.png} alt={country.name.common} className='w-100 h-40 object-cover' />
                            </div>
                            <div>
                                <h3>{country.name.common}</h3>
                                <p>Capital: {capital}</p>
                                <p>Region: {regionName}</p>
                                <p>Population: {population}</p>

                                <p> Currency: {currency?.name} ({currency?.symbol})</p>
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