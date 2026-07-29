// ================================================================
// DỮ LIỆU 24 BÀI HỌC SƠ CẤP CỨU
// ================================================================

const ICON_ANIM_MAP = {
  '🔥': 'icon-fire',
  '❤️': 'icon-heart', '🫀': 'icon-heart', '🫁': 'icon-lung',
  '🦴': 'icon-bone',
  '⚡': 'icon-electric',
  '🧠': 'icon-brain',
  '🐍': 'icon-snake',
  '🐝': 'icon-bug',
  '❄️': 'icon-snowflake',
  '☀️': 'icon-sun',
  '🆘': 'icon-sos', '🚨': 'icon-alert',
  '⚠️': 'icon-warning',
  '🌡️': 'icon-thermometer',
  '🐾': 'icon-paw',
  '🐕': 'icon-dog',
  '🩸': 'icon-blood',
  '🩹': 'icon-bandage',
  '🍲': 'icon-food',
  '🩺': 'icon-medical', '💉': 'icon-medical',
  '🏊': 'icon-wave',
  '🦵': 'icon-pulse', '🦾': 'icon-pulse', '🤧': 'icon-pulse',
};

function getIconAnimClass(emoji) {
  return ICON_ANIM_MAP[emoji] || '';
}

const LESSON_VIDEOS = {
  "drs-abc": "Q8VYrGMkbyo",
  "gay-xuong": "MHjtFaphAiY",
  "dich-vat-duong-tho": "tbRcZWNX0uw",
  "chay-mau": "mSiQV-EPEfQ",
  "bong-gan": "K8Cf9g5EHgc",
  "trat-khop": "K8Cf9g5EHgc",
  "di-ung": "e6oHn7o8uR4",
  "cho-can": "KhXGYTx5lbw",
  "ran-can": "HIQfbR9sekQ",
  "dot-quy": "SKs8EKh_3SQ",
  "duoi-nuoc": "5nje70dIJlY",
  "bong": "VofLtYWyKHs",
  "dien-giat": "jnEPlXDqdy8",
  "cpr": "MS4mESUI9Oc",
  "ha-than-nhiet": "CkBMBPRN2XI",
  "ngo-doc-thuc-pham": "d1w2rjYuqgo",
  "co-giat-dong-kinh": "3sypXJceRfI",
  "cham-thuong-cot-song": "Rf-OBHpbVQY",
  "nhoi-mau-co-tim": "1VxQt1QBrSo",
  "ha-duong-huyet": "ybQEIFFxpGg",
  "vet-thuong-phan-mem": "hCpQRAAhs94",
  "say-nang": "UCHbYZjZ4vg",
};

function getLessonVideo(lessonId) {
  return LESSON_VIDEOS[lessonId] || null;
}

