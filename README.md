# Strona Internetowa Parafii (Fullstack App)

Aplikacja internetowa stworzona na potrzeby obsługi strony parafialnej, łącząca responsywny interfejs użytkownika z lekkim backendem. System umożliwia dynamiczne przesyłanie oraz bezobsługowe zarządzanie treściami, takimi jak ogłoszenia parafialne, intencje mszalne oraz aktualności, przy jednoczesnej optymalizacji kosztów utrzymania infrastruktury.

## Główne Funkcjonalności

- Dynamiczny panel zarządzania treścią: Zarządzanie ogłoszeniami i aktualnościami parafialnymi w czasie rzeczywistym z poziomu dedykowanego panelu administracyjnego bez konieczności bezpośredniej edycji kodu aplikacji.
- Pobieranie danych w czasie rzeczywistym: Integracja warstwy prezentacji z bazą danych PocketBase za pośrednictwem zoptymalizowanych zapytań API.
- Automatyzacja szyfrowania SSL: Konfiguracja bezpiecznego połączenia HTTPS z wykorzystaniem darmowych, automatycznie odnawianych certyfikatów SSL dostarczanych przez PocketHost.
- Przekierowania i obsługa domen (301 & CNAME): Bezszwowe przekierowanie ruchu ze starych struktur adresowych na docelową subdomenę z zachowaniem pełnego wsparcia dla indeksowania w wyszukiwarkach (SEO).
- Optymalizacja kosztów infrastruktury: Wydzielenie warstwy backendowej oraz bazy danych na dedykowaną platformę (PocketHost), pozwalające na całkowitą rezygnację z drogich zasobów hostingowych u rejestratora domeny.

## Architektura i Stack Technologiczny

Aplikacja została zbudowana w oparciu o podział na samodzielny frontend (SPA) oraz lekki backend serwerowy ze zintegrowaną bazą danych.

### Frontend
- Framework i narzędzia: React, Vite, JavaScript / TypeScript
- Interfejs i stylizowanie: HTML5, CSS3, komponenty responsywne (RWD)

### Backend i Baza Danych
- Silnik bazy danych: PocketBase (SQLite)
- Zarządzanie danymi: System migracji, wbudowany panel administracyjny, relacyjna struktura danych

### Infrastruktura i DevOps
- Hosting aplikacji i bazy: PocketHost
- Rejestrator domeny i DNS: Zenbox (konfiguracja rekordów CNAME oraz stałych przekierowań 301)
- Bezpieczeństwo: Protokół HTTPS, Let's Encrypt SSL
