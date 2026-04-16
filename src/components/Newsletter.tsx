const Newsletter = () => {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Stay in the Loop
        </h2>
        <p className="text-muted-foreground font-body mb-8">
          Subscribe for early access to new arrivals, exclusive offers, and style inspiration.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-background border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
