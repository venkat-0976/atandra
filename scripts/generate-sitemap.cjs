// scripts/generate-sitemap.cjs
const fs = require('fs');
const path = require('path');

// Read pages.json from seo folder
const pagesPath = path.join(__dirname, '..', 'seo', 'pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

// Escape XML special characters
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

function buildSitemap(pages) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    const footer = `</urlset>`;

    const body = pages.map(p => {
        const loc = escapeXml(p.loc);
        const lastmod = p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>\n` : '';
        const changefreq = p.changefreq ? `    <changefreq>${p.changefreq}</changefreq>\n` : '';
        const priority = p.priority ? `    <priority>${p.priority}</priority>\n` : '';

        return `  <url>\n    <loc>${loc}</loc>\n${lastmod}${changefreq}${priority}  </url>`;
    }).join('\n');

    return header + body + '\n' + footer;
}

// Generate sitemap
const xml = buildSitemap(pages);

// Write to public folder
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`   Location: ${outputPath}`);
console.log(`   Total URLs: ${pages.length}`);

