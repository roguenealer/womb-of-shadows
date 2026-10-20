/* Outbound reading interest only. An Amazon click is never a confirmed sale. */
(function () {
    'use strict';
    var editions = {
        B0HJBRHK89: { book: 'womb-of-shadows', format: 'kindle' },
        B0HJBP416M: { book: 'womb-of-shadows', format: 'paperback' },
        B0HJBM15NW: { book: 'womb-of-shadows', format: 'hardcover' },
        B0HJBS8TWX: { book: 'the-frequency', format: 'kindle' },
        B0HJBMNSQB: { book: 'the-frequency', format: 'paperback' },
        B0HJC25573: { book: 'the-frequency', format: 'hardcover' }
    };
    document.addEventListener('click', function (event) {
        var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
        if (!link || typeof window.gtag !== 'function') return;
        var url;
        try { url = new URL(link.getAttribute('href'), window.location.href); }
        catch (_) { return; }
        if (!/^(www\.)?amazon\.com$/.test(url.hostname)) return;
        var match = url.pathname.match(/\/dp\/([A-Z0-9]{10})(?:\/|$)/i);
        var asin = match && match[1].toUpperCase();
        var edition = asin && editions[asin];
        if (!edition) return;
        var section = link.closest('section, nav, footer');
        var intent = link.getAttribute('data-intent') || (/sample/i.test(link.textContent) ? 'sample' : 'purchase');
        try {
            window.gtag('event', 'book_store_click', {
                book_id: edition.book,
                asin: asin,
                format: edition.format,
                intent: intent,
                placement: link.getAttribute('data-placement') || (section && section.id) || 'page',
                page_path: window.location.pathname,
                link_url: url.href,
                measurement_version: 'storefront-2026-10-20',
                transport_type: 'beacon'
            });
        } catch (_) { /* Analytics failure must not interrupt normal navigation. */ }
    });
}());
