/**
 * Thông tin chung của website. Nhóm điền các trường còn trống;
 * trường để rỗng sẽ không hiển thị ở footer.
 */
export const site = {
  name: 'Hạt Gạo Đổi Đời',
  tagline: 'Một hạt gạo. Một hành trình. Nhiều số phận.',
  topic:
    'Tái cơ cấu ngành lúa gạo ở Đồng bằng sông Cửu Long dưới góc nhìn học thuyết giá trị thặng dư của C. Mác',
  course: '',
  team: '',
  members: [] as string[],
  instructor: '',
}

/** Đường dẫn giữa hai chế độ: game (mặc định) và bản bài viết. */
export const modeLinks = {
  game: window.location.pathname,
  classic: `${window.location.pathname}?che-do=bai-viet`,
}

export const navItems = [
  { id: 'hanh-trinh', label: 'Hành trình' },
  { id: 'mo-phong', label: 'Mô phỏng' },
  { id: 'giai-phap', label: 'Giải pháp' },
  { id: 'ket-luan', label: 'Kết luận' },
] as const

export const imageCredits = [
  {
    label: 'Cánh đồng lúa tại Hòn Đất, Kiên Giang',
    author: 'Thuydaonguyen',
    license: 'Public domain',
    url: 'https://commons.wikimedia.org/wiki/File:Ru%E1%BB%99ng_t%E1%BA%A1i_H%C3%B2n_%C4%90%E1%BA%A5t.jpg',
  },
  {
    label: 'Ruộng lúa ở Bình Thủy, Cần Thơ',
    author: 'Dragfyre',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Rice_fields_in_Can_Tho_01.JPG',
  },
]
