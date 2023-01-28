<template>
  <div class="home-container">
    <section class="text-stycke">

      <h1>Linders Superlista 2023</h1>
      <p>
        En chans att hitta det du länge letat efter!
        Linders superlista är en härligt späckad lista med 17 000 rader av ovanliga och odlingsvärda växter att beställa
        ifrån. Beställningen gör du senast 26 februari 2023 för att sedan
        hämta dina beställda växter på <a href="https://lindersplantskola.se/hitta-hit/">Linders plantskola</a> utanför
        Hörby i Skåne under maj 2023.
        Tack vare att du gör beställningen i förväg och själv hämtar ut dina växter kan jag hålla låga priser i Linders
        superlista. Alla priser är inklusive moms. Lägsta ordersumma är 2000 kr. (Gå ihop med en vän om det är svårt att
        komma upp i den summan).
      </p>
    </section>
    <section class="text-stycke">
      <h1>Hur gör jag?</h1>
      <p class="top-desc">
        Listan med växter hittar du under fliken <nuxt-link class="link" to="/lista">Linders Superlista
          2023</nuxt-link> överst på denna sida. I listan kan du söka
        och ange hur många av en viss växt som du vill ha. Under fliken <nuxt-link class="link"
          to="/varukorg">Varukorg</nuxt-link> kan du sedan se vilka växter du valt,
        justera antal, fylla i dina kontaktuppgifter och sedan skicka in din beställning.
        Du kan lungt jobba vidare en annan dag eftersom växterna sparas automatiskt tills nästa gång.
      </p>
      <p class="paragraph-spacing">
        Om du trycker på symbolen
        <Icon class="" name="material-symbols:keyboard-arrow-down-rounded" size="20" />
        till höger i exemplet nedan öppnas en flik med mer info om växten. Där
        kan du ange hur många du vill ha av växten och trycka “Lägg till i varukorg”.
      </p>
      <div class="list-example">
        <ListElementExample :plant="testPlant" />
      </div>
      <h1 class="underrubrik">Filter</h1>
      <p>
        På vänster sida finns det en filterfunktion där man kan filtrera och söka i listan för att snabbare hitta det du
        letar efter. Den kan du använda för att
        söka efter exempelvis ätliga växter, bara träd eller mina tipsade favoriter.
      </p>
      <h1 class="underrubrik">Sortera</h1>
      <p>
        Om du vill sortera växtlistan efter något annat än växtnamnet (t.ex pris) kan du klicka på kolumens titel
        ovanför
        listan.
        Klicka på den igen för att byta riktning.
      </p>
      <!-- Det finns även en ruta där man kan hoppa till begynnelsebokstaven av det man leter efter. -->
    </section>
    <section class="text-stycke">
      <h1>Beskrivningar</h1>
      <p class="top-desc">
        Nedan beskrivs de symboler och information som finns i Linders Superlista.
      </p>
      <ul>
        <li>
          <strong>Typ:</strong> Det finns en kolumn för växttypen och där betyder:
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
              <Icon name="twemoji:sheaf-of-rice" size="21" title="Gräs" /> = Gräs (bambu
              under träd)
            </li>
            <li>
              <Icon name="noto:tanabata-tree" size="21" title="Klätterväxt" /> = Klätterväxter
            </li>
            <li>
              <Icon name="noto:potted-plant" size="21" title="Ormbunke" /> = Ormbunkar
            </li>
          </ul>
          <p>Om man klickar eller håller över <i class="lite-tjockare">ikonen</i> öppnas ett nytt fönster med Googles
            bildsök. Lägg denna
            rutan till
            sidan av skärmen, på så sätt kan du snabbt se dom olika växterna. Dela gärna skärmen i 2/3 för listan och
            1/3 för bilderna.
          </p>
          <p>
            Om du istället klickar på själva <i class="lite-tjockare">växtnamnet</i> öppnas en ny
            flik (med Googles
            bildsök) i det fönster du är i.
          </p>
        </li>
        <li>
          <strong>Vetenskapligt namn:</strong> Det latinska (och ofta grekiska) namnet på växterna. Är du dålig på latin
          kan du ha hjälp
          av <a href="https://skud.slu.se/nav/taxa" target="_blank">Skuds hemsida</a>. Då kan du söka på ett svenskt
          namn och snabbt få
          ut det vetenskapliga.

        </li>
        <li>
          <strong>Ikoner:</strong>
          <ul class="indent">
            <li>
              <Icon title="Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" /> =
              <strong>Rekommenderas:</strong> Jag har satt hjärtan för växter jag vill rekommendera. Mina
              personliga favoriter och växter jag tycker ni inte ska missa att spana in.
            </li>
            <li>
              <Icon title="Ätbar" class="edible-icon" name="twemoji:fork-and-knife" size="20" /> =
              <strong>Ätlig:</strong> Visar om
              växten är ätlig eller inte.
            </li>
            <li>
              <Icon title="Kommentar" class="kommentar-icon" name="majesticons:comment-2-text" size="20" /> =
              <strong>Kommentar:</strong>
              Denna ikoner visar om det finns en kommentar till växten ifråga.
            </li>
            <li>
              <Icon class="länk-icon" name="mdi:link-variant" size="20" /> = <strong>Länk:</strong> Visar om det finns
              en
              länk till
              växten. Du kan även klicka på ikonen för att öppna länken direkt. Kan vara bilder, videos,
              blogghemsidor m.m.
            </li>
          </ul>
        </li>
        <li>
          <strong>Kruka:</strong> C står för Container och t.ex. C5 är en 5-liters kruka. C2 en 2-liters kruka osv. P9
          är en
          fyrkantskruka
          med sida 9 cm, P11 en fyrkantskruka med sida 11 cm osv.
          Ibland finns detta tecken "#" vilket betyder att trädet har odlats i marken. Har ingen större betydelse, ofta
          är det positivt och ger kraftiga plantor. Leveraras som klump eller i kruka.
        </li>
        <li>
          <strong>Höjd:</strong> Här anges ungefärlig höjd i cm på plantan som säljs.
        </li>
        <li>
          <strong>Minsta order:</strong> här är angivit det minimumantal som gäller för en viss växt (främst perenner i
          P9-kruka där det
          ofta är 12 st som är minimum).
        </li>
        <li>
          <strong>Pris:</strong> Pris med moms per styck
        </li>
        <li>
          <strong>Lager:</strong> här står hur många som finns i lager, när det är känt. Står det inget går det ändå bra
          att beställa.
        </li>
        <li>
          <strong>Storleks-kommentar:</strong> Här står t.ex. "Pa" på dom träd som är toppympade på stam eller i vissa
          fall
          uppstammade till en tydlig stam. "Spö" innebär att det mest är en huvudstam och inte så många sidogrenar ännu.
          På en del träd anges här stamomfång, t.ex. 6-8 vilket betyder att stammen har en omkrets på 6-8 cm mätt 1 m
          upp.
        </li>
        <li>
          <strong>Zon:</strong> Vad gäller härdighet är det stor variation över listan och mycket är otillräckligt
          prövat i Sverige. På en del växter har jag angivit svensk zon-tålighet. Zon 0 står för innerstadsmiljöer i zon
          1.
        </li>
      </ul>
    </section>
    <section class="text-stycke">
      <h1>Betalning och Hämtning</h1>
      <p class="paragraph-spacing">
        När jag fått din beställning svarar jag med en faktura på halva beloppet. Resten betalas när du hämtar växterna
        i maj och vi ser exakt vad
        som har gått att få tag på (jag räknar med att få tag på ungefär 60-80 % av det du beställt).
        Jag kan inte skicka växterna utan dom hämtas här i plantskolan utanför Hörby under maj månad.
      </p>
      <p class="paragraph-spacing">
        Hemkörning kan erbjudas till Malmö/Lund-området samt Hörby/Höör och kostar 750 kr.
        Även till Göteborg kan hemkörning erbjudas, för 1250 kr.
      </p>
      <p>
        Anmäl dig gärna till mitt nyhetsbrev där jag bland annat kommer att presentera växter ur
        Superlistan löpande under jan-feb.
        Direktlänk till nyhetsbrevet
        <a target="_blank"
          href="https://us7.campaign-archive.com/home/?u=0e9eb9946e9781ae0c59149df&id=9e50a747e2">här!</a>
        Där kan du också läsa tidigare nyhetsbrev.
      </p>
      <p class="hälsningar">
        Med gröna hälsningar / Peter Linder, 0733-518 716,
        peter@lindersplantskola.se
      </p>
      <a class="logo" href="https://lindersplantskola.se/" target="_blank"><img src="/lindersplantskola-logo.svg"
          alt="logo"></a>
    </section>
  </div>
