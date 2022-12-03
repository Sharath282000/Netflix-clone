import './App.css';
import Row from './components/Row';
import Banner from './components/Banner'
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import data from './data/data';
import Poster from './components/Poster';
import Search from './components/Search';

function App() {
  const [openmodal, setopenmodal] = useState(false);
  const [details, setdetails] = useState([]);
  const [mylist, setmylist] = useState([]);
  const [added, setadded] = useState(false);
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem('my-list'));
    if (store && store.length > 0) {
      setmylist(store);
    } else {
      localStorage.setItem('my-list', JSON.stringify(mylist));
    }
  }, [])

  const savestorage = (item) => {
    localStorage.setItem('my-list', JSON.stringify(item));
  }

  const handlemylist = (data) => {
    if (mylist.length > 0) {
      for (let i = 0; i < mylist.length; i++) {
        if (mylist[i].id !== data.id) {
          const list = [data, ...mylist];
          setmylist(list);
          savestorage(list);
          setadded(true);
        } else {
          return
        }
      }
    } else {
      const list = [data, ...mylist];
      setmylist(list);
      savestorage(list);
      setadded(true);
    }
  }

  const removelist = (item) => {
    const newlist = mylist.filter(data => data.id !== item.id);
    setmylist(newlist);
    savestorage(newlist);
    setadded(false);
  }

  const handlesearch = () => {
    setissearch(true);
  }


  return (
    <div className="App">
      {issearch && <Search issearch={issearch} issmall search setdetails={setdetails} setopenmodal={setopenmodal} setissearch={setissearch} />}
      {openmodal && <Modal details={details} removelist={removelist} setadded={setadded} mylist={mylist} setopenmodal={setopenmodal} setdetails={setdetails} handlemylist={handlemylist} added={added} />}
      {!issearch &&
        <div>
          <Banner handlemylist={handlemylist} issearch={issearch} handlesearch={handlesearch} setissearch={setissearch} added={added} setadded={setadded} removelist={removelist} mylist={mylist} />
          <div className='container'>
            {mylist.length > 0 && <Poster movies={mylist} issmall setdetails={setdetails} setopenmodal={setopenmodal} title="My Watchlist" />}
            {data.map(data => <Row fetchUrl={data.fetchUrl} title={data.title} key={data.id} issmall={data.issmall} setdetails={setdetails} setopenmodal={setopenmodal} handlemylist={handlemylist} />)}
          </div>
        </div>
      }
    </div>
  );
}

export default App;