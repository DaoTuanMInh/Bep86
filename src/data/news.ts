export interface NewsPost {
    id: number;
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    readTime: number;
}

export const newsPosts: NewsPost[] = [
    {
        id: 1,
        slug: 'loi-tu-nau-com-cong-nghiep',
        category: 'Hỗ trợ kỹ thuật',
        date: '30/09/2025',
        title: 'Những Lỗi Của Tủ Nấu Cơm Công Nghiệp Mà Người Dùng Hay Gặp Phải',
        excerpt: 'Dù là sản phẩm có hoàn hảo đến đâu thì trong khi sử dụng, chắc chắn sẽ phát sinh các lỗi. Bài viết này tổng hợp những lỗi thường gặp nhất ở tủ nấu cơm công nghiệp và cách xử lý hiệu quả.',
        content: `
Dù là sản phẩm có hoàn hảo đến đâu thì trong khi sử dụng, chắc chắn vẫn sẽ xảy ra lỗi khiến người dùng phải đau đầu. Bài viết hôm nay sẽ giúp bạn tìm ra Những lỗi của tủ nấu cơm công nghiệp để giúp bạn có thêm thông tin và sử dụng sản phẩm được hiệu quả hơn.

## Những lỗi của tủ nấu cơm công nghiệp hay gặp

### Thanh nhiệt

Lỗi tủ cơm công nghiệp liên quan đến thanh nhiệt khá nhiều bởi đây là bô phận khá quan trọng và liên quan đến nhiều bộ phận khác. Thanh nhiệt có tác dụng gia nhiệt cho nồi, làm nóng nước để hơi nước bốc lên tạo ra áp suất lớn và làm chín thức ăn.

Khách hàng rất hay quên không đổ nước hoặc để nước cạn gây nên cháy thanh nhiệt. Cần lưu ý rằng chỉ cấp điện cho tủ khi mà thanh nhiệt đã ngập trong nước. Cũng nên định kỳ thay thanh nhiệt thường xuyên, khoảng 1 năm/ lần để đảm bảo thanh nhiệt hấp thụ nhiệt tốt nhất, hiệu quả nhất.

### Phao cấp nước

Với tác dụng duy trì lượng nước cho tủ, để giữ cho thanh nhiệt không bị cháy, Khi nước cạn quá mức, phao chìm xuống đồng thời van xả nước cũng mở ra để nước có thể chảy vào. Trong nhiều trường hợp phao bị méo, thủng dẫn đến không nổi được hoặc không chìm được. Cách khắc phục đó là bạn phải thay 1 chiếc phao cấp nước khác.

Cũng nên thường xuyên vệ sinh van xả nước bởi đường kính của van xả hơi nhỏ, lâu dần cũng đọng lại cặn bẩn sẽ khiến đầu van bị tắc.

### Tủ bị rò hơi

Rò hơi là hiện tượng xảy ra khi đã dùng tủ được 1 thời gian khá dài. Đó là do cánh tủ đã đóng đi đóng lại nhiều lần, gioăng tủ không còn độ đàn hồi như trước nữa. Khi cửa tủ đóng không chặt và gioăng không mút thì hơi trong tủ sẽ bị rò ra ngoài làm tủ hấp hoạt động kém đi. Không có cách nào khác, bạn phải thay 1 chiếc gioăng mới nếu nó quá cũ và phải siết lại cửa tủ cho chặt.

### Bảng điều khiển

Đây là bộ phận để điều chỉnh nhiệt độ, hẹn giờ và các công tắc đóng ngắt mạch điện. Nhìn chung hệ thống các dây dẫn và mạch điện khá rắc rối, vượt qua ngoài tầm sửa chữa của bạn. Nếu như có xảy ra sự cố với bảng điều khiển bạn nên liên hệ đến đội kỹ thuật để yêu cầu sự giúp đỡ chứ không nên tự sửa tại nhà, tránh “chữa lợn lành thành lợn què”.

### Cơm chín không đều, bị sống

Có thể lỗi nằm ở hệ thống quạt gió. Quạt gió có chức năng lưu thông dòng khí nóng và áp xuất đi khắp tủ, để cơm được chín đều nhất. Nhưng nếu quạt gió bị hỏng, phần khay cơm phía trên và bên trong của tủ sẽ bị chỗ sống chỗ chín, chín không đều. Việc của bạn là kiểm tra lại hệ thống quạt, tra thêm dầu cho quạt và kê tủ ra xa nguồn nước để tránh tình trạng hơi nước ngưng tụ làm quạt bị chập điện.

## Một vài lưu ý nhỏ để sử dụng tủ nấu cơm công nghiệp hiệu quả hơn

- Kê tủ ở nơi bằng phẳng, khô ráo và kê tủ cân bằng để khi nấu cơm, nước trong khay sẽ không bị sóng sánh.
- Khi nấu cơm xong, đợi 10 phút rồi hãy mở tủ, vừa là để cơm được ủ thêm 1 lúc, vừa đợi áp xuất và hơi trong tủ hạ xuống. Đứng nép người về bên phải khi mở tủ tránh gây nguy hiểm cho người dùng bởi sự chênh lệch áp suất.
- Hãy ngắt nguồn điện trước khi mở tủ lấy thức ăn ra.

Chúc tủ nấu cơm công nghiệp của bạn luôn hoạt động tốt.
    `,
        image: 'https://picsum.photos/seed/news1/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 5,
    },
    {
        id: 2,
        slug: 'loi-tu-nau-com-gas',
        category: 'Hỗ trợ kỹ thuật',
        date: '28/09/2025',
        title: 'Những Lỗi Thường Gặp Ở Tủ Nấu Cơm Dùng Gas',
        excerpt: 'Tủ cơm công nghiệp dùng gas là thiết bị không thể thiếu trong mỗi căn bếp của nhà hàng, quán ăn. Bài viết tổng hợp các lỗi gas thường gặp và hướng dẫn xử lý an toàn.',
        content: `
## Tủ Nấu Cơm Gas – Ưu Điểm Và Hạn Chế

Tủ nấu cơm dùng gas có ưu điểm nấu nhanh, tiết kiệm điện năng, phù hợp với các khu vực điện không ổn định. Tuy nhiên, thiết bị gas cũng có những rủi ro và lỗi riêng cần lưu ý.

## Các Lỗi Gas Thường Gặp

### 1. Không Bật Được Lửa
- Nguồn gas bị hết hoặc van bị đóng
- Vòi phun gas bị tắc cặn
- Bộ phận đánh lửa bị ẩm hoặc hỏng

**Khắc phục:** Kiểm tra bình gas, vệ sinh vòi phun, thay bộ đánh lửa nếu cần.

### 2. Lửa Yếu Không Đều
- Vòi phun bị tắc một phần
- Áp suất gas không đủ

**Khắc phục:** Vệ sinh vòi phun bằng kim nhỏ, kiểm tra áp suất đầu ra của bình gas.

### 3. Mùi Gas Rò Rỉ
**⚠️ NGUY HIỂM – XỬ LÝ NGAY:**
1. Tắt tất cả nguồn lửa
2. Đóng van gas
3. Mở cửa thông thoáng
4. Không bật công tắc điện
5. Gọi ngay kỹ thuật viên

### 4. Tủ Nấu Không Đạt Nhiệt Độ
- Miệng đốt bị tắc
- Áp suất gas không đủ

## Quy Tắc An Toàn Khi Dùng Tủ Gas

- Luôn kiểm tra rò rỉ trước khi sử dụng
- Không để dầu mỡ tích tụ gần nguồn lửa
- Tắt gas khi không sử dụng
- Lắp đặt van an toàn và báo khói đầy đủ

## Liên Hệ Hỗ Trợ

Hotline: **0985.700.057 – 0383.833.666**
    `,
        image: 'https://picsum.photos/seed/news2/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 4,
    },
    {
        id: 3,
        slug: 'huong-dan-su-dung-tu-nau-com-dien',
        category: 'Hướng dẫn sử dụng',
        date: '25/09/2025',
        title: 'Hướng Dẫn Sử Dụng Tủ Nấu Cơm Điện Bếp 86 Đúng Cách',
        excerpt: 'Tủ nấu cơm điện công nghiệp là dòng sản phẩm thiết bị bếp được ứng dụng rộng rãi. Bài viết hướng dẫn chi tiết cách sử dụng, vận hành an toàn và hiệu quả.',
        content: `
## Giới Thiệu Tủ Nấu Cơm Điện Bếp 86

Tủ nấu cơm điện công nghiệp Bếp 86 được thiết kế với công nghệ hơi nước tuần hoàn, giúp cơm chín đều, dẻo thơm và giữ nóng lâu. Phù hợp cho quy mô từ 50 đến 500 suất ăn.

## Hướng Dẫn Vận Hành

### Bước 1: Chuẩn Bị
1. Vo gạo sạch, để ráo nước
2. Cho gạo vào khay theo tỷ lệ: **1 kg gạo : 1.2 lít nước**
3. Đặt khay vào giá đỡ trong tủ

### Bước 2: Châm Nước Vào Khay Hơi
- Đổ nước vào khay hơi đáy tủ đến vạch chỉ định
- Không đổ quá đầy để tránh tràn khi sôi

### Bước 3: Bật Điện Và Nấu
1. Cắm điện nguồn 3 pha (380V)
2. Bật công tắc MAIN
3. Chọn chế độ NẤU (COOK)
4. Thời gian nấu thông thường: **45-60 phút**

### Bước 4: Chuyển Sang Chế Độ Giữ Nóng
- Sau khi cơm chín, tủ tự động chuyển sang GIỮ NÓNG (WARM)
- Có thể giữ nóng tối đa **4 giờ** mà không làm khô cơm

## Bảng Tỷ Lệ Nấu Tham Khảo

| Số khay | Lượng gạo | Lượng nước | Thời gian |
|---------|-----------|------------|-----------|
| 4 khay  | 4 kg      | 4.8 lít    | 45 phút   |
| 8 khay  | 8 kg      | 9.6 lít    | 55 phút   |
| 12 khay | 12 kg     | 14.4 lít   | 65 phút   |

## Vệ Sinh Sau Mỗi Ca Nấu

1. Đổ bỏ nước còn trong khay hơi
2. Lau sạch bên trong tủ bằng khăn ẩm
3. Vệ sinh khay cơm bằng nước và xà phòng
4. Để khô hoàn toàn trước lần nấu tiếp theo
    `,
        image: 'https://picsum.photos/seed/news3/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 6,
    },
    {
        id: 4,
        slug: 'loi-tu-nau-com-dien-va-cach-khac-phuc',
        category: 'Hỗ trợ kỹ thuật',
        date: '20/09/2025',
        title: 'Những Lỗi Thường Gặp Ở Tủ Nấu Cơm Dùng Điện Và Cách Khắc Phục',
        excerpt: 'Được sử dụng nhiều trong các nhà hàng, khách sạn, khu công nghiệp, nhà máy, tủ nấu cơm điện đôi khi gặp sự cố. Tổng hợp đầy đủ các lỗi và hướng dẫn tự xử lý tại nhà.',
        content: `
## Những Lỗi Điện Thường Gặp Và Cách Xử Lý

### Lỗi 1: Không Có Điện Vào Tủ
**Triệu chứng:** Đèn nguồn không sáng, tủ không phản hồi.

**Kiểm tra:**
- Aptomat bảo vệ có bị nhảy không
- Phích cắm điện có tiếp xúc tốt không
- Nguồn điện 3 pha có ổn định không (dùng đồng hồ đo)

### Lỗi 2: Điện Trở Bị Đứt
**Triệu chứng:** Tủ có điện nhưng không nóng.

**Kiểm tra:** Dùng đồng hồ vạn năng đo thông mạch điện trở.

**Giá trị bình thường:** 20-50 Ohm (tùy công suất)

**Xử lý:** Thay điện trở cùng loại, cùng công suất.

### Lỗi 3: Nhiệt Ẩm Tự Ngắt Liên Tục
**Nguyên nhân:**
- Quá nhiệt do thiếu nước trong khay hơi
- Cảm biến nhiệt bị hỏng

**Xử lý:** Luôn kiểm tra mực nước trước khi bật tủ.

### Lỗi 4: Màn Hình Hiển Thị Lỗi E1/E2/E3

| Mã lỗi | Ý nghĩa | Xử lý |
|--------|---------|-------|
| E1 | Cảm biến nhiệt độ hỏng | Thay cảm biến |
| E2 | Quá nhiệt | Kiểm tra quạt tản nhiệt |
| E3 | Nguồn điện không ổn định | Lắp ổn áp |

## Khi Nào Cần Gọi Kỹ Thuật Viên?

- Tủ bị rò điện, giật điện khi chạm vào
- Mùi khét bất thường từ bên trong tủ
- Lỗi không khắc phục được sau 2-3 lần thử

**Hotline hỗ trợ 24/7: 0985.700.057**
    `,
        image: 'https://picsum.photos/seed/news4/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 5,
    },
    {
        id: 5,
        slug: 'tu-mat-cong-nghiep-chon-loai-nao',
        category: 'Kiến thức sản phẩm',
        date: '15/09/2025',
        title: 'Tủ Mát Công Nghiệp – Nên Chọn Loại Nào Cho Nhà Hàng Của Bạn?',
        excerpt: 'Tủ mát công nghiệp có nhiều loại khác nhau phù hợp với từng nhu cầu sử dụng. Bài viết hướng dẫn cách lựa chọn tủ mát phù hợp nhất cho nhà hàng, khách sạn.',
        content: `
## Phân Loại Tủ Mát Công Nghiệp

### 1. Tủ Mát Đứng 1 Cánh
- Dung tích: 350-500 lít
- Phù hợp: Quán nhỏ, gia đình
- Nhiệt độ: 2-8°C

### 2. Tủ Mát Đứng 2 Cánh
- Dung tích: 700-1000 lít
- Phù hợp: Nhà hàng vừa và nhỏ
- Nhiệt độ: 2-8°C

### 3. Tủ Mát 4 Cánh
- Dung tích: 1400-2000 lít
- Phù hợp: Nhà hàng lớn, khách sạn
- Nhiệt độ: 2-8°C

### 4. Bàn Mát Công Nghiệp
- Kết hợp mặt bàn bếp + ngăn mát bên dưới
- Tiết kiệm không gian bếp

## Tiêu Chí Lựa Chọn

1. **Dung tích phù hợp:** Tính theo số suất ăn mỗi ngày
2. **Loại ga môi chất:** Ưu tiên R600a thân thiện môi trường
3. **Chất liệu inox:** Inox 304 bền bỉ, không gỉ
4. **Công suất máy nén:** Càng lớn làm lạnh càng nhanh
    `,
        image: 'https://picsum.photos/seed/news5/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 4,
    },
    {
        id: 6,
        slug: 'bep-tu-cong-nghiep-10kw',
        category: 'Kiến thức sản phẩm',
        date: '10/09/2025',
        title: 'Bếp Từ Công Nghiệp 10KW – Giải Pháp Tiết Kiệm Năng Lượng Tối Ưu',
        excerpt: 'Bếp từ công nghiệp 10KW đang là xu hướng thay thế bếp gas tại nhiều nhà hàng, khách sạn lớn. Tìm hiểu ưu điểm vượt trội và tại sao nên đầu tư vào bếp từ.',
        content: `
## Bếp Từ Công Nghiệp Là Gì?

Bếp từ công nghiệp sử dụng công nghệ cảm ứng điện từ để làm nóng nồi/chảo trực tiếp, không đốt nóng mặt bếp. Hiệu suất nhiệt lên đến **90%**, vượt trội hơn bếp gas (45-55%).

## Ưu Điểm Vượt Trội

### Tiết Kiệm Năng Lượng
- Hiệu suất 90% so với 55% của bếp gas
- Tiết kiệm 30-40% chi phí năng lượng hàng tháng

### An Toàn Tuyệt Đối
- Không lửa trần, không nguy cơ cháy nổ
- Tự động tắt khi không có nồi trên bếp
- Nhiệt độ mặt bếp không nóng sau khi nấu

### Vệ Sinh Dễ Dàng
- Mặt bếp kính phẳng, không có khe kẽ tích tụ dầu mỡ
- Lau chùi nhanh chóng bằng khăn ẩm

## Thông Số Kỹ Thuật Bếp Từ 10KW

| Thông số | Giá trị |
|----------|---------|
| Công suất | 10.000W |
| Điện áp | 380V/3 pha |
| Kích thước mặt bếp | 400 x 400mm |
| Thời gian đun sôi 10L | ~8 phút |
| Trọng lượng | 18 kg |

## So Sánh Chi Phí Vận Hành (1 tháng)

| Loại bếp | Chi phí nhiên liệu |
|----------|-------------------|
| Bếp gas | 3.500.000đ |
| Bếp từ 10KW | 2.100.000đ |
| **Tiết kiệm** | **1.400.000đ/tháng** |
    `,
        image: 'https://picsum.photos/seed/news6/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 5,
    },
    {
        id: 7,
        slug: 'cach-bao-quan-thuc-pham-bang-tu-dong',
        category: 'Kiến thức sản phẩm',
        date: '05/09/2025',
        title: 'Cách Bảo Quản Thực Phẩm Bằng Tủ Đông Đúng Chuẩn HACCP',
        excerpt: 'Bảo quản thực phẩm đúng cách trong tủ đông là yêu cầu bắt buộc trong ngành dịch vụ ăn uống. Tìm hiểu tiêu chuẩn HACCP và cách áp dụng đúng cho nhà hàng của bạn.',
        content: `
## Tiêu Chuẩn HACCP Là Gì?

HACCP (Hazard Analysis Critical Control Points) là hệ thống quản lý an toàn thực phẩm dựa trên phân tích mối nguy và kiểm soát điểm tới hạn.

## Nhiệt Độ Bảo Quản Chuẩn

| Loại thực phẩm | Nhiệt độ tủ mát | Nhiệt độ tủ đông |
|----------------|-----------------|------------------|
| Thịt tươi | 0-4°C | -18°C |
| Hải sản | 0-2°C | -20°C |
| Rau củ | 4-8°C | Không khuyến nghị |
| Sữa & dairy | 2-6°C | -15°C |

## Quy Tắc FIFO

**First In – First Out:** Thực phẩm nhập trước phải được sử dụng trước. Luôn xoay vòng hàng hóa trong tủ đông.

## Lưu Ý Khi Sử Dụng Tủ Đông

1. Không để thực phẩm sống và chín cùng ngăn
2. Đóng gói kín trước khi cho vào tủ
3. Không nhét tủ quá 70% công suất
4. Xả đá định kỳ mỗi 3-6 tháng
    `,
        image: 'https://picsum.photos/seed/news7/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 6,
    },
    {
        id: 8,
        slug: 'lap-dat-ban-lanh-inox-nha-hang',
        category: 'Hướng dẫn sử dụng',
        date: '01/09/2025',
        title: 'Lắp Đặt Bàn Lạnh Inox Cho Nhà Hàng – Những Điều Cần Biết',
        excerpt: 'Bàn lạnh inox công nghiệp vừa có chức năng bảo quản thực phẩm vừa là mặt bàn chế biến. Bài viết chia sẻ kinh nghiệm lắp đặt, vị trí đặt máy và cách vận hành tối ưu.',
        content: `
## Bàn Lạnh Inox Là Gì?

Bàn lạnh inox (còn gọi là bàn mát) kết hợp mặt bàn inox phẳng bên trên với ngăn lạnh bên dưới, giúp tiết kiệm không gian bếp tối đa.

## Cách Chọn Vị Trí Lắp Đặt

### Nguyên Tắc Chung
- Đặt gần khu vực chế biến để thuận tiện lấy nguyên liệu
- Tránh đặt gần nguồn nhiệt (bếp gas, lò nướng)
- Đảm bảo thông gió tốt ở phía sau máy (tối thiểu 15cm)

### Nền Đặt Máy
- Nền phải phẳng, chắc chắn, chịu được trọng lượng máy + hàng
- Không đặt trực tiếp trên nền ướt

## Quy Trình Lắp Đặt

1. Cân bằng chân đế máy bằng thước ni-vô
2. Kết nối điện nguồn đúng điện áp (220V hoặc 380V)
3. Chờ 2-4 giờ sau khi bật nguồn mới cho hàng vào
4. Kiểm tra nhiệt độ đạt yêu cầu trước khi sử dụng

## Bảo Trì Định Kỳ

- **Hàng ngày:** Lau sạch mặt bàn và bên trong
- **Hàng tuần:** Vệ sinh dàn ngưng phía sau
- **Hàng tháng:** Kiểm tra gioăng cửa, bổ sung gas nếu cần
- **6 tháng:** Bảo dưỡng máy nén bởi kỹ thuật viên có chứng chỉ
    `,
        image: 'https://picsum.photos/seed/news8/800/500',
        author: 'Bếp 86 Việt Nam',
        readTime: 4,
    },
];

export const newsCategories = ['Tất cả', 'Hỗ trợ kỹ thuật', 'Hướng dẫn sử dụng', 'Kiến thức sản phẩm'];
