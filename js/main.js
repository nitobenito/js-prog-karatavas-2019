// Visi spēles mainīgie atrodas globālajā redzamības apbabalā, lai to vērtības var mainīt no
// vienas funkcijas, un pēcāk tiem piekļūt no citas funkcijas

let konteiners; // reference uz <div> elementu, kur ir ievietoti spēles vizuālie elementi
let divProgress; // reference uz <div> elementu, kur attēlots spēles progress
let imgProgresaBilde; // reference uz <img> elementu, kur ielādē progresa bildītes
let divRikjosla; // reference uz <div> elementu, kas kalpo par rīkjoslu
let divUzdevums; // reference uz <div> elementu, kur attēlots rēbuss
let divBurti; // reference uz <div> elementu, kur izvietotas burtu pogas

let progress; // spēles progress/līmenis
let statuss; // spēles statuss
let uzdevums; // minamais vārds
let minetieBurti = ""; // lietotāja minētie burti

STATUSS_NEINICIALIZETS = 0; // neinicializēta spēle
STATUSS_SPELE = 1; // ir uzdots uzdevums, var minēt
STATUSS_UZVARA = 2; // spēle beigusies ar uzvaru
STATUSS_SAGRAVE = 3; // spēle beigusies ar zaudējumu
STATUSS_NOVAKTS = 9; // spēle ir novākta no ekrāna

function inicializacija(id) {
  konteiners = document.getElementById(id);
  if (konteiners) {
    divProgress = document.createElement("div");
    divProgress.setAttribute("class", "progress");
    konteiners.appendChild(divProgress);

    divRikjosla = document.createElement("div");
    divRikjosla.setAttribute("class", "rikjosla");
    let btnJaunaSpele = document.createElement("button");
    btnJaunaSpele.innerHTML = "Jauna spēle";
    btnJaunaSpele.onclick = (evt) => {
      //console.log(evt);
      jaunaSpele();
    }
    divRikjosla.appendChild(btnJaunaSpele);

    konteiners.appendChild(divRikjosla);

    divUzdevums = document.createElement("div");
    divUzdevums.setAttribute("class", "uzdevums");
    konteiners.appendChild(divUzdevums);

    divBurti = document.createElement("div");
    divBurti.setAttribute("class", "burti");
    konteiners.appendChild(divBurti);
  }
  statuss = STATUSS_NEINICIALIZETS;
}

function novakt() {
  if (statuss === STATUSS_NOVAKTS) return;
  if (konteiners) {
    konteiners.innerHTML = "";
  }
  delete konteiners;
  statuss = STATUSS_NOVAKTS;
}

function jaunaSpele() {
  console.log("Sākam jaunu spēli!");
  statuss = STATUSS_SPELE;
  //console.log(this);
  jaunsProgress(0);
  minetieBurti = ""; // Burti, kurus lietotājs ir spiedis
  jaunsUzdevums();
  atjaunotRebusu();
  // Atjaunojam burtu pogas!
  if (konteiners) {
    divBurti.innerHTML = "";
    const alfabets = "AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPRSŠTUŪVZŽ";
    for (let burtaId = 0; burtaId < alfabets.length; burtaId++) {
      let burts = alfabets[burtaId];
      let burtaPoga = document.createElement("button");
      burtaPoga.setAttribute("class", "burts neaiztikts");
      burtaPoga.innerHTML = burts;
      burtaPoga.onclick = (evt) => minBurtu(burts, burtaPoga);
      divBurti.appendChild(burtaPoga);
    }
    divUzdevums.style.display = "block"; // Padaram uzdevuma logu redzamu
    divProgress.style.display = "block"; // Padaram progresa logu redzamu
  }
}

function jaunsProgress(limenis) {
  progress = limenis;
  console.log("Jauns progress:", progress);
  if (this.konteiners) {
    // Ņemam progresa bildītes no Wikipedia lapas
    var progresaBildes = [
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png",
      "https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png",
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png",
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png",
      "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png",
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png",
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png"
    ];
    if (limenis >= 0 && limenis < progresaBildes.length) {
      if (!imgProgresaBilde) {
        // Pievienojam <img> elementu, kas attēlos bildītes
        // Piezīme: pirmo reizi, kad uzstādīs jaunu līmeni, bildīte ielādēsies tikai tad. Tā nav optimāla lietotāja pieredze, tāpēc vēlams bildītes ielādēt pārlūkprogrammas atmiņā jau laicīgi.
        imgProgresaBilde = document.createElement("img");
        divProgress.appendChild(imgProgresaBilde);
      }  
      imgProgresaBilde.setAttribute("src", progresaBildes[limenis]);
    }
  }
  if (progress == 6) {
    beigas(false);
  }
}

function jaunsUzdevums() {
  divUzdevums.setAttribute("class", "uzdevums");
  if (!varduSaraksts) {
    console.error("Vārdu saraksts nav ielādēts!");
    uzdevums = "UZDEVUMS";
    return this.uzdevums;
  }
  uzdevums = varduSaraksts[Math.floor(Math.random() * varduSaraksts.length)];
  console.log("Jauns uzdevums: ", uzdevums);
  return uzdevums;
}

function atjaunotRebusu() {
  console.log("Atjaunojam rebusu");
  let rebuss = "";
  let uzminets = true;
  for (var burtaId = 0; burtaId < uzdevums.length; burtaId++) {
    let burts = uzdevums.charAt(burtaId);
    if (minetieBurti.indexOf(burts) >= 0) {
      rebuss += burts;
    } else {
      rebuss += "_";
      uzminets = false;
    }
  }
  if (!divUzdevums) return uzminets;
  divUzdevums.innerHTML = rebuss;
  return uzminets;
}

function minBurtu(burts, burtaPoga) {
  if (statuss != STATUSS_SPELE) return;
  burts = burts.toUpperCase().charAt(0);
  console.log("Minam burtu:", burts);
  if (minetieBurti.indexOf(burts) >= 0) return; // Burts jau agrāk minēts
  minetieBurti += burts;
  console.log("Minetie burti:", minetieBurti);
  if (uzdevums.indexOf(burts) >= 0) {
    console.log("Pareizs burts:", burts);
    if (burtaPoga) {
      burtaPoga.setAttribute("class", "burts pareizi");
    }
    if (atjaunotRebusu()) {
      beigas(true);
    }
  } else {
    console.log("Nepareizs burts:", burts);
    burtaPoga.setAttribute("class", "burts nepareizi");
    jaunsProgress(progress + 1);
  }
}

function beigas(uzvara) {
  if (uzvara) {
    statuss = STATUSS_UZVARA;
    divUzdevums.setAttribute("class", "uzdevums pareizi");
    console.log("Uzvara!");
  } else {
    statuss = STATUSS_SAGRAVE;
    if (konteiners) {
      divUzdevums.innerHTML = uzdevums;
      divUzdevums.setAttribute("class", "uzdevums nepareizi");
    }
    console.log("Sagrāve!");
  }
}