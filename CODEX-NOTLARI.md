# 3G HOPPE WordPress / Elementor / Özel Plugin Notları

Bu HTML mockup tasarım tartışması içindir. Gerçek uygulama WordPress + Elementor Pro + özel katalog plugin'i olarak kurulacak.

## Önerilen yapı

- WordPress
- Elementor Pro: header, footer, sayfa tasarımları, single/archive template
- Özel plugin: `3G HOPPE Katalog`
- CPT: `urun`
- Taksonomiler:
  - Ürün grubu
  - Kullanım alanı
  - Malzeme
  - Renk / yüzey
  - Teknoloji / özellik
  - Seri
  - Proje kullanımı
- Özel alanlar:
  - Ürün kodu
  - Seri adı
  - Katalog sayfa referansı
  - Teknik açıklama
  - Görsel galeri
  - Gizli form aktarım alanları

## Eklenebilecek iki özel yetenek

### 1. B2B talep sepeti, ama e-ticaret sepeti değil
Kullanıcı birden fazla ürünü `Talep listeme ekle` diyerek listeye alır. Sayfanın sonunda tek form ile 3G'ye gönderir. Fiyat, stok ve ödeme yoktur.

### 2. Ürün seçim rehberi
Kullanıcı kullanım alanı, firma tipi ve özel ihtiyacı seçer. Sistem uygun ürün gruplarını veya filtrelenmiş ürünleri önerir. Sonuçtan B2B talep formuna geçer.

## Codex'e verilecek ilk görev

Bu statik HTML/CSS/JS mockup'ı temel alarak WordPress plugin iskeleti hazırla:

- `3g-hoppe-katalog.php`
- CPT: `urun`
- Taxonomy: `urun_grubu`, `kullanim_alani`, `malzeme`, `teknoloji`, `renk_yuzey`, `seri`
- Shortcode: `[3g_urun_katalog]`
- Shortcode: `[3g_urun_secim_rehberi]`
- Shortcode: `[3g_b2b_talep_formu]`
- AJAX filtreleme
- Ürün detayında gizli alan olarak ürün adı ve URL bilgisini forma aktar

## Dikkat

- WooCommerce kullanılmayacak.
- Sepet, fiyat, stok, ödeme olmayacak.
- Tasarım HOPPE sitesini kopyalamayacak.
- HOPPE katalog görselleri yalnızca tasarım konuşması ve mockup amacıyla kullanıldı.
