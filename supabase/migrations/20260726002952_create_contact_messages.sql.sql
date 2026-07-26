/*
# Create contact_messages table (single-tenant, no auth)

1. Purpose
- Stores messages visitors submit through the personal website's contact form.
- The site has no sign-in screen, so writes happen as the anon role.

2. New Tables
- `contact_messages`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — sender's display name
  - `email` (text, not null) — sender's reply-to email
  - `subject` (text, nullable) — optional subject line
  - `message` (text, not null) — the body of the message
  - `read` (boolean, default false) — lets the owner mark a message as handled
  - `created_at` (timestamptz, default now()) — submission time

3. Security
- Row Level Security enabled on `contact_messages`.
- Anyone (anon + authenticated) can INSERT a new message — the contact form is public.
- SELECT / UPDATE / DELETE are restricted to `authenticated` only, so only the site
  owner (after signing in to the Supabase dashboard / studio) can read or manage
  submitted messages. Anonymous visitors cannot list other people's messages.
- No `user_id` column is used because there is no app-level sign-in flow.

4. Notes
- This is a single-tenant personal site; the owner reviews messages via Supabase Studio.
- The anon key client can only insert; it cannot read back messages (by design).
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public insert: any visitor can submit a contact message.
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (the owner via Studio) can read messages.
DROP POLICY IF EXISTS "auth_select_contact_messages" ON contact_messages;
CREATE POLICY "auth_select_contact_messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update (e.g. mark as read).
DROP POLICY IF EXISTS "auth_update_contact_messages" ON contact_messages;
CREATE POLICY "auth_update_contact_messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated users can delete messages.
DROP POLICY IF EXISTS "auth_delete_contact_messages" ON contact_messages;
CREATE POLICY "auth_delete_contact_messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- Index newest-first listing for the owner.
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
ON contact_messages (created_at DESC);
