<script setup>
// const testPlant = {
//   Edible: null,
//   "Höjd": "40-50",
//   Kommentar: "rosablommig vinterbuske, som en ljusrosa forsythia!",
//   Kruka: "C7,5",
//   Lager: "1",
//   "Länk": "https://www.youtube.com/watch?v=C3j75pn6s3c",
//   MinOrder: null,
//   Namn: "Abeliophyllum distichum 'Roseum'",
//   Order: null,
//   Plantskola: "A",
//   Pris: 490,
//   Rekommenderas: true,
//   Storlekskommentar: null,
//   Typ: "T",
//   Zon: "2",
//   id: 25,
// }
</script>

<template>
  <div class="home-container">
    <header class="text-stycke head">
      <img
        src="https://oykwqfkocubjvrixrunf.supabase.co/storage/v1/object/public/bilder/SuperDownscale%20-%203IKzqvkmhA%20-%20superlista%20bakgrund.jpg"
        alt=""
        robots="noindex"
      />
      <div>
        <!-- Stängd lista -->
        <!-- <div class="closed">
          <Icon name="material-symbols:cancel-outline-rounded" />
          <h2>Listan stängd för i år, öppnar igen nästa år!</h2>
        </div> -->

        <!-- Närmar sig -->
        <!-- <div class="closed coming-soon">
          <Icon name="mage:megaphone-a-fill" />
          <h2>Superlistan 2025 kommer snart!</h2>
          <Icon name="mage:megaphone-a-fill" />
        </div> -->

        <!-- Väldigt nära med ungefärlig tid -->
        <!-- <div class="closed coming-soon two-row">
          <div>
            <Icon name="mage:megaphone-a-fill" />
            <h2><strong>Superlistan 2025 kommer snart!</strong></h2>
            <Icon name="mage:megaphone-a-fill" />
          </div>
          <div>
            <p><strong>Förväntas bli klar runt jul</strong></p>
            <p>
              Prenumerera på <a href="https://lindersplantskola.se/">nyhetsbrevet</a> och håll koll
              på <a href="https://www.instagram.com/fotodendron/">Instagram</a>/<a
                href="https://www.facebook.com/LindersPlantskola"
                >Facebook</a
              >
              så du inte missar när den släpps!
            </p>
          </div>
        </div> -->

        <h1 class="main-title">Linders Superlista 2025</h1>
        <p>
          En chans att hitta det du länge letat efter! Linders superlista är en härligt späckad
          lista med 18 000 rader av ovanliga och odlingsvärda växter att beställa ifrån.
          <i>Beställningen gör du senast 23 februari 2025</i> för att sedan hämta dina beställda
          växter på <a href="https://lindersplantskola.se/" target="_blank">Linders plantskola</a>
          utanför Hörby i Skåne under maj 2025. Tack vare att du gör beställningen i förväg och
          själv hämtar ut dina växter kan jag hålla låga priser i Linders superlista. Alla priser är
          inklusive moms. Lägsta ordersumma är 2000 kr. (Gå ihop med en vän om det är svårt att
          komma upp i den summan).
        </p>
      </div>
    </header>
    <article class="text-stycke">
      <div>
        <h1>Hur gör jag?</h1>
        <p class="top-desc">
          Listan med växter hittar du under fliken
          <nuxt-link class="link" to="/lista">Listan</nuxt-link> överst på denna sida. I listan kan
          du söka och ange hur många av en viss växt som du vill ha. Under fliken
          <nuxt-link class="link" to="/varukorg">Varukorg</nuxt-link> kan du sedan se vilka växter
          du valt, justera antal, fylla i dina kontaktuppgifter och sedan skicka in din beställning.
          Du kan lungt jobba vidare en annan dag eftersom växterna sparas automatiskt tills nästa
          gång.
        </p>
        <p class="paragraph-spacing">
          För att beställa en växt trycker du på symbolen
          <Icon class="" name="material-symbols:keyboard-arrow-down-rounded" size="20" />
          till höger, då öppnas en flik med mer info om växten. Där kan du ange hur många du vill ha
          av växten och trycka “Lägg till i varukorg”.
        </p>
      </div>
    </article>
    <!-- <div class="list-example">
          <ListElementExample :plant="testPlant" />
        </div> -->

    <article class="text-stycke">
      <div>
        <div>
          <img
            class="ljus light-dark"
            src="https://res.cloudinary.com/dxwhmugdr/image/upload/v1734208362/14_firefox_EZ0ky_gdroim.png"
            alt=""
          />
          <img
            class="mork light-dark"
            src="https://res.cloudinary.com/dxwhmugdr/image/upload/v1734208058/14_firefox_kHJKE_nrzufu.png"
            alt=""
          />
        </div>
        <!-- <h1>Beskrivningar</h1>
        <p class="top-desc">
          Nedan beskrivs de symboler och information som finns i Linders Superlista.
        </p> -->
        <ul>
          <!-- <strong>Typ:</strong> Det finns en kolumn för växttypen och där betyder:
            <ul class="indent type-desc">
              <li>
                <Icon name="noto:deciduous-tree" size="21" title="Träd" /> = Träd o buskar
              </li>
              <li>
                <Icon name="noto:evergreen-tree" size="21" title="Barrträd" /> = Barrträd
              </li>
              <li>
                <Icon name="fxemoji:rosette" size="21" title="Perenner" /> = Perenner
              </li>
              <li>
                <Icon name="game-icons:high-grass" class="grass-icon" size="21" title="Gräs" /> = Gräs (bambu
                under träd)
              </li>
              <li>
                <Icon name="game-icons:curling-vines" class="klattervaxt-icon" size="21" title="Klätterväxt" /> =
                Klätterväxter
              </li>
              <li>
                <Icon name="game-icons:fern" class="ormbunke-icon" size="21" title="Ormbunke" /> = Ormbunkar
              </li>
            </ul> -->
          <div class="under-picture-align">
            <li>
              <h1 class="underrubrik">Sortera</h1>
              Om du vill sortera växtlistan efter något annat än växtnamnet (t.ex pris) kan du
              klicka på kolumens titel ovanför listan. Klicka på den igen för att byta riktning.
            </li>
            <li>
              <h1 class="underrubrik">Bildsök - <span class="nyhet">Nyhet!</span></h1>
              Om man klickar på <i class="lite-tjockare">växtens ikon</i> öppnas en ruta med 9
              bilder från Googles bildsök. Men denna kan man enkelt få bilder på växterna medans man
              går igenom listan.
              <br />
              Om du istället klickar på själva <i class="lite-tjockare">växtnamnet</i> öppnas en ny
              flik med Googles bildsök där man kan se alla bilder.
            </li>
          </div>

          <h1 class="underrubrik">Förklaringar</h1>
          <div class="förklaringar-align-container">
            <div class="förklaringar-align">
              <li>
                <strong>Lager:</strong> här står hur många som finns i lager, när det är känt. Står
                det inget går det ändå bra att beställa.
              </li>
              <li>
                <strong>Minsta order:</strong> här är angivit det minimumantal som gäller för en
                viss växt (främst perenner eftersom dom kommer i ett brätte med 12 st).
              </li>
              <li>
                <strong>Storleks-kommentar:</strong> Här står t.ex. "Pa" på dom träd som är
                toppympade på stam eller i vissa fall uppstammade till en tydlig stam. "Spö" innebär
                att det mest är en huvudstam och inte så många sidogrenar ännu. På en del träd anges
                här stamomfång, t.ex. 6-8 vilket betyder att stammen har en omkrets på 6-8 cm mätt 1
                m upp.
              </li>
            </div>
            <div class="förklaringar-align">
              <li>
                <strong>Kruka:</strong> C står för Container och t.ex. C5 är en 5-liters kruka. C2
                en 2-liters kruka osv. P9 är en fyrkantskruka med sida 9 cm, P11 en fyrkantskruka
                med sida 11 cm osv. Ibland finns detta tecken "#" vilket betyder att trädet har
                odlats i marken. Har ingen större betydelse, ofta är det positivt och ger kraftiga
                plantor. Leveraras som klump eller i kruka.
              </li>
              <li><strong>Höjd:</strong> Här anges ungefärlig höjd i cm på plantan som säljs.</li>
              <li><strong>Pris:</strong> Pris med moms per styck</li>
            </div>
          </div>
        </ul>
      </div>
    </article>
    <article class="text-stycke">
      <div>
        <div class="filter-forklaring">
          <div>
            <img
              class="ljus light-dark"
              src="https://res.cloudinary.com/dxwhmugdr/image/upload/v1734208361/14_firefox_47YAm_eqlrx4.png"
              alt=""
            />
            <img
              class="mork light-dark"
              src="https://res.cloudinary.com/dxwhmugdr/image/upload/v1734208058/14_firefox_hZfCU_rmlpom.png"
              alt=""
            />
          </div>
          <div>
            <h1 class="underrubrik">Filter</h1>
            <p>
              På vänster sida finns det en filterfunktion där man kan filtrera och söka i listan för
              att snabbare hitta det du letar efter. Den kan du använda för att söka efter
              exempelvis ätliga växter, bara träd eller mina tipsade favoriter. Sökfunktionen söker
              efter det vetenskapliga namnet.
            </p>
            <h1 class="underrubrik">Ikoner</h1>
            <!-- <strong>Ikoner:</strong> -->
            <ul class="icon-list">
              <li>
                <Icon
                  title="Rekommenderas"
                  class="rekommenderas-icon"
                  name="ph:heart-straight-fill"
                  size="20"
                />
                <p>
                  <strong>Rekommenderas:</strong> Jag har satt hjärtan för växter jag vill
                  rekommendera. Mina personliga favoriter och växter jag tycker ni inte ska missa
                  att spana in.
                </p>
              </li>
              <li>
                <Icon title="Ätbar" class="edible-icon" name="twemoji:fork-and-knife" size="20" />
                <p><strong>Ätlig:</strong> Visar om växten är ätlig eller inte.</p>
              </li>
              <li>
                <Icon
                  title="Lignosdatabasen"
                  class="kommentar-icon"
                  name="ooui:articles-ltr"
                  size="20"
                />
                <p>
                  <strong>Lignosdatabasen:</strong>
                  Denna visas ifall det finns information om växten på
                  <a href="https://lignosdatabasen.se/">Lignosdatabasen.se</a>
                </p>
              </li>
              <li>
                <Icon class="länk-icon" name="mdi:link-variant" size="20" />
                <p>
                  <strong>Länk:</strong> Visar om det finns en länk till växten. Du kan även klicka
                  på ikonen för att öppna länken direkt. Kan vara bilder, videos, blogghemsidor m.m.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- Det finns även en ruta där man kan hoppa till begynnelsebokstaven av det man leter efter. -->
      </div>
    </article>
    <footer class="text-stycke betalning">
      <div>
        <h1>Betalning och Hämtning</h1>
        <p class="paragraph-spacing">
          När jag fått din beställning svarar jag med en faktura på halva beloppet. Resten betalas
          när du hämtar växterna i maj och vi ser exakt vad som har gått att få tag på (jag räknar
          med att få tag på ungefär 60-80 % av det du beställt). Jag kan inte skicka växterna utan
          dom hämtas här i plantskolan utanför Hörby under maj månad.
        </p>
        <p class="paragraph-spacing">
          Hemkörning kan erbjudas till Malmö/Lund-området samt Hörby/Höör och kostar 750 kr.
        </p>
        <p>
          Anmäl dig gärna till mitt nyhetsbrev där jag bland annat kommer att presentera växter ur
          Superlistan löpande under jan-feb. Direktlänk till nyhetsbrevet
          <a
            target="_blank"
            href="https://us7.campaign-archive.com/home/?u=0e9eb9946e9781ae0c59149df&id=9e50a747e2"
            >här!</a
          >
          Där kan du också läsa tidigare nyhetsbrev och få inspiration eftersom jag skrivit mycket
          om Superlistans växter där.
        </p>
        <p class="hälsningar">
          Med gröna hälsningar / Peter Linder, 0733-518 716, peter@lindersplantskola.se
        </p>
        <a class="logo" href="https://lindersplantskola.se/" target="_blank"
          ><img src="/lindersplantskola-logo.svg" class="logo" alt="lindersplantskola-logo"
        /></a>
      </div>
    </footer>
  </div>
