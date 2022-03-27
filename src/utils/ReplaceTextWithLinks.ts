export default function (
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
    })
    .replace(/https?:\/{1,}.+?(?=\s|$)/gims, (link: string) => {
      return `<a class="blue-bold-link" target="_blank" href="${link}">
        ${decodeURI(link)}
      </a>`;
    });

  return content;
}