import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../Style/Main.css'

import { useSelector, useDispatch } from 'react-redux';
//import { getCookie } from '../util/cookieUtil';

function Main() {
    const lUser = useSelector( state=>state.user );
    const [word, setWord] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{

    })


  return (
    <div>
      <Header setWord={setWord} />
      <div className="Container">
        <div  className='Center'>
          메인이다
        </div>
      </div>
      <Footer/>
    </div>
    
  )
}

export default Main
