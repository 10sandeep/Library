"use client";
import { TICKER_ITEMS } from "@/lib/data";

export default function AnnouncementTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="flex items-stretch overflow-hidden border-b border-[#e0e0e0] bg-white h-10"
      aria-label="Latest announcements ticker"
      aria-live="off"
    >
      {/* Label */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-5 text-xs font-extrabold tracking-widest uppercase text-white bg-[#ff9f08] min-w-[88px]"
        aria-hidden="true"
      >
        Latest
      </div>
      {/* Separator */}
      <div className="w-px bg-[#e8e8e8] flex-shrink-0" aria-hidden="true" />
      {/* Scrolling items */}
      <div className="flex-1 overflow-hidden flex items-center">
        <div className="ticker-animate flex gap-12 whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="text-xs text-[#333] flex items-center gap-2 flex-shrink-0 cursor-pointer hover:text-[#ff6600] transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#ff9f08]"
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
