export default function ReplaceLatexWithURL(
  content: string
): string {
  const LATEX_SERVICE_URL = "//tex.z-dn.net";

  content = content
    .replace(/\[tex\].*?\[\/tex\]/gims, (latex: string) => {
      let latexPath = latex
        .replace(/\[\\?\/?tex\]/g, "")
        .replace(/ +/g, " ")
        .replace(/&amp;/g, "&");

      return `<img class="latex" src="${LATEX_SERVICE_URL}/?f=${encodeURIComponent(latexPath)}" />`;
    });

  return content;
}