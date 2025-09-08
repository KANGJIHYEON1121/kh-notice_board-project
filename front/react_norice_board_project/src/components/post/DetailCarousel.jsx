import React, { useState, useRef, useEffect } from "react";
import { HOST_URL } from "../../api/HostUrl.js";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
  IndicatorWrapper,
  IndicatorDot,
} from "./DetailCarouselStyle.js";

const DetailCarousel = ({ uploadFileNames }) => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const [images, setImages] = useState([]);
  const CAROUSEL_LENGTH = images?.length ? images.length - 1 : 0; // 0 to 3 (4 images)

  const [imgSize, setImgSize] = useState(
    window.innerWidth > 500 ? 500 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      // setImgSize(window.innerWidth < 400 ? window.innerWidth : listLength);
      setImgSize(window.innerWidth > 500 ? 500 : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // props가 undefined일 수 있으므로 체크
        if (uploadFileNames && Array.isArray(uploadFileNames)) {
          setImages(uploadFileNames);
        } else {
          setImages([]); // 빈 배열로 초기화
        }
      } catch (err) {
        console.error("이미지 로드 실패:", err);
      }
    };

    fetchImages();
  }, [uploadFileNames]); // ← 의존성 배열에 넣는 것도 잊지 마세요!

  const nextEvent = () => {
    if (!images || images.length === 0) return;
    const nextIndex = current < CAROUSEL_LENGTH ? current + 1 : 0;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * nextIndex
      }px)`;
    }
    setCurrent(nextIndex);
  };

  const prevEvent = () => {
    if (!images || images.length === 0) return;
    const prevIndex = current > 0 ? current - 1 : CAROUSEL_LENGTH;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${
        -imgSize * prevIndex
      }px)`;
    }
    setCurrent(prevIndex);
  };

  return (
    <CarouselContainer>
      <div ref={carouselRef}>
        {images.length > 0 ? (
          images.map((img, idx) => (
            <Cell key={idx}>
              <img src={`${HOST_URL}/post/view/${img}`} alt={`image-${idx}`} />
            </Cell>
          ))
        ) : (
          <img src={`${HOST_URL}/post/view/default`} alt={"기본 이미지"} />
        )}
      </div>
      {images && images.length > 1 && (
        <div>
          <PrevBtn onClick={prevEvent}>{"<"}</PrevBtn>
          <NextBtn onClick={nextEvent}>{">"}</NextBtn>
        </div>
      )}
      {images.length > 1 && (
        <IndicatorWrapper>
          {images.map((_, idx) => (
            <IndicatorDot key={idx} active={current === idx} />
          ))}
        </IndicatorWrapper>
      )}
    </CarouselContainer>
  );
};

export default DetailCarousel;
