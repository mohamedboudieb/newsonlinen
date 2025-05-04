import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './style_cmp/faver.css';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import axios from 'axios';

export default function Faver() {
  const { currentUsr } = useAuth();
  const [savedTitles, setSavedTitles] = useState([]);
  const [articles, setArticles] = useState([]);

  // جلب العناوين المحفوظة
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const docRef = doc(db, "favorites", currentUsr.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const titles = data.articles?.map(item => item.title) || [];
          setSavedTitles(titles);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (currentUsr) {
      fetchFavorites();
    }
  }, [currentUsr]);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2025-04-03&sortBy=publishedAt&apiKey=2274008ff0844be0a567885c4952d5bf');
        const allArticles = response.data.articles;
        const filtered = allArticles.filter(article => savedTitles.includes(article.title));
        setArticles(filtered);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (savedTitles.length > 0) {
      fetchArticles();
    }
  }, [savedTitles]);

  const handleUnlike = async (title) => {
    try {
      const userDocRef = doc(db, "favorites", currentUsr.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedArticles = (data.articles || []).filter(item => item.title !== title);
        await setDoc(userDocRef, { ...data, articles: updatedArticles });
        setArticles(prev => prev.filter(a => a.title !== title));
        setSavedTitles(prev => prev.filter(t => t !== title));
      }
    } catch (error) {
      console.error("Error unliking article:", error);
    }
  };

  return (
    <div className='faverdiv'>
      <Navbar keye="fav" />
      <div className="divee">
        <h1>The list of posts liked by the user {currentUsr?.email || "Guest"}</h1>
        {articles.length === 0 ? (
          <p>No favorite articles found.</p>
        ) : (
          <div className="news-container">
            {articles.map((article, index) => (
              <div className="news-article" key={index}>
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="news-image" />
                )}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="da">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                  <button onClick={() => handleUnlike(article.title)} className="liked">Unlike</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}