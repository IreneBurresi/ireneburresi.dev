#!/usr/bin/env python3
"""
Script per convertire i template HTML in PDF usando WeasyPrint.

Installazione:
    pip install weasyprint

Uso:
    python convert-to-pdf.py

Output: Genera tutti i PDF nella directory corrente
"""

from weasyprint import HTML
from pathlib import Path

def convert_template(html_file: Path, output_dir: Path):
    """Converte un singolo template HTML in PDF"""
    pdf_name = html_file.stem + '.pdf'
    pdf_path = output_dir / pdf_name

    print(f"📄 Conversione {html_file.name} → {pdf_name}")

    try:
        HTML(filename=str(html_file)).write_pdf(str(pdf_path))
        print(f"   ✅ Creato: {pdf_path}")
    except Exception as e:
        print(f"   ❌ Errore: {e}")

def main():
    # Directory dei template
    template_dir = Path(__file__).parent
    output_dir = template_dir / 'output'
    output_dir.mkdir(exist_ok=True)

    # Trova tutti i template HTML
    templates = sorted(template_dir.glob('template-*.html'))

    if not templates:
        print("❌ Nessun template trovato!")
        return

    print(f"\n🚀 Trovati {len(templates)} template da convertire\n")

    # Converti ogni template
    for template in templates:
        convert_template(template, output_dir)

    print(f"\n✅ Conversione completata! PDF salvati in: {output_dir}")
    print(f"\nPer visualizzare: open {output_dir}")

if __name__ == '__main__':
    main()
