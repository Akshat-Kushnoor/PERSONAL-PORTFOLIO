export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const getVariantClasses = (variant: "black" | "white" = "black") => {
  return variant === "black"
    ? "bg-black text-white border-white"
    : "bg-white text-black border-black";
};

export const getSizeClasses = (size: "sm" | "md" | "lg" = "md") => {
  switch (size) {
    case "sm":
      return "px-4 py-1.5 text-sm";
    case "lg":
      return "px-8 py-3 text-lg";
    default:
      return "px-6 py-2.5 text-base";
  }
};
