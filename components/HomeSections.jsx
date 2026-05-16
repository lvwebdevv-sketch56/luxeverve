import './HomeSections.css';

const HomeSections = () => {
  return (
    <div className="home-sections-wrapper">

      {/* Section 1: Text Left, Video Right */}
      <section className="home-section">
        <div className="container home-section-container">
          <div className="home-section-content left-content">
            <h2 className="section-heading">An Expression of Luxury Door Design, Quality, and Craftsmanship</h2>
            <div className="section-text">
              <p>
                Our presence at a leading industry event reflects a convergence of craftsmanship, innovation, and modern design. Engaging with architects, designers, and industry experts, we explored contemporary design trends, premium materials, and refined finishes that define high-quality architectural solutions.
              </p>
              <p>
                Our participation in curated trade shows and design exhibitions reflects our commitment to engineered wood solutions, durable materials, and precision craftsmanship for both residential and commercial spaces. Staying closely aligned with evolving design sensibilities allows us to create architectural products that balance elegance, performance, and longevity.
              </p>
              <p>
                Through meaningful industry engagement, we continue to refine our vision and deliver timeless, performance-driven solutions shaped by quality, innovation, and design excellence.
              </p>
            </div>
            <a href="/about" className="section-link">GET TO KNOW MORE ABOUT PREMIUM CRAFTSMANSHIP</a>
          </div>
          <div className="home-section-media right-media">
            <video className="static-media" controls poster="/images/luxury_doors_landing_page_scrolled_1776845139099.png">
              <source src="/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Section 2: Image Left, Text Right */}
      <section className="home-section bg-alt">
        <div className="container home-section-container reverse-mobile">
          <div className="home-section-media left-media hover-3d-wrapper">
            <img src="/images/luxury_storefront_1776848163085.png" alt="Luxe Verve Storefront" className="static-media hover-3d" />
          </div>
          <div className="home-section-content right-content">
            <h2 className="section-heading">Personal Note</h2>
            <div className="section-text">
              <p>
                At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors.
              </p>
              <p>
                Every Luxe-Verve door is custom-crafted to deliver modern aesthetics, architectural precision, and refined luxury. Designed for high-end residences and premium spaces, our doors ensure your entrance stands apart with a bold, sophisticated identity—reflecting contemporary living, timeless design, and elevated craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Text Left, Video Right */}
      <section className="home-section">
        <div className="container home-section-container">
          <div className="home-section-content left-content">
            <h2 className="section-heading">The Art of Luxury Entrance Doors</h2>
            <div className="section-text">
              <p>
                Discover doors conceived for those who value distinction, precision, and enduring design. Crafted with meticulous attention to detail, each luxury entrance door is thoughtfully engineered to balance strength, elegance, and performance. From refined proportions to flawless finishes, every element is designed to elevate architectural character while ensuring lasting durability.
              </p>
              <p>
                Rooted in modern design sensibilities, our designer doors are created using premium materials and advanced engineered wood solutions, ensuring stability, resilience, and timeless appeal. Carefully curated surfaces, textures, and finishes allow our doors to complement both contemporary and classic interiors, making them ideal for high-end residential and sophisticated commercial spaces.
              </p>
              <p>
                More than architectural products, our doors serve as defining statements—enhancing entrances with quiet luxury and purposeful design. Each piece reflects superior craftsmanship, structural integrity, and a deep understanding of architectural form and function.
              </p>
            </div>
          </div>
          <div className="home-section-media right-media">
            <video className="static-media" controls poster="/images/door_grand_pivot_1776844794720.png">
              <source src="/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Section 4: Luxe Details Header */}
      <section className="home-section luxe-details-header">
        <div className="container" style={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="Luxe Verve Logo" className="luxe-header-logo" />
          <h2 className="luxe-header-title">The Luxe Details</h2>
        </div>
      </section>

      {/* Section 5: Luxe Details Grid */}
      <section className="home-section luxe-details-grid-section">
        <div className="container luxe-grid">

          {/* Column 1: Bordered Contact Box */}
          <div className="luxe-grid-col luxe-contact-box">
            <h3 className="luxe-col-heading">Begin Your Luxe-Verve Luxury Door Experience</h3>
            <p className="luxe-col-text">
              We invite you to experience refined craftsmanship and personalized design guidance. Our team is dedicated to understanding your vision and delivering bespoke luxury door solutions that reflect elegance, architectural precision, and enduring quality.
            </p>
            <ul className="luxe-contact-list">
              <li>
                <span className="icon">📍</span>
                <span>ADDRESS: Block A, 22 Sector-9 Noida, Uttar Pradesh.</span>
              </li>
              <li>
                <span className="icon">📞</span>
                <span>PHONE: +91-98714 71161</span>
              </li>
              <li>
                <span className="icon">✉️</span>
                <span>EMAIL: info@luxe-verve.com</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Legacy */}
          <div className="luxe-grid-col">
            <h3 className="luxe-col-heading">A Legacy of Luxury Door Craftsmanship</h3>
            <div className="luxe-divider"></div>
            <p className="luxe-col-text">
              Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles. Every luxury door reflects our commitment to premium materials, meticulous detailing, and uncompromising quality standards.
            </p>
          </div>

          {/* Column 3: Architectural Intelligence */}
          <div className="luxe-grid-col">
            <h3 className="luxe-col-heading">Architectural Intelligence in Luxury Door Design</h3>
            <div className="luxe-divider"></div>
            <p className="luxe-col-text">
              Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design—ensuring our luxury doors perform flawlessly while elevating the character of every space they define.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeSections;
