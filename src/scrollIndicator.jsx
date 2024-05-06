import React, { useEffect, useState } from 'react';
import './App.css';

function ScrollIndicator({ url }) {
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(geturl) {
    try {
      setLoading(true);
      const response = await fetch(geturl);
      const data = await response.json();
      // console.log(data);

      if (data && data.products && data.products.length > 0) {
        setPros(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(e.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  console.log(pros, loading, scrollPercentage);
  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercentage);

    return () => {
      removeEventListener('scroll', () => {});
    };
  }, []);

  if (errorMsg) {
    return <div>ERROR ! {errorMsg}</div>;
  }
  if (loading) {
    return <div>data is loading please wait!</div>;
  }
  return (
    <div>
      <div className="top-container">
        <h1>custome scroll indicator</h1>
        <div className="scroll-progress">
          <div
            className="scroll-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {pros && pros.length > 0
          ? pros.map((dataItem) => <p>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
}

export default ScrollIndicator;
