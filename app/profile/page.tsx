"use client";
import { Button } from "@/Components/Button";
import { EditCalorieGoalModal } from "@/Components/EditCalorieGoalModal";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { editUserGoal, getJwtTokenFromLocalStorage } from "../(utils)/requests";

export default function Profile() {
  const { user, setUser, userDays, userEntries, allFoods } =
    useContext(UserContentContext);

  const [showCalorieModal, setShowCalorieModal] = useState(false);

  // Doesn't actually get "this weeks" calorie count fix later
  // Should probably get turned into a piece of state

  let lastWeeksCalorieTotal = 0;

  const lastSevenDayIds = userDays.slice(-7).map((day) => day.id);

  const lastSevenDayFoodIds = userEntries
    .filter((entry) => lastSevenDayIds.includes(entry.dayId))
    .map((entry) => entry.foodId);

  const lastSevenDayFoods = allFoods.filter((food) =>
    lastSevenDayFoodIds.includes(food.id)
  );

  lastWeeksCalorieTotal = lastSevenDayFoods.reduce(
    (acc, val) => (acc += val.calories),
    0
  );

  const handleForm = (data: FormData) => {
    const newGoal = data.get("calorie")?.valueOf();

    if (typeof newGoal === "string" && newGoal !== "") {
      const numberNewGoal = parseInt(newGoal);
      editUserGoal(numberNewGoal, getJwtTokenFromLocalStorage(), user)
        .then((res) => {
          if (!res.ok) {
            toast.error("Failed to changed goal");
            throw new Error("Couldn't resolve goal change.");
          }
          if (typeof newGoal === "string") {
            const intGoal = parseInt(newGoal);
            setUser({
              ...user,
              calorie_goal: intGoal,
            });
            toast.success("Changed goal!");
          }
        })
        .catch((e) => console.error({ ERROR: e }));
    }
  };

  return (
    <>
      <PageWrapper>
        <Nav />
        <EditCalorieGoalModal
          show={showCalorieModal}
          setShow={(show) => setShowCalorieModal(show)}
          handleForm={handleForm}
        />
        <div className="flex items-center justify-center h-[100vh] p-[30px] gap-2 w-full lg:flex-row xs:flex-col">
          <div>
            <PageSection
              styles={{
                width: "max-w-full",
                height: "rounded-[50%] overflow-hidden",
              }}
            >
              <Image
                src={"/images/image-removebg-preview.png"}
                alt={"profile image"}
                width={350}
                height={350}
                className="rounded-[50%]"
                loading="lazy"
              />
            </PageSection>
            <PageSection
              styles={{
                width: "w-full",
                height: "",
              }}
            >
              <div className="flex justify-between items-center w-full">
                <div>Calorie Goal: {user.calorie_goal}</div>
                <Button
                  text="Edit"
                  onClick={() => {
                    !showCalorieModal
                      ? setShowCalorieModal(true)
                      : setShowCalorieModal(false);
                  }}
                  styles="hover:bg-green-400 hover:text-gray-800"
                />
              </div>
            </PageSection>
          </div>
          <div>
            <PageSection
              styles={{
                width: "w-full",
                height: "",
              }}
            >
              <h2 className="lg:text-2xl xs:text-md md:text-lg">
                Calorie Count This Week: {lastWeeksCalorieTotal}
              </h2>
            </PageSection>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