</template>

<style>
.home-container {
  /* margin-top: 12rem; */
  width: 100%;
  /* padding-top: 1rem; */
}

.text-stycke.head {
  overflow: hidden;
  position: relative;
  padding: 4rem;
  /* background: linear-gradient(0.25turn, #8ac95757, #57ffe063); */
  /* background: #77a650; */
  background: #83aa56;
}

.dark .text-stycke.head {
  /* background: #5c8b42; */
}

.text-stycke.head img {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(50px) opacity(50%);
  /* opacity: 0; */
  height: 800%;
  transition: all 1s ease;
}

html:not(.dark) .text-stycke.head img {
  /* top: -100%; */
  top: -12rem;
  left: -10rem;
  /* rotate: -15deg; */
  filter: blur(50px) brightness(200%) contrast(80%) saturate(70%) opacity(50%) hue-rotate(10deg);
  opacity: 0;
}

@media screen and (max-width: 900px) {
  .text-stycke.head {
    padding: 2rem 1rem;
  }
}

.text-stycke.head * {
  z-index: 3;
  position: relative;
  color: var(--text);
}

.dark .text-stycke.head * {
  color: var(--text-white);
}

.head .closed {
  background: var(--text);
  width: fit-content;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: min-content 1fr min-content;
  gap: 0.5rem;
}

