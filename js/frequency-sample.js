/* The printed sample works without scripts. Only native campaign URLs are used. */
(function () {
    'use strict';
    const params = new URLSearchParams(location.search);
    const fromGloss = params.get('utm_source') === 'the-gloss-book-club';
    const fromTikTokExcerpt = params.get('utm_source') === 'tiktok'
        && params.get('utm_medium') === 'organic_social'
        && params.get('utm_campaign') === 'frequency-excerpts'
        && params.get('utm_content') === 'while-he-talked';
    let source = 'website';
    if (fromGloss) source = 'gloss';
    if (fromTikTokExcerpt) source = 'tiktok';
    const tagsByEdition = {
        B0HJBS8TWX: { // Kindle
            website: 'maas_adg_F9F01D394EA8506BD37765C0448ECB5F_afap_abs',
            gloss: 'maas_adg_0F1218277A1881D703F244081353F690_afap_abs',
            tiktok: 'maas_adg_E65FC4FF901AC405F854528A69BC2C4E_afap_abs'
        },
        B0HJBMNSQB: { // Paperback
            website: 'maas_adg_78A0ACF3574F631920B4A6AD171662AF_afap_abs',
            gloss: 'maas_adg_1F6D31988EAA08AED1722651D074AD0E_afap_abs',
            tiktok: 'maas_adg_6196D9A1EFD80C98A01DF8326B83B5FC_afap_abs'
        },
        B0HJC25573: { // Hardcover
            website: 'maas_adg_E61DF5690831A8154C914506E66F4F64_afap_abs',
            gloss: 'maas_adg_DB78B384E741C70FF3C53F65EA741F78_afap_abs',
            tiktok: 'maas_adg_74F230E40813592FAE32DD6EB636FFE5_afap_abs'
        }
    };
    Object.entries(tagsByEdition).forEach(([asin, tags]) => {
        const base = 'https://www.amazon.com/dp/' + asin;
        const destination = base + '?maas=' + tags[source] + '&ref_=aa_maas&tag=maas';
        document.querySelectorAll('a[href="' + base + '"]').forEach(link => {
            link.href = destination;
        });
    });

    if (fromTikTokExcerpt && typeof window.gtag === 'function') {
        window.gtag('set', { sample_source: 'tiktok', sample_post: 'while-he-talked' });
    }
    const passage = document.querySelector('#frequency-sample blockquote');
    if (!passage || !window.IntersectionObserver || typeof window.gtag !== 'function') return;

    let inView = false;
    let timer;
    const observer = new IntersectionObserver(entries => {
        inView = entries[entries.length - 1].intersectionRatio >= 0.5;
        updateTimer();
    }, { threshold: 0.5 });

    function updateTimer() {
        clearTimeout(timer);
        if (inView && document.visibilityState === 'visible') {
            timer = setTimeout(() => {
                if (document.visibilityState !== 'visible') return;
                observer.disconnect();
                document.removeEventListener('visibilitychange', updateTimer);
                window.gtag('event', 'book_sample_view', {
                    book_id: 'the-frequency',
                    sample_id: 'the-long-quiet-cleared',
                    sample_source: fromGloss ? 'the-gloss-book-club' : source,
                    page_path: location.pathname
                });
            }, 2000);
        }
    }
    document.addEventListener('visibilitychange', updateTimer);
    observer.observe(passage);
}());
