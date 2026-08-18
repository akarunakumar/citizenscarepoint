# Phase 3f (Azure version) — Deploying the Backend to Azure

Two Azure resources needed: **App Service** (runs your Spring Boot JAR)
and **Azure Database for PostgreSQL Flexible Server** (your real database).
Netlify still hosts the frontend — only the backend moves to Azure.

## 1. Install the Azure CLI

Download from [learn.microsoft.com/cli/azure/install-azure-cli-windows](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows).
After installing, **open a fresh terminal** (same PATH-refresh rule as
before) and confirm:

```
az --version
```

## 2. Log in

```
az login
```

Opens a browser window to sign into your Azure account.

## 3. Create a resource group

A resource group is just a named folder for everything you create —
keeps this project's resources together and easy to delete as a group
later if needed.

```
az group create --name citizencarepoint-rg --location centralindia
```

(Use whichever region is closest to you — `centralindia`, `eastus`, etc.)

## 4. Create the PostgreSQL database

```
az postgres flexible-server create \
  --resource-group citizencarepoint-rg \
  --name citizencarepoint-db \
  --location centralindia \
  --admin-user citizencare \
  --admin-password "<choose-a-strong-password>" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 16 \
  --public-access 0.0.0.0-255.255.255.255
```

**Note on `--public-access`:** this opens the database to any IP for
simplicity while learning. Before anything real goes live, tighten this
to just your App Service's outbound IPs — Azure's docs cover this under
"firewall rules" for Flexible Server.

Then create the actual database inside that server:

```
az postgres flexible-server db create \
  --resource-group citizencarepoint-rg \
  --server-name citizencarepoint-db \
  --database-name citizencarepoint
```

## 5. Configure the Maven plugin with your real values

Open `pom.xml`, find the `azure-webapp-maven-plugin` block, and fill in:
- `<subscriptionId>` — run `az account show --query id -o tsv` to get it
- Confirm `resourceGroup`, `appName`, `region` match what you created above
  (or run `mvn com.microsoft.azure:azure-webapp-maven-plugin:2.15.0:config`
  instead, which interactively fills this in for you and can also
  auto-create the App Service)

## 6. Set environment variables on the App Service

```
az webapp config appsettings set \
  --resource-group citizencarepoint-rg \
  --name citizencarepoint-backend \
  --settings \
    SPRING_DATASOURCE_URL="jdbc:postgresql://citizencarepoint-db.postgres.database.azure.com:5432/citizencarepoint?sslmode=require" \
    SPRING_DATASOURCE_USERNAME="citizencare" \
    SPRING_DATASOURCE_PASSWORD="<the-password-from-step-4>" \
    JWT_SECRET="<generate-with-openssl-rand--base64-32>"
```

Azure Postgres requires SSL by default — that's why `?sslmode=require` is
appended to the JDBC URL, unlike the local/Render versions.

## 7. Deploy

```
mvn clean package -DskipTests
mvn azure-webapp:deploy
```

First deploy takes a few minutes. Subsequent ones are faster.

## 8. Get your backend URL and verify

```
https://citizencarepoint-backend.azurewebsites.net
```

Test it:
```
curl https://citizencarepoint-backend.azurewebsites.net/api/salary-slips
```

## 9. Point the frontend at it

Same single-line change as any host:

```js
// assets/js/config.js
window.CCP.API_BASE_URL = "https://citizencarepoint-backend.azurewebsites.net";
```

Commit, push — Netlify redeploys the frontend automatically.

## 10. Confirm CORS still matches

`CorsConfig.java` already allows `https://citizenscarepoint.netlify.app` —
no change needed there just because the *backend's* host changed; CORS
cares about the frontend's origin, not where the backend itself lives.

## Troubleshooting

- **App Service shows a default "your app is running" page instead of
  your API** → check `az webapp log tail --resource-group citizencarepoint-rg
  --name citizencarepoint-backend` for startup errors — usually a missing
  environment variable or a database connection failure.
- **Database connection refused** → double check the `--public-access`
  firewall rule from step 4 actually applied: `az postgres flexible-server
  firewall-rule list --resource-group citizencarepoint-rg --name citizencarepoint-db`
- **CORS error in browser console** → confirm the exact Netlify URL,
  including `https://` and no trailing slash, matches `CorsConfig.java` exactly.
- **Cost note (verified, not assumed):** Azure App Service has a genuine
  **Always Free F1 tier** — worth trying first for a learning app instead
  of `B1` in the plugin config above (edit `<pricingTier>F1</pricingTier>`).
  It's limited (60 CPU-minutes/day, 1GB RAM, sleeps when idle), which is
  fine for occasional testing. **PostgreSQL Flexible Server is NOT part of
  Azure's always-free tier** — it's billed hourly even on the cheapest
  Burstable tier, though new Azure accounts typically get a time-limited
  free credit (commonly $200 for the first 30 days) that can cover it
  while you're testing. Check
  [azure.microsoft.com/free](https://azure.microsoft.com/en-us/free/)
  for the current offer before creating the database, since these terms
  change over time — don't assume it's free without checking.