@media screen and (max-width: 700px) {
  .head .closed {
    font-size: 1rem;
  }
}

.head div.closed * {
  color: var(--text-dark);
}

.dark .head div.closed *:not(.icon *) {
  color: var(--text-light);
}

.head .closed .icon * {
  color: var(--primary-red-dark);
  font-size: 2rem;
}
.head .closed.coming-soon .icon * {
  color: var(--text-dark);
}
.dark .head .closed.coming-soon .icon * {
  color: var(--text-light);
}

.head .closed.coming-soon.two-row {
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  max-width: 42ch;
}

.head .closed.coming-soon.two-row div:nth-child(1) {
  width: 100%;
  display: grid;
  place-items: center;
  gap: 0.5rem;
  grid-template-columns: min-content 1fr min-content;
}
.head .closed.coming-soon.two-row div:nth-child(2) {
  font-size: 1rem;
  display: grid;
  place-items: center;
  gap: 0.25rem;
  text-align: center;
}

.head .closed .icon {
  font-size: 2rem;
  margin: auto 0;
}

/* .home-container section:nth-child(even) {
  background: var(--bg);
  border: 1px solid var(--border-color);
} */

li {
  display: list-item;
  /* margin-bottom: 0.2rem; */
}

p {
  display: block;
}

li > svg {
  color: var(--text-mute-dark);
}