const lessons = [
  {
    id: "drs-abc",
    title: "Tiếp cận nạn nhân - DRs. ABC",
    icon: "🆘",
    color: "red",
    category: ["cấp cứu"],
    moTa: "Quy trình DRs. ABC là nền tảng của sơ cứu, giúp đánh giá và xử trí nạn nhân một cách có hệ thống.",
    doiTuongNguyCo: "Mọi đối tượng trong tình huống khẩn cấp, đặc biệt là tai nạn giao thông, đuối nước, ngã cao.",
    customLabels: { phanLoai: "Các bước đánh giá", quyTrinh: "Chi tiết các bước" },
    content: {
      dauHieuChacChan: [
        "Nạn nhân bất tỉnh, không phản ứng",
        "Không thở hoặc thở bất thường",
        "Không bắt được mạch"
      ],
      dauHieuNghiVan: [
        "Quy trình DRs. ABC là bộ công cụ giúp xác định nhanh và can thiệp kịp thời các tình trạng đe dọa tính mạng.",
        "Nguyên tắc: Giải quyết triệt để từng bước theo thứ tự trước khi chuyển sang bước tiếp theo.",
        "Đặc biệt: Nếu nghi ngờ chấn thương cột sống (tai nạn giao thông, ngã cao, đau vùng cổ/lưng, tê bì chân tay) → KHÔNG ngửa đầu, chỉ dùng kỹ thuật nâng hàm."
      ],
      phanLoai: [
        { ten: "D - Danger (Nguy hiểm)", moTa: "Đảm bảo hiện trường an toàn (điện, cháy nổ, xe cộ). Không mạo hiểm sự an toàn của bản thân. Nếu có nguy cơ, di chuyển nạn nhân ra xa (chỉ khi an toàn).", color: "red" },
        { ten: "R - Response (Đáp ứng)", moTa: "Kiểm tra nạn nhân có tỉnh không bằng cách lay gọi 'Bạn có ổn không?' hoặc kích thích đau (véo vào mặt trong cánh tay). Nếu không đáp ứng → bất tỉnh.", color: "orange" },
        { ten: "S - Send for help (Kêu gọi)", moTa: "Gọi ngay tổng đài 115, hô hoán người xung quanh đến giúp đỡ. Càng sớm càng tốt.", color: "yellow" },
        { ten: "A - Airway (Đường thở)", moTa: "Khai thông đường thở: nếu nạn nhân bất tỉnh, dùng kỹ thuật ngửa đầu nâng cằm (trừ khi nghi ngờ chấn thương cột sống cổ thì dùng nâng hàm). Loại bỏ dị vật nếu có.", color: "blue" },
        { ten: "B - Breathing (Hô hấp)", moTa: "Nhìn, nghe, cảm nhận hơi thở trong 5-10 giây. Nếu không thở → bắt đầu CPR ngay lập tức (ép tim 30:2).", color: "green" },
        { ten: "C - Circulation (Tuần hoàn)", moTa: "Đánh giá màu da (hồng hào hay tái nhợt), nhiệt độ chi, kiểm tra thời gian đổ đầy mao mạch (ấn đầu ngón tay, thả ra, nếu lâu hơn 2 giây → tưới máu kém). Kiểm soát chảy máu nếu có.", color: "teal" }
      ],
      quyTrinh: [
        "1. D (Danger): Quan sát hiện trường, loại bỏ nguy cơ (tắt cầu dao điện, dẹp xe cộ, dập lửa...). Bảo vệ bản thân trước khi tiếp cận.",
        "2. R (Response): Lay gọi nạn nhân. Nếu không trả lời, hãy kích thích đau ở vùng da mỏng (mặt trong cánh tay).",
        "3. S (Send for help): Gọi 115 hoặc nhờ người khác gọi. Báo rõ địa điểm, tình trạng nạn nhân.",
        "4. A (Airway): Đặt nạn nhân nằm ngửa. Nếu không nghi chấn thương cột sống, một tay đặt lên trán ấn nhẹ, tay kia nâng cằm. Nếu nghi chấn thương cột sống, dùng hai tay nâng hàm (không ngửa đầu).",
        "5. B (Breathing): Áp tai sát miệng nạn nhân, nhìn lồng ngực. Nếu không thở → thổi ngạt 2 cái (mỗi cái 1 giây).",
        "6. C (Circulation): Bắt mạch cảnh (nếu không có mạch và nạn nhân bất tỉnh → ép tim). Nếu có chảy máu ngoài → ép trực tiếp cầm máu."
      ],
      luuY: "Quy trình này cần hoàn thành trong vòng 5 phút đầu. Nếu ở bất kỳ bước nào phát hiện vấn đề đe dọa tính mạng (như ngưng thở, ngưng tim), hãy can thiệp ngay trước khi chuyển bước tiếp theo. Ghi nhớ: DRs. ABC = Cứu người trong 'phút vàng'.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296090/Quy-trinh-so-cuu-DRs-ABC_yl4srk.png" class="illustration-img img-viewer" alt="DRs. ABC" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=DRs.+ABC'"><p class="text-xs text-gray-500 mt-1">Sơ đồ tiếp cận nạn nhân DRs. ABC</p></div>`
    }
  },
  {
    id: "gay-xuong",
    title: "Gãy xương",
    icon: "🦴",
    color: "orange",
    category: ["chấn thương"],
    moTa: "Gãy xương là tổn thương thường gặp do tai nạn, ngã. Sơ cứu đúng cách giúp giảm đau và ngăn biến chứng.",
    doiTuongNguyCo: "Người già (loãng xương), trẻ em hiếu động, vận động viên, công nhân xây dựng.",
    content: {
      dauHieuChacChan: [
        "Biến dạng chi (gập góc, ngắn lại, xoay bất thường)",
        "Tiếng lạo xạo của xương khi sờ hoặc cử động nhẹ",
        "Cử động bất thường ở vùng không có khớp (cử động như khớp giả)"
      ],
      dauHieuNghiVan: [
        "Đau dữ dội, sưng to tại vùng bị thương",
        "Bầm tím rộng, có thể kèm vết thương hở (gãy hở)",
        "Nạn nhân không thể cử động hoặc chịu lực lên chi bị thương"
      ],
      phanLoai: [
        { ten: "Gãy kín", moTa: "Xương gãy nhưng không rách da, nguy cơ nhiễm trùng thấp, nhưng có thể mất máu trong vùng gãy.", color: "blue" },
        { ten: "Gãy hở", moTa: "Đầu xương gãy đâm thủng da, vết thương hở, nguy cơ nhiễm trùng cao, mất máu nhiều. Cần che phủ vết thương sạch, không ấn trực tiếp vào xương lộ.", color: "red" }
      ],
      quyTrinh: [
        "1. Gọi 115 ngay sau khi sơ cứu ban đầu, đồng thời kiểm tra ABC (đường thở, hô hấp, tuần hoàn).",
        "2. Kiểm tra mạch và cảm giác ở đầu chi trước khi cố định.",
        "3. Đặt nạn nhân ở tư thế thoải mái, ít đau nhất. Không cố gắng nắn hoặc kéo thẳng xương gãy.",
        "4. Bất động vùng gãy bằng nẹp tạm (que, báo cuộn) hoặc đệm quần áo, cố định ít nhất hai khớp trên và dưới vị trí gãy.",
        "5. Nếu gãy hở, dùng gạc vô trùng hoặc vải sạch che phủ vết thương, không ấn trực tiếp vào xương lộ. Cầm máu nhẹ nhàng xung quanh.",
        "6. Giữ ấm nạn nhân, nâng cao chi bị thương nếu không gây đau thêm, chờ xe cấp cứu."
      ],
      luuY: "Tuyệt đối không tự ý kéo thẳng xương gãy, không di chuyển nạn nhân khi chưa cố định. Với nghi ngờ gãy xương đùi, xương chậu, đa chấn thương, ưu tiên bất động toàn thân và chống sốc.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296090/Huong-dan-so-cuu-gay-xuong_lsvlvd.png" class="illustration-img img-viewer" alt="Sơ cứu gãy xương" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=G%C3%A3y+x%C6%B0%C6%A1ng'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu gãy xương</p></div>`
    }
  },
  {
    id: "dich-vat-duong-tho",
    title: "Dị vật đường thở",
    icon: "🫁",
    color: "purple",
    category: ["cấp cứu"],
    moTa: "Dị vật đường thở là tình huống nguy kịch, có thể dẫn đến ngạt thở nếu không xử trí kịp thời.",
    doiTuongNguyCo: "Trẻ nhỏ, người già, người vừa ăn vừa nói chuyện, bệnh nhân rối loạn nuốt.",
    content: {
      dauHieuChacChan: [
        "Hóc hoàn toàn: nạn nhân không thở, không ho, không nói được, hai tay ôm cổ",
        "Nhanh chóng tím tái, mất ý thức"
      ],
      dauHieuNghiVan: [
        "Hóc không hoàn toàn: nạn nhân vẫn thở được, ho dữ dội, kích thích, có thể nói được.",
        "Có thể ho khạc ra được dị vật."
      ],
      phanLoai: [
        { ten: "Hóc không hoàn toàn", moTa: "Còn thở, khuyến khích ho mạnh, theo dõi sát.", color: "yellow" },
        { ten: "Hóc hoàn toàn", moTa: "Cần thực hiện thủ thuật ngay. Nếu nạn nhân bất tỉnh, bắt đầu CPR.", color: "red" }
      ],
      quyTrinh: [
        "1. HÓC KHÔNG HOÀN TOÀN (người tỉnh): khuyến khích ho mạnh. KHÔNG can thiệp nếu ho hiệu quả.",
        "2. HÓC HOÀN TOÀN - Người lớn/trẻ >1 tuổi:",
        "   a. Đứng sau, một chân giữa hai chân nạn nhân.",
        "   b. Nắm đấm đặt trên thượng vị (trên rốn, dưới mũi ức).",
        "   c. Tay kia ôm nắm đấm, thúc mạnh 5 cái từ sau ra trước, từ dưới lên trên.",
        "   d. Sau mỗi 5 cái kiểm tra xem dị vật đã bật ra chưa.",
        "3. HÓC HOÀN TOÀN - Trẻ <1 tuổi (em bé):",
        "   a. Đặt em nằm sấp trên cánh tay, đầu thấp hơn ngực.",
        "   b. Vỗ lưng 5 cái giữa hai bả vai bằng lòng bàn tay.",
        "   c. Nếu chưa ra, lật em nằm ngửa, ấn ngực 5 cái (2 ngón tay ấn vào giữa ngực, ngay dưới đường nối hai núm vú).",
        "   d. Lặp lại vỗ lưng 5 + ấn ngực 5 cho đến khi dị vật ra hoặc em bất tỉnh.",
        "4. Nếu nạn nhân hôn mê: đặt nằm ngửa, bắt đầu CPR ngay với tỉ lệ 30:2. Kiểm tra miệng trước mỗi chu kỳ thổi ngạt."
      ],
      luuY: "Tuyệt đối không vỗ lưng khi hóc hoàn toàn ở người lớn (có thể làm dị vật tụt sâu hơn). Không móc họng khi chưa nhìn thấy dị vật. Trẻ em dưới 1 tuổi: KHÔNG ép bụng (Heimlich), chỉ dùng vỗ lưng + ấn ngực.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785295319/So-cuu-hoc-di-vat_uxlhya.png" class="illustration-img img-viewer" alt="Dị vật đường thở" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=D%E1%BB%8B+v%E1%BA%ADt+%C4%91%C6%B0%E1%BB%9Dng+th%E1%BB%9F'"><p class="text-xs text-gray-500 mt-1">Sơ cứu dị vật đường thở – thủ thuật Heimlich và vỗ lưng cho trẻ</p></div>`
    }
  },
  {
    id: "chay-mau",
    title: "Chảy máu / Mất máu",
    icon: "🩸",
    color: "red",
    category: ["cấp cứu"],
    moTa: "Mất máu cấp tính có thể gây sốc và tử vong. Cầm máu nhanh là kỹ năng sống còn theo hướng dẫn cấp cứu 2024.",
    doiTuongNguyCo: "Nạn nhân tai nạn, phẫu thuật, bệnh nhân rối loạn đông máu, người dùng thuốc chống đông.",
    content: {
      dauHieuChacChan: [
        "Máu chảy thành tia (động mạch) hoặc chảy ồ ạt, thấm nhanh qua băng",
        "Nạn nhân có dấu hiệu sốc giảm thể tích: da xanh, vã mồ hôi lạnh, mạch nhanh nhỏ, huyết áp tụt."
      ],
      dauHieuNghiVan: [
        "Chảy máu chậm hơn từ tĩnh mạch, máu đỏ sẫm, chảy đều.",
        "Chảy máu trong: sau chấn thương bụng/ngực, nạn nhân đau, bụng chướng, da xanh, không có vết thương ngoài."
      ],
      phanLoai: [
        { ten: "Chảy máu động mạch", moTa: "Máu đỏ tươi, phun thành tia theo nhịp tim. Nguy cơ mất máu nhanh. Cần ép trực tiếp và garo nếu cần.", color: "red" },
        { ten: "Chảy máu tĩnh mạch", moTa: "Máu đỏ sẫm, chảy đều. Cầm bằng ép trực tiếp và băng ép.", color: "orange" },
        { ten: "Chảy máu trong", moTa: "Nghi ngờ khi có chấn thương vùng bụng/ngực, nạn nhân sốc không rõ nguyên nhân, cần cấp cứu ngay.", color: "gray" }
      ],
      quyTrinh: [
        "1. Đảm bảo an toàn: đeo găng tay (hoặc dùng túi nilon, vải sạch).",
        "2. Ép trực tiếp lên vết thương bằng gạc hoặc vải sạch, giữ chặt ít nhất 10 phút không gián đoạn. Nếu gạc thấm máu, đặt thêm lớp mới lên trên, không bỏ lớp cũ ra.",
        "3. Nâng cao chi bị thương (nếu không có gãy xương) để giảm chảy máu.",
        "4. Băng ép cố định gạc, nhưng không quá chặt gây hoại tử đầu chi.",
        "5. Nếu máu vẫn chảy nhiều, ép thêm điểm ép động mạch phía trên vết thương (cánh tay, bẹn). Trường hợp đe dọa tính mạng có thể dùng garo (ga-rô) nhưng phải ghi rõ thời gian và thông báo cho nhân viên y tế.",
        "6. Chảy máu mũi: cúi đầu về phía trước, bóp phần mềm mũi 10-15 phút, chườm lạnh sống mũi."
      ],
      luuY: "Không rút dị vật đâm trong vết thương (dao, mảnh thủy tinh) vì có thể gây chảy máu ồ ạt. Không băng quá chặt. Gọi 115 ngay nếu chảy máu nhiều hoặc nghi ngờ chảy máu trong. Nếu buộc phải dùng garo tự chế, bắt buộc dùng dây bản to (vải rộng 3-5cm) và có thanh vặn (cành cây, bút to) xoắn chặt. Tuyệt đối không dùng dây thun nhỏ, dây giày hay dây thép để tránh hội chứng garo tĩnh mạch làm máu chảy ồ ạt hơn.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296090/So-cuu-cam-mau-dung-cach_tk7cmo.png" class="illustration-img img-viewer" alt="Cầm máu" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ch%E1%BA%A3y+m%C3%A1u'"><p class="text-xs text-gray-500 mt-1">Sơ cứu cầm máu đúng cách</p></div>`
    }
  },
  {
    id: "soc-giam-the-tich",
    title: "Sốc giảm thể tích",
    icon: "⚠️",
    color: "dark",
    category: ["cấp cứu"],
    moTa: "Sốc giảm thể tích là tình trạng mất máu hoặc mất dịch nghiêm trọng, đe dọa tính mạng.",
    doiTuongNguyCo: "Nạn nhân chấn thương, bỏng, tiêu chảy kéo dài, nôn ói nhiều.",
    content: {
      dauHieuChacChan: [
        "Nhịp tim nhanh (>100), thở nhanh",
        "Da xanh, tái, lạnh, vã mồ hôi",
        "Tụt huyết áp, lơ mơ, mất ý thức"
      ],
      dauHieuNghiVan: [
        "Mạch nhanh nhỏ, huyết áp tụt",
        "Thở nhanh, nông",
        "Tiểu ít hoặc không tiểu"
      ],
      phanLoai: [
        { ten: "Sốc do mất máu", moTa: "Chảy máu cấp tính, mất >20% thể tích máu.", color: "red" },
        { ten: "Sốc do mất dịch", moTa: "Tiêu chảy, nôn ói, bỏng mất dịch lớn.", color: "orange" }
      ],
      quyTrinh: [
        "1. Gọi 115 ngay, cầm máu nếu có.",
        "2. Nạn nhân nằm, nâng chân cao hơn đầu (30-45°).",
        "3. Đắp chăn giữ ấm, không cho ăn uống.",
        "4. Theo dõi ABC, sẵn sàng CPR."
      ],
      luuY: "Sốc mất máu có thể tử vong trong vài phút. Ưu tiên cầm máu và gọi 115.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296083/Soc-giam-the-tich-mau_ssdkft.png" class="illustration-img img-viewer" alt="Sốc giảm thể tích" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=S%E1%BB%91c+gi%E1%BA%A3m+th%E1%BB%83+t%C3%ADch'"><p class="text-xs text-gray-500 mt-1">Sơ cứu sốc giảm thể tích – nâng chân cao hơn tim</p></div>`
    }
  },
  {
    id: "bong-gan",
    title: "Bong gân",
    icon: "🦵",
    color: "teal",
    category: ["chấn thương"],
    moTa: "Bong gân là tổn thương dây chằng do vận động sai tư thế. Sơ cứu kịp thời theo nguyên tắc PRICE giúp giảm sưng đau.",
    doiTuongNguyCo: "Vận động viên, người chơi thể thao, người đi bộ không ổn định.",
    content: {
      dauHieuChacChan: [
        "Đau nhói đột ngột tại điểm dây chằng",
        "Sưng nề, bầm tím nhanh",
        "Hạn chế cử động khớp, không thể chịu lực"
      ],
      dauHieuNghiVan: [
        "Có tiếng 'rách' hoặc 'bùng' khi bị thương",
        "Khớp cảm giác lỏng lẻo, không vững",
        "Đau tăng dần sau vận động"
      ],
      phanLoai: [
        { ten: "Độ 1 (nhẹ)", moTa: "Dây chằng giãn, đau ít, không bất động khớp.", color: "green" },
        { ten: "Độ 2 (vừa)", moTa: "Rách một phần, sưng bầm, hạn chế vận động.", color: "yellow" },
        { ten: "Độ 3 (nặng)", moTa: "Đứt hoàn toàn, khớp mất vững, không chịu lực được.", color: "red" }
      ],
      quyTrinh: [
        "1. P (Protection): dừng vận động, bảo vệ khớp.",
        "2. R (Rest): nghỉ ngơi hoàn toàn.",
        "3. I (Ice): chườm lạnh bọc vải 15-20 phút/lần, cách 2-3h.",
        "4. C (Compression): băng ép băng thun, không quá chặt.",
        "5. E (Elevate): kê cao chi bị thương.",
        "6. Sau 48-72h: chườm ấm, vận động nhẹ dần.",
        "7. Nếu đau nhiều, sưng nặng, hoặc nghi ngờ độ 3: đến cơ sở y tế."
      ],
      luuY: "Sau 48h có thể chườm ấm. Nếu không cải thiện sau 3-5 ngày, đi khám chuyên khoa. Tránh HARM trong 72 giờ đầu.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296088/So-cuu-bong-gan-trat-khop_ddgms9.png" class="illustration-img img-viewer" alt="Bong gân và trật khớp" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Bong+g%C3%A2n+tr%E1%BA%ADt+kh%E1%BB%9Bp'"><p class="text-xs text-gray-500 mt-1">Sơ cứu bong gân – trật khớp</p></div>`
    }
  },
  {
    id: "trat-khop",
    title: "Trật khớp",
    icon: "🦾",
    color: "indigo",
    category: ["chấn thương"],
    moTa: "Trật khớp xảy ra khi đầu xương bị lệch khỏi vị trí, gây đau và mất chức năng vận động.",
    doiTuongNguyCo: "Người chơi thể thao, người già, người có tiền sử trật khớp vai.",
    content: {
      dauHieuChacChan: [
        "Biến dạng rõ tại khớp (khác bên lành)",
        "Sờ thấy ổ khớp rỗng",
        "Dấu hiệu lò xo (cố nắn thì bật lại)"
      ],
      dauHieuNghiVan: [
        "Đau dữ dội, không cử động được khớp",
        "Sưng nề vùng khớp"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Kiểm tra mạch và cảm giác ở đầu chi trước khi cố định.",
        "2. Trấn an nạn nhân, không cố nắn khớp.",
        "3. Gọi 115 ngay.",
        "4. Bất động khớp ở tư thế hiện tại bằng nẹp hoặc địu.",
        "5. Chườm lạnh giảm đau, nâng chi nếu không gây đau thêm.",
        "6. Theo dõi mạch và cảm giác ở đầu chi trong khi chờ cấp cứu."
      ],
      luuY: "Tuyệt đối không tự nắn, có thể gây gãy xương hoặc tổn thương mạch máu, dây thần kinh. Trật khớp vai dễ tái phát, cần theo dõi chuyên khoa.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296088/So-cuu-bong-gan-trat-khop_ddgms9.png" class="illustration-img img-viewer" alt="Trật khớp" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Tr%E1%BA%ADt+kh%E1%BB%9Bp'"><p class="text-xs text-gray-500 mt-1">Sơ cứu trật khớp</p></div>`
    }
  },
  {
    id: "di-ung",
    title: "Dị ứng / Sốc phản vệ",
    icon: "🤧",
    color: "pink",
    category: ["dị ứng"],
    moTa: "Phản ứng dị ứng có thể từ nhẹ đến sốc phản vệ đe dọa tính mạng. Sơ cứu đúng cách theo hướng dẫn quốc tế 2024.",
    doiTuongNguyCo: "Người có tiền sử dị ứng (thuốc, thức ăn, nọc côn trùng), người có cơ địa mẫn cảm.",
    content: {
      dauHieuChacChan: [
        "Sốc phản vệ: da hồng nóng hoặc tím tái, mạch nhanh nhỏ, tụt huyết áp, choáng",
        "Khó thở, thở rít, khàn tiếng, nuốt vướng, phù thanh quản",
        "Phù mạch (môi, lưỡi, thanh quản)"
      ],
      dauHieuNghiVan: [
        "Mề đay, ngứa toàn thân",
        "Buồn nôn, đau bụng, tiêu chảy",
        "Cảm giác lo âu, sợ hãi đột ngột"
      ],
      phanLoai: [
        { ten: "Độ 1 - Nhẹ", moTa: "Da, niêm mạc: mề đay, ngứa, phù môi/lưỡi.", color: "yellow" },
        { ten: "Độ 2 - Vừa", moTa: "Hô hấp, tiêu hóa, tim mạch nhẹ: khó thở, đau bụng, mạch nhanh.", color: "orange" },
        { ten: "Độ 3 - Nặng (Sốc phản vệ)", moTa: "Đe dọa tính mạng: tụt HA, khó thở nặng, ngất.", color: "red" }
      ],
      quyTrinh: [
        "1. Gọi 115 ngay lập tức.",
        "2. Ngừng ngay tiếp xúc dị nguyên (thuốc, thức ăn, nọc côn trùng).",
        "3. Nếu có bơm epinephrine tự động: tiêm vào mặt ngoài đùi (có thể xuyên quần áo). Giữ 10 giây rồi rút.",
        "4. Đặt nạn nhân nằm ngửa, nâng chân 30-45cm nếu tụt HA. Nếu khó thở hoặc nôn, nghiêng sang bên.",
        "5. Nếu không cải thiện sau 5 phút, tiêm liều epinephrine thứ 2 (nếu có).",
        "6. Theo dõi ABC, sẵn sàng CPR nếu ngừng tim."
      ],
      luuY: "Epinephrine (adrenaline) là thuốc số 1, tiêm càng sớm càng tốt. KHÔNG chờ triệu chứng nặng mới tiêm. Người có cơ địa dị ứng nặng cần mang theo ống tiêm epinephrine và cài đặt cảnh báo y tế. Nếu nạn nhân tỉnh sau tiêm epinephrine, vẫn cần theo dõi ít nhất 1 giờ (vì có thể tái phát).",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296083/Xu-tri-soc-phan-ve_fvjk2r.png" class="illustration-img img-viewer" alt="Sốc phản vệ" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=S%E1%BB%91c+ph%E1%BA%A3n+v%E1%BB%87'"><p class="text-xs text-gray-500 mt-1">Xử trí sốc phản vệ - tiêm epinephrine đùi ngay</p></div>`
    }
  },
  {
    id: "cho-can",
    title: "Chó cắn",
    icon: "🐕",
    color: "brown",
    category: ["động vật"],
    moTa: "Vết cắn của chó có nguy cơ nhiễm trùng và bệnh dại. Sơ cứu đúng cách giảm nguy cơ biến chứng.",
    doiTuongNguyCo: "Người tiếp xúc với chó lạ, trẻ em, người làm việc với động vật.",
    content: {
      dauHieuChacChan: [
        "Vết rách da, chảy máu, sưng đau",
        "Nguy cơ nhiễm trùng cao (Pasteurella, tụ cầu)",
        "Nguy cơ bệnh dại và uốn ván"
      ],
      dauHieuNghiVan: [
        "Vết xước nhẹ, trầy da, chảy máu ít",
        "Sưng nề, đỏ quanh vết thương",
        "Sốt, đau tăng dần (nhiễm trùng)"
      ],
      phanLoai: [
        { ten: "Cắn độ 1", moTa: "Tiếp xúc da lành (không nguy cơ nhiễm trùng).", color: "green" },
        { ten: "Độ 2", moTa: "Vết xước nhẹ, trầy da, chảy máu ít.", color: "yellow" },
        { ten: "Độ 3", moTa: "Vết cắn sâu, thủng da, chảy máu nhiều, có thể tổn thương cơ, gân, xương.", color: "red" }
      ],
      quyTrinh: [
        "1. Rửa vết thương dưới vòi nước chảy + xà phòng liên tục 15 phút.",
        "2. Sát khuẩn bằng cồn 70° hoặc povidone-iodine.",
        "3. Đến cơ sở y tế ngay để tiêm phòng dại và uốn ván (ngay cả vết xước nhẹ).",
        "4. Ghi nhận thông tin về con chó (chủ, tình trạng sức khỏe) để theo dõi.",
        "5. Theo dõi con chó trong 10 ngày (nếu có thể) để phát hiện dấu hiệu dại."
      ],
      luuY: "Không nặn máu, không băng kín vết thương, không đắp lá. Tiêm vắc-xin dại càng sớm càng tốt, không chờ đến khi có triệu chứng (vì khi lên cơn dại thì tỉ lệ tử vong gần như 100%).",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296090/Huong-dan-xu-tri-cho-can_euswqh.png" class="illustration-img img-viewer" alt="Sơ cứu chó cắn" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ch%C3%B3+c%E1%BA%AFn'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn xử trí khi bị chó cắn</p></div>`
    }
  },
  {
    id: "ran-can",
    title: "Rắn cắn",
    icon: "🐍",
    color: "green",
    category: ["động vật"],
    moTa: "Rắn độc cắn gây nguy hiểm tính mạng do nọc độc. Sơ cứu đúng cách theo WHO 2024 giúp giảm tổn thương.",
    doiTuongNguyCo: "Người làm nông, đi rừng, leo núi, sống gần môi trường hoang dã.",
    content: {
      dauHieuChacChan: [
        "Hai vết răng nanh cách nhau 1-2cm (rắn độc)",
        "Sưng nề, bầm tím lan nhanh, đau tăng dần",
        "Rối loạn đông máu (chảy máu chân răng, bầm da, nôn ra máu)",
        "Liệt cơ (sụp mi, nói khó, nuốt khó, suy hô hấp)"
      ],
      dauHieuNghiVan: [
        "Sưng nề lan rộng quanh vết cắn",
        "Đau dữ dội, nôn ói, tiêu chảy",
        "Nhịp tim nhanh, hạ huyết áp"
      ],
      phanLoai: [
        { ten: "Rắn hổ (Elapidae)", moTa: "Độc tố thần kinh: liệt, sụp mi, suy hô hấp.", color: "blue" },
        { ten: "Rắn lục (Viperidae)", moTa: "Độc tố gây rối loạn đông máu, hoại tử, suy thận.", color: "red" }
      ],
      quyTrinh: [
        "1. Di chuyển nạn nhân ra xa khu vực rắn, trấn an, giữ bình tĩnh.",
        "2. Gọi 115 ngay. Giữ nạn nhân nằm yên, bất động hoàn toàn.",
        "3. Tháo trang sức, quần áo chật ở vùng bị cắn.",
        "4. Bất động chi bị cắn bằng nẹp (que, báo cuộn). Đặt chi ở mức tim, không cao hơn tim.",
        "5. Không băng ép. Chỉ rửa vết thương, nẹp bất động lỏng lẻo chi bị cắn ở ngang mức tim và chuyển viện cấp tốc.",
        "6. Chuyển đến bệnh viện có sẵn huyết thanh kháng nọc càng sớm càng tốc.",
        "7. Nếu nạn nhân hôn mê, ngừng thở, ngừng tim → bắt đầu CPR ngay."
      ],
      luuY: "KHÔNG dùng garo (tourniquet). KHÔNG rạch hút nọc độc. KHÔNG đắp lá, bôi thuốc. KHÔNG chườm đá. KHÔNG hút bằng miệng. Cố gắng nhận dạng rắn (chụp ảnh từ xa) nhưng đảm bảo an toàn. Paracetamol có thể dùng cho đau.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296086/Huong-dan-so-cuu-ran-can_ewpyn0.png" class="illustration-img img-viewer" alt="Rắn cắn" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=R%E1%BA%AFn+c%E1%BA%AFn'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu rắn cắn theo WHO 2024</p></div>`
    }
  },
  {
    id: "ong-dot",
    title: "Ong đốt",
    icon: "🐝",
    color: "yellow",
    category: ["động vật", "dị ứng"],
    moTa: "Ong đốt gây đau, sưng và có thể dị ứng nghiêm trọng. Sơ cứu đúng cách làm giảm triệu chứng.",
    doiTuongNguyCo: "Người đi bộ ngoài trời, người có tiền sử dị ứng nọc ong.",
    content: {
      dauHieuChacChan: [
        "Đau chói, sưng đỏ, ngứa tại chỗ",
        "Nhiều vết đốt hoặc có dị ứng: nổi mề đay toàn thân, khó thở, tụt HA, phù thanh quản"
      ],
      dauHieuNghiVan: [
        "Phản ứng toàn thân chậm (vài giờ đến vài ngày sau): sốt, nổi mề đay lan rộng",
        "Đau bụng, nôn (dị ứng hệ thống)"
      ],
      phanLoai: [
        { ten: "Phản ứng tại chỗ", moTa: "Sưng đỏ dưới 10cm, tự hết sau vài giờ", color: "green" },
        { ten: "Phản ứng toàn thân", moTa: "Sốc phản vệ, nguy hiểm", color: "red" }
      ],
      quyTrinh: [
        "1. Di chuyển nạn nhân đến nơi an toàn, tránh ong đốt tiếp.",
        "2. Loại bỏ ngòi (nếu ong mật còn ngòi) bằng cách cạo nhẹ bằng móng tay hoặc thẻ, không nặn, không kẹp.",
        "3. Rửa vết đốt bằng xà phòng và nước lạnh.",
        "4. Chườm lạnh bọc vải 15-20 phút, nâng chi bị đốt.",
        "5. Nếu có dị ứng toàn thân: gọi 115 ngay, tiêm epinephrine nếu có, chuẩn bị CPR."
      ],
      luuY: "Không bôi vôi, kem đánh răng, dầu gió. Không gãi, không xoa bóp. Nếu ong bắp cày hoặc ong vò vẽ đốt, có thể gây hoại tử, cần rửa bằng nước muối và đến bệnh viện.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296084/Huong-dan-so-cuu-ong-dot_ehv6p6.png" class="illustration-img img-viewer" alt="Ong đốt" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ong+%C4%91%E1%BB%91t'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu ong đốt</p></div>`
    }
  },
  {
    id: "dot-quy",
    title: "Đột quỵ",
    icon: "🧠",
    color: "pink",
    category: ["cấp cứu", "tim mạch"],
    moTa: "Đột quỵ là cấp cứu thần kinh hàng đầu, cần nhận biết sớm bằng FAST và gọi cấp cứu ngay. Thời gian là não (Time is Brain).",
    doiTuongNguyCo: "Người cao tuổi, tăng huyết áp, đái tháo đường, rối loạn mỡ máu, hút thuốc lá.",
    content: {
      dauHieuChacChan: [
        "Mặt méo (cười lệch, nhân giữa lệch) - FACE",
        "Yếu liệt tay chân một bên (thử giơ hai tay, một tay rơi xuống) - ARM",
        "Nói khó, nói ngọng, không nói được - SPEECH"
      ],
      dauHieuNghiVan: [
        "Đau đầu dữ dội đột ngột (đột ngột, không rõ lý do)",
        "Chóng mặt, mất thăng bằng, nhìn mờ một bên",
        "Mất ý thức, nôn ói nhiều"
      ],
      phanLoai: [
        { ten: "Nhồi máu não (85%)", moTa: "Tắc mạch, có thể dùng thuốc tiêu sợi huyết trong 4,5 giờ (giờ vàng).", color: "blue" },
        { ten: "Xuất huyết não (15%)", moTa: "Vỡ mạch, nguy hiểm hơn, cần phẫu thuật sớm.", color: "red" }
      ],
      quyTrinh: [
        "1. Gọi 115 ngay lập tức – ghi nhớ thời điểm khởi phát (giờ vàng 3-4,5h).",
        "2. Kiểm tra FAST: Face (mặt lệch), Arms (giơ tay một bên rơi), Speech (nói khó), Time (thời gian gọi cấp cứu).",
        "3. Đặt nạn nhân nằm nghiêng an toàn nếu nôn, đầu cao 30° nếu tỉnh và không có chấn thương cột sống.",
        "4. Nới lỏng quần áo, không cho ăn uống bất kỳ thứ gì (kể cả thuốc).",
        "5. Ghi nhận các triệu chứng và thời gian để cung cấp cho nhân viên y tế.",
        "6. Nếu ngừng thở, ngưng tim, bắt đầu CPR ngay."
      ],
      luuY: "KHÔNG tự ý cho uống aspirin, không chích lể, cạo gió, không tự lái xe đến bệnh viện. Đột quỵ cần can thiệp chuyên khoa càng sớm càng tốt. 'Time is Brain' - mỗi phút trễ làm chết 1,9 triệu tế bào não.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785295326/Cap-cuu-dot-quy_scm1fk.png" class="illustration-img img-viewer" alt="Đột quỵ" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=%C4%90%E1%BB%99t+qu%E1%BB%B5'"><p class="text-xs text-gray-500 mt-1">Cấp cứu đột quỵ – nhận biết sớm bằng FAST</p></div>`
    }
  },
  {
    id: "duoi-nuoc",
    title: "Đuối nước",
    icon: "🏊",
    color: "blue",
    category: ["cấp cứu", "môi trường"],
    moTa: "Đuối nước là nguyên nhân hàng đầu gây tử vong ở trẻ em. Sơ cứu kịp thời theo DRs. ABC có thể cứu sống.",
    doiTuongNguyCo: "Trẻ em, người không biết bơi, người bơi ở khu vực nguy hiểm.",
    content: {
      dauHieuChacChan: [
        "Ngừng thở, ngừng tim",
        "Da tím tái, bụng chướng (do nuốt nước)",
        "Mất ý thức"
      ],
      dauHieuNghiVan: [
        "Ho, khạc nước, thở khò khè",
        "Lơ mơ, lo âu, lạnh run"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Đưa lên khỏi mặt nước an toàn. Gọi 115 ngay.",
        "2. Đặt nằm ngửa trên mặt phẳng cứng, cởi quần áo ướt.",
        "3. Mở đường thở, kiểm tra hô hấp.",
        "4. Nếu không thở: thổi ngạt 2 cái ngay (mỗi cái 1 giây), sau đó bắt đầu CPR.",
        "5. Ép tim 30 lần : thổi ngạt 2 cái. Tần số 100-120 lần/phút.",
        "6. Tiếp tục CPR đến khi nạn nhân tỉnh hoặc cấp cứu đến.",
        "7. Cho CPR ngay cả khi nạn nhân đã ngừng thở lâu (người đuối nước có thể sống sót sau ngừng tim dài)."
      ],
      luuY: "KHÔNG dốc nước bằng cách xốc chân, không lãng phí thời gian. KHÔNG cố gắng làm sạch đường thở trước khi thổi ngạt. Ưu tiên thổi ngạt và ép tim ngay. Người đuối nước có thể sống sót ngay cả sau ngừng tim kéo dài.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296088/So-cuu-duoi-nuoc-DRSABC_uj2rtq.png" class="illustration-img img-viewer" alt="Sơ cứu đuối nước" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=%C4%90u%E1%BB%91i+n%C6%B0%E1%BB%9Bc'"><p class="text-xs text-gray-500 mt-1">Sơ cứu đuối nước theo quy trình DRs. ABC</p></div>`
    }
  },
  {
    id: "bong",
    title: "Bỏng / Phỏng",
    icon: "🔥",
    color: "orange",
    category: ["cấp cứu"],
    moTa: "Bỏng là tổn thương da do nhiệt, hóa chất hoặc điện. Sơ cứu đúng cách giúp giảm đau và hạn chế sẹo.",
    doiTuongNguyCo: "Trẻ em, người làm bếp, công nhân, người tiếp xúc với hóa chất.",
    content: {
      dauHieuChacChan: [
        "Đỏ da, phồng rộp, đau rát, da có thể cháy đen",
        "Bỏng hóa chất có thể không đau ngay nhưng tiến triển nặng"
      ],
      dauHieuNghiVan: [
        "Da trắng, xém, cứng (bỏng độ 3)",
        "Bỏng hóa chất: đỏ, rát, có vết trợt"
      ],
      phanLoai: [
        { ten: "Độ 1", moTa: "Đỏ, đau, không phồng nước. Tổn thương lớp biểu bì.", color: "yellow" },
        { ten: "Độ 2", moTa: "Phồng nước, nền hồng, đau nhiều. Tổn thương lớp bì và hạ bì.", color: "orange" },
        { ten: "Độ 3", moTa: "Da cháy đen/trắng, không đau, tổn thương sâu. Cần ghép da.", color: "red" }
      ],
      quyTrinh: [
        "1. Loại bỏ nguồn nhiệt, ngắt điện. Cởi quần áo bị cháy (nếu không dính vào da).",
        "2. Làm mát bằng nước chảy mát 15-25°C trong 20 phút. Phải thực hiện ngay lập tức, tối ưu nhất là trong 30 phút đầu tiên sau khi bị bỏng.",
        "3. Che phủ vết bỏng bằng gạc ẩm hoặc khăn sạch, không bôi gì (không dùng đá, không dùng dầu, không bôi kem đánh răng).",
        "4. Nếu bỏng hóa chất: rửa dưới vòi nước chảy 20 phút, cởi quần áo bị nhiễm hóa chất.",
        "5. Gọi 115 nếu bỏng nặng (sâu, mặt, bộ phận sinh dục, diện rộng >10% cơ thể, trẻ <5 tuổi hoặc người già).",
        "6. Bù nước, điện giải (oresol). Theo dõi dấu hiệu sốc."
      ],
      luuY: "KHÔNG dùng đá, nước đá, khăn ướp đá. KHÔNG bôi kem đánh răng, vôi, dầu cá, mật ong. KHÔNG làm vỡ nốt phỏng. KHÔNG dùng cồn rửa. Giữ ấm những phần không bị bỏng để tránh hạ thân nhiệt.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785295321/Huong-dan-so-cuu-bong_spyn1i.png" class="illustration-img img-viewer" alt="Sơ cứu bỏng" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=B%E1%BB%8Fng'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu bỏng – làm mát 20 phút</p></div>`
    }
  },
  {
    id: "dien-giat",
    title: "Điện giật",
    icon: "⚡",
    color: "yellow",
    category: ["cấp cứu"],
    moTa: "Điện giật có thể gây ngừng tim, bỏng và tổn thương thần kinh. Cần xử trí nhanh chóng.",
    doiTuongNguyCo: "Công nhân xây dựng, thợ điện, người sử dụng thiết bị điện không an toàn.",
    content: {
      dauHieuChacChan: [
        "Bất tỉnh, co giật, ngừng thở, ngừng tim",
        "Vết bỏng sâu tại điểm tiếp xúc"
      ],
      dauHieuNghiVan: [
        "Mất ý thức tạm thời, co giật nhẹ",
        "Đau cơ, yếu chi, rối loạn nhịp tim"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Ngắt nguồn điện ngay (cầu dao, dùng gậy khô hất dây).",
        "2. KHÔNG chạm trực tiếp nạn nhân nếu vẫn còn tiếp xúc điện.",
        "3. Kiểm tra ABC ngay. Gọi 115.",
        "4. Nếu ngưng thở/ngưng tim → CPR ngay.",
        "5. Xử lý vết bỏng như bỏng thường (làm mát 20 phút).",
        "6. Theo dõi dấu hiệu sốc."
      ],
      luuY: "Sau điện giật, dù tỉnh vẫn cần đến bệnh viện kiểm tra tim mạch (rối loạn nhịp muộn) và thận (hoại tử cơ). Có thể có chấn thương cột sống nếu ngã từ cao.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296090/Huong-dan-so-cuu-dien-giat_k0xgac.png" class="illustration-img img-viewer" alt="Sơ cứu điện giật" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=%C4%90i%E1%BB%87n+gi%E1%BA%ADt'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu điện giật</p></div>`
    }
  },
  {
    id: "cpr",
    title: "CPR (Hồi sinh tim phổi)",
    icon: "🫀",
    color: "red",
    category: ["cấp cứu", "tim mạch"],
    moTa: "CPR là kỹ thuật cấp cứu ngưng tim, giúp duy trì tuần hoàn và hô hấp cho đến khi có trợ giúp.",
    doiTuongNguyCo: "Mọi người, đặc biệt là người có bệnh tim mạch, người cao tuổi.",
    content: {
      dauHieuChacChan: [
        "Ngừng tim (không bắt mạch cảnh, mạch bẹn)",
        "Ngừng thở (lồng ngực không di động)",
        "Mất ý thức"
      ],
      dauHieuNghiVan: [],
      phanLoai: [
        { ten: "CPR truyền thống (30:2)", moTa: "Ép tim 30 cái + thổi ngạt 2 cái. Dành cho người được đào tạo.", color: "blue" },
        { ten: "CPR chỉ ép tim (Hands-only)", moTa: "Chỉ ép tim liên tục 100-120 lần/phút. Dành cho người chưa được đào tạo hoặc không muốn thổi ngạt.", color: "green" }
      ],
      quyTrinh: [
        "1. Đảm bảo an toàn, gọi 115 ngay hoặc nhờ người xung quanh gọi.",
        "2. Đặt nạn nhân nằm ngửa trên mặt phẳng cứng, cởi áo.",
        "3. Vị trí ép: Nửa dưới xương ức (đặt cườm tay vào giữa ngực, ngay trên đường nối hai núm vú). Hai tay đan chồng, ép thẳng, sâu 5-6 cm, tần số 100-120 lần/phút.",
        "4. Để lồng ngực nổi hoàn toàn sau mỗi cú ép (cho phép hồi phục hoàn toàn).",
        "5. Nếu được đào tạo: mở đường thở (ngửa đầu nâng cằm), bịt mũi, thổi 2 cái (1 giây/cái) làm lồng ngực nổi. Tỉ lệ 30:2.",
        "6. Nếu không được đào tạo: chỉ ép tim liên tục không cần thổi ngạt (hands-only CPR).",
        "7. Thay người ép mỗi 2 phút nếu mệt, tránh gián đoạn ép tim.",
        "8. Tiếp tục cho đến khi nạn nhân tỉnh hoặc xe cấp cứu đến."
      ],
      luuY: "Nếu không được đào tạo, chỉ ép tay không (hands-only). Giữ nhịp 100-120 lần/phút, ép sâu 5-6 cm. Cho phép lồng ngực hồi phục hoàn toàn. Kiên trì, thay người mỗi 2 phút.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785295320/Huong-dan-hoi-sinh-tim-phoi_geqxsg.png" class="illustration-img img-viewer" alt="CPR" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=CPR'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn hồi sinh tim phổi (CPR) chuẩn AHA 2025</p></div>`
    }
  },
  {
    id: "ha-than-nhiet",
    title: "Hạ thân nhiệt",
    icon: "❄️",
    color: "blue",
    category: ["môi trường"],
    moTa: "Hạ thân nhiệt là tình trạng cơ thể mất nhiệt quá nhanh. Cần xử trí nhẹ nhàng và hâm nóng từ từ.",
    doiTuongNguyCo: "Người làm việc ngoài trời lạnh, người già, trẻ nhỏ, người say rượu.",
    content: {
      dauHieuChacChan: [
        "Nhiệt độ thân dưới 35°C",
        "Nạn nhân lơ mơ, run không kiểm soát (run run rung) hoặc không run (nặng)",
        "Da lạnh, tái nhợt, có thể bị phù phổi"
      ],
      dauHieuNghiVan: [
        "Rét run không kiểm soát, nói lắp bắp, lơ mơ",
        "Mạch chậm, thở chậm, da lạnh"
      ],
      phanLoai: [
        { ten: "Nhẹ (32-35°C)", moTa: "Run run, tỉnh táo. Hâm nóng được.", color: "yellow" },
        { ten: "Trung bình (28-32°C)", moTa: "Lơ mơ, run giảm. Cần CPR nếu ngừng tim.", color: "orange" },
        { ten: "Nặng (<28°C)", moTa: "Hôn mê, không run. Có vẻ đã chết nhưng vẫn có thể hồi sinh.", color: "red" }
      ],
      quyTrinh: [
        "1. Đưa vào nơi khô ráo, tránh gió.",
        "2. Thay quần áo ướt bằng khô, ấm.",
        "3. Hâm nóng từ từ: ủ ấm vùng ngực, cổ, đầu, bẹn (không xoa bóp chân tay).",
        "4. Dùng chăn, túi ấm, chai nước ấm (bọc khăn) đặt ở nách, bẹn, cổ.",
        "5. Nếu nạn nhân tỉnh: cho uống nước ấm, đường từ từ.",
        "6. Nếu hôn mê hoặc nặng: đặt tư thế hồi phục, gọi 115.",
        "7. Nếu ngừng tim: bắt đầu CPR ngay và tiếp tục cho đến khi nạn nhân ấm lên hoặc cấp cứu đến."
      ],
      luuY: "KHÔNG xoa bóp chân tay (gây sốc tim, rối loạn nhịp). KHÔNG tắm nước nóng, chườm nóng quá nhanh (gây giãn mạch ngoại vi, tụt HA). Hạ thân nhiệt nặng có thể hồi sinh ngay cả sau ngừng tim lâu.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296085/So-cuu-ha-than-nhiet_hmvydw.png" class="illustration-img img-viewer" alt="Hạ thân nhiệt 1" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=H%E1%BA%A1+th%C3%A2n+nhi%E1%BB%87t+1'"><p class="text-xs text-gray-500 mt-1">Sơ cứu hạ thân nhiệt (1)</p></div><div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296083/So-cuu-ha-than-nhiet-dung_nsmkiw.png" class="illustration-img img-viewer" alt="Hạ thân nhiệt 2" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=H%E1%BA%A1+th%C3%A2n+nhi%E1%BB%87t+2'"><p class="text-xs text-gray-500 mt-1">Sơ cứu hạ thân nhiệt đúng cách (2)</p></div>`
    }
  },
  {
    id: "ngo-doc-thuc-pham",
    title: "Ngộ độc thực phẩm",
    icon: "🍲",
    color: "orange",
    category: ["cấp cứu"],
    moTa: "Ngộ độc thực phẩm thường gây nôn, tiêu chảy, mất nước. Cần bù nước và theo dõi.",
    doiTuongNguyCo: "Mọi người, đặc biệt là trẻ em, người già, người có hệ miễn dịch yếu.",
    content: {
      dauHieuChacChan: [
        "Buồn nôn, nôn, tiêu chảy, đau bụng, sốt",
        "Mất nước (khô miệng, tiểu ít, da nhăn nheo)",
        "Nhìn mờ, nói khó, yếu cơ, khó thở (ngộ độc nặng)"
      ],
      dauHieuNghiVan: [
        "Mệt mỏi, choáng váng",
        "Đau đầu, run tay"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Ngưng ăn thực phẩm nghi ngờ.",
        "2. Nếu nạn nhân tỉnh: cho uống nước, oresol từ từ.",
        "3. Nếu nôn: đặt tư thế hồi phục, không cho ăn uống.",
        "4. Nếu hôn mê, khó thở: gọi 115 ngay, bắt đầu CPR nếu ngừng tim.",
        "5. Giữ mẫu thực phẩm nghi ngờ để mang đến bệnh viện.",
        "6. Ghi nhận thời gian ăn, triệu chứng để thông báo cho bác sĩ."
      ],
      luuY: "Không tự ý dùng thuốc chống nôn hoặc cầm tiêu chảy khi chưa có chỉ định. KHÔNG cố gắng gây nôn (gây tổn thương thêm thực quản). Nếu nghi ngờ ngộ độc hóa chất, kim loại nặng: gọi 115 ngay.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296081/So-cuu-khi-ngo-doc_leqhsp.png" class="illustration-img img-viewer" alt="Ngộ độc thực phẩm 1" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ng%E1%BB%99+%C4%91%E1%BB%99c+1'"><p class="text-xs text-gray-500 mt-1">Sơ cứu khi ngộ độc (1)</p></div><div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296087/Cam-nang-so-cuu-ngo-doc_c8hbuk.png" class="illustration-img img-viewer" alt="Ngộ độc thực phẩm 2" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ng%E1%BB%99+%C4%91%E1%BB%99c+2'"><p class="text-xs text-gray-500 mt-1">Cẩm nang sơ cứu ngộ độc (2)</p></div>`
    }
  },
  {
    id: "co-giat-dong-kinh",
    title: "Co giật / Động kinh",
    icon: "⚡",
    color: "purple",
    category: ["cấp cứu"],
    moTa: "Cơn co giật do động kinh hoặc sốt cao, cần bảo vệ nạn nhân khỏi chấn thương và theo dõi.",
    doiTuongNguyCo: "Trẻ em (sốt cao), người có tiền sử động kinh, người bị chấn thương sọ não.",
    content: {
      dauHieuChacChan: [
        "Mất ý thức đột ngột, co cứng rồi giật nhịp nhàng toàn thân",
        "Mắt trợn ngược, sùi bọt mép",
        "Cắn lưỡi, tiểu tiện không tự chủ"
      ],
      dauHieuNghiVan: [
        "Cơn khu trú (một chi, một bên mặt)",
        "Cảm giác bất thường trước cơn (hồi hộp, ù tai, nhìn mờ)",
        "Trẻ em: co giật sốt (sốt >38°C, co giật <15 phút)"
      ],
      phanLoai: [
        { ten: "Toàn thể (Generalized)", moTa: "Co giật toàn thân, mất ý thức.", color: "red" },
        { ten: "Cơn sốt (Febrile)", moTa: "Co giật do sốt cao ở trẻ 6 tháng-5 tuổi, thường tự hết.", color: "yellow" }
      ],
      quyTrinh: [
        "1. Đặt nạn nhân nằm an toàn, kê mềm dưới đầu, nới lỏng quần áo.",
        "2. Nghiêng đầu sang bên để chất nôn hoặc bọt chảy ra, tránh sặc.",
        "3. Ghi nhận thời gian cơn.",
        "4. Nếu >5 phút hoặc nhiều cơn liên tiếp → gọi 115.",
        "5. Sau cơn: đặt tư thế hồi phục, không cho ăn uống ngay.",
        "6. KHÔNG nhét bất cứ thứ gì vào miệng.",
        "7. Nếu trẻ sốt: hạ nhiệt (paracetamol sau cơn), gọi 115 nếu cơn kéo dài."
      ],
      luuY: "Không ghì chặt nạn nhân, không cố ngừng cơn. Hầu hết cơn tự hết trong 1-3 phút. Sau cơn nạn nhân thường buồn ngủ, mệt mỏi.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296085/So-cuu-co-giat-an-toan_kdqwcr.png" class="illustration-img img-viewer" alt="Co giật an toàn" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Co+gi%E1%BA%ADt'"><p class="text-xs text-gray-500 mt-1">Sơ cứu co giật an toàn</p></div>`
    }
  },
  {
    id: "cham-thuong-cot-song",
    title: "Chấn thương cột sống",
    icon: "🦴",
    color: "gray",
    category: ["chấn thương"],
    moTa: "Chấn thương cột sống có thể gây liệt vĩnh viễn. Cần cố định đầu và cột sống, giữ thẳng hàng, gọi cấp cứu.",
    doiTuongNguyCo: "Nạn nhân tai nạn giao thông, ngã cao, chấn thương thể thao, người già bị té.",
    content: {
      dauHieuChacChan: [
        "Đau chói vùng cổ/lưng",
        "Tê bì, yếu hoặc liệt tay chân",
        "Mất kiểm soát cơ vòng (tiểu tiện không tự chủ)"
      ],
      dauHieuNghiVan: [
        "Sau tai nạn giao thông, ngã cao, chấn thương thể thao",
        "Đau cổ, cứng cổ",
        "Rối loạn cảm giác vùng chi"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Giữ đầu và cơ thể thẳng hàng bằng tay (manual in-line stabilization).",
        "2. KHÔNG cử động, lay, xoay đầu/cổ nạn nhân.",
        "3. KHÔNG để nạn nhân ngồi dậy hoặc đứng.",
        "4. Nếu cần di chuyển: dùng kỹ thuật lăn log-roll (lăn người) với ít nhất 3 người, giữ đầu thẳng hàng.",
        "5. Cố định bằng nẹp cột sống nếu có, gọi 115 ngay.",
        "6. Nếu nạn nhân bất tỉnh nhưng thở: đặt tư thế hồi phục, giữ đầu ổn định."
      ],
      luuY: "Ngay cả khi nạn nhân tỉnh táo và không đau, vẫn phải nghi ngờ chấn thương cột sống vì có thể trì hoãn biểu hiện. Khi nghi ngờ → bất động toàn bộ cột sống.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296082/Huong-dan-so-cuu-cot-song_we2jio.png" class="illustration-img img-viewer" alt="Chấn thương cột sống" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Ch%E1%BA%A5n+th%C6%B0%C6%A1ng+c%E1%BB%99t+s%E1%BB%91ng'"><p class="text-xs text-gray-500 mt-1">Hướng dẫn sơ cứu chấn thương cột sống - giữ đầu thẳng hàng</p></div>`
    }
  },
  {
    id: "nhoi-mau-co-tim",
    title: "Nhồi máu cơ tim",
    icon: "❤️",
    color: "red",
    category: ["cấp cứu", "tim mạch"],
    moTa: "Nhồi máu cơ tim là cấp cứu tim mạch nguy hiểm. Gọi cấp cứu ngay khi nghi ngờ.",
    doiTuongNguyCo: "Người cao tuổi, hút thuốc, tăng huyết áp, đái tháo đường, béo phì.",
    content: {
      dauHieuChacChan: [
        "Đau thắt ngực dữ dội, cảm giác bóp nghẹt, đè ép giữa ngực, lan lên vai trái, cổ, hàm",
        "Khó thở, vã mồ hôi lạnh, buồn nôn, choáng"
      ],
      dauHieuNghiVan: [
        "Đau bụng trên, ợ chua, khó tiêu (đặc biệt ở phụ nữ, người già)",
        "Mệt mỏi bất thường, ho khan"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Gọi 115 ngay lập tức. Ghi nhận thời gian khởi phát.",
        "2. Cho nạn nhân nghỉ ở tư thế nửa nằm nửa ngồi, chân duỗi.",
        "3. Nới lỏng quần áo cổ, ngực.",
        "4. Nếu nạn nhân tỉnh, không dị ứng aspirin, không chảy máu dạ dày: cho nhai viên Aspirin 300mg.",
        "5. KHÔNG cho ăn uống trừ khi được hướng dẫn.",
        "6. Nếu có thuốc nitroglycerin dưới lưỡi: cho dùng theo hướng dẫn."
      ],
      luuY: "Không tự lái xe đến bệnh viện. Không để nạn nhân nằm nếu họ khó thở. Không cho ăn uống. Ghi nhận thời gian khởi phát đau để báo cho bác sĩ.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296088/Cap-cuu-nhoi-mau-tim_ltshbr.png" class="illustration-img img-viewer" alt="Nhồi máu cơ tim" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Nh%E1%BB%93i+m%C3%A1u+c%C6%A1+tim'"><p class="text-xs text-gray-500 mt-1">Cấp cứu nhồi máu cơ tim</p></div>`
    }
  },
  {
    id: "ha-duong-huyet",
    title: "Hạ đường huyết",
    icon: "🩸",
    color: "yellow",
    category: ["cấp cứu"],
    moTa: "Hạ đường huyết thường gặp ở người đái tháo đường, có thể dẫn đến hôn mê nếu không xử trí.",
    doiTuongNguyCo: "Người đái tháo đường, người nhịn ăn, vận động quá sức.",
    content: {
      dauHieuChacChan: [
        "Run tay, đói cồn cào, tim đập nhanh, vã mồ hôi, choáng váng",
        "Nói khó, lú lẫn, hung dữ bất thường",
        "Co giật, mất ý thức (nặng)"
      ],
      dauHieuNghiVan: [
        "Nhìn mờ, đau đầu, yếu chi",
        "Nói ngọng, hành vi bất thường"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. Nếu còn tỉnh: cho uống/ăn 15-20g đường hấp thu nhanh (3-4 viên đường, 1/2 lon nước ngọt, 2 thìa mật ong).",
        "2. Sau 15 phút kiểm tra lại, nếu không đỡ thì lặp lại.",
        "3. Khi tỉnh táo hoàn toàn, cho ăn thêm thức ăn tinh bột (bánh mì, cơm).",
        "4. Nếu hôn mê hoặc không tỉnh: đặt tư thế an toàn, không đổ bất cứ thứ gì vào miệng, gọi 115."
      ],
      luuY: "Người bệnh đái tháo đường nên luôn mang theo kẹo, nước đường bên mình. Nếu hôn mê do hạ đường huyết: tiêm glucagon nếu có, gọi 115.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296088/So-cuu-cap-toc_wdrnvj.png" class="illustration-img img-viewer" alt="Hạ đường huyết" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=H%E1%BA%A1+%C4%91%C6%B0%E1%BB%9Dng+huy%E1%BA%BFt'"><p class="text-xs text-gray-500 mt-1">Sơ cứu cấp tốc hạ đường huyết</p></div>`
    }
  },
  {
    id: "vet-thuong-phan-mem",
    title: "Vết thương phần mềm, bầm tím",
    icon: "🩹",
    color: "teal",
    category: ["chấn thương"],
    moTa: "Vết thương phần mềm thường gặp trong sinh hoạt và thể thao. Sơ cứu đúng cách theo nguyên tắc PRICE giúp mau lành.",
    doiTuongNguyCo: "Trẻ em, người chơi thể thao, người lao động chân tay.",
    content: {
      dauHieuChacChan: [
        "Sưng to, biến dạng",
        "Đau dữ dội khi cử động",
        "Mất khả năng cử động bình thường"
      ],
      dauHieuNghiVan: [
        "Sưng nề, bầm tím (chấn thương kín)",
        "Vết thương hở, rách da, chảy máu",
        "Đau tăng dần sau vận động"
      ],
      phanLoai: [],
      quyTrinh: [
        "1. P (Protection): bảo vệ vùng thương, dừng hoạt động ngay.",
        "2. R (Rest): nghỉ ngơi hoàn toàn, không vận động vùng bị thương.",
        "3. I (Ice): chườm lạnh bọc vải 15-20 phút mỗi lần, cách 2-3 tiếng trong 48 giờ đầu.",
        "4. C (Compression): băng ép băng thun, không quá chặt.",
        "5. E (Elevate): kê cao chi bị thương cao hơn tim.",
        "6. Sau 48-72 giờ: có thể chườm ấm nhẹ, bắt đầu vận động nhẹ.",
        "7. Vết thương hở: rửa sạch dưới vòi nước chảy, rửa vùng da quanh bằng xà phòng (tránh xà phòng vào sâu vết thương), băng ép cầm máu."
      ],
      luuY: "Tránh HARM trong 72 giờ đầu: KHÔNG Heat (nóng), KHÔNG Alcohol (rượu), KHÔNG Running (chạy/vận động mạnh), KHÔNG Massage (xoa bóp). Không dùng oxy già, cồn mạnh trực tiếp vào vết thương hở vì gây tổn thương mô.",
      illustration: `<div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296081/Cach-so-cuu-chan-thuong_qupdbr.png" class="illustration-img img-viewer" alt="Vết thương phần mềm 1" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=V%E1%BA%BFt+th%C6%B0%C6%A1ng+1'"><p class="text-xs text-gray-500 mt-1">Cách sơ cứu chấn thương (1)</p></div><div class="my-4 text-center"><img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785296086/Tri-chan-thuong-the-thao_bkx8ji.png" class="illustration-img img-viewer" alt="Vết thương phần mềm 2" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=V%E1%BA%BFt+th%C6%B0%C6%A1ng+2'"><p class="text-xs text-gray-500 mt-1">Phòng tránh chấn thương thể thao (2)</p></div>`
    }
  },
  {
    id: "say-nang",
    title: "Say nắng (Sốc nhiệt - sơ cứu như nhau)",
    icon: "☀️",
    color: "red",
    category: ["môi trường", "cấp cứu"],
    moTa: "Say nắng là tình trạng tăng thân nhiệt nguy hiểm. Cần hạ nhiệt cấp tốc theo hướng dẫn quốc tế.",
    doiTuongNguyCo: "Người làm việc ngoài trời nắng, trẻ nhỏ, người già, người vận động mạnh trong thời tiết nóng.",
    content: {
      dauHieuChacChan: [
        "Nhiệt độ thân >40°C",
        "Rối loạn ý thức (lơ mơ, nói nhảm, co giật hoặc hôn mê)",
        "Da rất nóng, đỏ hoặc đỏ bừng. Có thể có hoặc không còn ra mồ hôi."
      ],
      dauHieuNghiVan: [
        "Nhức đầu dữ dội, chóng mặt, buồn nôn, nôn",
        "Da đỏ, mạch nhanh và mạnh, thở nhanh",
        "Chuột rút hoặc yếu cơ",
        "Rối loạn hành vi, lú lẫn, kích thích, nói không rõ, đi loạng choạng"
      ],
      phanLoai: [
        { ten: "Say nắng cổ điển", moTa: "Xảy ra khi tiếp xúc với nhiệt độ cao kéo dài (người già, trẻ nhỏ, bệnh mạn tính)", color: "orange" },
        { ten: "Say nắng do gắng sức", moTa: "Xảy ra ở người trẻ hoạt động thể lực mạnh trong môi trường nóng", color: "red" }
      ],
      quyTrinh: [
        "1. Gọi 115 ngay lập tức – đây là cấp cứu tối khẩn.",
        "2. Di chuyển nạn nhân vào nơi mát, thoáng gió, cởi bỏ quần áo thừa.",
        "3. Hạ nhiệt cấp tốc: ngâm mình trong nước mát (10-15°C) hoặc đắp khăn ướt mát lên toàn thân, kết hợp quạt lớn.",
        "4. Chườm đá bọc khăn vào nách, bẹn, cổ để hạ nhiệt nhanh.",
        "5. Nếu nạn nhân tỉnh, cho uống nước mát (không có caffeine) từ từ.",
        "6. Theo dõi ABC, sẵn sàng CPR nếu ngừng tim."
      ],
      luuY: "Mục tiêu: hạ nhiệt độ xuống dưới 39°C trong vòng 30 phút. Tuyệt đối không cho uống bất kỳ thứ gì nếu nạn nhân bất tỉnh hoặc nôn nhiều. Không dùng aspirin hay paracetamol để hạ nhiệt (không có tác dụng).",
      illustration: `<div class="my-4 text-center">
            <img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785294538/2a70bc64-45de-4c1b-bb0a-483dc11d0c47_owwtuw.png" class="illustration-img img-viewer" alt="Say nắng 1" style="max-width:100%;border-radius:var(--radius-md);" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Say+n%E1%BA%AFng'">
            <p class="text-xs text-gray-500 mt-1">Cấp cứu say nắng – hạ nhiệt cấp tốc (1)</p>
          </div>
          <div class="my-4 text-center">
            <img src="https://res.cloudinary.com/ftfo5fyo/image/upload/v1785294466/f9edba99-9fd5-4b0e-a85e-757a782687c9_ljjpzz.png" class="illustration-img img-viewer" alt="Say nắng 2" style="max-width:100%;border-radius:var(--radius-md);" onerror="this.onerror=null; this.src='https://placehold.co/800x500?text=Say+n%E1%BA%AFng'">
            <p class="text-xs text-gray-500 mt-1">Cấp cứu say nắng – hạ nhiệt cấp tốc (2)</p>
          </div>`
    }
  }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { lessons, getIconAnimClass, ICON_ANIM_MAP };
}
