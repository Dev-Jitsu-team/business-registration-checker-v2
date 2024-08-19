function showAlert(message) {
  alert(message);
}

let businessNumberInput = document.getElementById("b_no");
businessNumberInput.addEventListener("input", function(e) {
  let value = e.target.value.replace(/[^\d]/g, "");
  let formattedValue = "";
  if (value.length <= 3) {
    formattedValue = value;
  } else if (value.length <= 5) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 10)}`;
  }
  e.target.value = formattedValue;
});

document.getElementById("b_no").addEventListener("input", function (e) {
  e.target.value = formatBusinessNumber(e.target.value);
});

// 개업일자 입력 처리 (검색 폼)
document.getElementById("search_start_dt_year").addEventListener("input", function (e) {
  if (e.target.value.length === 4) {
    document.getElementById("search_start_dt_month").focus();
  }
});

document.getElementById("search_start_dt_month").addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.length === 1 && parseInt(value) > 1) {
    e.target.value = "0" + value;
  }
  if (e.target.value.length === 2) {
    document.getElementById("search_start_dt_day").focus();
  }
});

document.getElementById("search_start_dt_day").addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.length === 1 && parseInt(value) > 3) {
    e.target.value = "0" + value;
  }
  if (e.target.value.length === 2) {
    // 다음 입력 필드로 이동하거나 포커스를 해제합니다.
    // 예: document.getElementById("next_field_id").focus();
    e.target.blur();
  }
});

// 개업일자 입력 처리 (진위확인 및 상태조회 폼)
document.getElementById("start_dt_year").addEventListener("input", function (e) {
  if (e.target.value.length === 4) {
    document.getElementById("start_dt_month").focus();
  }
});

document.getElementById("start_dt_month").addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.length === 1 && parseInt(value) > 1) {
    e.target.value = "0" + value;
  }
  if (e.target.value.length === 2) {
    document.getElementById("start_dt_day").focus();
  }
});

document.getElementById("start_dt_day").addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.length === 1 && parseInt(value) > 3) {
    e.target.value = "0" + value;
  }
  if (e.target.value.length === 2) {
    // 다음 입력 필드로 이동하거나 포커스를 해제합니다.
    // 예: document.getElementById("next_field_id").focus();
    e.target.blur();
  }
});

function formatStartDate(yearId, monthId, dayId) {
  const year = document.getElementById(yearId).value;
  let month = document.getElementById(monthId).value;
  let day = document.getElementById(dayId).value;

  if (month.length === 1) month = "0" + month;
  if (day.length === 1) day = "0" + day;

  if (year && month && day) {
    return `${year}${month}${day}`;
  }
  return "";
}

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const company_nm = document.getElementById("search_company_nm").value.trim();
  const p_nm = document.getElementById("search_p_nm").value.trim();
  const start_dt = formatStartDate(
    "search_start_dt_year",
    "search_start_dt_month",
    "search_start_dt_day"
  );
  const address = document.getElementById("search_address").value.trim();

  if (!company_nm || !p_nm || !start_dt) {
    showAlert("상호/법인명, 대표자 성명, 개업일자는 필수 입력 항목입니다.");
    return;
  }

  // 실제로는 여기서 국세청 API를 호출해야 합니다.
  // 이 예제에서는 가상의 결과를 반환합니다.
  const mockResult = [
    {
      b_no: "123-45-67890",
      company_nm: "테스트 회사",
      p_nm: "홍길동",
      b_sector: "서비스업",
      start_dt: "20200101",
      address: "서울시 강남구",
    },
    {
      b_no: "098-76-54321",
      company_nm: "샘플 기업",
      p_nm: "김철수",
      b_sector: "제조업",
      start_dt: "20190315",
      address: "경기도 성남시",
    },
  ];

  if (mockResult.length === 0) {
    showAlert("검색 결과가 없습니다. 입력 정보를 확인해주세요.");
  } else {
    displaySearchResult(mockResult);
    showAlert("검색이 완료되었습니다.");
  }
});

document.getElementById("searchReset").addEventListener("click", function () {
  document.getElementById("searchForm").reset();
  document.getElementById("searchResult").innerHTML = "";
  showAlert("검색 폼이 초기화되었습니다.");
});

function displaySearchResult(results) {
  const resultDiv = document.getElementById("searchResult");
  if (results.length === 0) {
    resultDiv.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  let tableHtml = `
        <table>
            <tr>
                <th>사업자등록번호</th>
                <th>상호</th>
                <th>대표자명</th>
                <th>업종</th>
                <th>개업일자</th>
                <th>사업장 소재지</th>
                <th>선택</th>
            </tr>
    `;

  results.forEach((result) => {
    tableHtml += `
            <tr>
                <td>${result.b_no}</td>
                <td>${result.company_nm}</td>
                <td>${result.p_nm}</td>
                <td>${result.b_sector}</td>
                <td>${result.start_dt}</td>
                <td>${result.address}</td>
                <td><button onclick="selectBusiness('${result.b_no}', '${result.start_dt}', '${result.p_nm}', '${result.company_nm}')">선택</button></td>
            </tr>
        `;
  });

  tableHtml += "</table>";
  resultDiv.innerHTML = tableHtml;
}

function selectBusiness(b_no, start_dt, p_nm, company_nm) {
  document.getElementById("b_no").value = b_no;
  document.getElementById("start_dt_year").value = start_dt.slice(0, 4);
  document.getElementById("start_dt_month").value = start_dt.slice(4, 6);
  document.getElementById("start_dt_day").value = start_dt.slice(6, 8);
  document.getElementById("p_nm").value = p_nm;
  document.getElementById("company_nm").value = company_nm;
  showAlert("선택한 사업자 정보가 입력되었습니다.");
}

document
  .getElementById("businessForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const b_no = document.getElementById("b_no").value.replace(/-/g, "").trim();
    const start_dt = formatStartDate(
      "start_dt_year",
      "start_dt_month",
      "start_dt_day"
    );
    const p_nm = document.getElementById("p_nm").value.trim();
    const company_nm = document.getElementById("company_nm").value.trim();

    if (!b_no || !start_dt || !p_nm || !company_nm) {
      showAlert(
        "사업자등록번호, 개업일자, 대표자성명, 상호는 모두 필수 입력 항목입니다."
      );
      return;
    }

    if (!/^\d{10}$/.test(b_no)) {
      showAlert("사업자등록번호는 10자리 숫자로 입력해주세요.");
      return;
    }

    const data = {
      businesses: [
        {
          b_no: b_no,
          start_dt: start_dt,
          p_nm: p_nm,
          company_nm: company_nm,
        },
      ],
    };

  // 진위확인 API 호출
  fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=zMbWz4YcC3pmooUpp4L1A%2Fmxt%2BL2qhqZjUaOIkEbJQWt9SMrL2P3%2F4kXx2nijn2XPmmSslFdJP4X2PtWjTEhpg%3D%3D`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Validate API response:', result); // 응답 로깅
        displayValidateResult(result);
      })
      .catch((error) => {
        console.error("Validate Error:", error);
        document.getElementById("validateResult").innerHTML =
          "<p>진위확인 중 오류가 발생했습니다. 다시 시도해주세요.</p>";
      });
    
    // 상태조회 API 호출
    fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=zMbWz4YcC3pmooUpp4L1A%2Fmxt%2BL2qhqZjUaOIkEbJQWt9SMrL2P3%2F4kXx2nijn2XPmmSslFdJP4X2PtWjTEhpg%3D%3D`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Raw API response:", result); // 전체 응답 로깅
        displayStatusResult(result);
      })
      .catch((error) => {
        console.error("Status Error:", error);
        document.getElementById(
          "statusResult"
        ).innerHTML = `<p>상태조회 중 오류가 발생했습니다: ${error.message}</p>`;
      });
    
function displayValidateResult(result) {
  const validateResultDiv = document.getElementById("validateResult");
  console.log("Validate API Response:", result); // 디버깅을 위한 로그 추가

  if (result.data && result.data.length > 0) {
    const validateInfo = result.data[0];
    const valid = validateInfo.valid === "01" ? "유효함" : "유효하지 않음";
    const validClass = validateInfo.valid === "01" ? "valid" : "invalid";

    validateResultDiv.innerHTML = `
      <h3>진위확인 결과:</h3>
      <table>
        <tr><th>사업자등록번호</th><td>${validateInfo.b_no}</td></tr>
        <tr><th>유효성</th><td class="${validClass}">${valid}</td></tr>
      </table>
    `;
  } else {
    validateResultDiv.innerHTML = `
      <p class="error">진위확인 결과를 불러올 수 없습니다. 입력 정보를 확인하고 다시 시도해주세요.</p>
    `;
  }

  // 입력 필드 유지
  document.getElementById("b_no").value = document.getElementById("b_no").value;
  document.getElementById("start_dt_year").value = document.getElementById("start_dt_year").value;
  document.getElementById("start_dt_month").value = document.getElementById("start_dt_month").value;
  document.getElementById("start_dt_day").value = document.getElementById("start_dt_day").value;
  document.getElementById("p_nm").value = document.getElementById("p_nm").value;
  document.getElementById("company_nm").value = document.getElementById("company_nm").value;
}
  
function displayStatusResult(result) {
  const statusResultDiv = document.getElementById("statusResult");
  console.log("Status API Response:", result); // 디버깅을 위한 로그 추가

  if (result.data && result.data.length > 0) {
    const statusInfo = result.data[0];

    // 각 필드의 존재 여부를 확인하고 기본값 설정
    const b_no = statusInfo.b_no ? formatBusinessNumber(statusInfo.b_no) : "정보 없음";
    const tax_type = statusInfo.tax_type || "정보 없음";
    const tax_type_cd = statusInfo.tax_type_cd || "정보 없음";
    const end_dt = statusInfo.end_dt || "해당없음";
    const utcc_yn = statusInfo.utcc_yn || "정보 없음";
    const tax_type_change_dt = statusInfo.tax_type_change_dt || "정보 없음";
    const invoice_apply_dt = statusInfo.invoice_apply_dt || "정보 없음";

    // 납세자 상태에 따른 설명 추가
    const tax_type_explanation = getTaxTypeExplanation(tax_type);

    statusResultDiv.innerHTML = `
      <h3>상태조회 결과:</h3>
      <table>
        <tr><th>사업자등록번호</th><td>${b_no}</td></tr>
        <tr><th>납세자상태</th><td>${tax_type} (${tax_type_explanation})</td></tr>
        <tr><th>과세유형</th><td>${tax_type_cd}</td></tr>
        <tr><th>폐업일자</th><td>${end_dt}</td></tr>
        <tr><th>단위과세전환폐업여부</th><td>${utcc_yn}</td></tr>
        <tr><th>과세유형전환일자</th><td>${tax_type_change_dt}</td></tr>
        <tr><th>세금계산서적용일자</th><td>${invoice_apply_dt}</td></tr>
      </table>
    `;
  } else {
    statusResultDiv.innerHTML = "<p>상태조회 결과를 불러올 수 없습니다. 응답 데이터가 비어있거나 올바르지 않습니다.</p>";
  }

  // 에러 처리 개선
  if (result.status_code && result.status_code !== 'OK') {
    statusResultDiv.innerHTML += `<p class="error">오류 발생: ${result.message || '알 수 없는 오류'}</p>`;
  }
}

function getTaxTypeExplanation(tax_type) {
  switch (tax_type) {
    case "01":
      return "계속사업자";
    case "02":
      return "휴업자";
    case "03":
      return "폐업자";
    default:
      return "알 수 없음";
  }
}
  
  document.getElementById("businessReset").addEventListener("click", function () {
    document.getElementById("businessForm").reset();
    document.getElementById("validateResult").innerHTML = "";
    document.getElementById("statusResult").innerHTML = "";
    alert("진위확인 및 상태조회 폼이 초기화되었습니다.");
  });

/**
 * 사용자의 요청에 대한 응답을 생성합니다.
 *
 * @param request 사용자의 요청을 나타내는 문자열
 * @return 요청에 대한 응답 문자열
 */
function generateReply(request) {
    return "???청에 대한 응답: " + request;
}

function formatBusinessNumber(number) {
  return number.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
}

// Add event listener for the validateButton
document.getElementById("validateButton").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("businessForm").dispatchEvent(new Event('submit'));
});
