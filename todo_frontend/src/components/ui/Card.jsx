import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

const Card = ({ title, description, children, className, asChild }) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={twMerge("bg-white shadow-lg rounded-xl p-5 border border-gray-300", className)}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {description && <p className="text-gray-600 mb-3">{description}</p>}
      {children}
    </Comp>
  );
};

export default Card;
