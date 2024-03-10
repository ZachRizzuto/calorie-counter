"use client";
import { Button } from "@/Components/Button";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { StoreOption } from "@/Components/StoreOption";
import Image from "next/image";
import { useContext } from "react";
import { buyFood, getJwtTokenFromLocalStorage } from "../(utils)/requests";
import styles from "./food-store.module.css";

export default function BuyFoodPage() {
  const { allFoods, user, setUser } = useContext(UserContentContext);
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="lg:p-16 xs:p-6 mt-2 flex justify-center items-center w-full h-full flex-col">
          <div className="w-full border-b-2 border-green-500 text-4xl pb-1 mb-4">
            Buy Food
          </div>
          <div className="flex w-full h-full justify-start">
            <div className="border-t-1 border-green-500 w-[50%] h-full max-w-[370px] xs:hidden lg:block">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-[80%]",
                  custom: "items-center justify-evenly m-auto flex-col",
                }}
              >
                <Image
                  src={
                    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                  }
                  alt={"profile image"}
                  width={250}
                  height={250}
                  className="rounded-[50%]"
                  loading="lazy"
                />
                <div>
                  <span className={`text-7xl text-center ${styles.tooltip}`}>
                    {user.balance}🪙
                    <i className={`fa-solid fa-circle-info text-[20%]`}></i>
                  </span>
                </div>
              </PageSection>
            </div>
            <div className="mx-4 h-full w-1 bg-green-500 xs:hidden lg:block"></div>
            <div className="border-t-1 border-green-500 w-full h-full">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-full",
                  custom: "overflow-y-scroll overflow-x-none flex-col",
                }}
              >
                {allFoods.map((food) => {
                  if (food.calories >= user.calorie_goal * 0.35) {
                    return (
                      <StoreOption
                        key={food.id}
                        foodId={food.id}
                        foodName={food.food}
                        calories={food.calories}
                      />
                    );
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
