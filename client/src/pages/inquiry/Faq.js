import React, { useState, useEffect } from "react";

import "./Faq.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Faq() {
  const navigate = useNavigate();
  const [word, setWord] = useState(null);
  const [qnaList, setQnaList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/faqs`)
      .then((result) => {
        setInquiryList(result.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="faqBody">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="faqCenter">
        <br></br>
        <br></br>
        <div id="faq1">&nbsp;FAQ&nbsp;</div>
        <br></br>
        <br></br>
        <div id="faq2">자주 묻는 질문</div>
        <div className="faq_line"></div>
        {inquiryList.map((inquirylist, idx) => {
          return (
            <div
              className="faqitem"
              key={idx}
              onClick={() => {
                navigate(`/faqView/${inquirylist.id}`);
              }}
            >
              <div className="qnadate">{inquirylist.date.substring(0, 10)}</div>
              <br></br>
              <div className="qnaname">{inquirylist.title}</div>
            </div>
          );
        })}
      </div>
      <div id="paging" style={{ textAlign: "center", padding: "10px" }}>
        {/* {
                (paging.prev)?(
                    <span style={{cursor:"pointer"}} onClick={ ()=>{ onPageMove( paging.beginPage-1 ) } } > ◀ </span>
                ):(<span></span>)
            }
            {
                (beginend)?(
                    beginend.map((page, idx)=>{
                        return (
                            <span style={{cursor:"pointer"}} key={idx} onClick={
                                ()=>{ onPageMove( page ) }
                            }>&nbsp;{page}&nbsp;</span>
                        )
                    })
                ):(<></>)
            }
            {
                (paging.next)?(
                    <span style={{cursor:"pointer"}} onClick={
                        ()=>{ onPageMove( paging.endPage+1 ) }
                    }>&nbsp;▶&nbsp;</span>
                ):(<></>)
            } */}
      </div>
    </div>
  );
}

export default Faq;
