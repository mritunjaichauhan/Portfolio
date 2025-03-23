import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  id: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function TubelightNavbar({ items, className, activeSection, setActiveSection }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isUltraSlim, setIsUltraSlim] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsUltraSlim(window.innerWidth < 360);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a horizontally scrollable container for very small screens
  return (
    <div
      className={cn(
        "fixed bottom-4 sm:hidden left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <div 
        ref={scrollContainerRef}
        className={cn(
          "flex items-center bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg",
          "overflow-x-auto scrollbar-hide max-w-[95vw] flex-nowrap"
        )}
        style={{
          scrollbarWidth: 'none',  // Firefox
          msOverflowStyle: 'none',  // IE/Edge
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2.5 py-2 rounded-full transition-colors flex-shrink-0",
                "text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white",
                isActive && "bg-black/5 dark:bg-white/5 text-black dark:text-white"
              )}
              style={{ minWidth: isUltraSlim ? '36px' : '42px' }}
            >
              <Icon size={isUltraSlim ? 16 : 20} strokeWidth={isUltraSlim ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black/5 dark:bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-black dark:bg-white rounded-t-full">
                    <div className="absolute w-10 h-5 bg-black/20 dark:bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-5 bg-black/20 dark:bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-black/20 dark:bg-white/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
      {/* Add scroll indicators for user awareness */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}