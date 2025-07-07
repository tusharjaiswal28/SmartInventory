
function Reports({ items }) {
  const total = items.length;
  const qty = items.reduce((sum, i) => sum + Number(i.quantity), 0);
  const topCategory = (() => {
    const map = {};
    items.forEach(i => map[i.category] = (map[i.category] || 0) + 1);
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  })();
  return (
    <div>
      <p>Total Items: {total}</p>
      <p>Total Quantity: {qty}</p>
      <p>Top Category: {topCategory}</p>
    </div>
  );
}
export default Reports;