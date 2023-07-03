export function toLocalDateString(date: Date): string {
  if (date){
    return date.getFullYear() + "-" + prependZero(date.getMonth() + 1) + "-" + prependZero(date.getDate());
  }
  return "";
}

function prependZero(value: number): string {
  let s = value.toString()
  if (s.length == 1)
    s = "0" + s;
  return s
}
