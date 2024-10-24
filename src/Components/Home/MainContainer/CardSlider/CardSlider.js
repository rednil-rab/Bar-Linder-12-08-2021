
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
export default function CardSilder(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out'
  };
  return (
    <div style={{width: '80%', height: '50%'}}>
      <Slider  {...settings}>

        {props.cards}

      </Slider>
    </div>
  );
} 