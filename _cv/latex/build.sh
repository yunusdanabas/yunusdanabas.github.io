#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

repo_root="$(cd ../.. && pwd)"
main="YunusEmreDanabas_CV.tex"
out_dir="build"
built_pdf="$PWD/$out_dir/YunusEmreDanabas_CV.pdf"
local_pdf="$PWD/YunusEmreDanabas_CV.pdf"
site_pdf="$repo_root/assets/pdf/YunusEmreDanabas_CV.pdf"

latexmk_args=(
  -pdf
  -pdflatex="pdflatex -interaction=nonstopmode -halt-on-error %O %S"
  -outdir="$out_dir"
  -auxdir="$out_dir"
  "$main"
)

sync_pdf() {
  cp -f "$built_pdf" "$local_pdf"
  cp -f "$built_pdf" "$site_pdf"
  printf 'Synced %s\nSynced %s\n' "$local_pdf" "$site_pdf"
}

case "${1:-build}" in
  build)
    latexmk "${latexmk_args[@]}"
    sync_pdf
    ;;
  --watch|-w|watch)
    sync_cmd="cp -f \"$built_pdf\" \"$local_pdf\" && cp -f \"$built_pdf\" \"$site_pdf\" && printf 'Synced CV PDFs\\n'"
    latexmk -e "\$success_cmd = '$sync_cmd';" -pvc "${latexmk_args[@]}"
    ;;
  clean)
    latexmk -C -outdir="$out_dir" -auxdir="$out_dir" "$main"
    rm -rf "$out_dir"
    ;;
  *)
    printf 'usage: %s [build|watch|clean]\n' "$0" >&2
    exit 2
    ;;
esac
