const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Bambika Designs</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Curating timeless fashion for the modern individual since 2020.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4 font-body">Shop</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">New Arrivals</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Clothing</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Shoes</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Bags</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4 font-body">Help</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Shipping</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Returns</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Size Guide</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4 font-body">Follow</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Instagram</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Pinterest</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground font-body">
          © 2026 Bambika Designs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
