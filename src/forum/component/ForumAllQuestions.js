import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForumServices from '../services/ForumServices';
import QuestionCard from './QuestionCard';

function ForumAllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
        try{
            const response = await ForumServices.getQuestions();
            console.log(response.data.data);
            setQuestions(response.data.data);
        } catch (error) {
            const err_status = error.response
        }
    };
    fetchQuestions();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="header-h5">Forum Tunilmu</div>
      <div className="d-flex justify-content-center align-items-center height-vh">
        <div className='forum-wrap container'>
          {questions.map((item) => (
            <div key={item.id} className="row">
              <div className="col-md-8 mx-auto text-center">
                <div className="question-container d-flex flex-column">
                  <div className="bg-white">
                    <div className="flex-row d-flex">
                      <div className="d-flex flex-row justify-content-start ml-2">
                        <span className={`d-block font-weight-bold no-surat ${item.jenis_surat === 'JenisSurat.KERAS' ? 'keras' : ''}`}>
                          {item.title}
                        </span><br />
                        <span className="date text-black-50">{new Date(item.created_at).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="pelanggaran-text">{item.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForumAllQuestions;