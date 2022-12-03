import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from '../api/axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Poster from './Poster';

const Row = ({ fetchUrl, issmall, title, setopenmodal, setdetails }) => {
  const baseurl = "https://image.tmdb.org/t/p/original/";
  const [movies, setmovies] = useState([]);

  const fetchdata1 = async () => {
    const response = await axios.get(`${fetchUrl}&page=1`);
    const data = response.data.results;
    setmovies(data);
  }

  const fetchdata2 = async () => {
    const response = await axios.get(`${fetchUrl}&page=2`);
    const data = response.data.results;
    setmovies(oldvalue => [...oldvalue, ...data]);
  }

  const fetchdata3 = async () => {
    const response = await axios.get(`${fetchUrl}&page=3`);
    const data = response.data.results;
    setmovies(oldvalue => [...oldvalue, ...data]);
  }

  const fetchdata4 = async () => {
    const response = await axios.get(`${fetchUrl}&page=4`);
    const data = response.data.results;
    setmovies(oldvalue => [...oldvalue, ...data]);
  }

  const fetchdata = async () => {
    fetchdata1()
    fetchdata2()
    fetchdata3()
    fetchdata4()
  }

  useEffect(() => {
    fetchdata();
  }, [fetchUrl]);
  function handleModal(data) {
    setopenmodal(true);
    setdetails(data);
  }
  return (
    <div>
      <Poster movies={movies} setdetails={setdetails} setopenmodal={setopenmodal} title={title} issmall={issmall} />
    </div>
  )
}

export default Row