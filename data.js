// Örnek demo verisi. Tümü uydurmadır; tarayıcıda localStorage'a yazılır.
window.ZT_SEED = {
  firmalar: [
    {id: "kayalar", ad: "Kayalar Pres Döküm", yer: "Sancaktepe", hat: 12, yetkili: "Elif K."},
    {id: "marmara", ad: "Marmara Kablo", yer: "Tuzla", hat: 7, yetkili: "Murat A."},
    {id: "anadolu", ad: "Anadolu Ambalaj", yer: "Dudullu", hat: 5, yetkili: "Seda T."}
  ],
  hatlar: [
    {kod: "K-01", firma: "kayalar", ad: "Kaynarca → Sancaktepe", hareket: "06:15", sonVaris: "06:45"},
    {kod: "K-04", firma: "kayalar", ad: "Pendik → Sancaktepe", hareket: "06:10", sonVaris: "06:45"},
    {kod: "K-11", firma: "kayalar", ad: "Kurtköy → Sancaktepe", hareket: "06:20", sonVaris: "06:45"},
    {kod: "M-02", firma: "marmara", ad: "Kartal → Tuzla", hareket: "07:00", sonVaris: "07:40"}
  ],
  suruculer: [
    {ad: "Sürücü 01", tel: "0532 000 00 01", src: "2027-03-14", psikoteknik: "2026-12-20"},
    {ad: "Sürücü 04", tel: "0532 000 00 04", src: "2026-12-02", psikoteknik: "2027-05-01"},
    {ad: "Sürücü 11", tel: "0532 000 00 11", src: "2027-08-30", psikoteknik: "2027-01-15"}
  ],
  araclar: [
    {plaka: "34 ZT 001", koltuk: 19, sahip: "Zirvedekiler"},
    {plaka: "34 ZT 004", koltuk: 27, sahip: "Tedarikçi: Yıldız Taşımacılık"},
    {plaka: "34 ZT 018", koltuk: 19, sahip: "Zirvedekiler"}
  ],
  seferler: [
    {tarih: "26.11.2026", hat: "K-01", yon: "Sabah", varis: "06:41", durum: "Zamanında"},
    {tarih: "26.11.2026", hat: "K-04", yon: "Sabah", varis: "06:53", durum: "Geç"},
    {tarih: "26.11.2026", hat: "K-11", yon: "Sabah", varis: "—", durum: "Konum eksik"}
  ],
  belgeler: [
    {sahip: "34 ZT 018", tur: "Muayene", bitis: "20.11.2026", durum: "Süresi doldu"},
    {sahip: "34 ZT 004", tur: "Koltuk sigortası", bitis: "05.12.2026", durum: "Yaklaşıyor"},
    {sahip: "Sürücü 04", tur: "SRC belgesi", bitis: "02.12.2026", durum: "Yaklaşıyor"}
  ]
};
