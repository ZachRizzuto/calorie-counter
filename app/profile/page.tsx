"use client";
import { Button } from "@/Components/Button";
import { EditCalorieGoalModal } from "@/Components/EditCalorieGoalModal";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { editUserGoal, getJwtTokenFromLocalStorage } from "../(utils)/requests";
import styles from "./profile.module.css";

export default function Profile() {
  const { user, setUser, userDays } = useContext(UserContentContext);

  const [showCalorieModal, setShowCalorieModal] = useState(false);

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
          <div className="w-[50%]">
            <PageSection
              styles={{
                width: "max-w-full",
                height: "rounded-[50%] overflow-hidden flex-col items-center",
              }}
            >
              <h2
                className={`lg:text-2xl xs:text-md md:text-lg ${styles.tooltip}`}
              >
                Track Record:
                <span className={`${styles.tooltiptext}`}>
                  Your Calorie Total History
                </span>
              </h2>
              <div className="translate-x-[-8%]">
                {userDays.slice(-7).map((day) => (
                  <div key={day.id}>
                    <div className="flex flex-col max-h-[400px]">
                      <div className="flex">
                        <div className="min-w-[100px]">{day.date}:</div>
                        <div className="min-w-[30%]">
                          {day.entries
                            .map((entry) => entry.foods)
                            .flat()
                            .reduce(
                              (acc, val) => (acc += val.food.calories),
                              0
                            )}{" "}
                        </div>
                        <div>kcals</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PageSection>
            <PageSection
              styles={{
                width: "w-full",
                height: "",
              }}
            >
              <div className="flex justify-center items-center w-full gap-2">
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
          <div></div>
        </div>
      </PageWrapper>
    </>
  );
}
