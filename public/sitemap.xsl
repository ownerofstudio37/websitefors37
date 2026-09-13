<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Studio37 Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          :root {
            color-scheme: light;
            --ink: #171717;
            --muted: #615b54;
            --line: #e7e0d7;
            --paper: #fffaf4;
            --brand: #bc5a00;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--ink);
            background: #f8f5f1;
          }
          header {
            padding: 48px 5vw 42px;
            color: #fff;
            background: #0f0b08;
          }
          h1 {
            margin: 0 0 12px;
            font-size: clamp(32px, 5vw, 56px);
            line-height: 1;
            letter-spacing: 0;
          }
          p {
            max-width: 760px;
            margin: 0;
            color: rgba(255,255,255,.76);
            font-size: 18px;
            line-height: 1.6;
          }
          main {
            width: min(1180px, calc(100% - 32px));
            margin: -22px auto 56px;
            border: 1px solid var(--line);
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 18px 60px rgba(20, 15, 10, .08);
          }
          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
            padding: 18px 24px;
            border-bottom: 1px solid var(--line);
            background: var(--paper);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            min-height: 34px;
            padding: 7px 12px;
            border: 1px solid #efcf8b;
            border-radius: 999px;
            color: #884107;
            background: #fff8e8;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .12em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 18px 24px;
            border-bottom: 1px solid var(--line);
            text-align: left;
            vertical-align: top;
          }
          th {
            color: var(--muted);
            background: #fff;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: .08em;
          }
          tr:nth-child(even) td { background: #fffdf9; }
          a {
            color: var(--brand);
            font-weight: 700;
            text-decoration: none;
            overflow-wrap: anywhere;
          }
          a:hover { text-decoration: underline; }
          .count {
            color: var(--muted);
            font-weight: 700;
          }
          @media (max-width: 760px) {
            header { padding: 36px 20px 34px; }
            main { width: calc(100% - 20px); margin-top: -14px; }
            th, td { padding: 14px 12px; font-size: 14px; }
            th:nth-child(3), td:nth-child(3), th:nth-child(4), td:nth-child(4) { display: none; }
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Studio37 Sitemap</h1>
          <p>This XML sitemap is built for search engines. The table below is only a browser-friendly preview of the same crawlable data.</p>
        </header>
        <main>
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <div class="meta">
                <span class="badge">Sitemap Index</span>
                <span class="count"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)" /> sitemap files</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
                      <td><xsl:value-of select="sitemap:lastmod" /></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
            <xsl:otherwise>
              <div class="meta">
                <span class="badge">URL Sitemap</span>
                <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> indexed URLs</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Last Updated</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
                      <td><xsl:value-of select="sitemap:lastmod" /></td>
                      <td><xsl:value-of select="sitemap:changefreq" /></td>
                      <td><xsl:value-of select="sitemap:priority" /></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
