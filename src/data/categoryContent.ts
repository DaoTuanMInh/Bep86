// Nội dung giới thiệu cho từng danh mục sản phẩm
export interface CategoryContent {
    name: string;
    slug: string;
    heroImage: string;
    tagline: string;
    intro: string;      // đoạn mở đầu
    body: string[];     // các đoạn chi tiết
    features: { icon: string; title: string; desc: string }[];
    applications: string[];
}

export const categoryContents: CategoryContent[] = [
    {
        name: 'Tủ Nấu Cơm',
        slug: 'tu-nau-com',
        heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
        tagline: 'Giải pháp nấu cơm công nghiệp hiện đại – tiết kiệm, vệ sinh, bền bỉ',
        intro: 'Tủ nấu cơm công nghiệp Bếp 86 là sản phẩm tiêu biểu được thiết kế dành riêng cho bếp nhà hàng, khách sạn, trường học, bệnh viện và các cơ sở catering lớn. Sản phẩm được gia công từ inox 304 cao cấp, đảm bảo vệ sinh an toàn thực phẩm và độ bền lâu dài trong môi trường làm việc cường độ cao.',
        body: [
            'Với công nghệ nấu hơi nước tuần hoàn, cơm chín đều, không bị khê hay ướt. Mỗi khay nấu khoảng 8–10 kg gạo sống, cho ra cơm thơm dẻo đạt tiêu chuẩn nhà hàng. Tủ nấu cơm có nhiều loại như dùng điện, dùng gas, hoặc kết hợp cả hai để phù hợp với điều kiện cơ sở.',
            'Hệ thống điều khiển thông minh với bộ hẹn giờ tự động giúp người sử dụng lên kế hoạch nấu linh hoạt, tiết kiệm nhân lực và năng lượng. Vỏ tủ và khung giá làm bằng inox 304 nguyên tấm, dễ vệ sinh, chịu ẩm, chống rỉ sét.',
            'Bếp 86 cung cấp tủ nấu cơm với nhiều quy cách từ 6 khay đến 12 khay, phù hợp với quy mô từ 50 đến 500 suất ăn mỗi bữa. Đội ngũ kỹ thuật sẵn sàng tư vấn, lắp đặt và bảo hành tại nhà.',
        ],
        features: [
            { icon: '🔥', title: 'Nấu đa năng', desc: 'Gas, điện hoặc kết hợp - linh hoạt theo cơ sở hạ tầng' },
            { icon: '⏱️', title: 'Hẹn giờ thông minh', desc: 'Lên lịch nấu tự động, tiết kiệm nhân lực' },
            { icon: '🧼', title: 'Inox 304 cao cấp', desc: 'Vệ sinh dễ dàng, đảm bảo an toàn thực phẩm' },
            { icon: '📦', title: 'Đa quy cách', desc: '6, 8, 10, 12 khay – phù hợp mọi quy mô' },
        ],
        applications: ['Nhà hàng', 'Khách sạn', 'Trường học', 'Bệnh viện', 'Xí nghiệp', 'Bếp ăn tập thể'],
    },
    {
        name: 'Bàn Lạnh – Bàn Đông – Bàn Mát',
        slug: 'ban-lanh',
        heroImage: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=1200&q=80',
        tagline: 'Bảo quản nguyên liệu tươi ngon ngay tại vị trí chế biến',
        intro: 'Bàn lạnh công nghiệp (bàn đông, bàn mát) là thiết bị không thể thiếu trong bếp nhà hàng chuyên nghiệp. Sản phẩm vừa là mặt bàn chế biến tiện lợi, vừa tích hợp ngăn làm lạnh bên dưới giúp dự trữ nguyên liệu tươi ngay tại nơi làm việc.',
        body: [
            'Bàn lạnh Bếp 86 được chế tạo từ inox 304 kháng khuẩn, mặt bàn phẳng, dễ vệ sinh, chịu được tải trọng cao trong ca làm việc liên tục. Hệ thống làm lạnh dẫn động bằng máy nén Embraco hoặc Danfoss nhập khẩu, tiết kiệm điện năng, vận hành êm ái.',
            'Có hai kiểu truyền lạnh: trực tiếp (nhiệt độ đồng đều, phù hợp đông lạnh thực phẩm nhanh) và gián tiếp (dàn lạnh quạt gió, phân bổ nhiệt độ đều, phù hợp bảo quản rau củ, thực phẩm tươi sống). Nhiệt độ bảo quản từ -18°C đến +8°C tùy cấu hình.',
            'Tủ lắp castor di động hoặc chân cố định inox, phù hợp nhiều cấu hình bếp. Mỗi ngăn có cửa kính hoặc cửa inox tuỳ chọn, trang bị tay nắm chống đọng nước và ron cao su chịu nhiệt.',
        ],
        features: [
            { icon: '❄️', title: 'Làm lạnh nhanh', desc: 'Hệ thống máy nén nhập khẩu, tiết kiệm điện' },
            { icon: '🧪', title: 'Inox kháng khuẩn', desc: 'Đảm bảo vệ sinh an toàn thực phẩm' },
            { icon: '🌡️', title: '-18°C → +8°C', desc: 'Phù hợp đông lạnh và bảo quản mát' },
            { icon: '🔧', title: 'Lắp đặt linh hoạt', desc: 'Castor di động hoặc chân cố định' },
        ],
        applications: ['Nhà hàng', 'Khách sạn', 'Bar – Café', 'Bếp Á – Âu', 'Chuỗi Fast Food', 'Siêu thị'],
    },
    {
        name: 'Tủ Sấy Bát',
        slug: 'tu-say-bat',
        heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
        tagline: 'Sấy khô – diệt khuẩn – bảo quản bát đĩa an toàn tuyệt đối',
        intro: 'Tủ sấy bát công nghiệp Bếp 86 sử dụng công nghệ nhiệt khô hoặc Ozone để tiệt trùng, sấy khô và bảo quản bát đĩa sau khi rửa. Sản phẩm đạt tiêu chuẩn vệ sinh an toàn thực phẩm, phù hợp với mọi loại hình nhà bếp chuyên nghiệp.',
        body: [
            'Hai công nghệ sấy phổ biến: nhiệt điện trở (lên đến 80–120°C, diệt khuẩn hiệu quả, sấy nhanh) và Ozone (tiệt trùng sâu không dùng nhiệt, phù hợp nhựa và thủy tinh mỏng). Nhiều model tích hợp cả hai để đạt hiệu quả tối ưu.',
            'Khung tủ bằng inox 201/304, giá đỡ chắc chắn có thể điều chỉnh chiều cao theo loại bát đĩa. Cửa kính quan sát cường lực trong suốt, dễ kiểm tra tình trạng bên trong mà không cần mở cửa.',
            'Công suất từ 30 đến 200 bộ bát/tủ, phù hợp nhà hàng nhỏ đến bếp trung tâm phục vụ hàng trăm thực khách. Bộ điều khiển điện tử với màn hình LED hiển thị nhiệt độ và thời gian sấy.',
        ],
        features: [
            { icon: '☀️', title: 'Nhiệt khô & Ozone', desc: 'Hai công nghệ tiệt trùng hiệu quả nhất' },
            { icon: '🔍', title: 'Cửa kính cường lực', desc: 'Quan sát bên trong dễ dàng' },
            { icon: '📊', title: 'LED điều khiển', desc: 'Hẹn giờ và nhiệt độ chính xác' },
            { icon: '♻️', title: 'Tiết kiệm điện', desc: 'Cách nhiệt tốt, tiêu thụ điện thấp' },
        ],
        applications: ['Nhà hàng', 'Khách sạn', 'Trường học', 'Bệnh viện', 'Canteen', 'Resort'],
    },
    {
        name: 'Bếp Từ Công Nghiệp',
        slug: 'bep-tu-cong-nghiep',
        heroImage: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=1200&q=80',
        tagline: 'Sức nóng tức thì – kiểm soát hoàn hảo – an toàn tuyệt đối',
        intro: 'Bếp từ công nghiệp Bếp 86 là lựa chọn hàng đầu cho các bếp hiện đại muốn tối ưu hiệu suất, tiết kiệm năng lượng và đảm bảo an toàn. Với công suất từ 3KW đến 15KW mỗi vùng nấu, sản phẩm đáp ứng mọi nhu cầu từ xào nấu đến hầm, ninh lâu giờ.',
        body: [
            'Mặt kính Schott Ceran (Đức) chịu nhiệt lên đến 700°C, không thấm nước, dễ vệ sinh chỉ bằng khăn ẩm. Cảm ứng điện từ làm nóng trực tiếp nồi chảo, không đốt nóng bề mặt bếp – an toàn cho nhân viên, không thải nhiệt ra môi trường bếp.',
            'Bộ điều khiển kỹ thuật số với 10 mức công suất, chế độ hẹn giờ tắt tự động và cảm biến chống khô nồi. IGBT nhập khẩu từ Nhật Bản/Đức đảm bảo độ ổn định và tuổi thọ dài 5–8 năm vận hành liên tục.',
            'Tùy chọn đơn bếp, đôi bếp hoặc bếp nhúng (built-in) tích hợp vào bàn inox. Phù hợp nhà hàng Á, Âu, buffet và các chuỗi bếp công nghiệp hiện đại.',
        ],
        features: [
            { icon: '⚡', title: 'Nóng tức thì 3–15KW', desc: 'Sức mạnh tương đương bếp gas công nghiệp' },
            { icon: '🛡️', title: 'An toàn tuyệt đối', desc: 'Không gas, không lửa, không phát nhiệt bề mặt' },
            { icon: '💡', title: 'Tiết kiệm 30% điện', desc: 'Hiệu suất chuyển đổi nhiệt >90%' },
            { icon: '🧼', title: 'Dễ vệ sinh', desc: 'Mặt kính Schott Ceran lau sạch tức thì' },
        ],
        applications: ['Nhà hàng Á – Âu', 'Khách sạn 4–5 sao', 'Buffet', 'Bếp hiện đại', 'Café – Bistro'],
    },
    {
        name: 'Tủ Giữ Nóng Thức Ăn',
        slug: 'tu-giu-nong',
        heroImage: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=80',
        tagline: 'Giữ thức ăn luôn nóng hổi – sẵn sàng phục vụ mọi lúc',
        intro: 'Tủ giữ nóng thức ăn Bếp 86 đảm bảo thực phẩm được duy trì ở nhiệt độ phục vụ tối ưu (60–85°C) trong nhiều giờ liên tục. Sản phẩm ứng dụng công nghệ gia nhiệt hơi ẩm hoặc khô, giúp thức ăn luôn tươi ngon, không bị khô hay mất chất dinh dưỡng.',
        body: [
            'Tủ giữ nóng phù hợp với buffet, nhà hàng tiệc cưới, bếp bệnh viện, cafeteria – nơi cần duy trì lượng thức ăn lớn ở nhiệt độ phục vụ trong thời gian dài. Buồng giữ nhiệt được cách nhiệt đa lớp, tiêu thụ điện tối thiểu.',
            'Mỗi tủ có từ 2 đến 6 ngăn độc lập với nhiệt độ điều chỉnh riêng biệt từ 40°C đến 120°C. Khay inox GN chuẩn (1/1, 1/2, 1/3) tương thích với hầu hết hệ thống bếp công nghiệp trên thị trường.',
            'Thiết kế cửa kính 2 lớp cho phép quan sát thức ăn mà không làm mất nhiệt. Đèn LED chiếu sáng nội thất giúp trưng bày thức ăn hấp dẫn trong buffet.',
        ],
        features: [
            { icon: '🌡️', title: '60–120°C tùy chỉnh', desc: 'Mỗi ngăn điều chỉnh nhiệt độ độc lập' },
            { icon: '💧', title: 'Giữ ẩm thông minh', desc: 'Thức ăn không bị khô, vẫn tươi ngon' },
            { icon: '🪟', title: 'Cửa kính 2 lớp', desc: 'Quan sát và trưng bày chuyên nghiệp' },
            { icon: '📐', title: 'Khay GN chuẩn quốc tế', desc: 'Tương thích mọi hệ thống bếp' },
        ],
        applications: ['Buffet', 'Nhà hàng tiệc cưới', 'Bệnh viện', 'Canteen', 'Khách sạn', 'Sự kiện – hội nghị'],
    },
    {
        name: 'Quầy Pha Chế Inox',
        slug: 'quay-pha-che',
        heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
        tagline: 'Không gian pha chế chuyên nghiệp – thẩm mỹ – hiệu quả',
        intro: 'Quầy pha chế inox Bếp 86 được thiết kế tùy chỉnh theo yêu cầu của từng cửa hàng, quán café, nhà hàng. Từ bar rượu, quầy pha cà phê đến trạm pha chế trà sữa – tất cả đều được gia công chính xác, thẩm mỹ cao và bền bỉ theo thời gian.',
        body: [
            'Chất liệu inox 304 kháng axit, chống oxy hóa, phù hợp môi trường ẩm ướt của khu vực pha chế. Bề mặt mịn, đường hàn kín, dễ lau chùi vệ sinh đạt tiêu chuẩn HACCP của ngành F&B.',
            'Thiết kế theo yêu cầu: kích thước tùy chỉnh, vị trí bồn rửa, kệ để dụng cụ, khung kệ treo ly, hộc tủ, hộc kéo inox. Có thể tích hợp thiết bị làm lạnh, bồn đá vụn, giá rượu và hệ thống ống dẫn nước.',
            'Đội ngũ thiết kế Bếp 86 hỗ trợ vẽ bản thiết kế 3D theo mặt bằng thực tế, đảm bảo quầy pha chế vừa vặn, tối ưu quy trình làm việc và phù hợp nhận diện thương hiệu của khách hàng.',
        ],
        features: [
            { icon: '📐', title: 'Thiết kế theo yêu cầu', desc: '3D layout trước khi thi công' },
            { icon: '🔧', title: 'Tích hợp thiết bị', desc: 'Bồn rửa, tủ lạnh bar, đá vụn, vòi nước' },
            { icon: '✨', title: 'Bề mặt gương mịn', desc: 'Thẩm mỹ cao, dễ vệ sinh hàng ngày' },
            { icon: '🏗️', title: 'Lắp đặt chuyên nghiệp', desc: 'Đội thợ lành nghề, hoàn thiện nhanh' },
        ],
        applications: ['Café', 'Bar – Pub', 'Nhà hàng', 'Shop trà sữa', 'Bakery', 'Hotel Lobby Bar'],
    },
    {
        name: 'Tủ Đông – Tủ Mát',
        slug: 'tu-dong-tu-mat',
        heroImage: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=1200&q=80',
        tagline: 'Bảo quản thực phẩm dài ngày – tiết kiệm năng lượng – độ bền vượt trội',
        intro: 'Tủ đông và tủ mát công nghiệp Bếp 86 là giải pháp bảo quản thực phẩm quy mô lớn cho nhà hàng, siêu thị, xưởng chế biến và kho thực phẩm. Sản phẩm đạt hiệu suất làm lạnh cao với mức tiêu thụ điện tối ưu nhờ hệ thống máy nén inverter hiện đại.',
        body: [
            'Tủ mát (0°C → +8°C) lý tưởng cho rau củ, trái cây, sữa, thực phẩm tươi sống cần bảo quản ngắn đến trung hạn. Tủ đông (-18°C → -22°C) phù hợp thịt cá, kem, thực phẩm đông lạnh bảo quản dài hạn. Nhiều model kết hợp cả hai chế độ trong một thiết bị.',
            'Hệ thống xả đông tự động và quạt tuần hoàn không khí đảm bảo nhiệt độ đồng đều trong toàn buồng lạnh. Gas lạnh R290 (propane tự nhiên) thân thiện môi trường, hiệu suất làm lạnh tốt hơn R134a.',
            'Khung sườn và vỏ tủ ép bằng tôn gân mạ kẽm hoặc inox, panel cách nhiệt polyurethane 60–100mm. Cửa tủ lắp ngàm từ tính kép, kính cường lực 2 lớp (tủ trưng bày) hoặc cửa inox kín (tủ kho).',
        ],
        features: [
            { icon: '🧊', title: '-22°C → +8°C', desc: 'Tủ đông và tủ mát công nghiệp' },
            { icon: '🍃', title: 'Gas R290 xanh', desc: 'Thân thiện môi trường, hiệu suất cao' },
            { icon: '🔄', title: 'Xả đông tự động', desc: 'Không cần bảo dưỡng thường xuyên' },
            { icon: '⚡', title: 'Inverter tiết kiệm điện', desc: 'Giảm đến 40% chi phí điện năng' },
        ],
        applications: ['Nhà hàng', 'Siêu thị', 'Xưởng chế biến', 'Kho lạnh mini', 'Bệnh viện', 'Resort'],
    },
    {
        name: 'Nồi Nấu Phở, Nồi Nấu Cháo',
        slug: 'noi-nau-pho-chao',
        heroImage: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80',
        tagline: 'Hương vị đậm đà – tiết kiệm gas – an toàn cho người dùng',
        intro: 'Nồi nấu phở và nồi nấu cháo công nghiệp Bếp 86 được chế tạo từ inox 304 dày, chịu nhiệt tốt, phù hợp nấu liên tục nhiều giờ. Thiết kế 2 lớp với lớp không khí cách nhiệt giúp tiết kiệm gas/điện đồng thời giữ nhiệt tốt và tránh bỏng bề mặt ngoài nồi.',
        body: [
            'Nồi nấu phở dung tích từ 30L đến 200L, đáy dày 3mm chống cháy xỉ, hệ thống thoát nước đáy tiện lợi khi vệ sinh. Lò đốt có thể dùng gas hoặc điện cảm ứng, điều chỉnh công suất vô cấp từ 0 đến 100%.',
            'Nồi nấu cháo công nghiệp trang bị cánh khuấy tự động ngăn cháo bị dính đáy – tiết kiệm nhân lực đáng kể trong bếp lớn. Một số model có thể nấu kết hợp cháo, súp, nước dùng và xốt.',
            'Toàn bộ bề mặt tiếp xúc thực phẩm đảm bảo an toàn vệ sinh thực phẩm theo tiêu chuẩn Bộ Y tế. Vòi xả đáy inox đường kính lớn giúp thoát nước nhanh, vệ sinh dễ dàng sau mỗi ca nấu.',
        ],
        features: [
            { icon: '🍜', title: '30L – 200L', desc: 'Phù hợp từ quán nhỏ đến bếp công nghiệp' },
            { icon: '🔄', title: 'Khuấy tự động', desc: 'Nồi cháo có cơ khuấy tránh dính đáy' },
            { icon: '💧', title: 'Vòi xả đáy lớn', desc: 'Xả nước nhanh, vệ sinh tiện lợi' },
            { icon: '🔥', title: 'Gas hoặc điện', desc: 'Linh hoạt theo nguồn năng lượng' },
        ],
        applications: ['Quán phở', 'Nhà hàng', 'Canteen', 'Bếp bệnh viện', 'Bếp trường', 'Xưởng suất ăn CN'],
    },
    {
        name: 'Tủ Trưng Bày Bánh Kem',
        slug: 'tu-trung-bay-banh-kem',
        heroImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80',
        tagline: 'Trưng bày sang trọng – bảo quản hoàn hảo – tăng doanh thu',
        intro: 'Tủ trưng bày bánh kem Bếp 86 kết hợp hoàn hảo giữa chức năng làm lạnh và thẩm mỹ trưng bày, giúp bánh kem và dessert luôn tươi ngon, hấp dẫn khách hàng. Kính cường lực 5 mặt cho góc nhìn toàn diện, đèn LED nội thất tôn vinh màu sắc bánh.',
        body: [
            'Hệ thống làm lạnh đa hướng quạt gió (fan cooling) phân bổ nhiệt độ đồng đều khắp buồng trưng bày từ 0°C đến 8°C. Ẩm độ được duy trì tự động ở mức 60–80% giúp bánh không bị khô hay chảy kem.',
            'Khung tủ bằng nhôm anodize màu bạc hoặc đen, chân inox hoặc bánh xe, thiết kế hiện đại phù hợp tiệm bánh, café và khu vực dessert trong nhà hàng cao cấp. Kích thước đa dạng: từ counter nhỏ 60cm đến tủ đứng 1.5m.',
            'Bộ điều nhiệt điện tử kỹ thuật số, màn hình LED hiển thị nhiệt độ thực tế. Xuất xứ linh kiện làm lạnh: Embraco (Ý) hoặc Tecumseh (Pháp), bảo hành máy nén 2 năm.',
        ],
        features: [
            { icon: '🪟', title: 'Kính 5 mặt', desc: 'Góc nhìn 360° tôn vinh sản phẩm' },
            { icon: '💡', title: 'Đèn LED nội thất', desc: 'Làm nổi bật màu sắc bánh, tăng hấp dẫn' },
            { icon: '💧', title: 'Kiểm soát ẩm độ', desc: 'Bánh giữ kết cấu, không bị khô hay chảy' },
            { icon: '🎨', title: 'Thiết kế thẩm mỹ', desc: 'Nhiều màu sắc và kích thước tùy chọn' },
        ],
        applications: ['Tiệm bánh', 'Café', 'Dessert shop', 'Nhà hàng', 'Khách sạn', 'Siêu thị bánh'],
    },
    {
        name: 'Máy Làm Đá',
        slug: 'may-lam-da',
        heroImage: 'https://images.unsplash.com/photo-1551539895-a0d0d7fa4f3e?w=1200&q=80',
        tagline: 'Đá sạch – đủ số lượng – phục vụ liên tục suốt ngày',
        intro: 'Máy làm đá công nghiệp Bếp 86 sản xuất đá viên, đá vảy hoặc đá que với năng suất từ 30 đến 500kg/ngày, đáp ứng nhu cầu của bar, nhà hàng, khách sạn và cơ sở y tế. Đá được làm từ nước qua hệ thống lọc tích hợp, đảm bảo trong, sạch và không mùi.',
        body: [
            'Máy làm đá viên (cube ice) sản xuất đá hình khối đặc, tan chậm hơn đá vảy, hấp thụ nước kém hơn – lý tưởng cho cocktail, nước ngọt và đồ uống cần giữ lạnh lâu. Đá vảy (flake ice) mỏng, tan nhanh, bề mặt tiếp xúc lớn – phù hợp hiểnthị hải sản tươi, sushi bar.',
            'Hệ thống lọc nước 3 bước (carbon filter + sediment filter + UV) loại bỏ cặn bẩn và vi khuẩn trước khi tạo đá. Máy tự xả và làm vệ sinh chu kỳ theo lập trình, giảm gánh nặng bảo dưỡng.',
            'Thân máy inox chống ăn mòn, bộ phận làm đá bằng nhôm thực phẩm. Máy nén Embraco hoặc LG Inverter (tùy model) vận hành êm, tiết kiệm điện và tuổi thọ dài.',
        ],
        features: [
            { icon: '🧊', title: '30–500kg/ngày', desc: 'Nhiều công suất theo quy mô' },
            { icon: '🔬', title: 'Lọc nước 3 cấp', desc: 'Đá trong sạch, không mùi, không cặn' },
            { icon: '🤖', title: 'Tự vệ sinh', desc: 'Chu kỳ tự làm sạch theo lập trình' },
            { icon: '🎯', title: 'Đa dạng loại đá', desc: 'Đá viên, đá vảy, đá que tùy chọn' },
        ],
        applications: ['Bar – Pub', 'Nhà hàng', 'Khách sạn', 'Siêu thị hải sản', 'Bệnh viện', 'Nhà máy'],
    },
    {
        name: 'Lò Nướng Bánh',
        slug: 'lo-nuong-banh',
        heroImage: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=1200&q=80',
        tagline: 'Lửa đều – chín vàng – hương vị hoàn hảo mỗi mẻ bánh',
        intro: 'Lò nướng bánh công nghiệp Bếp 86 là trái tim của mọi lò bánh mì, tiệm bánh và bếp pastry chuyên nghiệp. Từ lò tầng truyền thống đến lò đối lưu hiện đại, sản phẩm đảm bảo nhiệt độ đồng đều, tiêu thụ năng lượng tối ưu và năng suất cao.',
        body: [
            'Lò nướng tầng (deck oven) phù hợp bánh mì nguyên cám, baguette, pizza – đế bánh giòn đặc trưng. Sàn lò bằng đá granite hoặc gạch chịu nhiệt hấp thu và phân bổ nhiệt tốt. Mỗi tầng có điều chỉnh nhiệt độ top-bottom riêng biệt từ 50°C đến 350°C.',
            'Lò đối lưu (convection oven) với quạt tuần hoàn không khí nóng cho phép nướng nhiều khay cùng lúc đều màu, giảm thời gian 30% so với lò thường. Phù hợp bánh ngọt, croissant, muffin và các loại bánh cần màu đều, xốp.',
            'Lò phun hơi nước (steam injection) tạo vỏ bánh mì giòn đặc trưng của bánh Pháp và Âu. Bộ phun hơi tự động theo chu kỳ lập trình giúp bánh nở đủ trước khi vỏ định hình.',
        ],
        features: [
            { icon: '🌡️', title: '50 – 350°C', desc: 'Dải nhiệt rộng, điều chỉnh từng tầng' },
            { icon: '💨', title: 'Đối lưu không khí', desc: 'Màu đều, giảm 30% thời gian nướng' },
            { icon: '💧', title: 'Phun hơi nước', desc: 'Vỏ bánh giòn đặc trưng kiểu Âu' },
            { icon: '📦', title: 'Nhiều kích cỡ tầng', desc: 'Từ 1 tầng đến 4 tầng xếp chồng' },
        ],
        applications: ['Tiệm bánh mì', 'Bakery & Pastry', 'Nhà hàng Âu', 'Khách sạn', 'Siêu thị', 'Pizza shop'],
    },
    {
        name: 'Tủ Sấy Công Nghiệp',
        slug: 'tu-say-cong-nghiep',
        heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
        tagline: 'Sấy nhanh – giữ dưỡng chất – phù hợp mọi loại thực phẩm',
        intro: 'Tủ sấy công nghiệp Bếp 86 ứng dụng công nghệ sấy đối lưu nhiệt độ thấp (40–80°C) phù hợp sấy khô rau củ, trái cây, thảo dược, thịt khô, hải sản và thực phẩm tự nhiên. Sản phẩm giúp kéo dài thời gian bảo quản đồng thời giữ lại tối đa hương vị, màu sắc và dinh dưỡng.',
        body: [
            'Công nghệ sấy tuần hoàn khí nóng đa chiều đảm bảo thực phẩm trên tất cả các khay được sấy đều, không cần đảo khay. Nhiệt độ điều chỉnh từ 35°C đến 80°C phù hợp từ sấy nhẹ thảo mộc đến sấy nhanh hải sản.',
            'Tủ sấy có thể tích từ 24 khay đến 200 khay (khay inox kích thước GN chuẩn), phù hợp xưởng sản xuất vừa và lớn. Hệ thống cửa kính quan sát, đèn LED nội thất cho phép giám sát quá trình sấy mà không cần mở tủ.',
            'Bộ điều khiển PLC có thể lập trình nhiều chương trình sấy khác nhau, hẹn giờ bật/tắt tự động. Chứng nhận CE và đạt tiêu chuẩn HACCP, phù hợp sản xuất thực phẩm xuất khẩu.',
        ],
        features: [
            { icon: '🌀', title: 'Đối lưu đa chiều', desc: 'Sấy đều tất cả các khay không cần đảo' },
            { icon: '🌿', title: '35–80°C linh hoạt', desc: 'Phù hợp mọi loại thực phẩm' },
            { icon: '🤖', title: 'PLC lập trình', desc: 'Nhiều chương trình, hẹn giờ tự động' },
            { icon: '📋', title: 'HACCP & CE', desc: 'Đạt tiêu chuẩn sản xuất thực phẩm xuất khẩu' },
        ],
        applications: ['Xưởng thực phẩm', 'Sản xuất thảo dược', 'Cơ sở chế biến nông sản', 'Nhà máy hải sản'],
    },
    {
        name: 'Linh Kiện Thiết Bị Bếp CN',
        slug: 'linh-kien',
        heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
        tagline: 'Linh kiện chính hãng – thay thế nhanh – bảo hành đầy đủ',
        intro: 'Bếp 86 cung cấp đầy đủ linh kiện thay thế cho các thiết bị bếp công nghiệp: máy nén lạnh, dàn lạnh, van điện từ, bo điều khiển, cảm biến nhiệt độ, motor quạt, ron cửa, khay inox và nhiều phụ kiện khác. Tất cả đều là hàng chính hãng, có nguồn gốc xuất xứ rõ ràng.',
        body: [
            'Kho linh kiện Bếp 86 dự trữ hơn 2000 mã hàng từ các thương hiệu nổi tiếng: Embraco, Danfoss, Tecumseh, Dixell, Carel, Eliwell. Thời gian tra cứu và xuất kho nhanh, hỗ trợ kỹ thuật viên chẩn đoán lỗi qua điện thoại hoặc đến tận nơi.',
            'Dịch vụ sửa chữa, bảo dưỡng định kỳ thiết bị bếp công nghiệp với đội ngũ kỹ thuật viên có chứng chỉ, kinh nghiệm 5+ năm. Cam kết xử lý sự cố trong vòng 4 giờ cho khách hàng ở Hà Nội, TP.HCM và các tỉnh lân cận.',
            'Chương trình bảo hành mở rộng và hợp đồng bảo trì định kỳ theo quý/năm giúp khách hàng duy trì thiết bị hoạt động ổn định, giảm chi phí phát sinh đột xuất.',
        ],
        features: [
            { icon: '🗄️', title: '2000+ mã hàng', desc: 'Linh kiện đa dạng, tra cứu nhanh' },
            { icon: '🔧', title: 'Kỹ thuật 5+ năm', desc: 'Chẩn đoán và sửa chữa chuyên nghiệp' },
            { icon: '⚡', title: 'Xử lý 4 giờ', desc: 'Hỗ trợ khẩn cấp tại Hà Nội và TP.HCM' },
            { icon: '📋', title: 'Hợp đồng bảo trì', desc: 'Duy trì thiết bị ổn định quanh năm' },
        ],
        applications: ['Mọi cơ sở F&B', 'Nhà hàng – Khách sạn', 'Bệnh viện', 'Trường học', 'Xưởng thực phẩm'],
    },
];

export const getCategoryContent = (categoryName: string): CategoryContent | undefined => {
    return categoryContents.find(c => c.name === categoryName);
};