.indent > li {
  margin-left: 1rem;
  margin-bottom: 0.6rem;
  margin-top: 0.4rem;
  line-height: 1;
}

.indent > li > strong {
  font-weight: 500;
}

.dark .text-stycke strong {
  color: var(--text);
}

.text-stycke {
  padding-top: 1rem;
  padding: 1rem 2rem;
  width: 100%;
  /* background: var(--element-bg); */
}

.text-stycke:not(:last-child) {
  margin: 0 auto 0rem;
}

.text-stycke > div {
  max-width: 80ch;
  margin: 0 auto;
}

.dark .text-stycke {
  color: var(--text-mute);
}

.dark .text-stycke h1 {
  color: var(--text-white);
}

.text-stycke ul > li {
  margin-bottom: 1rem;
}

.text-stycke h1 {
  margin: 0.5rem 0;
  /* text-align: center; */
  font-size: 2rem;
  font-weight: 800;
}

h1.main-title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 1.5px;
}

@media screen and (max-width: 900px) {
  h1.underrubrik {
    /* text-align: center; */
    margin-top: 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media screen and (max-width: 900px) {
    .text-stycke h1 {
      font-size: 1.5rem;
    }

    h1.underrubrik {
      font-size: 1.25rem;
    }

    h1.main-title {
      font-size: 2rem;
      font-weight: 900;
    }
  }
}

.text-stycke > div > a,
.text-stycke > div > img {
  display: block;
  width: 50%;
  margin: 0 auto 2rem;
}

li > a,
.text-stycke > div > p > a,
.link {
  text-decoration: underline;
  color: var(--link-light);
}

.dark li > a,
.dark .text-stycke p > a,
.dark .link {
  text-decoration: underline;
  color: var(--link-dark);
}

@media screen and (max-width: 750px) {
  .text-stycke {
    padding: 1rem 1rem;
  }
}

@media screen and (min-width: 700px) {
  .filter-forklaring {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

.dark .ljus.light-dark {
  display: none;
}

html:not(.dark) .light-dark.mork {
  display: none;
}

.filter-forklaring img {
  transform: translateX(-8px) translatey(-8px);
  /* width: 90%; */
}

.filter-forklaring > :nth-child(2) {
  padding-left: 0.5rem;
}

.filter-forklaring div h1:nth-child(1) {
  margin-top: 0;
}

@media screen and (min-width: 500px) {
  .text-stycke .under-picture-align {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 2rem;
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: 500px) {
  .text-stycke .förklaringar-align-container {
    display: grid;
    grid-template-columns: 8fr 7fr;
    gap: 2rem;
    /* margin-bottom: 1rem; */
  }

  .förklaringar-align-container img {
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: 500px) {
  .text-stycke .förklaringar-align {
    display: flex;
    flex-direction: column;
    /* grid-template-columns: 6fr 3fr; */
    gap: 2rem;
    margin-bottom: 1rem;
    justify-content: space-between;
  }

  .text-stycke .förklaringar-align > * {
    /* min-width: 8rem; */
  }
}

.text-stycke .icon-list > * {
  display: grid;
  grid-template-columns: max-content 1fr;
  place-items: center start;
  gap: 0.5rem;
  /* align-items: center; */
  /* justify-content: center; */
}

.text-stycke .icon-list p {
  border-left: 3px solid var(--border-color);
  padding-left: 0.5rem;
}

.type-desc {
  margin-bottom: 0.5rem;
}

.top-desc {
  margin-bottom: 1rem;
}

.hälsningar {
  text-align: center;
  margin: 2rem 0 2rem;
  font-size: large;
}

.text-stycke a.logo {
  margin-bottom: 6rem;
}

.text-stycke.betalning {
  text-align: center;
}

.paragraph-spacing {
  margin-bottom: 0.5rem;
}

.lite-tjockare {
  font-weight: 600;
}

.dark .home-container .logo > img {
  filter: opacity(85%) invert(98%) sepia(5%) saturate(203%) hue-rotate(228deg) brightness(119%)
    contrast(100%);
}

i.red {
  color: var(--primary-red-light);
  font-weight: 700;
}

.dark i.red {
  color: var(--primary-red-dark);
}

.home-container .nyhet {
  /* color: var(--primary-green); */
  font-weight: 700;
  font-size: 0.85em;
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
  background: var(--primary-green);
}
</style>
