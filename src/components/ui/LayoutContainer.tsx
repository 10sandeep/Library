import { type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Consistent page-width container used by every section and layout component.
 * Desktop (xl+):  max 1440px
 * Laptop (lg):    max 1320px (fills full width on 1024–1279px screens)
 * Tablet/Mobile:  100% width with 16px gutter (sm: 24px)
 */
export default function LayoutContainer({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`w-full mx-auto px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px] ${className}`.trim()}>
      {children}
    </Tag>
  );
}
