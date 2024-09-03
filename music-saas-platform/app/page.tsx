import { Appbar } from "./components/Appbar";
import { Button } from "@/components/ui/button";
import { Users, Tv, Play } from "lucide-react";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <main className="">
      <Appbar />

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-gray-50">
                  Elevate Your Venue&rsquo;s Atmosphere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  MusicStream empowers theaters to create immersive, interactive
                  music experiences. Let your audience curate the perfect
                  soundtrack in real-time.
                </p>
                <div className="w-full max-w-sm space-y-2">
                  <Button
                    type="submit"
                    className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 dark:text-gray-50">
                How It Works
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center">
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <Users className="h-10 w-10 mb-2 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    1. Set Up Your Venue
                  </h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Create your theater&rsquo;s profile and customize your music
                    preferences in minutes.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <Tv className="h-10 w-10 mb-2 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    2. Engage Your Audience
                  </h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Share a unique access code with your audience to join the
                    interactive music session.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <Play className="h-10 w-10 mb-2 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    3. Experience the Magic
                  </h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Watch as your audience collaboratively crafts the perfect
                    ambiance through music selection.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-gray-50">
                  Ready to Transform Your Theater Experience?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join MusicStream today and give your audience the power to
                  create their own soundtrack.
                </p>
                <Button className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </main>
  );
}
