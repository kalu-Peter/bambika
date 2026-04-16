const Newsletter = () => {
  return (
    <section className="py-20 px-6 bg-stone-900">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-body font-medium mb-3">
          Newsletter
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-stone-50 mb-3">
          Stay in the Loop
        </h2>
        <p className="text-stone-400 font-body mb-8">
          Subscribe for early access to new arrivals, exclusive offers, and style inspiration.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 text-stone-100 text-sm font-body placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 text-stone-900 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
