import React from 'react'
import './topNews.css'
import {Modal} from '@mui/material';


export default function TopNews({companyNews}) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newsValue, setNewsValue] = React.useState(null);

    const handleClose = () => setIsModalOpen(false);

    const handleOpen = (article) => {
        setIsModalOpen(true);
        setNewsValue(article)
    };


//copyed from higher layer
    function unixToDate (unixTimestamp){
        const date = new Date(unixTimestamp * 1000);
        const year = date.getFullYear();
        // getMonth返回的月份从0开始，所以需要+1；padStart确保月和日为两位数
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }



  return (
    <div className="news-container">
        {companyNews ? (
            companyNews.map((article, index) => (
                <div key={index} className="article" onClick={() => handleOpen(article)}>
                    
                    <img src={article.image} alt={article.related} className="image" />
                    <h3 className="title">{article.headline}</h3>

                </div>
            ))
            ) : null
        }

        {newsValue? (
            <div className='container'> 
            <Modal open={isModalOpen}>

                <div className="modal-content">
                    <button className="closeButton" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    <h1 className="modal-title">{newsValue.source}</h1>
                    <p className="modal-date">{unixToDate(newsValue.datetime)}</p>
                    <h2 className="modal-headline">{newsValue.headline}</h2>
                    <p className="modal-summary">{newsValue.summary}</p>
                    <p className="modal-url"> For more details click <a href={newsValue.url} target="_blank">here</a></p>
                    {/* Social share icons */}
                    <div className="social-share">
                        <span>Share</span>
                        <div className='modal-share'>
                        <a className="twitter-share-button" href={"https://twitter.com/intent/tweet?text="+newsValue.headline +"&url=" +newsValue.url} data-size="large">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/>
                            </svg>
                        </a>

                        <a href={"https://www.facebook.com/sharer/sharer.php?u="+newsValue.url }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
                            </svg>
                        </a>

                        </div>


                    </div>
                </div>

            </Modal>
            </div>
        ) : null

        }

    </div>
  )
}
