import Layout from "../../components/layout/Layout";
import Hero from "../../components/website/Hero";
import Stats from "../../components/website/Stats";
import About from "../../components/website/About";
import PrincipalMessage from "../../components/website/PrincipalMessage";
import AdmissionCTA from "../../components/website/AdmissionCTA";
import Gallery from "../../components/website/Gallery";
import NewsTicker from "../../components/website/NewsTicker";
import Programs from "../../components/website/Programs";
import WhyChoose from "../../components/website/WhyChoose";
import AdmissionPopup from "../../components/layout/AdmissionPopup";

import ScrollAnimation from "../../components/common/ScrollAnimation";

export default function Home() {
    return (
        <Layout>
            <AdmissionPopup />

            <div className="bg-gray-50 min-h-screen text-gray-800">

                <NewsTicker />

                <Hero />

                <ScrollAnimation direction="up">
                    <Stats />
                </ScrollAnimation>

                <ScrollAnimation direction="left">
                    <PrincipalMessage />
                </ScrollAnimation>

                <ScrollAnimation direction="right">
                    <About />
                </ScrollAnimation>

                <ScrollAnimation direction="up">
                    <AdmissionCTA />
                </ScrollAnimation>

                <ScrollAnimation direction="left">
                    <WhyChoose />
                </ScrollAnimation>

                <ScrollAnimation direction="right">
                    <Programs />
                </ScrollAnimation>

                <ScrollAnimation direction="up">
                    <Gallery />
                </ScrollAnimation>

            </div>
        </Layout>
    );
}