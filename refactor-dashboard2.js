const fs = require('fs');

let oldContent = fs.readFileSync('AdminDashboard_backup.jsx', 'utf8');

// Replace imports
oldContent = oldContent.replace(
  'import AdminSection3 from "./AdminSection3";',
  'import AdminSection3 from "./AdminSection3";\nimport AdminSection2 from "./AdminSection2";\nimport AdminSection4 from "./AdminSection4";'
);

const parts = oldContent.split('{/* Tab 2: Collection Page Subsections */}');
const beforeTab2 = parts[0];
const tab2Onward = '{/* Tab 2: Collection Page Subsections */}' + parts[1];

const p1 = beforeTab2.split('{/* 1.4 Section 2 */}');
const p2 = p1[1].split('{/* 1.5 Section 3 */}');
const p3 = p2[1].split('{/* 1.6 Section 4 */}');

// We just take p1[0], then insert the new Section 2, then Section 3 (which is p2[1].split('{/* 1.6 Section 4 */}')[0]), then Section 4.
// Then we just close the div and add tab2Onward!

const section3Code = p2[1].split('{/* 1.6 Section 4 */}')[0];

const newContent = 
  p1[0] + 
  `{/* 1.4 Section 2 */}
            <AdminSection2 
              expanded={expandedSubsections.home_section2} 
              onToggle={() => toggleSubsection("home_section2")} 
            />

            {/* 1.5 Section 3 */}` + 
  section3Code + 
  `{/* 1.6 Section 4 */}
            <AdminSection4 
              expanded={expandedSubsections.home_section4} 
              onToggle={() => toggleSubsection("home_section4")} 
            />

          </div>
        )}

        ` + tab2Onward;

fs.writeFileSync('components/AdminDashboard.jsx', newContent, 'utf8');
console.log("Restored and updated AdminDashboard.jsx");
