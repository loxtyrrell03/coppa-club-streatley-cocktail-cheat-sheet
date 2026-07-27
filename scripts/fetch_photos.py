"""Download and optimise the licensed photography used by the PWA.

Every source below is either covered by the Pexels licence or an explicit
Creative Commons/Public Domain licence. The script keeps the source and licence
metadata beside the generated WebP files so the deployed site can credit every
photographer without depending on a third-party CDN.
"""

from __future__ import annotations

import json
import sys
import time
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
DRINK_DIR = ROOT / "images" / "drinks"
PRODUCT_DIR = ROOT / "images" / "bottles"
USER_AGENT = "Coppa Club Streatley training PWA/1.0 (local licensed asset fetcher)"


def pexels(
    photo_id: int,
    creator: str,
    title: str,
    *,
    focus=(0.5, 0.5),
    contain=False,
):
    return {
        "url": f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=1800",
        "landing": f"https://www.pexels.com/photo/{title.lower().replace(' ', '-')}-{photo_id}/",
        "creator": creator,
        "license": "Pexels licence",
        "license_url": "https://www.pexels.com/license/",
        "focus": focus,
        "contain": contain,
    }


def cc(
    url: str,
    landing: str,
    creator: str,
    license_name: str,
    license_url: str,
    *,
    focus=(0.5, 0.5),
    contain=False,
):
    return {
        "url": url,
        "landing": landing,
        "creator": creator,
        "license": license_name,
        "license_url": license_url,
        "focus": focus,
        "contain": contain,
    }


BY_2 = "https://creativecommons.org/licenses/by/2.0/"
BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0/"
BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/"
BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/"
CC0 = "https://creativecommons.org/publicdomain/zero/1.0/"
PDM = "https://creativecommons.org/publicdomain/mark/1.0/"


