"use client";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { StoreOption } from "@/Components/StoreOption";
import Image from "next/image";
import { useContext } from "react";

export default function BuyFoodPage() {
  const { allFoods } = useContext(UserContentContext);
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="p-16 mt-2 flex justify-center items-center w-full h-full flex-col">
          <div className="w-full border-b-2 border-green-500 text-4xl pb-1 mb-4">
            Buy Food
          </div>
          <div className="flex w-full h-full ">
            <div className="border-t-1 border-green-500 w-[60%] h-full max-w-[370px]">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-full",
                  custom: "items-center justify-evenly",
                }}
              >
                <Image
                  src={
                    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                  }
                  alt={"profile image"}
                  width={350}
                  height={350}
                  className="rounded-[50%]"
                  loading="lazy"
                />
                <div>
                  <span className="pr-[20px] text-7xl text-center">${50}</span>
                </div>
              </PageSection>
            </div>
            <div className="mx-4 h-full w-1 bg-green-500"></div>
            <div className="border-t-1 border-green-500 w-full h-full">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-full",
                  custom: "overflow-y-scroll overflow-x-none",
                }}
              >
                {allFoods.map((food) => {
                  if (food.calories > 80) {
                    return <StoreOption key={food.id} foodName={food.food} />;
                  }
                })}
              </PageSection>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
