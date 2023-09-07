"use client";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { LogContext } from "@/Components/Providers/LogProvider";
import Image from "next/image";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(LogContext);
  return (
    <>
      <PageWrapper>
        <Nav />
        <div className="flex items-center justify-between h-[100vh]">
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
              />
            </PageSection>
            <PageSection
              styles={{
                width: "w-full",
                height: "h-full",
              }}
            >
              <div>Calorie Goal: {user.user}</div>
            </PageSection>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
