<template>
  <div class="home-container">
    <section class="text-stycke">
      <a href="https://lindersplantskola.se/" target="_blank"><img src="/lindersplantskola-logo.svg" alt="logo"></a>
      <h1>Linders Superlista 2023</h1>
      <p>
        Beställ senast 20 feb 2022, hämta i maj på Linders Plantskola, www.lindersplantskola.se
      </p>
      <p>
        Jag älskar växtlistor och detta är andra året jag sätter ihop en "Linders Superlista" till er att beställa
        ifrån.
        Gör din beställning senast 20 feb 2022.
        Sen hämtar du växterna under maj månad. På detta vis kan jag också erbjuda bra priser. Alla priser är inkl.
        moms.
        <strong>Lägsta ordersumma 2000 kr. </strong>
        Du hittar växtlistan under fliken "Linders Superlista 2022" där uppe. Det är där du lägger in din beställning.
      </p>
    </section>
    <section class="text-stycke">
      <h1>Beskrivningar</h1>
      <ul>
        <li>
          <strong>Typ:</strong> Det finns en kolumn för typ och där betyder:
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
          <p>Om man klickar eller håller över ikonen öppnas ett nytt fönster med Googles bildsök. Lägg denna rutan till
            sidan av skärmen, så sätt kan du snabbt se dom olika växterna.</p>
        </li>
        <li>
          <strong>Länk:</strong> Om du klickar på växtnamnet öppnas en länk till Googles bildsök för växten ifråga så du
          snabbt kan hitta
          mer info.
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
              <strong>Rekommenderas:</strong> Det är kolumnen med hjärtan för växter jag vill rekommendera. Mina
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
              <Icon class="länk-icon" name="mdi:link-variant" size="20" /> = <strong>Länk:</strong> Visar om det fins en
              länk till
              växten. Du kan även klicka på ikonen för att öppna länken direkt.
            </li>
          </ul>
        </li>
        <li>
          <strong>Kruka:</strong> C står för Container och t.ex. C5 är en 5-liters kruka. C2 en 2-liters kruka osv. P9
          är en
          fyrkantskruka
          med sida 9 cm, P11 en fyrkantskruka med sida 11 cm osv.
        </li>
        <li>
          <strong>Höjd:</strong> Här anges ungefärlig höjd i cm på plantan som säljs.
        </li>
        <li>
          <strong>Minsta order:</strong> här är angivit det minimumantal som gäller för en viss växt (främst perenner i
          P9-kruka där det
          ibland är 12 st som är minimum).
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
          <strong>Länk:</strong> Här finns i vissa fall ytterligare länktips för mer info. Kan vara bilder, videos,
          blogghemsidor m.m.
        </li>
        <li>
          <strong>Zon:</strong> Vad gäller härdighet är det stor variation över listan och mycket är otillräckligt
          0 står för innerstadsmiljöer i zon
          1.
        </li>
      </ul>
    </section>
  </div>
</template>

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
  width: 70%;
  display: block;
  margin: 0 auto 2rem;
}

li>a {
  text-decoration: underline;
  color: #0645AD;
}

.home-container {
  /* margin-top: 12rem; */
  max-width: 100ch;
}


.type-desc {
  margin-bottom: 0.5rem;
}
</style>