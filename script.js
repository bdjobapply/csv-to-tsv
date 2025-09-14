document.getElementById('convertBtn').addEventListener('click', function() {
  const input = document.getElementById('csv').value.trim();
  const lines = input.split('\n');
  
  const tsvLines = lines.map(line => csvToArray(line).join('\t'));
  
  document.getElementById('output').value = tsvLines.join('\n');
});

// CSV পার্সার যা ডাবল কোটেশন ভিতরের কমা ঠিকভাবে রাখে
function csvToArray(str) {
  const result = [];
  let curr = '';
  let inQuotes = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '"') {
      if (inQuotes && str[i+1] === '"') {
        // ডাবল কোটেশন ভিতরের ডাবল কোটেশন => একবার যুক্ত করা
        curr += '"';
        i++;
      } else {
        inQuotes = !inQuotes; // কোটেশনের ভিতরে/বাহিরে টগল
      }
    } else if (char === ',' && !inQuotes) {
      // কেবল বাইরের কমা অনুযায়ী আলাদা করা
      result.push(curr);
      curr = '';
    } else {
      curr += char;
    }
  }
  result.push(curr);
  return result;
}
