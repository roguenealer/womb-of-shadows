/* The printed sample works without scripts. Only native campaign URLs are used. */
(function () {
    'use strict';
    const kindle = 'https://www.amazon.com/dp/B0HJBS8TWX';
    const fromGloss = new URLSearchParams(location.search).get('utm_source') === 'the-gloss-book-club';
    const destination = fromGloss
        ? 'https://www.amazon.com/dp/B0HJBS8TWX?maas=maas_adg_0F1218277A1881D703F244081353F690_afap_abs&ref_=aa_maas&tag=maas'
        : 'https://www.amazon.com/dp/B0HJBS8TWX?maas=maas_adg_F9F01D394EA8506BD37765C0448ECB5F_afap_abs&ref_=aa_maas&tag=maas';
    document.querySelectorAll('a[href="' + kindle + '"]').forEach(link => {
        link.href = destination;
    });

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
                    sample_source: fromGloss ? 'the-gloss-book-club' : 'website',
                    page_path: location.pathname
                });
            }, 2000);
        }
    }
    document.addEventListener('visibilitychange', updateTimer);
    observer.observe(passage);
}());
