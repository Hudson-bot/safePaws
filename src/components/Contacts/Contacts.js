import React, { useEffect, useState } from 'react';

const Contacts = () => {
  const [sliderData] = useState([
    {
      img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      caption: "Bella found her forever home!",
      story: "Bella was abandoned as a puppy but found a loving home through a rescue program. Now, she enjoys cuddles and long walks with her new family!"
    },
    {
      img: "https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg",
      caption: "Max is enjoying his new family!",
      story: "Max was rescued from the streets, hungry and scared. Today, he’s a playful furball, bringing joy and laughter to his adoptive family."
    },
    {
      img: "https://images.pexels.com/photos/1443375/pexels-photo-1443375.jpeg",
      caption: "Luna and her happy owner!",
      story: "Luna was shy and withdrawn when she was found. With love and patience, she blossomed into a friendly, affectionate companion."
    },
    {
      img: "https://images.pexels.com/photos/257577/pexels-photo-257577.jpeg",
      caption: "Charlie is living his best life!",
      story: "Charlie was surrendered by his previous owner. Now, he spends his days playing fetch and getting belly rubs from his new best friend."
    },
    {
      img: "https://images.pexels.com/photos/257577/pexels-photo-257577.jpeg",
      caption: "Milo loves his cozy home!",
      story: "Milo was found in a shelter, longing for a family. A kind-hearted couple adopted him, and he now gets all the love and care he deserves!"
    }
  ]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
  };

  const stats = [
    { number: "500+", text: "Successful Rescue Operations" },
    { number: "250+", text: "pets found their home" },
    { number: "300+", text: "owners satisfaction" }
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', backgroundColor: '#fdf2e9', margin: 0, padding: '20px' }}>
      <h1>Wall of Love</h1>
      <div style={{ position: 'relative', width: '70%', maxWidth: '800px', margin: 'auto', overflow: 'hidden', borderRadius: '15px', background: 'white', padding: '20px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(${-index * 100}%)` }}>
          {sliderData.map((data, i) => (
            <div key={i} style={{ minWidth: '100%', transition: 'opacity 0.5s', position: 'relative' }}>
              <img src={data.img} alt={`Slide ${i + 1}`} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '15px', border: '4px solid #ff6f61', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'filter 0.3s ease-in-out' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', background: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '15px', textAlign: 'center', fontSize: '16px', fontWeight: '500', borderRadius: '10px', opacity: i === index ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                {data.story}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(255, 111, 97, 0.8)', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '50%', fontSize: '18px', transition: '0.3s' }}>&#10094;</button>
        <button onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(255, 111, 97, 0.8)', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '50%', fontSize: '18px', transition: '0.3s' }}>&#10095;</button>
      </div>
      <div style={{ marginTop: '40px', borderTop: '2px solid #a39f9e', borderBottom: '2px solid #a39f9e', display: 'flex', justifyContent: 'space-around', padding: '15px 0', maxWidth: '800px', margin: 'auto' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', color: '#5d4037' }}>
            <h2 style={{ fontSize: '24px', margin: '5px 0' }}>{stat.number}</h2>
            <p style={{ fontSize: '14px', margin: 0 }}>{stat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;