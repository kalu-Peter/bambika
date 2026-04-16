import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface GenderCard {
  label: string;
  href: string;
  image: string;
  description: string;
}

interface GenderLandingProps {
  heading: string;
  heroImage: string;
  cards: [GenderCard, GenderCard];
}

const GenderLanding = ({ heading, heroImage, cards }: GenderLandingProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-48 md:h-72 overflow-hidden mt-[73px]">
        <img src={heroImage} alt={heading} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-primary-foreground">
            {heading}
          </h1>
        </div>
      </section>

      {/* Gender selection cards */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.href}
              className="group relative overflow-hidden aspect-[4/5] block"
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/40 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary-foreground mb-2">
                  {card.label}
                </h2>
                <p className="text-sm text-primary-foreground/75 font-body">{card.description}</p>
                <span className="mt-4 inline-block text-xs font-semibold tracking-widest uppercase text-primary-foreground border-b border-primary-foreground/60 pb-0.5 group-hover:border-primary-foreground transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GenderLanding;
