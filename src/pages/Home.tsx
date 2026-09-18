import { Hero } from "../components/sections/Hero";
import { MissionSection } from "../components/sections/MissionSection";
import { ProjectHighlightSection } from "../components/sections/ProjectHighlightSection";
import { TimelineSection } from "../components/sections/TimelineSection";
import { OceanSection } from "../components/sections/OceanSection";
import { StatsSection } from "../components/sections/StatsSection";
import { CtaSection } from "../components/sections/CtaSection";

export default function Home({ scrollY }: { scrollY: number }) {
  return (
    <>
      <Hero scrollY={scrollY} />
      <MissionSection scrollY={scrollY} />
      <ProjectHighlightSection />
      <TimelineSection />
      <OceanSection scrollY={scrollY} />
      <StatsSection />
      <CtaSection scrollY={scrollY} />
    </>
  )
}
