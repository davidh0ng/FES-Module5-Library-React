import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Price from "./ui/Price";
import Ratings from "./ui/Ratings";

const Book = ({ book }) => {
  const [img, setImg] = useState();

  useEffect(() => {
    let mounted = true;
    
    const image = new Image();
    image.src = book.url;
    image.onload = () => {
      setTimeout(() => {
        if (mounted) {
          setImg(image);
        }
      }, 300);
    };
    return () => {
      // When the component unmounts 
      mounted = false;
    };
  }, [book.url]);

  return (
    <div className="book">
      {!img ? (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      ) : (
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img className="book__img" src={img.src} alt="" />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Ratings rating={book.rating} />
          <Price
            originalPrice={book.originalPrice}
            salePrice={book.salePrice}
          />
        </>
      )}
    </div>
  );
};

export default Book;
