import React from "react";

export const LoadingSpinner = props => {
  const {
    width = 150,
    height = 150,
    colorFirst = "#1d3f72",
    colorSecond = "#5699d2",
    strokeWidth = 4,
    radiusFirst = 40,
    radiusSecond = 35
  } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-double-ring"
    >
      <circle
        cx={50}
        cy={50}
        ng-attr-r="{{config.radius}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-stroke="{{config.c1}}"
        ng-attr-stroke-dasharray="{{config.dasharray}}"
        fill="none"
        strokeLinecap="round"
        r={radiusFirst}
        strokeWidth={strokeWidth}
        stroke={colorFirst}
        strokeDasharray="62.83185307179586 62.83185307179586"
        transform="rotate(199.69 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="0.9s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={50}
        cy={50}
        ng-attr-r="{{config.radius2}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-stroke="{{config.c2}}"
        ng-attr-stroke-dasharray="{{config.dasharray2}}"
        ng-attr-stroke-dashoffset="{{config.dashoffset2}}"
        fill="none"
        strokeLinecap="round"
        r={radiusSecond}
        strokeWidth={strokeWidth}
        stroke={colorSecond}
        strokeDasharray="54.97787143782138 54.97787143782138"
        strokeDashoffset="54.97787143782138"
        transform="rotate(-199.69 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;-360 50 50"
          keyTimes="0;1"
          dur="0.9s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingSpinner;
