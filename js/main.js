class Karatavas {
  constructor(id) {
    this.konteiners = document.getElementById(id);
    if (this.konteiners) {
      this.konteiners.innerHTML = "Te būs spēle";

      this.divProgress = document.createElement("div");
      this.divProgress.setAttribute("class", "progress");
      this.divProgress.innerHTML = "Progress";
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
      this.divUzdevums.innerHTML = "Uzdevums";
      this.konteiners.appendChild(this.divUzdevums);

      this.divBurti = document.createElement("div");
      this.divBurti.setAttribute("class", "burti");
      this.divBurti.innerHTML = "Burti";
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
    this.jaunsUzdevums();
    this.atjaunotRebusu();
    // Atjaunojam burtu pogas!
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
  }
  set progress(limenis) {
    this._progress = limenis;
    console.log("Jauns progress:", this._progress);
    if (this.konteiners) {
      this.divProgress.innerHTML = "Progress: " + this._progress;
    }
    if (this._progress == 6) {
      this.beigas(false);
    }
  }
  get progress() {
    return this._progress;
  }
  jaunsUzdevums() {
    this.uzdevums = "UZDEVUMS";
    console.log("Jauns uzdevums: ", this.uzdevums);
    return this.uzdevums;
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
      burtaPoga.setAttribute("class", "burts nepareizi");
      this.progress++;
    }
  }
  beigas(uzvara) {
    if (uzvara) {
      this.statuss = Karatavas.STATUSS_UZVARA;
      console.log("Uzvara!");
    } else {
      this.statuss = Karatavas.STATUSS_SAGRAVE;
      if (this.konteiners) {
        this.divUzdevums.innerHTML = this.uzdevums;
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
