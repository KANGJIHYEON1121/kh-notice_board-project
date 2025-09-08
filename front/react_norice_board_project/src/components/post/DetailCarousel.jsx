import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  CarouselContainer,
  Cell,
  NextBtn,
  PrevBtn,
  IndicatorWrapper,
  IndicatorDot,
} from "./DetailCarouselStyle.js";

const DetailCarousel = () => {
  const { productNo } = useParams();
  const location = useLocation();
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
        const sampleImages = [
          "https://mblogthumb-phinf.pstatic.net/MjAyNDAyMTdfMjI5/MDAxNzA4MTgxOTEwMjYx.mSaSuTActerFUauXr9EYipgltWCyarhNNpuzRvkzP7kg._CCk47RuNmuyR4UZL-miXgX5EJDYyaClqCBcQG_ttacg.PNG.kkson50/sample_images_00.png?type=w800",
          "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfNjEg/MDAxNTcwNzg1ODM3Nzc0.zxDXm20VlPdQv8GQi9LWOdPwkqoBdiEmf8aBTWTsPF8g.FqMQTiF6ufydkQxrLBgET3kNYAyyKGJTWTyi1qd1-_Ag.PNG.kkson50/sample_images_01.png?type=w800",
          "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfODMg/MDAxNTcwNzg1ODM3NTUz.2m5sz7K4ATO7WZzXYGE-MmUQ1DYUOflq0IaGgitVZEIg.jYZnxxm0E275Jplbrw25aFCFPVXKcmai1zhf8rlYl3Eg.PNG.kkson50/sample_images_02.png?type=w800",
        ];
        setImages(sampleImages);
      } catch (err) {
        console.error("이미지 로드 실패:", err);
      }
    };

    fetchImages();
  }, []);

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
              <img src={img} alt={`image-${idx}`} />
            </Cell>
          ))
        ) : (
          <p>이미지가 없습니다</p>
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
