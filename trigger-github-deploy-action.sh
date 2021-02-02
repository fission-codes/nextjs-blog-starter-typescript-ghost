#!/usr/sh

curl \
  -u $GITHUB_USER:$GITHUB_AUTH_TOKEN \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO/actions/workflows/deploy.yml/dispatches \
  -d '{"ref":"refs/heads/main"}'
