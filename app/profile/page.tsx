"use client";
import { Button } from "@/Components/Button";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContext } from "@/Components/Providers/UserProvider";
import { EditCalorieGoalModal } from "@/Components/EditCalorieGoalModal";
import Image from "next/image";
import { useContext, useState } from "react";
import { editUserGoal } from "../(utils)/requests";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [showCalorieModal, setShowCalorieModal] = useState(false);

  const handleForm = (data: FormData) => {
    const newGoal = data.get("calorie")?.valueOf();

    if (typeof user.id === "number") {
      editUserGoal(user.id, newGoal).then((res) => {
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
        }
      });
      toast.success("Changed goal!");
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
        <div className="flex items-center justify-center h-[100vh] p-[30px] gap-2 w-full">
          <div>
            <PageSection
              styles={{
                width: "max-w-full",
                height: "max-h-full rounded-[50%] overflow-hidden",
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
            </PageSection>
            <PageSection
              styles={{
                width: "w-full",
                height: "h-full",
              }}
            >
              <div className="flex justify-between items-center w-full">
                <div>Calorie Goal: {user?.calorie_goal}</div>
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
                height: "h-full",
              }}
            >
              <h2 className="text-2xl">Calorie Count This Week</h2>
            </PageSection>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
