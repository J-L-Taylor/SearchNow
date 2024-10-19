// utils/phoneFormatter.ts
export function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.trim().replace(/\D/g, '');
    const match = cleaned.match(/\d/g);
    if (!match) return phoneNumber;

    if (match.length === 11) {
        return ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9], match[10]].join('');
    } else if (match.length === 10) {
        return ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match[7], match[8], match[9]].join('');
    } else if (match.length === 7) {
        return [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join('');
    } else {
        console.log(phoneNumber + ' is not a valid telephone number.');
        return phoneNumber;
    }
}

/*
function formatPhoneNumber(info) {
  var cleaned = ('' + info.selectionText).trim().replace(/\D/g, '');
  var match = cleaned.match(/\d/g);
  if(match){
    var phoneNumber = info.selectionText
    if (match.length == 11) {
      phoneNumber = ['(', match[1], match[2], match[3], ') ', match[4], match[5], match[6], '-', match[7], match[8], match[9],   match[10]].join('');
    } else if (match.length == 10) {
      phoneNumber = ['(', match[0], match[1], match[2], ') ', match[3], match[4], match[5], '-', match[6], match [7], match[8], match[9]].join('');
    } else if (match.length == 7) {
      phoneNumber = [match[0], match[1], match[2], '-', match[3], match[4], match[5], match[6]].join ('');
    } else {
        console.log(info.selectionText + ' is not a valid telephone number.');
    }
  }
  return phoneNumber
}
*/