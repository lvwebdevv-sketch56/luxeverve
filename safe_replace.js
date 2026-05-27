const fs = require('fs');
let content = fs.readFileSync('components/AdminDashboard.jsx', 'utf8');

// Replace imports
content = content.replace(
  'import AdminSection3 from "./AdminSection3";',
  'import AdminSection3 from "./AdminSection3";\nimport AdminSection2 from "./AdminSection2";\nimport AdminSection4 from "./AdminSection4";'
);

const sec2Old = `            {/* 1.4 Section 2 */}
            <div className={\`subsection-card \${expandedSubsections.home_section2 ? "open" : ""}\`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section2")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">04</span>
                  <span className="subsection-title">Section 2: Image Left, Text Right</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section2 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label">Section Heading</label>
                      <input type="text" className="text-input" defaultValue="Personal Note" />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Body Text paragraph</label>
                      <textarea className="text-input textarea-input" defaultValue="At Luxe-Verve, we design exclusive luxury architect doors that move beyond conventional or standard door solutions. Each door is conceived with a distinct design philosophy, using carefully selected premium materials that set our work apart from ordinary wooden or mass-produced doors." />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Upload Showcase Image</label>
                      <div className="media-upload-zone">
                        <span className="upload-icon">🖼️</span>
                        <span className="upload-text">Select or drag storefront showcase image</span>
                        <span className="upload-subtext">Recommended: JPG, PNG, WEBP (ratio 16:10 or 4:3)</span>
                      </div>
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>`;

const sec2New = `            {/* 1.4 Section 2 */}
            <AdminSection2 
              expanded={expandedSubsections.home_section2} 
              onToggle={() => toggleSubsection("home_section2")} 
            />`;

content = content.replace(sec2Old, sec2New);

const sec45Old = `            {/* 1.6 Section 4 */}
            <div className={\`subsection-card \${expandedSubsections.home_section4 ? "open" : ""}\`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section4")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">06</span>
                  <span className="subsection-title">Section 4: Luxe Details Logo and Header</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section4 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label">Brand Logo Image (Asset)</label>
                      <input type="text" className="text-input" defaultValue="/images/logo.png" />
                    </div>
                    <div className="input-group form-full-width">
                      <label className="input-label">Upload New Logo to Cloudinary</label>
                      <div className="media-upload-zone">
                        <span className="upload-icon">💠</span>
                        <span className="upload-text">Upload new PNG / SVG logo</span>
                      </div>
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>

            {/* 1.7 Section 5 */}
            <div className={\`subsection-card \${expandedSubsections.home_section5 ? "open" : ""}\`}>
              <div className="subsection-header" onClick={() => toggleSubsection("home_section5")}>
                <div className="subsection-title-box">
                  <span className="subsection-number">07</span>
                  <span className="subsection-title">Section 5: Luxe Details Grid</span>
                </div>
                <span className="subsection-arrow">▼</span>
              </div>
              {expandedSubsections.home_section5 && (
                <div className="subsection-body">
                  <div className="form-grid">
                    <div className="input-group form-full-width">
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 1: Contact Information Box</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Heading</label>
                      <input type="text" className="text-input" defaultValue="Begin Your Luxe-Verve Luxury Door Experience" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Physical Address</label>
                      <input type="text" className="text-input" defaultValue="Block A, 22 Sector-9 Noida, Uttar Pradesh." />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Phone</label>
                      <input type="text" className="text-input" defaultValue="+91-98714 71161" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Contact Email</label>
                      <input type="text" className="text-input" defaultValue="info@luxe-verve.com" />
                    </div>

                    <div className="input-group form-full-width" style={{ borderTop: "1px solid rgba(216,199,180,0.1)", paddingTop: "20px" }}>
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 2: Legacy Statement</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Legacy Heading</label>
                      <input type="text" className="text-input" defaultValue="A Legacy of Luxury Door Craftsmanship" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Legacy Statement Text</label>
                      <textarea className="text-input textarea-input" defaultValue="Backed by years of industry expertise, Luxe-Verve blends advanced engineering with timeless design principles." />
                    </div>

                    <div className="input-group form-full-width" style={{ borderTop: "1px solid rgba(216,199,180,0.1)", paddingTop: "20px" }}>
                      <label className="input-label" style={{ color: "#ebdcb9", fontSize: "0.9rem" }}>Column 3: Architectural Intelligence</label>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Intelligence Heading</label>
                      <input type="text" className="text-input" defaultValue="Architectural Intelligence in Luxury Door Design" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Intelligence Statement Text</label>
                      <textarea className="text-input textarea-input" defaultValue="Our expertise is shaped by continuous innovation, refined processes, and a deep understanding of architectural design." />
                    </div>
                  </div>
                  <div className="subsection-actions">
                    <button className="btn-primary">Save changes</button>
                  </div>
                </div>
              )}
            </div>`;

const sec45New = `            {/* 1.6 Section 4 */}
            <AdminSection4 
              expanded={expandedSubsections.home_section4} 
              onToggle={() => toggleSubsection("home_section4")} 
            />`;

content = content.replace(sec45Old, sec45New);

fs.writeFileSync('components/AdminDashboard.jsx', content, 'utf8');
console.log("Safely updated AdminDashboard.jsx");
