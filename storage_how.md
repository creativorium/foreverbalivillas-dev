# Storage Setup Guide — Forever Bali Villas

This guide explains how to connect a storage backend so that content edits
and image uploads in the admin panel go live immediately without redeployment.

---

## Which option should I use?

| Situation | Use |
|---|---|
| You already have shared hosting (WordPress etc.) | **Option A — Shared Hosting** |
| You deploy on Vercel and want the simplest setup | **Option B — Vercel KV + Blob** |
| Just local development | Nothing needed — files are used automatically |

---

## Option A — Shared Hosting (PHP API)

### What you need
- A shared hosting account (cPanel, Plesk, etc.)
- PHP 7.4+ (almost all hosts have this)
- Your hosting domain (e.g. `https://yourdomain.com`)

### Step 1 — Create the API folder on your hosting

Using your hosting file manager or FTP, create this folder:
```
/public_html/fbv-api/
```

### Step 2 — Upload these 4 files into `/public_html/fbv-api/`

#### `.htaccess`
```apache
Options -Indexes
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, X-Api-Key"

RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

#### `auth.php`
```php
<?php
function require_auth() {
    $key      = $_SERVER['HTTP_X_API_KEY'] ?? '';
    $expected = 'REPLACE_WITH_YOUR_SECRET_KEY';  // ← put your secret key here
    if (!hash_equals($expected, $key)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}
```

#### `content.php`
```php
<?php
require_once __DIR__ . '/auth.php';
header('Content-Type: application/json');

$file = __DIR__ . '/data/site-content.json';
if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') { exit; }
require_auth();

if ($method === 'GET') {
    echo file_exists($file) ? file_get_contents($file) : '{}';
} elseif ($method === 'PUT') {
    $body = file_get_contents('php://input');
    if (json_decode($body) === null) {
        http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit;
    }
    file_put_contents($file, $body);
    echo $body;
}
```

#### `upload.php`
```php
<?php
require_once __DIR__ . '/auth.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
require_auth();

$upload_dir = __DIR__ . '/images/';
if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    http_response_code(400); echo json_encode(['error' => 'No file']); exit;
}

$file     = $_FILES['file'];
$allowed  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
$max_size = 10 * 1024 * 1024; // 10MB

if (!in_array($file['type'], $allowed)) {
    http_response_code(400); echo json_encode(['error' => 'File type not allowed']); exit;
}
if ($file['size'] > $max_size) {
    http_response_code(400); echo json_encode(['error' => 'File too large (max 10MB)']); exit;
}

$ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
$name     = preg_replace('/[^a-z0-9-]/', '', strtolower(pathinfo($file['name'], PATHINFO_FILENAME)));
$filename = $name . '-' . time() . '.' . $ext;

if (!move_uploaded_file($file['tmp_name'], $upload_dir . $filename)) {
    http_response_code(500); echo json_encode(['error' => 'Upload failed']); exit;
}

$base = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
$path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $upload_dir);
echo json_encode(['url' => $base . $path . $filename, 'filename' => $filename]);
```

### Step 3 — Generate a secret key

Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output. This is your secret key.

Put it in `auth.php` where it says `REPLACE_WITH_YOUR_SECRET_KEY`.

### Step 4 — Add environment variables to Vercel

In your Vercel project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `CUSTOM_STORAGE_URL` | `https://yourdomain.com/fbv-api` |
| `CUSTOM_STORAGE_KEY` | *(your secret key from Step 3)* |

### Step 5 — Deploy

Push/deploy your Next.js site. The admin will show:
> ✓ **Live mode (Shared Hosting)** — changes go live immediately.

Images you upload will be served from:
`https://yourdomain.com/fbv-api/images/filename.jpg`

---

## Option B — Vercel KV + Blob

### For content (text, blog posts, settings)

1. Go to your Vercel project → **Storage** tab
2. Click **Create** next to **Redis** (powered by Upstash)
3. Name it `fbv-store`, choose the free plan
4. Click **Connect to Project** — Vercel auto-adds these env vars:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
5. Deploy once — content edits go live immediately

### For images

1. Go to your Vercel project → **Storage** tab
2. Click **Create** next to **Blob**
3. Name it `fbv-media`
4. Click **Connect to Project** — Vercel auto-adds:
   - `BLOB_READ_WRITE_TOKEN`
5. Deploy — image uploads in the admin go live immediately

---

## Environment variable summary

| Variable | Option A (Shared Hosting) | Option B (Vercel) |
|---|---|---|
| `CUSTOM_STORAGE_URL` | `https://yourdomain.com/fbv-api` | — |
| `CUSTOM_STORAGE_KEY` | Your generated secret | — |
| `KV_REST_API_URL` | — | Auto-added by Vercel |
| `KV_REST_API_TOKEN` | — | Auto-added by Vercel |
| `BLOB_READ_WRITE_TOKEN` | — | Auto-added by Vercel |
| `ADMIN_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` | Same |
| `ADMIN_USERNAME` | `admin` | Same |
| `ADMIN_PASSWORD` | Your chosen password | Same |

---

## After setup — what the admin can do

| Feature | Where in admin |
|---|---|
| Edit all page copy, titles, CTAs | Pages → Homepage / FAQ / Villas |
| Add/remove FAQ questions | Pages → FAQ |
| Add/remove blog categories | Pages → Blog Categories |
| Add/edit/delete blog posts with full body text | Blog Posts |
| Upload images, copy URLs, manage media | Media Library |
| Edit contact info, social links, booking URL | Site Settings |
| Add/remove admin users | Users |

---

## Local development

No setup needed. The system falls back to JSON files in `src/data/`:
- `src/data/site-content.json` — page content
- `src/data/site-settings.json` — contact + social links
- `src/data/posts.json` — blog posts
- `public/uploads/` — uploaded images (local only)

Changes in local dev are saved to these files directly.
