class Karatavas {
  constructor(id) {
    this.konteineris = document.getElementById(id);
    console.log("this.konteineris=", this.konteineris); 
    if (this.konteineris) {
      this.konteineris.innerHTML = "Te būs spēle";
    }
    this.statuss = Karatavas.STATUSS_NEINICIALIZETS;
  }
  novakt() {
    let statuss = 123;
    console.log("statuss=", statuss);
    console.log("this.statuss=", this.statuss);
    if (this.statuss === Karatavas.STATUSS_NOVAKTS) return;
    if (this.konteineris) {
      this.konteineris.innerHTML = "";
    }
    delete this.konteineris;
    this.statuss = Karatavas.STATUSS_NOVAKTS;
  }
}

// Statiskās propertijas
Karatavas.STATUSS_NEINICIALIZETS = 0; // neinicializēta spēle
Karatavas.STATUSS_SPELE = 1; // ir uzdots uzdevums, var minēt
Karatavas.STATUSS_UZVARA = 2; // spēle beigusies ar uzvaru
Karatavas.STATUSS_SAGRAVE = 3; // spēle beigusies ar zaudējumu
Karatavas.STATUSS_NOVAKTS = 9; // spēle ir novākta no ekrāna
