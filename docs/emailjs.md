# EmailJS templates

This app sends two emails per form submission:

- **Internal notification** (to your team): `template_d1l12yq`
- **Auto-reply** (to the customer): `template_0qbsv13`

The IDs are referenced in `src/lib/emailjs.ts`.

## Auto-reply template (`template_0qbsv13`) - required variables

In the EmailJS dashboard, open template `template_0qbsv13` and set:

- **To Email**: `{{to_email}}`
- **To Name**: `{{to_name}}` (optional)
- **Subject**: you can hardcode it, or use `{{subject}}` (contact form supplies this; order form does not)

Then, in the template content, use:

- `{{{message}}}` if you want to render the passed HTML (recommended for this project)
- `{{message}}` if you want it escaped as plain text

### Data this app sends to the auto-reply template

Contact form (`src/app/contact/page.tsx`):

- `to_name`
- `to_email`
- `subject`
- `message` (HTML block)

Order form (`src/components/OrderForm.tsx`):

- `to_name`
- `to_email`
- `order_id`
- `message` (HTML invoice)

## Optional: move IDs/keys to env vars

You can override the hardcoded values via:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

For logos/images inside emails, set:

- `NEXT_PUBLIC_SITE_URL` (example: `https://calusynthetics.com`)
