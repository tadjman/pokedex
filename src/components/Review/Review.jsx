import './Review.module.css';

export const Review = ({ content, author }) => {
    return (
        <div className="review">
          <p>{content}</p>
          <p className="author">Posted by: {author}</p>
        </div>
      );
    };
