import React from "react"
import ContentLoader from "react-content-loader"

export const Sceleton: React.FC = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="1" y="284" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="321" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="439" rx="10" ry="10" width="91" height="27" /> 
    <rect x="118" y="421" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)