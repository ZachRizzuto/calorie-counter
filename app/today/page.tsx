import { Nav } from "@/Components/Nav";
import { PageWrapper } from "@/Components/PageWrapper";
import { Today } from "@/Components/Today";

export default function TodayTab() {
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="flex items-center justify-between h-[100vh] xs:p-2 md:p-[30px] gap-2">
          <Today />
        </div>
      </PageWrapper>
    </>
  );
}
