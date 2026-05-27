const SPREADSHEET_ID = "1CbysP9UJxpq_z_3UZtHrN8uomkB_Hqcl4dRXQL3RK1k";
const SHEET_NAME = "201 Registrations";

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = e.parameter || {};

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.role || "",
    data.learned101 || "",
    data.project || "",
    data.goal || "",
    data.source || "Product Builder 201 landing",
    "New",
    "",
    [data.userAgent || "", data.pageUrl || ""].filter(Boolean).join(" | ")
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
