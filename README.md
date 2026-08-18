# CitizenCarePoint — Angular Frontend (Phase 4)

Migrated from vanilla HTML/CSS/JS to Angular. **Phases 4a–4d are now
complete**: routing/layout, the real service grid + GST calculator, real
auth (register/login/logout with JWT), and Salary Slip / Service Requests
/ Contact — all talking to your real Spring Boot backend.

> **Angular 21 note:** this project targets Angular 21, which is
> **zoneless by default** — no `zone.js` at all. `app.config.ts` uses
> `provideZonelessChangeDetection()` accordingly. If you're on an older
> Angular version (pre-20.2), that API won't exist yet — use
> `provideZoneChangeDetection({ eventCoalescing: true })` instead and
> make sure `zone.js` is in your `angular.json` polyfills array.

> **Angular 21 root component naming:** newer CLI versions generate the
> root component as `app.ts`/class `App`, not the older
> `app.component.ts`/class `AppComponent` used throughout this project.
> Both work identically — Angular doesn't enforce file naming — but if
> you regenerate `main.ts` fresh from a scratch project, make sure its
> import matches: `import { AppComponent } from './app/app.component';`

## Setup — do this first

This project's `package.json`/`angular.json`/`tsconfig.json` are **not**
included here on purpose — they should come from your own `ng new`, so
they exactly match your installed Angular CLI version instead of me
guessing version numbers from memory.

```bash
ng new citizencarepoint-angular --standalone --routing --style=css --skip-git
cd citizencarepoint-angular
```

Then copy every file from this delivery into that freshly-generated
project, **replacing** these CLI-generated files:
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/styles.css`

And **adding** everything else (the `core/`, `layout/`, `pages/`, and
`styles/` folders are all new).

One manual step `ng new` can't do for you — open the generated
`src/index.html` and add these two lines inside `<head>`, right before
the closing `</head>` tag, so the fonts your CSS references actually load:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
```

Then:

```bash
npm install
ng serve
```

Open `http://localhost:4200`.

## What you should see

All 6 routes working — Home, About, Services, Contact, Login, Register —
with the real header (gradient logo, active-link underline, mobile
hamburger toggle), sidebar (collapses on mobile, same toggle), and
footer, all as genuine Angular components instead of `fetch()`-loaded
HTML partials. Home and About have their full real content; the other
four show a clearly-labeled "coming in Phase 4x" placeholder.

## What's here now

- **Real service grid** (`ServiceCatalogService` + `ServiceCardComponent`) on both Home and Services
- **GST Calculator** — pure client-side math, Reactive Form, no backend needed
- **Salary Slip Generator** — full CRUD against `/api/salary-slips`, with clickable history
- **Service Request form** — one form covering Certificate/Insurance/Housekeeping/IT Support, deep-linked from each card via a `?service=X` query param + fragment scroll (`withInMemoryScrolling` in `app.config.ts`)
- **Contact form** — posts to `/api/contact-messages`
- **Real auth** — `AuthService` (signal-based session), `authInterceptor` (auto-attaches the JWT to every request), header shows "Hi, [name]" + Logout when logged in

## Before running: point this at your backend

`src/app/core/api-config.ts` has `API_BASE_URL = 'http://localhost:8080'`
— make sure your Spring Boot backend is actually running there (same as
before: `docker run postgres...` then `mvn spring-boot:run` in the
backend project) before testing forms/login here, or every API call will
fail with a connection error shown right in the relevant form.

## CORS note

Your backend's `CorsConfig.java` currently allows `localhost:8000`,
`127.0.0.1:5500`, etc. (the old vanilla dev server ports) and your Netlify
domain. **It does NOT yet include `localhost:4200`** (Angular's default
dev port) — add that origin to the allowed list and restart the backend,
or every request from this Angular app will fail with a CORS error in
the browser console.

## Why the structure looks this way

- **`core/`** — app-wide singletons: `SidebarStateService`, `AuthService`,
  `authInterceptor`, `api-config.ts`, one HTTP service per backend
  resource (`SalarySlipService`, `ServiceRequestService`,
  `ContactMessageService`), and `models/` for the TypeScript interfaces
  matching your backend's DTOs exactly.
- **`layout/`** — Header, Sidebar, Footer.
- **`shared/`** — `ServiceCardComponent`, reused on both Home and Services.
- **`pages/`** — one folder per route. `services/` has 3 child components
  (gst-calculator, salary-slip, service-request) composed together in
  `services.component.html`, mirroring how the old `services.html` had
  three tool sections stacked on one page.

## Known simplification (will revisit)

The old `login.html`/`register.html` used a different centered-card
layout than the rest of the site. For now, Login/Register render inside
the normal `.container` layout with an inline `max-width`/`margin`
override — functionally fine, slightly less polished than the original.
