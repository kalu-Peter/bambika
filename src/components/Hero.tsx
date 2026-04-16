import heroImage from "@/assets/hero-fashion.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion collection featuring clothing, bags and shoes"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-up">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-amber-400 font-body font-medium">
          Spring / Summer 2026
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 text-stone-50 leading-tight">
          Timeless Elegance,<br />Modern Spirit
        </h1>
        <p className="text-base md:text-lg mb-8 text-stone-300 font-light max-w-xl mx-auto font-body">
          Discover our curated collection of clothing, shoes, and bags crafted for the modern individual.
        </p>
        <a
          href="#collection"
          className="inline-block bg-amber-500 text-stone-900 px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-all duration-300"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
};

export default Hero;
