import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface CustomMasonryProps {
  children: ReactNode[];
  columns: { mobile: number; tablet: number; desktop: number };
  gap: number;
}

export default function CustomMasonry({
  children,
  columns,
  gap,
}: CustomMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getColumnCount = useCallback(() => {
    if (typeof window === "undefined") return columns.mobile;
    const width = window.innerWidth;
    if (width >= 1300) return columns.desktop;
    if (width >= 1024) return columns.tablet;
    return columns.mobile;
  }, [columns.desktop, columns.mobile, columns.tablet]);

  const checkIsMobile = useCallback(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < 1024;
  }, []);

  const calculateLayout = useCallback(() => {
    if (!containerRef.current || isMobile) {
      setPositions([]);
      setContainerHeight(0);
      return;
    }

    const columnCount = getColumnCount();
    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth =
      (containerWidth - gap * (columnCount - 1)) / columnCount;

    // Initialize column heights
    const heights = new Array(columnCount).fill(0);
    const newPositions: { top: number; left: number }[] = [];

    // Place each item in the shortest column
    itemRefs.current.forEach((item) => {
      if (!item) return;

      // Find shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights));

      // Calculate position
      const left = shortestColumnIndex * (columnWidth + gap);
      const top = heights[shortestColumnIndex];

      newPositions.push({ top, left });

      // Update column height (item height + gap)
      heights[shortestColumnIndex] += item.offsetHeight + gap;
    });

    setPositions(newPositions);
    setContainerHeight(Math.max(...heights) - gap); // Remove last gap
  }, [gap, getColumnCount, isMobile]);

  useEffect(() => {
    // Check if mobile on mount
    setIsMobile(checkIsMobile());
  }, [checkIsMobile]);

  useEffect(() => {
    // Calculate on mount and when children change
    const timer = setTimeout(calculateLayout, 0);
    return () => clearTimeout(timer);
  }, [children.length, calculateLayout]);

  useEffect(() => {
    // Recalculate on window resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      setIsMobile(checkIsMobile());
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateLayout, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [calculateLayout, checkIsMobile]);

  // On mobile, use normal flow layout (no masonry)
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${gap}px`,
          width: "100%",
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={{ width: "100%" }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  // On tablet/desktop, use masonry layout
  const columnCount = getColumnCount();
  const containerWidth = containerRef.current?.offsetWidth || 0;
  const columnWidth = containerWidth
    ? (containerWidth - gap * (columnCount - 1)) / columnCount
    : 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: containerHeight || "auto",
        width: "100%",
      }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          style={{
            position: positions[index] ? "absolute" : "relative",
            top: positions[index]?.top || 0,
            left: positions[index]?.left || 0,
            width: columnWidth || "100%",
            transition: "top 0.3s ease, left 0.3s ease",
            opacity: positions[index] ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
