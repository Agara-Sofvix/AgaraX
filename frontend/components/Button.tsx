'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  prefetch?: boolean;
  disabled?: boolean;
  form?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
  href,
  prefetch = true,
  disabled = false,
  form,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 focus:ring-offset-white border-2 select-none";
  
  const variantStyles = {
    primary: "bg-[#4F46E5] text-white border-[#4F46E5] hover:bg-transparent hover:text-[#4F46E5] shadow-md hover:shadow-xl",
    secondary: "bg-[#1E293B] text-white border-[#1E293B] hover:bg-transparent hover:text-[#1E293B] shadow-md hover:shadow-xl",
    outline: "bg-transparent text-[#1E293B] border-[#1E293B]/20 hover:bg-[#1E293B] hover:text-white hover:border-[#1E293B]",
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { stiffness: 400, damping: 17 }
  };

  const isFullWidth = className.includes('w-full');

  if (href) {
    return (
      <motion.div
        {...motionProps}
        className={isFullWidth ? "w-full sm:w-auto" : "inline-block"}
      >
        <Link 
          href={href} 
          prefetch={prefetch}
          className={`${combinedClasses} ${isFullWidth ? 'flex w-full' : ''}`}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${isFullWidth ? 'w-full' : ''}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