</template>

<script setup>

const testPlant = {
  Edible: null,
  "Höjd": "40-50",
  Kommentar: "rosablommig vinterbuske, som en ljusrosa forsythia!",
  Kruka: "C7,5",
  Lager: "1",
  "Länk": "https://www.youtube.com/watch?v=C3j75pn6s3c",
  MinOrder: null,
  Namn: "Abeliophyllum distichum 'Roseum'",
  Order: null,
  Plantskola: "A",
  Pris: 490,
  Rekommenderas: true,
  Storlekskommentar: null,
  Typ: "T",
  Zon: "2",
  id: 25,
}

</script>

<style>
li {
  display: list-item;
  /* margin-bottom: 0.2rem; */
}

p {
  display: block
}

li>svg {
  color: rgb(128, 128, 128);
}

.indent>li {
  margin-left: 1rem;
  margin-bottom: 0.6rem;
  line-height: 1;
}

.indent>li>strong {
  font-weight: 500;
}

.text-stycke {
  border-radius: 1rem;
  padding-top: 1rem;
  padding: 1rem 2rem;
  width: fit-content;
  margin: 0 auto 1rem;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.dark .text-stycke {
  background: #26292f;
  color: #bec8d3;
}

.dark .text-stycke h1 {
  color: #ecf9fb;
}

.text-stycke>ul>li {
  margin-bottom: 1rem;
}

.text-stycke>h1 {
  margin: 0.5rem 0;
  text-align: center;
  font-size: 3ch;
}

.text-stycke>a,
.text-stycke>img {
  display: block;
  width: 50%;
  margin: 0 auto 2rem;
}

li>a,
.text-stycke>p>a,
.link {
  text-decoration: underline;
  color: #0645AD;
}

.dark li>a,
.dark .text-stycke>p>a,
.dark .link {
  text-decoration: underline;
  color: #75b4f8;
}

@media screen and (max-width: 750px) {
  .main-layout {
    padding: 1rem;
  }

  .text-stycke {
    padding: 1rem 1rem;
  }
}

.home-container {
  /* margin-top: 12rem; */
  max-width: 100ch;
}


.type-desc {
  margin-bottom: 0.5rem;
}

.top-desc {
  margin-bottom: 1rem;
}

.hälsningar {
  text-align: center;
  margin: 2rem 0 1rem;
  font-size: large;
}

.paragraph-spacing {
  margin-bottom: 0.5rem;
}

.underrubrik {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.lite-tjockare {
  font-weight: 600;
}

.dark .logo img {
  display: none;
}
</style>