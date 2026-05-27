const fs = require('fs');
let content = fs.readFileSync('components/AdminDashboard.jsx', 'utf8');

content = content.replace(
  'import AdminSection3 from "./AdminSection3";',
  'import AdminSection3 from "./AdminSection3";\nimport AdminSection2 from "./AdminSection2";\nimport AdminSection4 from "./AdminSection4";'
);

// We want to replace the hardcoded sections 2, 4, 5
const p1 = content.split('{/* 1.4 Section 2 */}');
const p2 = p1[1].split('{/* 1.5 Section 3 */}');
const p3 = p2[1].split('{/* 1.6 Section 4 */}');
const p4 = p3[1].split('{/* 1.7 Section 5 */}');
const p5 = p4[1].split('</div>\n        )}'); // This separates the end of Section 5 from the closing tags of the home tab

// Construct the new content
const newContent = 
  p1[0] + 
  `{/* 1.4 Section 2 */}
            <AdminSection2 
              expanded={expandedSubsections.home_section2} 
              onToggle={() => toggleSubsection("home_section2")} 
            />

            {/* 1.5 Section 3 */}` + 
  p2[1].split('{/* 1.6 Section 4 */}')[0] + 
  `{/* 1.6 Section 4 */}
            <AdminSection4 
              expanded={expandedSubsections.home_section4} 
              onToggle={() => toggleSubsection("home_section4")} 
            />

          </div>
        )}` + p5.slice(1).join('</div>\n        )}'); // Note: p5[0] contains section 5, which we discard.

fs.writeFileSync('components/AdminDashboard.jsx', newContent, 'utf8');
console.log("Updated AdminDashboard.jsx");
