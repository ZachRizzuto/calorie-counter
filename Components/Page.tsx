import { Nav } from "./Nav";
import { LogProvider } from "./Providers/LogProvider";
import { Today } from "./Today";

export default function Page() {
  return (
    <>
      <Nav />
      <div className="flex justify-between items-center p-[30px] w-full">
        <Today />
      </div>
    </>
  );
}
