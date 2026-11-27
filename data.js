// Örnek demo verisi. Tümü uydurmadır; tarayıcıda localStorage'a yazılır.
window.ZT_SEED = {
  firmalar: [
    {id: "kayalar", ad: "Kayalar Pres Döküm", yer: "Sancaktepe", yetkili: "Elif K."},
    {id: "marmara", ad: "Marmara Ambalaj", yer: "Tuzla", yetkili: "Murat A."},
    {id: "kuzey", ad: "Kuzey Lojistik", yer: "Hadımköy", yetkili: "Seda T."}
  ],
  // Bir firmanın birden çok servisi olur: her servis bir güzergâh, bir vardiya ve bir araçtır.
  // sefer: örnek ayda tek yön sefer sayısı. fabrika / tedarikci: tek yön birim fiyatı (₺).
  servisler: [
    {kod: "K-01", firma: "kayalar", guzergah: "Kaynarca → Sancaktepe", vardiya: "08:00 vardiyası", arac: "34 ZT 001", sefer: 44, fabrika: 1466, tedarikci: 1150},
    {kod: "K-04", firma: "kayalar", guzergah: "Kartal → Sancaktepe", vardiya: "08:00 vardiyası", arac: "34 ZT 004", sefer: 44, fabrika: 1520, tedarikci: 1190},
    {kod: "K-11", firma: "kayalar", guzergah: "Pendik → Sancaktepe", vardiya: "08:00 vardiyası", arac: "34 ZT 011", sefer: 44, fabrika: 1390, tedarikci: 1090},
    {kod: "K-15", firma: "kayalar", guzergah: "Ümraniye → Sancaktepe", vardiya: "16:00 vardiyası", arac: "34 ZT 015", sefer: 44, fabrika: 1280, tedarikci: 1000},
    {kod: "K-22", firma: "kayalar", guzergah: "Kurtköy → Sancaktepe", vardiya: "24:00 vardiyası", arac: "34 ZT 022", sefer: 44, fabrika: 1240, tedarikci: 970},
    {kod: "M-02", firma: "marmara", guzergah: "Kartal → Tuzla", vardiya: "08:00 vardiyası", arac: "34 ZT 030", sefer: 44, fabrika: 1350, tedarikci: 1060},
    {kod: "M-05", firma: "marmara", guzergah: "Gebze → Tuzla", vardiya: "08:00 vardiyası", arac: "34 ZT 031", sefer: 44, fabrika: 1410, tedarikci: 1100},
    {kod: "M-07", firma: "marmara", guzergah: "Pendik → Tuzla", vardiya: "16:00 vardiyası", arac: "34 ZT 032", sefer: 44, fabrika: 1180, tedarikci: 920},
    {kod: "N-01", firma: "kuzey", guzergah: "Esenyurt → Hadımköy", vardiya: "08:00 vardiyası", arac: "34 ZT 040", sefer: 44, fabrika: 1300, tedarikci: 1020},
    {kod: "N-03", firma: "kuzey", guzergah: "Beylikdüzü → Hadımköy", vardiya: "08:00 vardiyası", arac: "34 ZT 041", sefer: 44, fabrika: 1450, tedarikci: 1130},
    {kod: "N-06", firma: "kuzey", guzergah: "Avcılar → Hadımköy", vardiya: "16:00 vardiyası", arac: "34 ZT 042", sefer: 44, fabrika: 1380, tedarikci: 1080},
    {kod: "N-09", firma: "kuzey", guzergah: "Arnavutköy → Hadımköy", vardiya: "24:00 vardiyası", arac: "34 ZT 043", sefer: 44, fabrika: 1220, tedarikci: 950}
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
