# Push this update without losing the existing local history

This is a continuation of the same repository, not a new root commit. The
original baseline (`78aa324`) and all previous website commits are ancestors
of the new update. Do not run `git init`, create an orphan branch or copy only
the source ZIP if you want to retain that history.

No remote was configured in the working repository. The remote URL and its
branch/history have therefore **not** been verified. The full-history bundle
preserves every commit available here, but cannot contain older remote commits
that were never supplied.

## Preferred: import into your existing clone

Run inside your existing, clean clone, on the branch you normally deploy.
Replace the bundle path with its actual location:

```bash
git status --short
git branch backup-before-huisklusdienst-update HEAD
git fetch /absolute/path/huisklusdienst-history.bundle master
git merge --ff-only FETCH_HEAD
git push origin HEAD
```

The backup command preserves your old local tip. If the fast-forward succeeds,
**no force push is needed**. If it fails, stop and compare the histories; do not
assume the remote contains nothing worth preserving.

## If you intentionally want to replace the remote branch

This changes the remote branch history. First save its current tip. The example
assumes the remote branch is `main`; replace `main` everywhere if yours differs:

```bash
git fetch origin
git branch backup-remote-before-huisklusdienst origin/main
git fetch /absolute/path/huisklusdienst-history.bundle master
git switch -c huisklusdienst-update FETCH_HEAD
git log --oneline --graph --all -15
git push --force-with-lease origin HEAD:main
```

Use `--force-with-lease`, not plain `--force`: it refuses to overwrite changes
made on the remote since your last fetch. Do not use either option on a shared
branch without coordinating with collaborators.

## Or use the archive containing `.git`

Extract `huisklusdienst-with-history.zip` into a **new, empty directory**.
It contains a complete repository, without dependencies, build outputs,
production credentials or local lead data. It intentionally has no `origin`
URL. Add your existing remote, then fetch and inspect it before pushing:

```bash
git remote add origin YOUR_EXISTING_REMOTE_URL
git fetch origin
git log --oneline --graph --all -15
```

Use a normal push when the histories are compatible. For an intentional
replacement, save the remote tip and use the `--force-with-lease` example above.
Do not extract this `.git` directory over an existing clone's `.git`.

## Check the handoff

```bash
git bundle verify /absolute/path/huisklusdienst-history.bundle
git merge-base --is-ancestor 78aa324 HEAD
git merge-base --is-ancestor 27958c7 HEAD
npm ci
SITE_ORIGIN=https://huisklusdienst.nl npm run release:check
npm run check:launch
```

`check:launch` intentionally fails until the owner confirms the remaining
business details, pricing, legal approval, regulated-work scope and production
lead-notification settings. A passing software check is not a public launch.