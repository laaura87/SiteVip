/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from "classnames";
import React from "react";

import { Wrapper } from "./styles";

type CarouselProps = {
  offset?: number;
  gap?: number;
  slidesPerPage?: number;
  infinite?: boolean;
  evenCenter?: boolean;
  centered?: boolean;
};

type Props = CarouselProps & {
  clickToChange?: boolean;
  skip?: number[];
  breakpoints?: Array<{ size: number } & CarouselProps>;
};

export const Carousel: React.FC<Props> = ({ children, ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const containerWidth = containerRef?.current?.offsetWidth || 360;
  const breakpoint = React.useMemo(
    () => props.breakpoints.find(({ size }) => size > containerWidth) ?? {},
    [props.breakpoints]
  );
  const { offset, gap, slidesPerPage, evenCenter, centered, infinite } = {
    ...props,
    ...breakpoint,
  };
  const [mouse, setMouse] = React.useState<{ x: number; y: number }>(null);
  const [value, setValue] = React.useState<number>(0);

  const itemWidth = containerWidth / slidesPerPage - gap;
  const itemCount = React.Children.count(children);
  const activeItem = Math.round(value);

  const handlePressStart = (event) => {
    setMouse({
      x: event?.touches?.[0]?.clientX ?? event?.clientX,
      y: event?.touches?.[0]?.clientY ?? event?.clientY,
    });
  };

  const decreaseValue = (target, newValue = value) => {
    if (newValue > target) {
      setValue(newValue - 0.03);
      setTimeout(decreaseValue, 1, target, newValue - 0.03);
    } else {
      setValue(Math.round(newValue));
    }
  };

  const increaseValue = (target, newValue = value) => {
    if (newValue < target) {
      setValue(newValue + 0.03);
      setTimeout(increaseValue, 1, target, newValue + 0.03);
    } else {
      setValue(Math.round(newValue));
    }
  };

  const handlePressEnd = () => {
    setMouse(null);

    let target = activeItem;

    if (props.skip && props.skip.includes(target % itemCount)) target += 1;

    if (target > value) {
      increaseValue(target);
    } else {
      decreaseValue(target);
    }
  };

  const handleDrag = (event) => {
    if (mouse) {
      const newMouse = {
        x: event?.touches?.[0]?.clientX ?? event?.clientX,
        y: mouse.y,
      };
      const movement = (newMouse.x - mouse.x) / (itemWidth + gap);

      if (
        Math.abs((event?.touches?.[0]?.clientY ?? event?.clientY) - mouse.y) >
        50
      ) {
        setMouse(null);
        return;
      }

      setValue(value - movement);
      setMouse(newMouse);
    }
  };

  const getItemPosition = (index: number) => {
    let position =
      index * (itemWidth + gap) - value * (itemWidth + gap) + offset;

    if (evenCenter) position += (containerWidth - gap) / 2 - itemWidth;
    else if (centered) position += (containerWidth - itemWidth) / 2;

    if (infinite) {
      while (position > containerWidth)
        position -= itemCount * (itemWidth + gap);
      while (position < -itemWidth) position += itemCount * (itemWidth + gap);
    }

    if (position < -itemWidth || position > containerWidth)
      position = containerWidth;

    return position;
  };

  const goToSlide = (targetPosition: number) => {
    const target =
      value + (targetPosition - getItemPosition(value)) / (itemWidth + gap);

    const newTarget =
      props.skip && props.skip.includes(Math.round(target % itemCount))
        ? target - 1
        : target;

    if (activeItem === newTarget) return;

    if (newTarget > value) {
      increaseValue(newTarget);
    } else {
      decreaseValue(newTarget);
    }
  };

  return (
    <Wrapper>
      <div
        className="carousel-container"
        ref={containerRef}
        role="region"
        onMouseDown={handlePressStart}
        onTouchStart={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
        onMouseMove={handleDrag}
        onTouchMove={handleDrag}
      >
        {React.Children.map(children, (child, index) => {
          const itemPosition = getItemPosition(index);

          return (
            <div
              className={cn("carousel-item", {
                active: activeItem % itemCount === index,
              })}
              onClick={() => goToSlide(itemPosition)}
              style={{
                width: itemWidth,
                transform: `translateX(${itemPosition}px)`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

Carousel.defaultProps = {
  evenCenter: false,
  centered: false,
  offset: 0,
  infinite: false,
  gap: 0,
  clickToChange: false,
  slidesPerPage: 1.5,
  breakpoints: [],
};

export default Carousel;
