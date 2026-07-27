# JW Study

Osobista baza notatek działająca w przeglądarce (aplikacja typu **PWA**). Działa **offline**, bez konta i logowania — wszystkie dane zapisują się lokalnie na urządzeniu. Umożliwia import i eksport notatek do **JW Library** (`.jwlibrary`) oraz eksport do **Word/PDF**.

![Ikona aplikacji](icon-192.png)

## Funkcje

- Notatki z formatowaniem (pogrubienie, kursywa, listy, wyrównanie, kolory/podświetlenia).
- Zdjęcia w notatkach — wstawianie, skalowanie, oblewanie tekstem, przenoszenie w treści.
- Kolumny: Księgi Biblii, Zakładki, Notatki — z regulacją szerokości i „szklanym" wyglądem.
- Zakładki (etykiety) z metalicznymi kolorami; przypisywanie notatek przeciąganiem.
- Wyszukiwanie zaawansowane (gwiazdka, cudzysłów, alternatywy `(a|b)`).
- Widok pełnoekranowy notatki, tryb dzień/noc, regulacja czcionki.
- Import backupu **.jwlibrary**; eksport do **.jwlibrary**, **Word**, **PDF**, oraz kopia **JSON**.
- Eksport całej zakładki (wszystkich notatek) do Word/PDF.
- Działa na komputerze, iPadzie i iPhonie (zapis/udostępnianie: Pliki, Mail, Wiadomości, AirDrop).

## Uruchomienie

### Na komputerze
Otwórz plik `index.html` w przeglądarce (Chrome, Edge, Safari). Działa też offline.

### Jako aplikacja z ikoną (iPhone/iPad/Android) — przez hosting
Aplikacja musi być udostępniona pod adresem **https**, żeby działała w pełni offline i miała ikonę na ekranie głównym.

**GitHub Pages (za darmo):**
1. Wgraj zawartość tego folderu do repozytorium na GitHub.
2. W repo: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, wybierz gałąź `main` i katalog `/ (root)`.
3. Po chwili dostaniesz adres `https://<twoja-nazwa>.github.io/<repo>/`.
4. Na iPhonie/iPadzie: otwórz ten adres w **Safari → Udostępnij → Dodaj do ekranu głównego**.
5. Otwórz raz z internetem (żeby zapisała się kopia offline).

## Kopie zapasowe (ważne)

Notatki są w pamięci przeglądarki na urządzeniu. Rób kopie: **⚙️ Plik → „Zapisz kopię danych (JSON)"**. Przy zmianie urządzenia/adresu wczytaj kopię: **Plik → „Wczytaj kopię danych"**.

## Zawartość folderu

| Plik | Opis |
|---|---|
| `index.html` | Cała aplikacja (jeden plik). |
| `manifest.webmanifest` | Manifest PWA (nazwa, ikony, tryb). |
| `sw.js` | Service worker — działanie offline. |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png` | Ikony. |
| `icon-1024.png` | Duży podgląd ikony (1024 px). |
| `icon.svg` | Wektorowa wersja zapasowa ikony. |

## Uwagi

- Import do JW Library **zastępuje** dane w aplikacji na urządzeniu — najpierw zrób kopię w samej JW Library.
- Aktualizacja: po podmianie plików zamknij aplikację i otwórz ponownie (service worker pobierze nową wersję).
