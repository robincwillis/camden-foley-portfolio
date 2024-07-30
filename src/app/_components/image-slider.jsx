import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const ImageSlider = ({ images }) => {
  const settings = {
    className: "center",
    dots: false,
    infinite: true, // false
    speed: 500,
    //centerPadding: 100,
    slidesToShow: 1, // Show one full slide and the next one peeking
    centerMode: true,
    centerPadding: "10%",
    //slidesToScroll: 1,
    //centerMode: true, // Center the slides
    swipeToSlide: true, // Allow swipe to slide
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.sys.id} className="px-2.5">
            <div
              style={{
                width: "100%",
                position: "relative",
                paddingTop: `${0.75 * 100}%`,
              }}
            >
              <Image
                src={image.url}
                alt={image.description}
                //layout="responsive"
                // fill
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "cover",
                }}
                width={image.width}
                height={image.height}
                className=""
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
