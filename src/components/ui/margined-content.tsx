import { ReactNode } from "react";
import { cssVars } from "@/app.config";

interface MarginedContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function MarginedContent({ children, style, ...rest }: MarginedContentProps) {
    return (
        <div style={{ paddingTop: `${cssVars.headerPx + (cssVars.marginPx * 2)}px`, margin: `${cssVars.marginPx}px`, ...style }} {...rest}>
            {children}
        </div>
    );
}
