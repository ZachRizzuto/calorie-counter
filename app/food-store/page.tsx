"use client";
import { Button } from "@/Components/Button";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { StoreOption } from "@/Components/StoreOption";
import Image from "next/image";
import { useContext } from "react";
import { buyFood } from "../(utils)/requests";

export default function BuyFoodPage() {
  const { allFoods, user, setUser } = useContext(UserContentContext);
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
                  <span className="text-7xl text-center">{user.balance}🪙</span>
                </div>
                <div className="flex gap-1">
                  Dev Purposes:
                  <Button
                    text={"+1"}
                    styles={"w-12"}
                    onClick={() => {
                      buyFood(-1, user.balance, user.id).then((res) => {
                        if (res.ok) {
                          const newBalance = user.balance + 1;
                          setUser({ ...user, balance: newBalance });
                        }
                      });
                    }}
                  />
                  <Button
                    text={"+5"}
                    styles={"w-12"}
                    onClick={() => {
                      buyFood(-5, user.balance, user.id).then((res) => {
                        if (res.ok) {
                          const newBalance = user.balance + 5;
                          setUser({ ...user, balance: newBalance });
                        }
                      });
                    }}
                  />
                  <Button
                    text={"+10"}
                    styles={"w-12"}
                    onClick={() => {
                      buyFood(-10, user.balance, user.id).then((res) => {
                        if (res.ok) {
                          const newBalance = user.balance + 10;
                          setUser({ ...user, balance: newBalance });
                        }
                      });
                    }}
                  />
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
                  if (food.calories >= 350) {
                    return (
                      <StoreOption
                        key={food.id}
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
