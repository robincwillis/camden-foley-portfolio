import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

const ImageSlider = ({ expanded, images }) => {
  let sliderRef = useRef(null);
  const [toggled, setToggled] = useState(expanded);

  const settings = {
    className: "center",
    dots: false,
    infinite: true, // false
    speed: 500,
    //centerPadding: 100,
    slidesToShow: 1, // Show one full slide and the next one peeking
    // centerMode: true,
    // centerPadding: "10%",
    //slidesToScroll: 1,
    //centerMode: true, // Center the slides
    swipeToSlide: true, // Allow swipe to slide
  };

  useEffect(() => {
    if (!toggled && expanded !== toggled) {
      setToggled(true);
    }
  }, [expanded, toggled]);

  useEffect(() => {
    if (!sliderRef || !toggled) {
      return;
    }
    if (expanded) {
      sliderRef.slickNext();
    } else {
      sliderRef.slickPrev();
    }
  }, [toggled, expanded, sliderRef]);

  return (
    <div>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {images.map((image) => (
          <div key={image.sys.id} className="px-5">
            <div
              style={{
                width: "100%",
                position: "relative",
                paddingTop: "100%",
              }}
            >
              <Image
                src={image.url}
                alt={image.description}
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
