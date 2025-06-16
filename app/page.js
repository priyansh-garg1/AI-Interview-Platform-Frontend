import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Image
          src="/logo.png"
          alt="AI Recruiter Logo"
          width={100}
          height={100}
          className="mx-auto mb-6 animate-bounce-slow"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
          Revolutionize Your Hiring with <span className="text-blue-600">AI-Powered Interviews</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
          Streamline your recruitment process, generate tailored interview questions, and assess candidates efficiently with our intelligent AI platform.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
              Get Started Free
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-10 md:p-16 mb-16 animate-fade-in-up animation-delay-600">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon="/globe.svg"
            title="Smart Question Generation"
            description="Our AI crafts unique, relevant interview questions based on job descriptions and candidate profiles."
          />
          <FeatureCard
            icon="/check.png"
            title="Efficient Candidate Assessment"
            description="Evaluate responses with AI-driven insights, ensuring fair and consistent candidate scoring."
          />
          <FeatureCard
            icon="/file.svg"
            title="Customizable Interview Flows"
            description="Design interview stages, add custom questions, and tailor the experience to your hiring needs."
          />
        </div>
      </section>

      {/* Call to Action */}
      <div className="w-full max-w-4xl text-center bg-blue-600 text-white p-10 rounded-2xl shadow-lg animate-fade-in-up animation-delay-800">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Hiring Process?
        </h2>
        <p className="text-lg mb-8">
          Join countless recruiters who are already saving time and finding the best talent with AI Recruiter.
        </p>
        <Link href="/auth">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
            Start Your Free Trial Today
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Recruiter. All rights reserved.
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
    <Image src={icon} alt={title} width={60} height={60} className="mx-auto mb-6" />
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
