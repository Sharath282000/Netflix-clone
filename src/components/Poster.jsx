import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Poster = ({ title, movies, issmall, setopenmodal, setdetails, search }) => {
    const baseurl = "https://image.tmdb.org/t/p/original/";
    function handleModal(data) {
        setopenmodal(true);
        setdetails(data);
    }

    return (
        movies &&
        <div>
            <div className='row'>
                <h2>{title}</h2>
                <div className={search ? 'rows_posters' : 'row-posters'}>
                    {movies.map(data => data.backdrop_path && data.poster_path && <LazyLoadImage src={`${baseurl}${issmall ? data.poster_path : data.backdrop_path}`} onClick={() => handleModal(data)} delayTime={5000} placeholder={<div className={search ? 'loader search': issmall ? 'loader small' : 'loader'}><span></span></div>} key={data.name} alt={data.name} className={issmall ? 'row_poster' : 'row_posterlarge'} />)}
                </div>
            </div>
        </div>
    )
}

export default Poster