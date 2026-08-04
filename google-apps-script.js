/**
 * Google Apps Script — 관심고객 등록 시트 연동 (멀티 프로젝트)
 *
 * 스프레드시트 ID: 15H34WI3b9zoboSya2bs6OzYhdmlXd6KG-FNDxCxxOIw
 *
 * 시트 이름으로 분기합니다 (인덱스 아닌 이름 기반):
 * - project=apartment-promo → "호반써밋" 시트
 * - 그 외                  → "기본" 시트
 *
 * 프론트에서 FormData body에 project 파라미터를 보내서 분기합니다.
 *
 * 사용법:
 * 1. 기존 GAS 코드에 이 내용을 덮어씌우고 저장합니다.
 * 2. [배포] → [배포 관리] → 연필 아이콘 → 새 버전으로 업데이트합니다.
 */

var SPREADSHEET_ID = "15H34WI3b9zoboSya2bs6OzYhdmlXd6KG-FNDxCxxOIw";

var SHEET_MAP = {
  "apartment-promo": "호반써밋",
  "commercial-promo-pentahills": "펜타힐즈",
};
var DEFAULT_SHEET = "기본";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var p = e.parameter;

    var project = p.project || "";
    var sheetName = SHEET_MAP[project] || DEFAULT_SHEET;
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["등록일시", "이름", "연락처", "이메일"]);
    }

    sheet.appendRow([
      new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      p.name || "",
      p.phone || "",
      p.email || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
