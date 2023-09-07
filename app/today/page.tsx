import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { Today } from "@/Components/Today";

export default function TodayTab() {
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="flex justify-between items-center p-[30px] w-full">
          <Today />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <PageSection
              styles={{
                width: "w-full",
                height: "min-h-[150px] h-full",
              }}
            >
              <div className="flex justify-between border-b-2 border-solid w-full pb-2">
                <h1 className="inline text-4xl">Suggested Foods</h1>
              </div>
            </PageSection>
            <PageSection
              styles={{
                width: "w-full",
                height: "min-h-[150px] h-full",
              }}
            >
              <div className="flex justify-between border-b-2 border-solid w-full pb-2">
                <h1 className="inline text-4xl">Calorie Dense Foods</h1>
              </div>
            </PageSection>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
