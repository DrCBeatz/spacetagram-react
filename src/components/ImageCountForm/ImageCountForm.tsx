// ImageCountForm.tsx

import React, { useState } from "react";
import "./ImageCountForm.css";

interface ImageCountFormProps {
  onSubmit: (count: number) => void;
}

const ImageCountForm: React.FC<ImageCountFormProps> = ({ onSubmit }) => {
  const [count, setCount] = useState<number>(3);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(count);
  };

  return (
    <form className="image-count-form" onSubmit={handleSubmit}>
      <label className="image-count-form__label" htmlFor="imageCount">
        Number of Images:
      </label>
      <input
        className="image-count-form__input"
        type="number"
        id="imageCount"
        min="1"
        max="9"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <button className="image-count-form__button" type="submit">
        Reload Images
      </button>
    </form>
  );
};

export default ImageCountForm;
