/**
 * Google Apps Script — 관심고객 등록 시트 연동 (멀티 프로젝트)
 *
 * 스프레드시트 ID: 1HPA3ArBpQNmMhaakg22zaKcgP_EjBGFsTISfRVirfLVcQkM3CL5H_Ef-
 *
 * - bunyang 프로젝트  → 1번 시트 (getSheets()[0])
 * - apartment-promo   → 2번 시트 (getSheets()[1])
 *
 * 프론트에서 FormData에 project 파라미터를 보내서 분기합니다.
 * project=apartment-promo → 2번 시트, 그 외 → 1번 시트
 *
 * 사용법:
 * 1. 기존 GAS 코드에 이 내용을 덮어씌우고 저장합니다.
 * 2. [배포] → [배포 관리] → 연필 아이콘 → 새 버전으로 업데이트합니다.
 */

var SPREADSHEET_ID = "15H34WI3b9zoboSya2bs6OzYhdmlXd6KG-FNDxCxxOIw";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var p = e.parameter;

    // project 파라미터로 시트 분기
    var sheetIndex = (p.project === "apartment-promo") ? 1 : 0;
    var sheet = ss.getSheets()[sheetIndex];

    if (!sheet) {
      sheet = ss.insertSheet(sheetIndex === 1 ? "apartment-promo" : "bunyang");
    }

    // 헤더가 없으면 자동 생성
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
