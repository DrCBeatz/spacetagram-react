import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageCountForm from "./components/ImageCountForm/ImageCountForm";

interface ApodItem {
  title: string;
  date: string;
  url: string;
  explanation: string;
}

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [imageCount, setImageCount] = useState<number>(3);
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${imageCount}`;

  const [data, setData] = useState<ApodItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        const message = (error as Error).message;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [imageCount]);

  const handleImageCountSubmit = (count: number) => {
    setImageCount(count);
  };

  return (
    <>
      <Header title="Spacetagram" />
      <ImageCountForm onSubmit={handleImageCountSubmit} />
      <div className="app">
        {isLoading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              date={item.date}
              imageUrl={item.url}
              explanation={item.explanation}
            />
          ))}
      </div>
    </>
  );
}

export default App;
