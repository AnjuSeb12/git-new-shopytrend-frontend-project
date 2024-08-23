import React, { useEffect, useState } from 'react';


import image1 from "../../assets/image1.jpg"
import image2 from "../../assets/image2.jpg"
import image3 from "../../assets/image3.jpg"







const SellerDashboardCaurosel = () => {
 
    const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);
   
  

  return (
    <div
    className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url(${images[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
  
  </div>
  )
}

export default SellerDashboardCaurosel 