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
      this.divRikjosla.innerHTML = "Pogas";
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
    this.statuss = Karatavas.STATUSS_JAUNS;
    this.jaunsProgress(0);
    this.progress = 0;
    this.jaunsUzdevums();
    this.atjaunotRebusu();
    console.log("Vēl ir jāsaliek burtu pogas!");
  }
  set progress(limenis) {
    this._progress = limenis;
    console.log("Jauns progress:", this._progress);
    if (this.konteiners) {
      this.divProgress.innerHTML = "Progress: " + this._progress;
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
  }
  minBurtu(burts) {
    burts = burts.toUpperCase().charAt(0);
    console.log("Minam burtu:", burts);
  }
  beigas(uzvara) {
    if (uzvara) {
      this.statuss = Karatavas.STATUSS_UZVARA;
      console.log("Uzvara!");
    } else {
      this.statuss = Karatavas.STATUSS_SAGRAVE;
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
