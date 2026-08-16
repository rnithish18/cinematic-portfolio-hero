import Navbar from "@/components/Navbar";
import VideoIntro from "@/components/VideoIntro";
import ScrollTransition from "@/components/ScrollTransition";
import About from "@/components/About";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import CertificationsSection from "@/components/CertificationsSection";
import GitHubSection from "@/components/GitHubSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090a0d" }}>
      <Navbar />
      <VideoIntro videoSrc="/hero-video.mp4" nextSectionId="about" />
      <ScrollTransition />

      <ScrollReveal direction="up">
        <About />
      </ScrollReveal>

      <div id="projects">
        <ScrollReveal direction="up">
          <ProjectsShowcase />
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up">
        <CertificationsSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <GitHubSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <LeetCodeSection />
      </ScrollReveal>

      <ScrollReveal direction="fade">
        <Contact />
      </ScrollReveal>
    </main>
  );
}