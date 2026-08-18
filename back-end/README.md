# CitizenCarePoint Backend — Phase 3a

Spring Boot skeleton for the Salary Slip API. Local only — no frontend
connection yet (that's Phase 3c). Uses an in-memory H2 database, so data
resets every time you restart the app; that's expected at this stage.

## Structure

```
src/main/java/com/citizencarepoint/backend/
├── CitizenCarePointApplication.java   Entry point
├── config/
│   └── CorsConfig.java                 Allows the frontend to call this API later
└── salaryslip/
    ├── SalarySlip.java                 @Entity — the database table shape
    ├── SalarySlipRepository.java       Spring Data JPA — no SQL written by hand
    ├── SalarySlipService.java          Business logic (net pay calculation)
    ├── SalarySlipController.java       REST endpoints
    └── dto/
        ├── SalarySlipRequest.java      What the client sends
        └── SalarySlipResponse.java     What the API returns
```

Why DTOs separate from the entity: the database schema (`SalarySlip`) and
the API contract (`SalarySlipRequest`/`Response`) can now change
independently. E.g. if a `taxDeducted` column gets added to the database
later, the API doesn't automatically expose it until you deliberately add
it to the DTO too.

## Run it

```bash
mvn spring-boot:run
```

Starts on `http://localhost:8080`. Leave this running in its own terminal
while testing.

## Test it (no frontend needed yet)

**Create a slip:**
```bash
curl -X POST http://localhost:8080/api/salary-slips \
  -H "Content-Type: application/json" \
  -d '{"name":"Ravi Kumar","month":"2026-08","basicPay":40000,"allowances":5000,"deductions":2000}'
```
Expect a `201 Created` response with the full slip, including a
server-assigned `id` and computed `netPay` (43000 here).

**List all slips:**
```bash
curl http://localhost:8080/api/salary-slips
```

**Delete a slip** (replace `1` with a real id from the list above):
```bash
curl -X DELETE http://localhost:8080/api/salary-slips/1
```
Expect `204 No Content`. Deleting an id that doesn't exist returns `404`.

**Try invalid input** — this exercises the `@Valid` validation:
```bash
curl -X POST http://localhost:8080/api/salary-slips \
  -H "Content-Type: application/json" \
  -d '{"name":"","month":"2026-08","basicPay":-100,"allowances":0,"deductions":0}'
```
Expect a `400 Bad Request` — empty name and negative pay both fail validation.

Postman works the same way if you prefer a GUI — same URLs, same JSON bodies.

## Look at the actual database while it's running

Open `http://localhost:8080/h2-console` in a browser while the app is running.
- JDBC URL: `jdbc:h2:mem:citizencarepoint`
- User: `sa`, no password
- Run `SELECT * FROM salary_slips;` to see rows you've created via curl/Postman

## Run the tests

```bash
mvn test
```

`CitizenCarePointApplicationTests` checks that the whole app wires up
correctly and that create → list works end-to-end against H2.

## What's deliberately NOT here yet

- No PostgreSQL — that's Phase 3b (same code, different `application.properties`)
- No frontend connection — that's Phase 3c
- No authentication on these endpoints — anyone who can reach `localhost:8080`
  can call them right now. Fine for local learning; not fine once this is
  deployed publicly in Phase 3f, which is exactly why Phase 3d (auth) and
  the CORS tightening note in `CorsConfig.java` exist.
- No global error handler — a malformed request currently returns Spring's
  default error JSON, which is fine for now but we'll likely clean this up
  once there's more than one entity to keep consistent.
