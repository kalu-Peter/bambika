const Footer = () => {
  return (
    <footer className="bg-stone-900 py-16 px-6 border-t border-stone-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-semibold text-stone-50 mb-1">Bambika Designs</h3>
          <span className="inline-block w-8 h-0.5 bg-amber-500 mb-3" />
          <p className="text-sm text-amber-400 font-body italic mb-2">Kujibamba ni everyday</p>
          <p className="text-sm text-stone-400 font-body leading-relaxed">
            Your ultimate fashion plug 🔌 — clothing, shoes &amp; bags since 2020.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 font-body">Shop</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">New Arrivals</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Clothing</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Shoes</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Bags</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 font-body">Help</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Shipping</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Returns</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Size Guide</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 font-body">Follow</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Instagram</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">Pinterest</a></li>
            <li><a href="#" className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-body">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-700 text-center">
        <p className="text-xs text-stone-500 font-body">
          © 2026 Bambika Designs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
