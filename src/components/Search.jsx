import React, { useEffect, useState } from 'react'
import logo from '../Images/logo192.png';
import '../Search.css'
import axios from '../api/axios';
import Poster from './Poster';
const Search = ({ setissearch, setdetails, setopenmodal, issmall, search }) => {
    const [query, setquery] = useState('');
    const [posters, setposters] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        fetchdata();
    }, [query]);
    const fetchdata1 = async () => {
        if (query.length > 0) {
            const response = await axios.get(`/search/multi?api_key=${api_key}&query=${query}&with_networks=213&page=1`);
            const data = response.data.results
            setposters(data);
        }
    }
    const fetchdata2 = async () => {
        if (query.length > 0) {
            const response = await axios.get(`/search/multi?api_key=${api_key}&query=${query}&with_networks=213&page=2`);
            const data = response.data.results
            setposters(oldvalue => [...oldvalue, data]);
        }
    }
    const fetchdata3 = async () => {
        if (query.length > 0) {
            const response = await axios.get(`/search/multi?api_key=${api_key}&query=${query}&with_networks=213&page=3`);
            const data = response.data.results
            setposters(oldvalue => [...oldvalue, data]);
        }
    }
    const fetchdata4 = async () => {
        if (query.length > 0) {
            const response = await axios.get(`/search/multi?api_key=${api_key}&query=${query}&with_networks=213&page=4`);
            const data = response.data.results
            setposters(oldvalue => [...oldvalue, data]);
        }
    }
    const fetchdata = async () => {
        fetchdata1()
        fetchdata2()
        fetchdata3()
        fetchdata4()
      }
    return (
        <div className='search'>
            <div className='titles'>
                <div className="logo">
                    <img src={logo} className='logo-pics' onClick={() => { setissearch(false) }} />
                    <div className="logo-contents">
                        <input type='search' placeholder='Search contents...' onChange={(e) => { setquery(e.target.value) }} value={query} />
                    </div>
                </div>
            </div>
            <div className='results'>
                {posters.length > 0 && <Poster movies={posters} search={search} setdetails={setdetails} setopenmodal={setopenmodal} title="Search Results" issmall={issmall} />}
            </div>
        </div>
    )
}

export default Search