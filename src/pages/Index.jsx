import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Linear</h1>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
            Sign Up
          </Button>
        </nav>
      </header>

      <main className="container mx-auto mt-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Build better products, faster</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Linear is the issue tracking tool you'll enjoy using. Streamline your workflow, collaborate seamlessly, and ship with confidence.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <img src="/placeholder.svg" alt="Linear app interface" className="mx-auto object-cover w-full max-w-4xl h-[400px] mt-16 rounded-lg shadow-2xl" />

        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="container mx-auto mt-20 py-6 text-center text-gray-400">
        <p>&copy; 2023 Linear. All rights reserved.</p>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Intuitive Interface",
    description: "Designed for efficiency and ease of use, helping teams focus on what matters."
  },
  {
    title: "Powerful Automation",
    description: "Automate repetitive tasks and workflows to save time and reduce errors."
  },
  {
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team, no matter where they are."
  }
];

export default Index;
