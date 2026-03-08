export interface Video {
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    featured?: boolean;
}

export const videoCategories = ['Tất cả', 'Giới thiệu', 'Hướng dẫn', 'Review', 'Lắp đặt', 'Demo'];

export const videos: Video[] = [
    {
        id: '1',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Quy trình sản xuất thiết bị bếp inox Bếp 86',
        description: 'Khám phá quy trình sản xuất hiện đại, khép kín tại nhà máy Bếp 86, đảm bảo chất lượng từng sản phẩm.',
        category: 'Giới thiệu',
        duration: '5:32',
        featured: true,
    },
    {
        id: '2',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Hướng dẫn sử dụng Tủ Nấu Cơm Gas 6 Khay Bếp 86',
        description: 'Hướng dẫn chi tiết cách sử dụng và bảo dưỡng tủ nấu cơm gas 6 khay đúng cách.',
        category: 'Hướng dẫn',
        duration: '8:14',
    },
    {
        id: '3',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Review Tủ Sấy Bát FUSHIMAVINA – Diệt khuẩn Ozone',
        description: 'Đánh giá chi tiết tủ sấy bát công nghiệp sử dụng công nghệ Ozone và nhiệt độ cao.',
        category: 'Review',
        duration: '6:45',
    },
    {
        id: '4',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Lắp đặt Bàn Lạnh Inox tại nhà hàng khách sạn',
        description: 'Quy trình lắp đặt bàn lạnh inox chuyên nghiệp tại cơ sở kinh doanh thực phẩm.',
        category: 'Lắp đặt',
        duration: '10:07',
    },
    {
        id: '5',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Tủ Mát Công Nghiệp 2 Cánh – Demo thực tế',
        description: 'Demo thực tế tủ mát công nghiệp 2 cánh tại bếp nhà hàng, so sánh hiệu suất làm lạnh.',
        category: 'Demo',
        duration: '4:20',
    },
    {
        id: '6',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'So sánh Tủ Nấu Cơm Gas và Điện – Loại nào tốt hơn?',
        description: 'Phân tích chi tiết ưu nhược điểm của từng loại, giúp bạn chọn đúng thiết bị.',
        category: 'Review',
        duration: '7:55',
    },
    {
        id: '7',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Bếp Từ Công Nghiệp 10KW – Vận hành và bảo dưỡng',
        description: 'Hướng dẫn vận hành an toàn và bảo dưỡng định kỳ bếp từ công nghiệp công suất lớn.',
        category: 'Hướng dẫn',
        duration: '9:30',
    },
    {
        id: '8',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Lắp đặt Lò Nướng Đối Lưu 5 Khay – Bếp bánh chuyên nghiệp',
        description: 'Hướng dẫn lắp đặt và cài đặt nhiệt độ lò nướng đối lưu dành cho bếp bánh.',
        category: 'Lắp đặt',
        duration: '11:18',
    },
];
