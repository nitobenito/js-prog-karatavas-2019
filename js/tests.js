// Šie ir testi, kurus var manuāli izsaukt pārlūkprogrammas konsolē:
// Test.testaNosaukums()
// Visi testi ir statiskās metodes, tātad nav nepieciešams veidot objektu ar new Test().
// Testi ir veidoti tā, lai tie izvadītu konsolē kļūdas paziņojumus, un pati funkcija
// atgriestu true vai false vērtību, attiecīgi, ja tests ir noslēdzies veiksmīgi vai neveiksmīgi.

class Test {
  static speleKonteineri() {
    const konteineris = document.createElement("div");
    konteineris.id = "testKonteineris";
    document.body.appendChild(konteineris);
    const k = new Karatavas(konteineris.id);
    k.jaunaSpele();
    k.uzdevums = "TEST";
    k.minBurtu("T");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc T");
      return false;
    }
    k.minBurtu("E");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc E");
      return false;
    }
    k.minBurtu("S");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc S");
      return false;
    }
    k.minBurtu("T");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc T");
      return false;
    }
    if (k.statuss != Karatavas.STATUSS_UZVARA) {
      console.error("Nepareizs spēles statuss (jābūt STATUSS_UZVARA)");
      return false;
    }
    return true;
  }
  static speleBezKonteinera() {
    const k = new Karatavas();
    k.jaunaSpele();
    k.uzdevums = "TEST";
    k.minBurtu("T");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc T");
      return false;
    }
    k.minBurtu("E");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc E");
      return false;
    }
    k.minBurtu("S");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc S");
      return false;
    }
    k.minBurtu("T");
    if (k.progress !== 0) {
      console.error("Progress pavirzījies nepareizi pēc T");
      return false;
    }
    if (k.statuss != Karatavas.STATUSS_UZVARA) {
      console.error("Nepareizs spēles statuss (jābūt STATUSS_UZVARA)");
      return false;
    }
    return true;
  }
  static speleArZaudejumu(koneineraId) {
    const k = new Karatavas(koneineraId);
    k.jaunaSpele();
    k.uzdevums = "TEST";
    k.minBurtu("A");
    if (k.progress != 1) {
      console.error("Progress nav pavirzījies pēc A");
      return false;
    }
    k.minBurtu("B");
    if (k.progress !== 2) {
      console.error("Progress nav pavirzījies pēc B");
      return false;
    }
    k.minBurtu("C");
    if (k.progress !== 3) {
      console.error("Progress nav pavirzījies pēc C");
      return false;
    }
    k.minBurtu("D");
    if (k.progress !== 4) {
      console.error("Progress nav pavirzījies pēc D");
      return false;
    }
    k.minBurtu("E");
    if (k.progress !== 4) {
      console.error("Progress nepareizi pavirzījies pēc E");
      return false;
    }
    k.minBurtu("F");
    if (k.progress !== 5) {
      console.error("Progress nav pavirzījies pēc F");
      return false;
    }
    k.minBurtu("G");
    if (k.progress !== 6 || k.statuss != Karatavas.STATUSS_SAGRAVE) {
      console.error("Progress nav pavirzījies pēc G vai nepareizs spēles statuss (jābūt STATUSS_SAGRAVE)");
      return false;
    }
    return true;
  }
}