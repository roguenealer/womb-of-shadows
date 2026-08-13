"""Generate 'books like X' recommendation capture pages for roguenealer.github.io/womb-of-shadows/books-like/.

Each page is a genuine recommendation list for readers of a comp title, with
Womb of Shadows featured as the lead pick. Static HTML, no build deps.
"""
import html
from pathlib import Path

ROOT = Path(r"C:\Users\rogue\projects\womb-of-shadows")
OUT = ROOT / "books-like"
OUT.mkdir(exist_ok=True)

SITE = "https://roguenealer.github.io/womb-of-shadows"
AMAZON = "https://www.amazon.com/dp/B0D6WY16L7"

FEATURED = {
    "title": "Womb of Shadows",
    "series": "Gods of the New Age, Book One",
    "author": "Peter Neal",
    "cover": "../images/cover.jpg",
    "pitch": ("A geneticist signs away her life to save her daughter, and the cure becomes a "
              "black-site bioweapon that kills by manufacturing love. Literary dread, biological "
              "wrongness, and a found family that starts to feel like a trap — told in a calm, "
              "institutional voice that makes the unthinkable read ordinary."),
    "cta": "Free on Kindle Unlimited",
}

PAGES = {
    "annihilation": {
        "source": "Annihilation",
        "source_author": "Jeff VanderMeer",
        "title": "7 Books Like Annihilation to Read Next (2026)",
        "desc": ("Finished Annihilation and want more ecological dread, quiet escalation, and "
                 "biological wrongness? These are the closest reads — starting with Womb of Shadows by Peter Neal."),
        "why": ("If what stayed with you was the slow, clinical unraveling — a landscape that rewrites "
                "the people inside it, and prose that never raises its voice — start here."),
        "books": [
            ("The Fisherman", "John Langan",
             "Grief as bait. Cosmic horror wrapped in quiet literary prose; the closest tonal cousin to the Southern Reach."),
            ("The Beauty", "Aliya Whiteley",
             "A fungal communion remakes a community of men. Biological transformation told with unsettling calm."),
            ("The Luminous Dead", "Caitlin Starling",
             "A cave, a voice on the radio, and the suspicion that the mission is the monster. Claustrophobic and slow-burning."),
            ("Roadside Picnic", "Arkady & Boris Strugatsky",
             "The original 'zone' novel — an alien visitation understood only through what it leaves behind."),
            ("Mexican Gothic", "Silvia Moreno-Garcia",
             "A house that wants to incorporate you. Gothic flesh-and-fungus horror with a poised surface."),
            ("The Cipher", "Kathe Koja",
             "A hole in an apartment floor that changes what it touches. Raw, 90s, and genuinely strange."),
        ],
    },
    "tender-is-the-flesh": {
        "source": "Tender Is the Flesh",
        "source_author": "Agustina Bazterrica",
        "title": "7 Books Like Tender Is the Flesh (Moral Dystopias That Stay With You)",
        "desc": ("Looking for books like Tender Is the Flesh? Institutional horror, ordinary language around "
                 "the unthinkable, and moral rot played straight — led by Womb of Shadows by Peter Neal."),
        "why": ("Bazterrica's power is normalization: paperwork and procedure wrapped around atrocity. "
                "These books work the same nerve."),
        "books": [
            ("The Unit", "Ninni Holmqvist",
             "The state collects its 'dispensables' for organ donation, and everyone is polite about it. Devastatingly calm."),
            ("The Vegetarian", "Han Kang",
             "A woman refuses meat, then refuses the human order itself. Body autonomy as quiet horror."),
            ("The School for Good Mothers", "Jessamine Chan",
             "A government reform program for mothers, administered with total bureaucratic serenity."),
            ("The Farm", "Joanne Ramos",
             "Luxury surrogacy as a labor camp. The free market's gentle voice applied to the body."),
            ("Severance", "Ling Ma",
             "Millennial dread literalized as a pandemic; capitalism's routines survive the apocalypse."),
            ("The Grace Year", "Kim Liggett",
             "A society exports its sixteen-year-old girls to burn off their 'magic.' Institutional cruelty, ritualized."),
        ],
    },
    "bird-box": {
        "source": "Bird Box",
        "source_author": "Josh Malerman",
        "title": "7 Books Like Bird Box (Dread You Can't Look Away From)",
        "desc": ("Books like Bird Box for readers who want survival horror built on perception, silence, and "
                 "the things you can't look at. Womb of Shadows by Peter Neal leads the list."),
        "why": ("Malerman's trick was making the unseen lethal. These books all turn perception itself "
                "into the threat."),
        "books": [
            ("The Road", "Cormac McCarthy",
             "The benchmark for parental dread in a dead world — tenderness as the last resource."),
            ("The Cabin at the End of the World", "Paul Tremblay",
             "A family, four strangers, and an impossible demand. Intimate apocalypse in one room."),
            ("The Troop", "Nick Cutter",
             "A scout troop, an island, and a hunger that spreads. Body horror with real momentum."),
            ("The Deep", "Nick Cutter",
             "A miracle cure waits at the bottom of the ocean. So does everything else."),
            ("Malorie", "Josh Malerman",
             "The Bird Box sequel — worth it if you want to stay in Malerman's world specifically."),
            ("In the House in the Dark of the Woods", "Laird Hunt",
             "Fairy-tale dread in the colonial woods; what you can't see organizes what you can."),
        ],
    },
    "the-fisherman": {
        "source": "The Fisherman",
        "source_author": "John Langan",
        "title": "7 Books Like The Fisherman (Literary Cosmic Horror)",
        "desc": ("Books like The Fisherman — grief, myth, and deep-time horror in careful prose. "
                 "Womb of Shadows by Peter Neal is the lead pick."),
        "why": ("Langan proved cosmic horror hits hardest when it's about loss first and monsters second. "
                "Same rule here."),
        "books": [
            ("The Worm and His Kings", "Hailey Piper",
             "A missing lover, a tunnel cult, and a goddess under the city. Cosmic scale, human wound."),
            ("Experimental Film", "Gemma Files",
             "A film critic, a lost silent movie, and a presence that wants to be seen. Dense and rewarding."),
            ("The Pallbearers Club", "Paul Tremblay",
             "A memoir that might be a haunting. Tremblay at his most formally playful."),
            ("The Ruins", "Scott Smith",
             "Vacationers, a vine, and no way off the hill. Relentless biological dread."),
            ("The Troop", "Nick Cutter",
             "Scoutmasters and parasites — the fastest read on this list, and the cruelest."),
            ("A Song for Quiet", "Tananarive Due",
             "Blues musicians and eldritch recruitment in the Jim Crow South. Short and perfect."),
        ],
    },
}

