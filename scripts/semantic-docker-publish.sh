#!/usr/bin/env bash
set -euo pipefail

VERSION_ARG="${1:-}"
if [[ -z "${VERSION_ARG}" ]]; then
  echo "[release] ERROR: Version argument missing. This script must be called by semantic-release exec with the next release version."
  exit 1
fi

DOCKER_USERNAME="${DOCKER_USERNAME:-}"
DOCKER_ACCESS_TOKEN="${DOCKER_ACCESS_TOKEN:-}"
DOCKER_REPOSITORY="ombudsdan/banjo-hootson-react"

# Optional: specify a custom Docker registry (e.g., for GitHub Container Registry)
DOCKER_REGISTRY="${DOCKER_REGISTRY:-}"

# Login
if [[ -n "${DOCKER_USERNAME}" && -n "${DOCKER_ACCESS_TOKEN}" ]]; then
  if [[ -n "${DOCKER_REGISTRY}" ]]; then
    echo "${DOCKER_ACCESS_TOKEN}" | docker login "${DOCKER_REGISTRY}" -u "${DOCKER_USERNAME}" --password-stdin
  else
    echo "${DOCKER_ACCESS_TOKEN}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
  fi
else
  echo "[release] WARN: No docker credentials provided; assuming runner is already logged in."
fi

# Tag names
if [[ -n "${DOCKER_REGISTRY}" ]]; then
  IMAGE_BASE="${DOCKER_REGISTRY}/${DOCKER_REPOSITORY}"
else
  IMAGE_BASE="${DOCKER_REPOSITORY}"
fi

IMAGE_VERSION_TAG="${IMAGE_BASE}:${VERSION_ARG}"
IMAGE_LATEST_TAG="${IMAGE_BASE}:latest"

echo "[release] Building image ${IMAGE_VERSION_TAG} and ${IMAGE_LATEST_TAG}"
docker build -t "${IMAGE_VERSION_TAG}" -t "${IMAGE_LATEST_TAG}" .

echo "[release] Pushing ${IMAGE_VERSION_TAG}"
docker push "${IMAGE_VERSION_TAG}"

echo "[release] Pushing ${IMAGE_LATEST_TAG}"
docker push "${IMAGE_LATEST_TAG}"

echo "[release] Docker publish complete."
