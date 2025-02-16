import React from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// Define button styles with dynamic colors
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      variants: {
        color: {
          blue: "bg-blue-500 hover:bg-blue-600 text-white",
          red: "bg-red-500 hover:bg-red-600 text-white",
          green: "bg-green-500 hover:bg-green-600 text-white",
          yellow: "bg-yellow-500 hover:bg-yellow-600 text-black",
          custom: "", // Custom class will be passed via className
        },
      },
      defaultVariants: {
        color: "blue",
      },
    }
  );
  
  const Button = ({ className, color, children, ...props }) => {
    return (
      <button className={twMerge(buttonVariants({ color }), className)} {...props}>
        {children}
      </button>
    );
  };
  
export default Button;
