"use client";

import { useState } from "react";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  handleForm: (data: FormData) => void;
};

export const EditCalorieGoalModal = ({ show, setShow, handleForm }: Props) => {
  const [formValue, setFormValue] = useState("");
  return (
    <>
      <div
        className={`h-full w-full absolute bg-transparent-gray z-10 ${
          show ? "block" : "hidden"
        }`}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={`absolute left-0 right-0 m-auto bg-light-dark-contrast z-10 rounded-md flex flex-col items-center xs:w-[300px] sm:w-[350px] shadow-md justify-start p-[20px] border-2 border-green-500 duration-300 ${
          show ? "bottom-[45%]" : "-bottom-96"
        }`}
      >
        <button
          className="ml-auto transform scale-[2]"
          onClick={() => setShow(false)}
        >
          ⌄
        </button>
        <form
          action={handleForm}
          onSubmit={() => {
            setFormValue("");
            setShow(false);
          }}
        >
          <label htmlFor="calorie">New Calorie Goal:</label>
          <div className="bg-white rounded-pill w-full flex justify-center">
            <input
              id="calorie"
              type="text"
              name="calorie"
              value={formValue}
              onChange={(e) => {
                if (e.target.value.match("^[0-9]+$") || e.target.value === "") {
                  setFormValue(e.target.value);
                }
              }}
              autoComplete="off"
              style={{
                width: "90%",
              }}
            />
          </div>
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
};
