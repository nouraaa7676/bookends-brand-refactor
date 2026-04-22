export interface Book {
  entryDate: string;
  sku: string;
  isbn: string;
  title: string;
  author: string;
  vendor: string;
  language: string;
  quality: string;
  genre: string;
  description: string;
  pages: number;
  quantity: number;
  cost: number;
  price: number;
}

export async function loadBooks(): Promise<Book[]> {
  const response = await fetch("/data/bookends_sample_100.csv");
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text: string): Book[] {
  const lines = text.split("\n");
  const books: Book[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < 14) continue;

    books.push({
      entryDate: fields[0],
      sku: fields[1],
      isbn: fields[2],
      title: fields[3],
      author: fields[4].replace(/;\s*$/, "").trim(),
      vendor: fields[5],
      language: fields[6],
      quality: fields[7],
      genre: fields[8],
      description: fields[9],
      pages: parseInt(fields[10]) || 0,
      quantity: parseInt(fields[11]) || 0,
      cost: parseFloat(fields[12]) || 0,
      price: parseFloat(fields[13]) || 0,
    });
  }

  return books;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}
