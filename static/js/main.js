class Karatavas {
  constructor(id) {
    this.konteiners = document.getElementById(id);
    if (this.konteiners) {
      this.divProgress = document.createElement("div");
      this.divProgress.setAttribute("class", "progress");
      this.konteiners.appendChild(this.divProgress);

      this.divRikjosla = document.createElement("div");
      this.divRikjosla.setAttribute("class", "rikjosla");
      let btnJaunaSpele = document.createElement("button");
      btnJaunaSpele.innerHTML = "Jauna spēle";
      btnJaunaSpele.onclick = (evt) => {
          //console.log(evt);
          this.jaunaSpele();
      }
      this.divRikjosla.appendChild(btnJaunaSpele);

      this.konteiners.appendChild(this.divRikjosla);

      this.divUzdevums = document.createElement("div");
      this.divUzdevums.setAttribute("class", "uzdevums");
      this.konteiners.appendChild(this.divUzdevums);

      this.divBurti = document.createElement("div");
      this.divBurti.setAttribute("class", "burti");
      this.konteiners.appendChild(this.divBurti);
    }
    this.statuss = Karatavas.STATUSS_NEINICIALIZETS;
  }
  novakt() {
    if (this.statuss === Karatavas.STATUSS_NOVAKTS) return;
    if (this.konteiners) {
      this.konteiners.innerHTML = "";
    }
    delete this.konteiners;
    this.statuss = Karatavas.STATUSS_NOVAKTS;
  }
  jaunaSpele() {
    console.log("Sākam jaunu spēli!");
    this.statuss = Karatavas.STATUSS_SPELE;
    //console.log(this);
    this.progress = 0;
    this.minetieBurti = ""; // Burti, kurus lietotājs ir spiedis
    // Atjaunojam burtu pogas!
    if (this.konteiners) {
      this.divBurti.innerHTML = "";
      const alfabets = "AĀBCČDEĒFGĢHIĪJKĶLĻMNŅOPRSŠTUŪVZŽ";
      for (let burtaId = 0; burtaId < alfabets.length; burtaId++) {
        let burts = alfabets[burtaId];
        let burtaPoga = document.createElement("button");
        burtaPoga.setAttribute("class", "burts neaiztikts");
        burtaPoga.innerHTML = burts;
        burtaPoga.onclick = (evt) => this.minBurtu(burts, burtaPoga);
        this.divBurti.appendChild(burtaPoga);
      }
      this.divUzdevums.style.display = "block"; // Padaram uzdevuma logu redzamu
      this.divProgress.style.display = "block"; // Padaram progresa logu redzamu
    }
    this.jaunsUzdevums(() => this.atjaunotRebusu());
  }
  set progress(limenis) {
    this._progress = limenis;
    console.log("Jauns progress:", this._progress);
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
        if (!this.imgProgresaBilde) {
            // Pievienojam <img> elementu, kas attēlos bildītes
            // Piezīme: pirmo reizi, kad uzstādīs jaunu līmeni, bildīte ielādēsies tikai tad. Tā nav optimāla lietotāja pieredze, tāpēc vēlams bildītes ielādēt pārlūkprogrammas atmiņā jau laicīgi.
            this.imgProgresaBilde = document.createElement("img");
            this.divProgress.appendChild(this.imgProgresaBilde);
          }  
        this.imgProgresaBilde.setAttribute("src", progresaBildes[limenis]);
      }
    }
    if (this._progress == 6) {
      this.beigas(false);
    }
  }
  get progress() {
    return this._progress;
  }
  jaunsUzdevums(fnKadUzdevumsSanemts) {
    if (this.konteiners) {
      this.divUzdevums.setAttribute("class", "uzdevums");    
    }
    // Asinhronā izsaukuma pārbaude
    this.uzdevums = null; 
    setTimeout(() => {
      this.uzdevums = "UZDEVUMS";
      console.log("Jauns uzdevums: ", this.uzdevums);
      fnKadUzdevumsSanemts();
    }, 3000);
  }
  atjaunotRebusu() {
    console.log("Atjaunojam rebusu");
    let rebuss = "";
    let uzminets = true;
    for (var burtaId = 0; burtaId < this.uzdevums.length; burtaId++) {
      let burts = this.uzdevums.charAt(burtaId);
      if (this.minetieBurti.indexOf(burts) >= 0) {
        rebuss += burts;
      } else {
        rebuss += "_";
        uzminets = false;
      }
    }
    if (!this.divUzdevums) return uzminets;
    this.divUzdevums.innerHTML = rebuss;
    return uzminets;
  }
  minBurtu(burts, burtaPoga) {
    if (this.statuss != Karatavas.STATUSS_SPELE) return;
    burts = burts.toUpperCase().charAt(0);
    console.log("Minam burtu:", burts);
    if (this.minetieBurti.indexOf(burts) >= 0) return; // Burts jau agrāk minēts
    this.minetieBurti += burts;
    console.log("Minetie burti:", this.minetieBurti);
    if (this.uzdevums.indexOf(burts) >= 0) {
      console.log("Pareizs burts:", burts);
      if (burtaPoga) {
        burtaPoga.setAttribute("class", "burts pareizi");
      }
      if (this.atjaunotRebusu()) {
        this.beigas(true);
      }
    } else {
      console.log("Nepareizs burts:", burts);
      if (burtaPoga) {
        burtaPoga.setAttribute("class", "burts nepareizi");
      }
      this.progress++;
    }
  }
  beigas(uzvara) {
    if (uzvara) {
      this.statuss = Karatavas.STATUSS_UZVARA;
      if (this.konteiners) {
        this.divUzdevums.setAttribute("class", "uzdevums pareizi");
      }
      console.log("Uzvara!");
    } else {
      this.statuss = Karatavas.STATUSS_SAGRAVE;
      if (this.konteiners) {
        this.divUzdevums.innerHTML = this.uzdevums;
        this.divUzdevums.setAttribute("class", "uzdevums nepareizi");
      }
      console.log("Sagrāve!");
    }
  }
}

// Statiskās propertijas
Karatavas.STATUSS_NEINICIALIZETS = 0; // neinicializēta spēle
Karatavas.STATUSS_SPELE = 1; // ir uzdots uzdevums, var minēt
Karatavas.STATUSS_UZVARA = 2; // spēle beigusies ar uzvaru
Karatavas.STATUSS_SAGRAVE = 3; // spēle beigusies ar zaudējumu
Karatavas.STATUSS_NOVAKTS = 9; // spēle ir novākta no ekrāna
