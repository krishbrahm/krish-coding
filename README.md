# krish-coding

A collection of application projects. The current active project is `Vocabulary-practice/`.

## Work on another machine

Use the `sync/vocabulary-practice` branch on each machine so both checkouts follow the same history.

On a new machine:

```sh
git clone https://github.com/krishbrahm/krish-coding.git
cd krish-coding
git switch --track origin/sync/vocabulary-practice
```

Before starting work on either machine, update the branch:

```sh
git pull --rebase
```

After making a change, commit and push it:

```sh
git add Vocabulary-practice
git commit -m "Describe the change"
git push
```

Push from one machine before starting work on the other. If both machines have changes, commit and push from the first, then run `git pull --rebase` on the second before continuing.

## Vocabulary practice setup

```sh
cd Vocabulary-practice
npm install
cp .env.example .env.local
npm run dev
```

Fill in the Supabase URL and anon key in `.env.local`. Environment files and installed dependencies are excluded from Git.
