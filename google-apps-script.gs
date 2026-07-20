const SPREADSHEET_ID = 'SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ready'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const payload = getPayload(e || {});
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: 'Sheet not found'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const row = [
    new Date(),
    payload.nama || '',
    payload.q1 || '',
    payload.q2 || '',
    payload.q3 || '',
    payload.q4 || '',
    payload.q5 || '',
    payload.q6 || '',
    payload.q7 || '',
    payload.q8 || '',
    payload.q9 || '',
    payload.q10 || '',
    payload.q11 || '',
    payload.q12 || '',
    payload.q13 || '',
    payload.q14 || '',
    payload.q15 || '',
    payload.kelebihan || '',
    payload.kekurangan || '',
    payload.fitur || '',
    payload.saran || ''
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getPayload(e) {
  if (e && e.postData && typeof e.postData.contents === 'string') {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return e.parameter || {};
    }
  }

  if (e && e.parameter) {
    return e.parameter;
  }

  return {};
}
