import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";

export default function BuyFoodPage() {
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="p-16 mt-2 flex justify-center items-center w-full h-full flex-col">
          <div className="w-full border-b-2 border-green-500 text-4xl pb-1 mb-4">
            Buy Food
          </div>
          <div className="flex w-full h-full">
            <div className="border-t-1 border-green-500 w-full h-full">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-full",
                }}
              >
                <div></div>
              </PageSection>
            </div>
            <div className="mx-4 h-full w-1 bg-green-500"></div>
            <div className="border-t-1 border-green-500 w-full h-full">
              <PageSection
                styles={{
                  height: "h-full",
                  width: "w-full",
                }}
              >
                <div></div>
              </PageSection>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
