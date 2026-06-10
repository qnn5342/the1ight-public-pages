const SPREADSHEET_ID = "1Q1SExm-teCljU6NdQ8TmxgnLx_yulg6B31dll0R4Tzo"; // ← thay bằng ID Google Sheet của bạn
const SHEET_NAME     = "AI Workshop Waitlist";

function handleRequest(e) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const data  = (e && e.parameter) ? e.parameter : {};

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Thời gian", "Họ tên", "Email", "Số điện thoại", "Vai trò", "Mục tiêu", "Nguồn", "Trạng thái"]);
  }

  sheet.appendRow([
    new Date(),
    data.name  || "",
    data.email || "",
    data.phone || "",
    data.role  || "",
    data.goal  || "",
    "AI Landing Page Workshop",
    "New",
  ]);

  if (data.email) {
    GmailApp.sendEmail(
      data.email,
      "The1ight đã nhận được thông tin của bạn ✓",
      "",
      {
        htmlBody: `
<div style="font-family:'Be Vietnam Pro',Arial,sans-serif;max-width:520px;margin:0 auto;background:#15333B;color:#F0F0F0;border-radius:12px;overflow:hidden;">
  <div style="background:#1d4049;padding:32px 36px;border-bottom:2px solid #FFD94C;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:#FFD94C;">The1ight Empire</p>
    <h1 style="margin:0;font-size:26px;font-weight:800;color:#FDF5DA;line-height:1.2;">Đã nhận được thông tin của bạn!</h1>
  </div>
  <div style="padding:32px 36px;">
    <p style="font-size:16px;line-height:1.7;color:#F0F0F0;">Xin chào <strong style="color:#FDF5DA;">${data.name || "bạn"}</strong>,</p>
    <p style="font-size:16px;line-height:1.7;color:#F0F0F0;margin-top:12px;">
      The1ight đã ghi nhận thông tin của bạn từ buổi workshop <strong style="color:#FFD94C;">AI Landing Page Thông Minh</strong>.
      Khi có khoá học phù hợp với background của bạn, chúng tôi sẽ liên hệ trực tiếp.
    </p>
    <div style="margin:28px 0;padding:20px;background:#2a5662;border-radius:8px;border-left:4px solid #4E8770;">
      <p style="margin:0;font-size:15px;color:#8ba5ab;">Trong lúc chờ, bạn có thể xem danh sách khoá học hiện tại tại:</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="https://the1ight.com/danh-sach-khoa-hoc/"
         style="display:inline-block;background:#FFD94C;color:#15333B;padding:14px 32px;border-radius:8px;font-weight:800;font-size:16px;text-decoration:none;">
        Xem danh sách khoá học →
      </a>
    </div>
    <p style="font-size:13px;color:#8ba5ab;margin-top:24px;">
      Nếu bạn có câu hỏi, reply email này hoặc nhắn qua fanpage The1ight.
    </p>
  </div>
  <div style="padding:20px 36px;border-top:1px solid #3E5E63;text-align:center;">
    <p style="margin:0;font-size:12px;color:#8ba5ab;">The1ight Empire — AI là đòn bẩy. Độc lập là đích đến.</p>
  </div>
</div>
        `
      }
    );
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e)  { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }
