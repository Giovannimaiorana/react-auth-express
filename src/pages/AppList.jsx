import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import style from "../css/modules/TheForm.module.css";

export default function TheForm() {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    fetchPosts();
    fetchTags();
    fetchCategory();
  }, []);

  // Recupero post dal back
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      console.log("Data from backend:", response.data);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Recupero tag
  const fetchTags = async () => {
    try {
      const responseTag = await axios.get("http://localhost:3000/tags");
      console.log("TagsFromBack:", responseTag);
      setTags(responseTag.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Recupero category
  const fetchCategory = async () => {
    try {
      const responseCategories = await axios.get(
        "http://localhost:3000/categories"
      );
      console.log("CategoryFromBack:", responseCategories);
      setCategories(responseCategories.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Gestisci il click sul pulsante "Show"
  const handleShowPost = (postId) => {
    window.location.href = `/post/${postId}`;
  };

  return (
    <div className={style.ContainerForm}>
      <div className={style.postStyle}>
        <h1>Articoli dal backend</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <img src={article.image} alt={article.title} />
              <p>{article.content}</p>
              <p>
                Category: {article.category ? article.category.name : "N/A"}
              </p>
              <p>
                Tags:{" "}
                {article.tags.map((tag) => (
                  <span key={tag.id}>{tag.titleT}, </span>
                ))}
              </p>
              {/* Passa l'id dell'elemento al gestore del click */}
              <button onClick={() => handleShowPost(article.slug)}>Show</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
