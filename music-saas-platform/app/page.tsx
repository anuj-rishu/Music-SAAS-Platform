"use client"
import { Appbar } from "./components/Appbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Tv, Share2 } from "lucide-react";
import { Footer } from "./components/footer";
import { Redirect } from "./components/Redirect";


export default function Home() {
  return (
    <main className="">
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black text-white relative overflow-hidden">
        <Appbar />
        <Redirect/>
   
        {/* Music note background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 border-8 border-white rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 border-8 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-28 h-28 border-6 border-white rounded-full"></div>
        </div>

        <main className="relative z-10">
          <section className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let Audience Choose the Soundtrack
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              TheaterTunes allows theaters to engage their audience by letting
              them pick the music played on screen. Create an interactive
              experience like never before.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </section>

          <section id="features" className="bg-gray-900/80 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Users className="h-10 w-10" />}
                  title="Audience Engagement"
                  description="Let your audience interact and choose the music, creating a unique, participatory experience."
                />
                <FeatureCard
                  icon={<Tv className="h-10 w-10" />}
                  title="Screen Integration"
                  description="Seamlessly display chosen tracks on your theater screens, enhancing the visual experience."
                />
                <FeatureCard
                  icon={<Share2 className="h-10 w-10" />}
                  title="Social Sharing"
                  description="Enable attendees to share their music choices and theater experience on social media."
                />
              </div>
            </div>
          </section>

          <section
            id="cta"
            className="container mx-auto px-4 py-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Theater Experience?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Join TheaterTunes today and give your audience the power to create
              their own soundtrack.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </form>
          </section>
        </main>

        <Footer />
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
