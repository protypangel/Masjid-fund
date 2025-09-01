export class DateFormatter {
  static MonthYear(date: string): string {
    let year: number | null = null;
    let monthIndex: number | null = null;
  
    const match = date.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
    if (match) {
      year = Number(match[1]);
      monthIndex = Number(match[2]) - 1;
    } else {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        year = parsed.getFullYear();
        monthIndex = parsed.getMonth();
      }
    }
  
    if (year !== null && monthIndex !== null) {
      const d = new Date(Date.UTC(year, monthIndex, 1));
      const monthLongFr = d.toLocaleString('fr-FR', { month: 'long', timeZone: 'UTC' });
      const monthAscii = monthLongFr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const three = monthAscii.slice(0, 3).toLowerCase();
      const abbr = three.charAt(0).toUpperCase() + three.slice(1);
      return `${abbr}-${year}`;
    }
    return date;
  }
}
export class StringFormatter {
  static firstLetterToUppercase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}