CSS = """
:root{--bg:#07080a;--gold:#b08d57;--cream:#e8e2d8;--muted:#968f86;--card:#0e1013;--line:#2a2724}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--cream);font-family:Inter,system-ui,sans-serif;line-height:1.65;padding-bottom:60px}
h1,h2,h3,.serif{font-family:'Cormorant Garamond',Georgia,serif}
.wrap{max-width:860px;margin:0 auto;padding:0 22px}
nav{padding:22px 0;border-bottom:1px solid var(--line)}
nav a{color:var(--muted);text-decoration:none;font-size:14px;letter-spacing:.08em;text-transform:uppercase}
nav a:hover{color:var(--gold)}
header.hero{padding:64px 0 40px;text-align:center}
.eyebrow{color:var(--muted);letter-spacing:.28em;text-transform:uppercase;font-size:12px}
h1{font-size:clamp(30px,5vw,46px);font-weight:600;margin:14px 0 16px}
.sub{color:var(--muted);max-width:640px;margin:0 auto;font-size:16px}
.featured{display:flex;gap:28px;background:var(--card);border:1px solid var(--gold);border-radius:10px;padding:28px;margin:44px 0;align-items:center}
.featured img{width:170px;border-radius:4px;box-shadow:0 10px 40px rgba(0,0,0,.6)}
.featured .tag{color:var(--gold);letter-spacing:.2em;text-transform:uppercase;font-size:11px}
.featured h2{font-size:30px;margin:6px 0 4px}
.featured .by{color:var(--muted);font-size:14px;margin-bottom:12px}
.featured p{font-size:15px;color:#cfc9bf}
.cta{display:inline-block;margin-top:16px;background:var(--gold);color:#0a0a0a;text-decoration:none;padding:11px 22px;border-radius:6px;font-weight:600;font-size:14px}
.cta2{display:inline-block;margin-top:16px;margin-left:10px;color:var(--gold);text-decoration:none;padding:11px 18px;border:1px solid var(--gold);border-radius:6px;font-size:14px}
ol.list{counter-reset:item;list-style:none;margin:20px 0 40px}
ol.list li{counter-increment:item;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:20px 22px;margin-bottom:14px;position:relative;padding-left:64px}
ol.list li::before{content:counter(item,decimal-leading-zero);position:absolute;left:20px;top:20px;font-family:'Cormorant Garamond',serif;color:var(--gold);font-size:22px}
ol.list h3{font-size:22px;margin-bottom:2px}
ol.list .auth{color:var(--muted);font-size:13px;margin-bottom:8px}
ol.list p{font-size:14.5px;color:#cfc9bf}
footer{border-top:1px solid var(--line);margin-top:50px;padding-top:26px;color:var(--muted);font-size:13px}
footer a{color:var(--gold);text-decoration:none}
.more{margin-top:34px}
.more a{color:var(--gold);text-decoration:none;font-size:14.5px}
.more a:hover{text-decoration:underline}
@media(max-width:640px){.featured{flex-direction:column;text-align:center}}
"""


def esc(s):
    return html.escape(s, quote=True)


