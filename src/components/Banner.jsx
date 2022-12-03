import React, { useEffect, useState } from 'react'
import '../Banner.css'
import requests from '../api/request'
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton'
import logo from '../Images/logo.png';

const Banner = ({ handlemylist, added, setadded, mylist, removelist, handlesearch, setissearch }) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [banner, setbanner] = useState([]);
    const [video, setvideo] = useState([]);
    const [isadded, setisadded] = useState(false);

    const fetchdata = async () => {
        const response = await axios.get(requests.fetchOriginals);
        setbanner(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]);
        return response;
    }
    async function getseriesvideo() {
        const response = await axios.get(`/tv/${banner?.id}/videos?api_key=${api_key}`)
        setvideo(response.data.results[0].key !== undefined && response.data.results[0].key);
    }
    async function getmovievideo() {
        const response = await axios.get(`/movie/${banner?.id}/videos?api_key=${api_key}`)
        setvideo(response.data.results[0].key !== undefined && response.data.results[0].key);
    }
    useEffect(() => {
        fetchdata();
    }, []);

    useEffect(() => {
        banner?.name && getseriesvideo();
        banner?.title && getmovievideo();
        const check = mylist.some(data => {
            if (data.id === banner?.id) {
                return true
            } else {
                return false
            }
        })
        if (check) {
            setadded(true);
        } else {
            setadded(false);

        }
    }, [banner]);

    useEffect(() => {
        if (added === true) {
            const check = mylist.some(data => {
                if (data.id === banner?.id) {
                    return true
                } else {
                    return false
                }
            })
            if (check) {
                setisadded(true);
            } else {
                setisadded(false);
            }
        } else {
            const check = mylist.some(data => {
                if (data.id === banner?.id) {
                    return true
                }
                return false
            })
            if (check) {
                setisadded(true);
            } else {
                setisadded(false);
            }
        }
    }, [mylist, added])

    function truncate(str, num) {
        if (str?.length > num) {
            return str.slice(0, num) + "..."
        } else {
            return str
        }
    }


    return (
        banner ?
            <header className='banner'
                style={{ backgroundSize: "cover", backgroundImage: `url('https://image.tmdb.org/t/p/original${banner?.backdrop_path}')`, backgroundPosition: 'center center' }}
            >
                <div className="logo">
                    <img src={logo} className='logo-pic' onClick={() => { setissearch(false) }} />
                    <div className="logo-content">
                        <i className="search fas fa-search" onClick={handlesearch}></i>
                        <img src='Netflix-avatar.png' className='avatar' />
                    </div>
                </div>
                <div className='banner-contents'>
                    <h1>{banner?.title || banner?.name || banner?.original_name || <Skeleton />}</h1>
                    <div className='banner-btns'>
                        <a href={!video && video === undefined ? `https://www.youtube.com/results?search_query=${banner?.name || banner?.title}` : `https://www.youtube.com/watch?v=${video}`} target="_blank" className='banner-btn'><i className="far fa-play-circle"></i> Play</a>
                        {!isadded && <button type='button' className='banner-btn' onClick={() => handlemylist(banner)}><i className='fas fa-plus'></i> Watchlist</button>}
                        {isadded && <button type='button' className='banner-btn added' onClick={() => removelist(banner)}><i className='fas fa-check'></i> Added</button>}
                    </div>
                    <h4 className='banner-description'>{banner?.overview ? truncate(banner?.overview, 150) : <Skeleton />}</h4>
                </div>
                <div className='banner-fade' />
            </header> : <Skeleton />
    )
}

export default Banner