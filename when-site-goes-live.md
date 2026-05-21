# When the Site Goes Live — Domain Migration Checklist

This document covers how to safely move `foreverbalivillas.com` from Bluehost/WordPress to Vercel
without losing the PHP storage backend. Read this fully before doing anything.

---

## What will change

| Thing | Before migration | After migration |
|---|---|---|
| `foreverbalivillas.com` | → Bluehost (WordPress) | → Vercel (your Next.js site) |
| Storage API | `foreverbalivillas.com/fbv-api` | `api.foreverbalivillas.com` |
| Image URLs | `foreverbalivillas.com/fbv-api/images/…` | `api.foreverbalivillas.com/images/…` |
| PHP files | Stay on Bluehost (untouched) | Stay on Bluehost (untouched) |
| Your data | Stays on Bluehost (untouched) | Stays on Bluehost (untouched) |

The PHP files, JSON data files, and uploaded images **never move**. Only the URL to reach them changes.

---

## Step 1 — Create the subdomain on Bluehost (do this BEFORE touching DNS)

1. Log in to Bluehost cPanel
2. Go to **Domains → Subdomains**
3. Create:
   - Subdomain: `api`
   - Domain: `foreverbalivillas.com`
   - Document Root: `/public_html/fbv-api`
     *(Bluehost may auto-fill this — make sure it points to the fbv-api folder)*
4. Click **Create**

This creates `api.foreverbalivillas.com` pointing directly to the `/fbv-api/` folder.
So `https://api.foreverbalivillas.com/content.php` = your content API. ✓

---

## Step 2 — Test the subdomain (still before touching anything else)

Visit these URLs in your browser. Each should return JSON, not an error:

```
https://api.foreverbalivillas.com/content.php
```
*(will ask for auth but should return 401 JSON, not a 404 or HTML error)*

If you get a 404 or "Not Found" HTML page, the subdomain document root is wrong —
go back to cPanel and fix it before continuing.

---

## Step 3 — Update the `CUSTOM_STORAGE_URL` in Vercel

1. Go to your Vercel project → **Settings → Environment Variables**
2. Find `CUSTOM_STORAGE_URL`
3. Change its value from:
   ```
   https://foreverbalivillas.com/fbv-api
   ```
   to:
   ```
   https://api.foreverbalivillas.com
   ```
4. `CUSTOM_STORAGE_KEY` stays exactly the same — do not touch it
5. Click **Save**
6. **Redeploy** the Vercel project (Settings → Deployments → Redeploy, or push a small commit)

---

## Step 4 — Update the Content Security Policy in next.config.ts

Open `next.config.ts` and find the `img-src` and `media-src` lines. Add `api.foreverbalivillas.com`:

```ts
"img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com https://*.googleapis.com https://foreverbalivillas.com https://api.foreverbalivillas.com https://*.mybluehost.me",
"media-src 'self' https://foreverbalivillas.com https://api.foreverbalivillas.com https://*.mybluehost.me",
```

Also add the old-URL redirect so existing saved image URLs still work after the domain moves.
In `next.config.ts`, add a `redirects` section:

```ts
async redirects() {
  return [
    {
      source: '/fbv-api/:path*',
      destination: 'https://api.foreverbalivillas.com/:path*',
      permanent: true,
    },
  ];
},
```

This means any link saved as `foreverbalivillas.com/fbv-api/images/photo.jpg`
will automatically redirect to `api.foreverbalivillas.com/images/photo.jpg`. ✓

Commit and push this change. Vercel will redeploy.

---

## Step 5 — Add the custom domain in Vercel

1. Go to Vercel project → **Settings → Domains**
2. Click **Add Domain**
3. Enter: `foreverbalivillas.com`
4. Also add: `www.foreverbalivillas.com`
5. Vercel will show you DNS records to add — keep this page open

---

## Step 6 — Update DNS at your domain registrar

> ⚠️ This is the step that makes the site go live. Do it at a quiet time (not during peak hours).
> DNS changes take 1–48 hours to propagate worldwide, but usually 15–30 minutes.

Go to wherever your domain is registered (this may be Bluehost Domain Manager,
or a separate registrar like GoDaddy, Namecheap, etc.).

**If using Vercel nameservers (recommended — simplest):**
Replace your current nameservers with:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**If keeping your current nameservers and only changing DNS records:**
Add/update these records as shown in the Vercel dashboard:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

> Note: If you switch nameservers, the Bluehost-managed `api.foreverbalivillas.com` subdomain
> record will be lost. You need to re-add it in Vercel's DNS panel:
> ```
> CNAME  api  foreverbalivillas.com.vxd.zyi.mybluehost.me
> ```
> (Check the exact Bluehost hostname from cPanel → Zone Editor for your account)

---

## Step 7 — Verify everything after DNS propagates

Check each of these:

| Check | Expected result |
|---|---|
| `https://foreverbalivillas.com` | Your villa site (not WordPress) |
| `https://www.foreverbalivillas.com` | Same villa site |
| `https://api.foreverbalivillas.com/content.php` | JSON response (401 without key) |
| Admin → Dashboard | Shows "Database connected" green badge |
| Admin → Media Library | Upload an image, it shows correctly |
| Admin → Villas → Save | "Saved!" with no error |
| Villa page on site | Shows content from admin edits |

---

## Step 8 — Clean up (optional, after confirming everything works)

- Log in to Bluehost → WordPress admin → put WordPress in maintenance or delete it
  (only if you no longer need it — your storage API must stay!)
- Keep the Bluehost account active as long as you use the PHP API for storage

---

## Environment variables reference (after migration)

| Variable | Value |
|---|---|
| `CUSTOM_STORAGE_URL` | `https://api.foreverbalivillas.com` |
| `CUSTOM_STORAGE_KEY` | *(same secret key, unchanged)* |
| `ADMIN_SECRET` | *(unchanged)* |
| `ADMIN_USERNAME` | *(unchanged)* |
| `ADMIN_PASSWORD` | *(unchanged)* |

---

## If something breaks — rollback plan

If the site goes wrong after DNS change:
1. Change DNS records back to what they were (point back to Bluehost)
2. Change `CUSTOM_STORAGE_URL` back to `https://foreverbalivillas.com/fbv-api`
3. Redeploy Vercel

DNS rollback takes the same 15–60 minutes to propagate.
Your data is always safe on Bluehost — nothing gets deleted in this process.

---

## Is it safe to create the subdomain in cPanel?

**Yes.** Creating a subdomain in cPanel is completely safe:
- It does not affect the main domain (`foreverbalivillas.com`)
- It does not affect WordPress
- It does not move or delete any files
- It just creates a new hostname that points to an existing folder

You can create (and delete) subdomains freely in cPanel without risk.

---

## Summary — order of operations

```
1. Create subdomain in cPanel  (safe, no downtime)
2. Test subdomain URL works
3. Update CUSTOM_STORAGE_URL in Vercel
4. Update next.config.ts CSP + add redirect
5. Push and redeploy Vercel
6. Add domain in Vercel dashboard
7. Change DNS (this causes the cutover — 15–60 min)
8. Verify everything works
```