def page(slug, cfg):
    others = [(s, c) for s, c in PAGES.items() if s != slug]
    items = "\n".join(
        f'      <li><h3>{esc(t)}</h3><div class="auth">{esc(a)}</div><p>{esc(n)}</p></li>'
        for t, a, n in cfg["books"])
    more = "\n".join(
        f'      <p class="more">→ <a href="{SITE}/books-like/{s}.html">Books like {esc(c["source"])}</a></p>'
        for s, c in others)
    itemlist = ",".join(
        '{"@type":"ListItem","position":%d,"item":{"@type":"Book","name":%s,"author":{"@type":"Person","name":%s}}}'
        % (i + 2, json_str(t), json_str(a))
        for i, (t, a, n) in enumerate(cfg["books"]))
    jsonld = (
        '{"@context":"https://schema.org","@type":"ItemList","name":%s,"itemListElement":['
        '{"@type":"ListItem","position":1,"item":{"@type":"Book","name":"Womb of Shadows","author":{"@type":"Person","name":"Peter Neal"},"url":"%s/"}},'
        "%s]}" % (json_str(cfg["title"]), SITE, itemlist))
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(cfg["title"])}</title>
<meta name="description" content="{esc(cfg["desc"])}">
<link rel="canonical" href="{SITE}/books-like/{slug}.html">
<meta property="og:title" content="{esc(cfg["title"])}">
<meta property="og:description" content="{esc(cfg["desc"])}">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE}/books-like/{slug}.html">
<meta property="og:image" content="{SITE}/images/cover.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>{CSS}</style>
<script type="application/ld+json">{jsonld}</script>
</head>
<body>
<nav><div class="wrap"><a href="{SITE}/">← Womb of Shadows — main site</a></div></nav>
<header class="hero"><div class="wrap">
  <div class="eyebrow">If you loved {esc(cfg["source"])} by {esc(cfg["source_author"])}</div>
  <h1>{esc(cfg["title"])}</h1>
  <p class="sub">{esc(cfg["why"])}</p>
</div></header>
<main class="wrap">
  <section class="featured">
    <img src="{FEATURED["cover"]}" alt="Womb of Shadows book cover">
    <div>
      <div class="tag">Start here — the closest match</div>
      <h2 class="serif">{esc(FEATURED["title"])}</h2>
      <div class="by">{esc(FEATURED["series"])} · {esc(FEATURED["author"])}</div>
      <p>{esc(FEATURED["pitch"])}</p>
      <a class="cta" href="{AMAZON}" rel="noopener">Read it on Amazon — {esc(FEATURED["cta"])}</a>
    </div>
  </section>
  <h2 class="serif" style="font-size:26px;margin-bottom:14px">Then keep going:</h2>
  <ol class="list">
{items}
  </ol>
  <p style="color:var(--muted);font-size:14px">Book Two, <em>The Frequency</em>, releases August 18, 2026 —
  Womb of Shadows is the catch-up read.</p>
{more}
</main>
<footer><div class="wrap">
  <p>© 2026 Peter Neal · <a href="{SITE}/">Womb of Shadows</a> ·
  <a href="{SITE}/books-like/">More recommendations</a></p>
</div></footer>
</body>
</html>
"""


def json_str(s):
    import json
    return json.dumps(s)


def hub():
    cards = "\n".join(
        f'      <li><h3><a href="{SITE}/books-like/{s}.html" style="color:inherit;text-decoration:none">Books like {esc(c["source"])}</a></h3>'
        f'<div class="auth">{esc(c["source_author"])}</div><p>{esc(c["why"])}</p></li>'
        for s, c in PAGES.items())
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What to Read After the Books That Broke You — Recommendations from Peter Neal</title>
<meta name="description" content="Recommendation lists for readers of Annihilation, Tender Is the Flesh, Bird Box, and The Fisherman — from Peter Neal, author of Womb of Shadows.">
<link rel="canonical" href="{SITE}/books-like/">
<meta property="og:title" content="Dark reads, recommended honestly">
<meta property="og:description" content="Recommendation lists for readers of Annihilation, Tender Is the Flesh, Bird Box, and The Fisherman.">
<meta property="og:url" content="{SITE}/books-like/">
<meta property="og:image" content="{SITE}/images/cover.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<nav><div class="wrap"><a href="{SITE}/">← Womb of Shadows — main site</a></div></nav>
<header class="hero"><div class="wrap">
  <div class="eyebrow">Recommendations</div>
  <h1>What to read after the books that broke you</h1>
  <p class="sub">Honest lists for readers of literary, biological, and cosmic horror —
  from Peter Neal, author of <em>Womb of Shadows</em>.</p>
</div></header>
<main class="wrap">
  <ol class="list">
{cards}
  </ol>
</main>
<footer><div class="wrap">
  <p>© 2026 Peter Neal · <a href="{SITE}/">Womb of Shadows</a></p>
</div></footer>
</body>
</html>
"""


for slug, cfg in PAGES.items():
    (OUT / f"{slug}.html").write_text(page(slug, cfg), encoding="utf-8")
    print("wrote", slug)
(OUT / "index.html").write_text(hub(), encoding="utf-8")
print("wrote hub index")