DRINKS = {
    # Coupe / Martini — each photograph visibly uses a coupe/martini-style glass.
    "pornstar-martini": pexels(
        11937508, "Ata Ebem", "A Porn Star Martini Cocktail Drink", focus=(0.53, 0.48)
    ),
    "espresso-martini": cc(
        "https://live.staticflickr.com/4261/35207943440_51cbca785b_b.jpg",
        "https://www.flickr.com/photos/31027007@N08/35207943440",
        "Wine Dharma",
        "CC0 1.0",
        CC0,
        focus=(0.5, 0.5),
    ),
    "hibiscus-rose-delight": pexels(
        8084633, "Ivan S", "Pink Cocktail In Glass", focus=(0.5, 0.46)
    ),
    "lychee-rose-martini": cc(
        "https://live.staticflickr.com/4031/5077136438_ef8d138bfd_b.jpg",
        "https://www.flickr.com/photos/14771153@N04/5077136438",
        "slgckgc",
        "CC BY 2.0",
        BY_2,
        focus=(0.48, 0.5),
    ),
    "popstar-martini": cc(
        "https://live.staticflickr.com/2034/32888464402_7e89dc0782_b.jpg",
        "https://www.flickr.com/photos/63311602@N08/32888464402",
        "loustejskal.com",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    # Rocks — short tumblers/old-fashioned glasses only.
    "margarita": pexels(
        7841398,
        "Dasha Klimova",
        "Close Up Photo Of A Cocktail Drink With A Slice Of Lime",
        focus=(0.5, 0.5),
    ),
    "negroni": cc(
        "https://live.staticflickr.com/3681/33733845085_37c9999fc0_b.jpg",
        "https://www.flickr.com/photos/31027007@N08/33733845085",
        "Wine Dharma",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    "old-fashioned": cc(
        "https://live.staticflickr.com/1455/24662811083_967065d33e_b.jpg",
        "https://www.flickr.com/photos/43581314@N08/24662811083",
        "timsackton",
        "CC BY-SA 2.0",
        BY_SA_2,
        focus=(0.52, 0.48),
    ),
    "peach-elderflower-mai-tai": cc(
        "https://live.staticflickr.com/3716/13118672105_046333030d_b.jpg",
        "https://www.flickr.com/photos/12508217@N08/13118672105",
        "Sam Howzit",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    "rhubarb-raspberry-bramble": pexels(
        24778475, "Furkan Demirbaş", "Glass Of Cocktail", focus=(0.5, 0.5)
    ),
    "green-chilli-mango-margarita": pexels(
        36643283,
        "Blanca Isela",
        "Refreshing Mango Beverage With Fruit Pieces",
        focus=(0.5, 0.5),
    ),
    "rum-fashioned": pexels(
        33727405,
        "Sertaç",
        "Classic Cocktail In Elegant Glass On Wooden Table",
        focus=(0.5, 0.5),
    ),
    # Highballs — visibly tall glasses.
    "mojito": pexels(7259052, "Aram Diseño", "A Glass Of Mojito", focus=(0.5, 0.48)),
    "british-orchard-highball": pexels(
        18142600,
        "Denys Gromov",
        "Red Cocktail In Glass",
        focus=(0.5, 0.5),
        contain=True,
    ),
    "spiced-pina-colada": cc(
        "https://live.staticflickr.com/65535/53454332047_d12d674158_b.jpg",
        "https://www.flickr.com/photos/164188154@N05/53454332047",
        "Red Lobster Lover Joe",
        "Public Domain Mark 1.0",
        PDM,
        focus=(0.52, 0.5),
    ),
    "acv-colada": cc(
        "https://live.staticflickr.com/65535/53455570929_7f7b17e1d2_b.jpg",
        "https://www.flickr.com/photos/164188154@N05/53455570929",
        "Red Lobster Lover Joe",
        "Public Domain Mark 1.0",
        PDM,
        focus=(0.5, 0.5),
    ),
    "blazing-pineapple-buck": pexels(
        29138465,
        "Atul kumar",
        "Refreshing Pineapple Mint Cocktail In Clear Glass",
        focus=(0.5, 0.5),
    ),
    # Spritz — all in large stemmed wine glasses.
    "grapefruit-thyme-aperol": cc(
        "https://live.staticflickr.com/4302/35791451532_dc959cb063_b.jpg",
        "https://www.flickr.com/photos/7633518@N08/35791451532",
        "Sarah Stierch",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    "pear-pomegranate-hugo": pexels(
        9008919,
        "solod_sha",
        "Wine Glass With Pink Liquid",
        focus=(0.5, 0.48),
    ),
    "limoncello-lavender": pexels(
        16581003, "Nadin Sh", "Drink In Wineglass", focus=(0.5, 0.5)
    ),
    "rhubarb-orange-zero": pexels(
        30469709,
        "Szymon Shields",
        "Elegant Orange Cocktail In Wine Glass With Garnish",
        focus=(0.5, 0.5),
    ),
    "aperol-spritz": cc(
        "https://live.staticflickr.com/8159/7291861454_2dfb109d36_b.jpg",
        "https://www.flickr.com/photos/11211909@N00/7291861454",
        "corsi photo",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    "hugo-spritz": cc(
        "https://live.staticflickr.com/65535/54064124215_f30ffa292a_b.jpg",
        "https://www.flickr.com/photos/115225894@N07/54064124215",
        "ccnull.de Bilddatenbank",
        "CC BY 2.0",
        BY_2,
        focus=(0.5, 0.5),
    ),
    "limoncello-spritz": pexels(
        7376769,
        "Arina Krasnikova",
        "A Wine Glass With Sliced Lemon And Ice",
        focus=(0.5, 0.5),
    ),
    "sarti-spritz": pexels(
        9008921,
        "solod_sha",
        "A Wine Glass With Pink Liquid And Flowers",
        focus=(0.5, 0.48),
    ),
    "floral-spritz": pexels(
        19297798, "Luis Felipe Pérez", "Glass Of Cocktail", focus=(0.5, 0.48)
    ),
}


SOURCES = {
    "absolut": cc(
        "https://images.pexels.com/photos/17722186/pexels-photo-17722186.jpeg?auto=compress&cs=tinysrgb&w=1800",
        "https://www.pexels.com/photo/absolut-vodka-is-a-bottle-of-vodka-17722186/",
        "Marcelo Verfe",
        "Pexels licence",
        "https://www.pexels.com/license/",
    ),
    "vanilla": cc(
        "https://live.staticflickr.com/3117/3109471403_fa18a0211b_b.jpg",
        "https://www.flickr.com/photos/35034362215@N01/3109471403",
        "sociate",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "kahlua": cc(
        "https://images.pexels.com/photos/32958928/pexels-photo-32958928.jpeg?auto=compress&cs=tinysrgb&w=1800",
        "https://www.pexels.com/photo/kahlua-coffee-liqueur-with-cocktail-on-turntable-32958928/",
        "Szymon Shields",
        "Pexels licence",
        "https://www.pexels.com/license/",
    ),
    "hibiscus": cc(
        "https://live.staticflickr.com/7462/16071669752_4ed9995f7e_b.jpg",
        "https://www.flickr.com/photos/46488122@N05/16071669752",
        "Jangra Works",
        "CC BY 2.0",
        BY_2,
    ),
    "veuve": cc(
        "https://live.staticflickr.com/7491/16019187460_3cd8afd862_b.jpg",
        "https://www.flickr.com/photos/39306713@N08/16019187460",
        "MartinDube",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "bombay": cc(
        "https://live.staticflickr.com/2119/2538691664_507f748373_b.jpg",
        "https://www.flickr.com/photos/22083482@N03/2538691664",
        "George M. Groutas",
        "CC BY 2.0",
        BY_2,
    ),
    "sparkling": pexels(
        9946170,
        "Екатерина Шумских",
        "Close Up Shot Of A Glass Of Drink",
    ),
    "agave": cc(
        "https://live.staticflickr.com/3611/3343476586_b9bf596511_b.jpg",
        "https://www.flickr.com/photos/89649959@N00/3343476586",
        "jay8085",
        "CC BY 2.0",
        BY_2,
    ),
    "cointreau": cc(
        "https://images.pexels.com/photos/13971485/pexels-photo-13971485.jpeg?auto=compress&cs=tinysrgb&w=1800",
        "https://www.pexels.com/photo/a-bottle-of-liquor-near-brown-wooden-wall-13971485/",
        "Andrei L",
        "Pexels licence",
        "https://www.pexels.com/license/",
    ),
    "beefeater": cc(
        "https://live.staticflickr.com/1197/1294602847_56f7fc2ce3_b.jpg",
        "https://www.flickr.com/photos/11473185@N03/1294602847",
        "tripleigrek",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "campari": cc(
        "https://live.staticflickr.com/7117/7785366314_46572d77b3_b.jpg",
        "https://www.flickr.com/photos/43581314@N08/7785366314",
        "timsackton",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "vermouth": cc(
        "https://live.staticflickr.com/2115/2426907470_1e8d1fb04a_b.jpg",
        "https://www.flickr.com/photos/22829128@N08/2426907470",
        "Jill Clardy",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "buffalo": cc(
        "https://live.staticflickr.com/65535/51789679020_7176e3898b_b.jpg",
        "https://www.flickr.com/photos/155589534@N03/51789679020",
        "Audire Silentium",
        "CC BY 2.0",
        BY_2,
    ),
    "havana7": cc(
        "https://live.staticflickr.com/2292/2214182186_3aa6da7381_b.jpg",
        "https://www.flickr.com/photos/33682661@N00/2214182186",
        "Kevin Lau",
        "CC BY 2.0",
        BY_2,
    ),
    "juniper": cc(
        "https://live.staticflickr.com/3181/2943588993_fa5040c4c4_b.jpg",
        "https://www.flickr.com/photos/10271343@N00/2943588993",
        "desertdutchman",
        "CC BY 2.0",
        BY_2,
    ),
    "banana": cc(
        "https://live.staticflickr.com/7454/9260183915_03cba6f8cb_b.jpg",
        "https://www.flickr.com/photos/33227787@N05/9260183915",
        "r.nial.bradshaw",
        "CC BY 2.0",
        BY_2,
    ),
    "pineapple": cc(
        "https://live.staticflickr.com/1008/1420343003_13eeb0f9f3.jpg",
        "https://www.flickr.com/photos/18909356@N00/1420343003",
        "derek7272",
        "CC BY 2.0",
        BY_2,
    ),
    "sugarcane": cc(
        "https://live.staticflickr.com/2292/2214182186_3aa6da7381_b.jpg",
        "https://www.flickr.com/photos/33682661@N00/2214182186",
        "Kevin Lau",
        "CC BY 2.0",
        BY_2,
    ),
    "whisky": cc(
        "https://live.staticflickr.com/7622/16592440438_58ce40750f_b.jpg",
        "https://www.flickr.com/photos/55267995@N04/16592440438",
        "ctj71081",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "spices": cc(
        "https://live.staticflickr.com/7239/7309909880_fd734c18dc_b.jpg",
        "https://www.flickr.com/photos/65187097@N03/7309909880",
        "trophygeek",
        "CC BY 2.0",
        BY_2,
    ),
    "aperol": pexels(
        11430594,
        "Ata Ebem",
        "Close Up Photo Of A Bottle Of Liqueur",
    ),
    "prosecco": cc(
        "https://live.staticflickr.com/7237/7233984776_99def24b9b_b.jpg",
        "https://www.flickr.com/photos/74903273@N05/7233984776",
        "Ferruccio Zanone",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "elderflower": cc(
        "https://live.staticflickr.com/1008/528332994_6534a95784_b.jpg",
        "https://www.flickr.com/photos/85265584@N00/528332994",
        "wit",
        "CC BY-SA 2.0",
        BY_SA_2,
    ),
    "lemon": cc(
        "https://cdn.stocksnap.io/img-thumbs/960w/W28QPZPAK6.jpg",
        "https://stocksnap.io/photo/lemons-fruits-W28QPZPAK6",
        "Lauren Mancke",
        "CC0 1.0",
        CC0,
    ),
    "lavender": cc(
        "https://live.staticflickr.com/6121/5969843375_06402bd91e_b.jpg",
        "https://www.flickr.com/photos/59407191@N04/5969843375",
        "elminium",
        "CC BY 2.0",
        BY_2,
    ),
    "rhubarb": cc(
        "https://live.staticflickr.com/57/197319011_63bd9c3b90_b.jpg",
        "https://www.flickr.com/photos/75897997@N00/197319011",
        "kahvikisu",
        "CC BY 2.0",
        BY_2,
    ),
    "st-germain": cc(
        "https://live.staticflickr.com/2048/3536847259_120c538c6d_b.jpg",
        "https://www.flickr.com/photos/51035597937@N01/3536847259",
        "mccun934",
        "CC BY 2.0",
        BY_2,
    ),
    "pallini": cc(
        "https://live.staticflickr.com/65535/51968345369_7ae9e50fa0_b.jpg",
        "https://www.flickr.com/photos/7633518@N08/51968345369",
        "Sarah Stierch",
        "CC BY 2.0",
        BY_2,
    ),
    "orange": cc(
        "https://live.staticflickr.com/6221/6298546165_4645d3e0f3_b.jpg",
        "https://www.flickr.com/photos/21649179@N00/6298546165",
        "fdecomite",
        "CC BY 2.0",
        BY_2,
    ),
}


PRODUCTS = {
    "absolut": ("absolut", "Exact Absolut vodka bottle photograph"),
    "absolut-vanilla": ("vanilla", "Vanilla ingredient reference; exact bottle not shown"),
    "kahlua": ("kahlua", "Exact Kahlúa coffee liqueur bottle photograph"),
    "crossip-pure-hibiscus": (
        "hibiscus",
        "Hibiscus ingredient reference; exact bottle not shown",
    ),
    "veuve-clicquot": ("veuve", "Exact Veuve Clicquot Champagne bottle photograph"),
    "bombay-sapphire": ("bombay", "Exact Bombay Sapphire gin bottle photograph"),
    "zero-sparkling": (
        "sparkling",
        "Effervescence category reference; source brand was not specified",
    ),
    "altos-plata": ("agave", "Blue-agave ingredient reference; exact bottle not shown"),
    "cointreau": ("cointreau", "Exact Cointreau orange liqueur bottle photograph"),
    "beefeater": ("beefeater", "Exact Beefeater London dry gin bottle photograph"),
    "campari": ("campari", "Exact Campari bitter aperitif bottle photograph"),
    "martini-rubino": (
        "orange",
        "Vermouth botanical/citrus reference; exact Martini Rubino bottle not shown",
    ),
    "buffalo-trace": ("buffalo", "Exact Buffalo Trace bourbon bottle photograph"),
    "havana-7": ("havana7", "Sugar-cane ingredient reference; exact Havana 7 bottle not shown"),
    "plymouth": ("juniper", "Gin botanical reference; exact Plymouth bottle not shown"),
    "discarded-banana-rum": (
        "banana",
        "Banana ingredient reference; exact Discarded Banana Rum bottle not shown",
    ),
    "crossip-blazing-pineapple": (
        "pineapple",
        "Pineapple ingredient reference; exact Crossip bottle not shown",
    ),
    "havana-3": ("sugarcane", "Rum ingredient reference; exact Havana 3 bottle not shown"),
    "compass-box-orchard-house": (
        "whisky",
        "Whisky category reference; exact Compass Box bottle not shown",
    ),
    "havana-spiced": (
        "spices",
        "Spice ingredient reference; exact Havana Spiced bottle not shown",
    ),
    "aperol": ("aperol", "Exact Aperol aperitif bottle photograph"),
    "prosecco": (
        "prosecco",
        "Prosecco category photograph; the recipe does not specify a brand",
    ),
    "mondoro-elderflower": (
        "elderflower",
        "Elderflower ingredient reference; exact Mondoro bottle not shown",
    ),
    "limoncello": (
        "lemon",
        "Lemon ingredient reference; the recipe does not specify a limoncello brand",
    ),
    "monin-lavender": (
        "lavender",
        "Lavender ingredient reference; exact MONIN bottle not shown",
    ),
    "bristol-rhubarb-orange": (
        "rhubarb",
        "Rhubarb ingredient reference; exact Bristol Syrup Co bottle not shown",
    ),
    "premium-zero-sparkling": (
        "sparkling",
        "Effervescence category reference; source brand was not specified",
    ),
    "st-germain": ("st-germain", "Exact St-Germain elderflower liqueur bottle photograph"),
    "pallini-limoncello": ("pallini", "Exact Pallini Limoncello bottle photograph"),
    "sarti-rosa": (
        "orange",
        "Italian aperitif category reference; exact Sarti Rosa bottle not shown",
    ),
}


def fetch(url: str, cache: dict[str, bytes]) -> bytes:
    if url in cache:
        return cache[url]
    last_error = None
    for attempt in range(4):
        try:
            response = requests.get(
                url,
                headers={"User-Agent": USER_AGENT, "Accept": "image/avif,image/webp,image/*"},
                timeout=45,
            )
            response.raise_for_status()
            cache[url] = response.content
            return response.content
        except requests.RequestException as exc:
            last_error = exc
            time.sleep(1 + attempt)
    raise RuntimeError(f"Could not download {url}: {last_error}")


def render(
    content: bytes,
    output: Path,
    size: tuple[int, int],
    focus=(0.5, 0.5),
    contain=False,
):
    with Image.open(BytesIO(content)) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        if contain:
            background = ImageOps.fit(
                image,
                size,
                method=Image.Resampling.LANCZOS,
                centering=focus,
            ).filter(ImageFilter.GaussianBlur(24))
            background = Image.blend(background, Image.new("RGB", size, "#181411"), 0.32)
            foreground = image.copy()
            foreground.thumbnail(
                (round(size[0] * 0.68), round(size[1] * 0.92)),
                Image.Resampling.LANCZOS,
            )
            fitted = background
            fitted.paste(
                foreground,
                ((size[0] - foreground.width) // 2, (size[1] - foreground.height) // 2),
            )
        else:
            fitted = ImageOps.fit(
                image,
                size,
                method=Image.Resampling.LANCZOS,
                centering=focus,
            )
        output.parent.mkdir(parents=True, exist_ok=True)
        fitted.save(output, "WEBP", quality=82, method=6)


def public_credit(asset_id: str, kind: str, source: dict, note: str):
    return {
        "id": asset_id,
        "kind": kind,
        "creator": source["creator"],
        "license": source["license"],
        "licenseUrl": source["license_url"],
        "sourceUrl": source["landing"],
        "note": note,
    }


def main():
    cache: dict[str, bytes] = {}
    credits = {"drinks": {}, "products": {}}
    metadata_only = "--metadata-only" in sys.argv
    products_only = "--products-only" in sys.argv
    only_arg = next((arg for arg in sys.argv if arg.startswith("--only=")), "")
    only_ids = set(only_arg.removeprefix("--only=").split(",")) if only_arg else set()

    for asset_id, source in DRINKS.items():
        print(f"drink   {asset_id}")
        output = DRINK_DIR / f"{asset_id}.webp"
        if (
            not metadata_only
            and not products_only
            and (not only_ids or asset_id in only_ids)
        ):
            content = fetch(source["url"], cache)
            render(
                content,
                output,
                (1200, 675),
                source["focus"],
                source.get("contain", False),
            )
        credits["drinks"][asset_id] = public_credit(
            asset_id, "cocktail photograph", source, "Representative serving photograph"
        )

    for asset_id, (source_id, note) in PRODUCTS.items():
        print(f"product {asset_id}")
        source = SOURCES[source_id]
        output = PRODUCT_DIR / f"{asset_id}.webp"
        if not metadata_only and (not only_ids or asset_id in only_ids):
            content = fetch(source["url"], cache)
            render(content, output, (800, 800), source["focus"])
        credits["products"][asset_id] = public_credit(
            asset_id, "bottle or ingredient photograph", source, note
        )

    (ROOT / "PHOTO_CREDITS.json").write_text(
        json.dumps(credits, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "photo-credits.js").write_text(
        "export const photoCredits = "
        + json.dumps(credits, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Generated {len(DRINKS)} drink photos and {len(PRODUCTS)} product references.")


if __name__ == "__main__":
    main()
