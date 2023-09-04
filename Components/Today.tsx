import { PageSection } from "./PageSection";

const sampleArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();

export const Today = () => {
  return (
    <>
      <PageSection
        styles={{
          height: "",
          width: "w-[35vw]",
        }}
      >
        <div className="flex justify-between border-b-2 border-solid w-full pb-2">
          <h1 className="inline text-5xl">Today</h1>
          <h2 className="inline text-4xl">{`${month + 1}/${day}/${year}`}</h2>
        </div>
        <div className="overflow-scroll max-h-[360px] w-full p-2 text-xl">
          {sampleArray.map((val) => {
            return <div key={val}>{val}</div>;
          })}
        </div>
        <div className="flex justify-between border-t-2 border-solid w-full pb-2">
          <h1>Total</h1>
          <p>{sampleArray.reduce((acc, num) => acc + num)} kcal</p>
        </div>
      </PageSection>
    </>
  );
};
