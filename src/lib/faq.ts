interface FaqItem {
  q: string;
  a: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    q: "where is your location",
    a: "📖 **Our Location**\n\nDubai Digital Park, Silicon Oasis Building A3, Lower Ground\n\n🕐 Open daily 10am–10pm\n\nCome visit our book haven!",
  },
  {
    q: "can i sell books",
    a: "✨ **Yes!**\n\nWe welcome your books into our collection. You'll receive store credit or cash once your books find new homes.",
  },
  {
    q: "free delivery",
    a: "📚 **Free Delivery**\n\nFree delivery for all orders above AED 180! Your books will arrive in 2-3 business days.",
  },
  {
    q: "delivery cost",
    a: "🚚 **Delivery Costs**\n\n• Dubai/Sharjah/Ajman: AED 19\n• Other Emirates: AED 24\n• Free for orders above AED 180",
  },
  {
    q: "pick up books",
    a: "📦 **Pickup Service**\n\n• AED 25 up to 5kg\n• AED 2 per extra kg\n• Available during operating hours",
  },
  {
    q: "operating hours",
    a: "🕐 **Operating Hours**\n\nMonday - Sunday: 10am - 10pm\nOpen 7 days a week!",
  },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

export function getFaqAnswer(userInput: string): string {
  const inputTokens = tokenize(userInput);
  if (inputTokens.length === 0) {
    return "Please ask a question about our store!";
  }

  let bestScore = 0;
  let bestAnswer = "";

  for (const faq of FAQ_DATA) {
    const faqTokens = tokenize(faq.q);
    let matches = 0;
    inputTokens.forEach((t) => {
      if (faqTokens.some((ft) => ft.includes(t) || t.includes(ft))) matches++;
    });
    const score = matches / Math.max(inputTokens.length, 1);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.a;
    }
  }

  if (bestScore < 0.2) {
    return "I couldn't find an exact answer. Try asking about:\n• 📍 Our location\n• 🚚 Delivery\n• 💫 Selling books\n• 🕐 Store hours";
  }

  return bestAnswer;
}
