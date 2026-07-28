import Navbar from "@/components/Navbar";
import VideoIntro from "@/components/VideoIntro";
import ScrollTransition from "@/components/ScrollTransition";
import About from "@/components/About";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import CertificationsSection from "@/components/CertificationsSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#090a0d" }}>
      <Navbar />
      <VideoIntro videoSrc="/hero-video.mp4" nextSectionId="about" />
      <ScrollTransition />
      <About />
      <div id="projects">
        <ProjectsShowcase />
      </div>
      <CertificationsSection />
      <Contact />
    </main>
  );
}