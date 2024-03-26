import React from 'react'
import './topNews.css'
import {Modal} from '@mui/material';



export default function TopNews({companyNews}) {


        // ... add other articles
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newsValue, setNewsValue] = React.useState(null);

    const handleClose = () => setIsModalOpen(false);

    const handleOpen = (article) => {
        setIsModalOpen(true);
        setNewsValue(article)
      };

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
            <div key={index} className="news-article" onClick={() => handleOpen(article)}>
                
                <img src={article.image} alt={article.related} className="news-image" />
                <h3 className="news-title">{article.headline}</h3>
            {/* <p className="news-description">{article.description}</p> */}
            </div>
        ))
        ) : null
        }

        {newsValue? (
            <Modal open={isModalOpen}>

                <div className="modal-content">
                    <button className="close-button" onClick={handleClose}>x</button>
                    <h1 className="modal-title">{newsValue.source}</h1>
                    <p className="modal-date">{unixToDate(newsValue.datetime)}</p>
                    <h2 className="modal-headline">{newsValue.headline}</h2>
                    <p className="modal-summary">{newsValue.summary}</p>
                    <p className="modal-summary"> For more details click <a href={newsValue.url} target="_blank">here</a></p>
                    {/* Social share icons */}
                    <div className="social-share">
                        <span>Share</span>
                    {/* Icons would go here */}
                    </div>
                </div>

            </Modal>
        ) : null

        }



    </div>
    // <div className="news-grid-container">
    //     {newsArticles.map((article) => (
    //         <div className="news-article" key={article.id}>
    //         <img src={article.image} alt={article.title} className="news-image" />
    //         <p className="news-title">{article.title}</p>
    //         </div>
    //     ))}
    // </div>
  )
}
