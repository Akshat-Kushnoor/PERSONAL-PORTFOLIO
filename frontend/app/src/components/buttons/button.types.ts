import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "black" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}


export interface PairButtonProps extends BaseButtonProps {}

export interface SoloButtonProps extends Omit<BaseButtonProps, "children"> {
  initialText: string;
  hoverText: string;
}

export interface LogoButtonProps extends BaseButtonProps {
  label: string;
  icon: any; // Using any to support multiple icon libraries as requested
  direction?: "left" | "right";
  expandMode?: "full" | "partial";
}

export interface PairButtonGroupProps {
  children: ReactNode;
  gap?: number;
  direction?: "row" | "column";
  className?: string;
}
