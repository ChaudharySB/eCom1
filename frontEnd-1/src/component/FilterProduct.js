import React from "react";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-2xl p-1  rounded-full cursor-pointer ${isActive ? " drop-shadow-2xl bg-cyan-200 text-white" : "bg-yellow-200"}`}>
          <img className={"  "} src="https://img.icons8.com/ios-filled/50/circled-down-2.png" alt="circled-down-2"/>
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
