export default function GetMonday(d) {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
}