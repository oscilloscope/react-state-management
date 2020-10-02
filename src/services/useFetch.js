import { useState, useEffect } from 'react';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        setData(response);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setErrors(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]);
  debugger;
  return { data, error, loading };
}
