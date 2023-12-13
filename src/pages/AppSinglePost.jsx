import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AppSinglePost = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    // Recupera l'articolo singolo dal backend utilizzando l'id dalla URL
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${slug}`);
        console.log("Single Post from backend:", response.data);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching single post:", error);
      }
    };

    fetchSinglePost();
  }, [slug]);

  return (
    <div>
      <h1>Dettagli dell'articolo</h1>
      <h2>{article.title}</h2>
      <img src={article.image} alt={article.title} />
      <p>{article.content}</p>
      <p>Category: {article.category ? article.category.name : "N/A"}</p>
      <p>
        Tags:{" "}
        {article.tags
          ? article.tags.map((tag) => <span key={tag.id}>{tag.titleT}, </span>)
          : "N/A"}
      </p>
    </div>
  );
};

export default AppSinglePost;
