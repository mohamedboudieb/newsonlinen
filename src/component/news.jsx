
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style_cmp/news.css';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase'; 

const News = () => {
  const { currentUsr } = useAuth();
  const [newsArticles, setNewsArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState(new Set());

  
  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=tesla&from=2025-04-03&sortBy=publishedAt&apiKey=2274008ff0844be0a567885c4952d5bf')
      .then(response => {
        setNewsArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      if (!currentUsr) return;
      const userDocRef = doc(db, "favorites", currentUsr.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const saved = docSnap.data().articles || [];
        const savedSet = new Set(saved.map(a => a.title));
        setLikedArticles(savedSet);
      }
    };
    fetchLikedArticles();
  }, [currentUsr]);

  const handleLike = (articleUrl, articleTitle) => {
    if (likedArticles.has(articleTitle)) {
      removeFromFavorites(articleTitle);
      setLikedArticles(prev => {
        const newSet = new Set(prev);
        newSet.delete(articleTitle);
        return newSet;
      });
    } else {
      addToFavorites(articleTitle);
      setLikedArticles(prev => new Set(prev).add(articleTitle));
    }
  };


  const addToFavorites = async (title) => {
    try {
      const userDocRef = doc(db, "favorites", currentUsr.uid);
      await setDoc(userDocRef, { uid: currentUsr.uid }, { merge: true });
      await updateDoc(userDocRef, {
        articles: arrayUnion({
          title: title,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };


  const removeFromFavorites = async (title) => {
    try {
      const userDocRef = doc(db, "favorites", currentUsr.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const oldArticles = docSnap.data().articles || [];
        const updated = oldArticles.filter(article => article.title !== title);
        await setDoc(userDocRef, { articles: updated }, { merge: true });
      }
    } catch (error) {
      console.error("Error removing article:", error);
    }
  };

  return (
    <div className="news-page">
      <Navbar keye="news" />
      <div className="dive"><h1>Welcome {currentUsr?.email || "Guest"}</h1></div> 
      <div className="news-container">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-article">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <div className="da">
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              <button 
                onClick={() => handleLike(article.url, article.title)} 
                className={likedArticles.has(article.title) ? 'liked' : 'like-btn'}>
                {likedArticles.has(article.title) ? 'Unlike' : 'Like'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
