/**
 * Google Apps Script — 관심고객 등록 시트 연동 (멀티 프로젝트)
 *
 * 스프레드시트 ID: 15H34WI3b9zoboSya2bs6OzYhdmlXd6KG-FNDxCxxOIw
 *
 * 시트 배치
 * - 1번 시트(index 0) = 펜타힐즈  ← project=commercial-promo-pentahills
 * - 2번 시트(index 1) = 호반써밋  ← project=apartment-promo
 *
 * 분기 방식: 시트 이름으로 먼저 찾고, 없으면 위치(index)로 폴백합니다.
 * 탭 이름이 "시트1"/"시트2"처럼 기본값이어도 올바른 시트에 기록됩니다.
 *
 * 사용법:
 * 1. 기존 GAS 코드에 이 내용을 덮어씌우고 저장합니다.
 * 2. [배포] → [배포 관리] → 연필 아이콘 → 버전을 "새 버전"으로 → 배포
 *    (새 배포를 만들면 URL이 바뀌므로 반드시 기존 배포를 수정하세요)
 *
 * 확인용: 배포 URL 뒤에 ?project=apartment-promo 를 붙여 브라우저로 열면
 * 어느 시트에 기록되는지 JSON으로 알려줍니다.
 */

var SPREADSHEET_ID = "15H34WI3b9zoboSya2bs6OzYhdmlXd6KG-FNDxCxxOIw";

var PROJECTS = {
  "commercial-promo-pentahills": { name: "펜타힐즈", index: 0 },
  "apartment-promo": { name: "호반써밋", index: 1 },
};
var FALLBACK = { name: "기타", index: 0 };

var HEADER = ["등록일시", "이름", "연락처", "이메일"];

/** 이름으로 찾고 → 없으면 위치로 찾고 → 그래도 없으면 생성 */
function resolveSheet(ss, project) {
  var target = PROJECTS[project] || FALLBACK;

  var sheet = ss.getSheetByName(target.name);
  if (sheet) return sheet;

  var sheets = ss.getSheets();
  if (sheets.length > target.index) return sheets[target.index];

  return ss.insertSheet(target.name);
}

function appendEntry(p) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = resolveSheet(ss, p.project || "");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
  }

  sheet.appendRow([
    new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    p.name || "",
    p.phone || "",
    p.email || "",
  ]);

  return sheet.getName();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheetName = appendEntry(e.parameter || {});

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", sheet: sheetName })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** 브라우저로 열어서 라우팅만 확인 (데이터는 기록하지 않음) */
function doGet(e) {
  var project = (e && e.parameter && e.parameter.project) || "";
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  return ContentService.createTextOutput(
    JSON.stringify({
      project: project,
      routedTo: resolveSheet(ss, project).getName(),
      allSheets: ss.getSheets().map(function (s) { return s.getName(); }),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
