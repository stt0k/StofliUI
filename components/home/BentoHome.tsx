"use client";

import React from "react";
import { bentoitems } from "@/components/home/BentoData";
import CardSpotlight from "@/components/CardSpotlight";

const BentoHome = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 container mx-auto px-4 pb-16">
      {bentoitems.map((item, index) => (
        <CardSpotlight key={index}>
          <article className="flex flex-col h-full justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-[14px] border border-[#00D1FF]/70 bg-[#00D1FF]/10 shadow-[0_0_15px_rgba(0,209,255,0.4)] dark:border-[#00D1FF]/30 dark:bg-[#00D1FF]/10 dark:shadow-[0_0_10px_rgba(0,209,255,0.5)]">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          </article>
        </CardSpotlight>
      ))}
    </div>
  );
};

export default BentoHome;
