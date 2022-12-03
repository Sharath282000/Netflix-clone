import React, { useEffect, useState } from 'react';
import '../Modal.css';
import axios from '../api/axios';

const Modal = ({ details, setopenmodal, handlemylist, added, setadded, mylist, removelist }) => {
    const [videos, setvideos] = useState();
    const baseurl = 'https://image.tmdb.org/t/p/original/';
    const api_key = process.env.REACT_APP_API_KEY;
    const [isadded, setisadded] = useState([]);

    function datestr(str) {
        return (str?.slice(0, 4));
    }
    function handleClose() {
        setopenmodal(false);
    }
    async function getseriesvideo() {
        const response = await axios.get(`/tv/${details?.id}/videos?api_key=${api_key}`)
        setvideos(response.data.results[0].key !== undefined && response.data.results[0].key);
    }
    async function getmovievideo() {
        const response = await axios.get(`/movie/${details?.id}/videos?api_key=${api_key}`)
        setvideos(response.data.results[0].key !== undefined && response.data.results[0].key);
    }
    useEffect(() => {
        details?.name && getseriesvideo();
        details?.title && getmovievideo();
        const check = mylist.some(data => {
            if (data.id === details.id) {
                return true
            }
            return false
        })
        if (check) {
            setadded(true);
        } else {
            setadded(false);
        }
    }, [details]);

    useEffect(() => {
        const check = mylist.some(data => {
            if (data.id === details.id) {
                return true
            }
            return false
        })
        if (check) {
            setisadded(true);
        } else {
            setisadded(false);
        }
    }, [mylist, added])

    return (
        <div className='modal'>
            <div className='close'><i className="fas fa-times" onClick={handleClose}></i></div>
            <div className='modal-contents'>
                <div className="modal-content">
                    <img src={`${baseurl}${details?.poster_path}`} className='modal-img' />
                    <div className='content'>
                        <h3>{details?.title || details?.name || details?.original_title || details?.original_name}</h3>
                        <div className="date">
                            <span>{datestr(details?.first_air_date || details?.release_date)}</span>
                            <span>Ratings : {details?.vote_average.toFixed(1)}/10</span>
                        </div>
                        <p>{details?.overview}</p>
                        <div className='btns'>
                            <a href={!videos ? `https://www.youtube.com/results?search_query=${details?.name || details?.title}` : `https://www.youtube.com/watch?v=${videos}`} target="_blank" className='banner-btn'><i className="far fa-play-circle"></i> Play</a>
                            {!isadded && <button type='button' className='banner-btn' onClick={() => handlemylist(details)}><i className='fas fa-plus'></i> Watchlist</button>}
                            {isadded && <button type='button' className='banner-btn added' onClick={() => removelist(details)}><i className='fas fa-check'></i> Added</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal