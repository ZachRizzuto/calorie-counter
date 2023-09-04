"use client";

import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { Today } from "@/Components/Today";

export default function TodayTab() {
  return (
    <>
      <Nav />
      <div className="flex justify-between items-center p-[30px] w-full">
        <Today />
        <PageSection {}>

        </PageSection>
      </div>
    </>
  );
}
